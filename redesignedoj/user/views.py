from django.utils import timezone
import json
from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User as UserModel
from django.contrib.auth import authenticate, login as LibraryLogin, logout as LibraryLogout
from django.forms.models import model_to_dict

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text, force_str

from .models import Stats, User

from functions.emails import Email
from functions.tokengenerator import account_activation_token


def register(request):
    try:
        if (request.method != "POST"):
            return JsonResponse({'status': 'Invalid Register Method'}, status=400)

        jsonData = json.loads(request.body)

        if ("username" in jsonData and "email" in jsonData and "password" in jsonData and "firstname" in jsonData and "lastname" in jsonData):
            newuser = UserModel.objects.create_user(
                jsonData["username"], jsonData["email"], jsonData["password"], first_name=jsonData["firstname"], last_name=jsonData["lastname"], is_active=False)
            ourUserModel = User.objects.create(
                user=newuser, rating=0, status=True, country='India', token='')
            print(newuser)

            uidb64 = urlsafe_base64_encode(force_bytes(newuser.pk))
            message = {
                'user': {'username': jsonData["username"]},
                'domain': 'pushpendrahpx.me',
                'uid': uidb64,
                'token': 'http://localhost:8000/users/activate/'+uidb64+'/'+account_activation_token.make_token(newuser),
            }

            ourUserModel.token = message["token"]

            mail_subject = 'Account Verification of ' + \
                jsonData["email"] + '- Redesigned OJ'

            to_email = jsonData["email"]
            to_name = jsonData["firstname"] + " " + jsonData["lastname"]
            emailObj = Email(to_email=to_email, subject=mail_subject, text_content=str(
                message), html_content='', email_group='Account Verification', content_type=False, to_name=to_name)
            emailresponse = emailObj.send_email()
            print(emailresponse)

            return JsonResponse({'message': 'user created'}, status=200)

        return JsonResponse({'status': 'user Registration didn\'t worked doesnt created in both tables'}, status=400)

    except Exception as e:

        return JsonResponse({'status': 'Register EXCEPTION OCCURED', 'exception': str(e)}, status=400)


def login(request):
    try:
        if (request.method != "POST"):
            return JsonResponse({'status': 'Invalid Register Method'}, status=400)

        jsonData = json.loads(request.body)

        if (("username" in jsonData and "password" in jsonData) != True):
            return JsonResponse({'message': 'required fields username,password missing'}, status=400)

        username = jsonData["username"]
        password = jsonData["password"]
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            loginuserobj = LibraryLogin(request, user)
            print(loginuserobj)

            response = JsonResponse(
                {'message': 'Login Successfull', 'object': model_to_dict(user)})
            print((request.session))
            for key in request.session.keys():
                print("key:=>" + request.session[key])

            return response
        else:
            # Return an 'invalid login' error message.
            ...
            return JsonResponse({'message': 'Login Failed'})

    except Exception as e:

        return JsonResponse({'status': 'Login EXCEPTION OCCURED', 'exception': str(e)}, status=400)


def logout(request):
    try:
        if (request.method != "POST"):
            return JsonResponse({'status': 'Invalid Register Method'}, status=400)

        if request.user.is_authenticated:
            LibraryLogout(request)
            # Do something for authenticated users.
            return JsonResponse({'message': 'logout sucessfull'}, status=200)

        else:
            # Do something for anonymous users
            return JsonResponse({'message': 'authentication failed'}, status=400)

    except Exception as e:
        return JsonResponse({'status': 'Logout EXCEPTION OCCURED', 'exception': str(e)}, status=400)


def ActivateUserMethod(request, uidb64, token):
    if (request.method != "GET"):
        return JsonResponse({'message': 'Invalid Request'})
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = UserModel.objects.get(pk=uid)

    except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
        user = None

    # time_elapsed = token.created - timezone.now()
    # print(time_elapsed)

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # login(request, user)
        return JsonResponse({'message': 'token verified'}, status=200)
    else:
        return JsonResponse({'message': 'Invalid Account token'}, status=400)


def getProfile(request):
    try:
        if (request.method != "GET"):
            return JsonResponse({'status': 'Invalid Register Method'}, status=400)

        if request.user.is_authenticated:
            print("token authenticated")
            # Do something for authenticated users.
            return JsonResponse((model_to_dict(request.user)), safe=False)

        else:
            print("token authentication failed")
            # Do something for anonymous users
            return JsonResponse({'message': 'authentication failed'})

    except Exception as e:
        return JsonResponse({'status': 'getProfile EXCEPTION OCCURED', 'exception': str(e)}, status=400)


def stats(request):
    try:
        if (request.method != "GET"):
            return JsonResponse({'status': 'Can only GET to this endpoint'}, status=400)

        if request.user.is_authenticated:
            print("token authenticated")
            user = request.user
            print(user)
            statistics, created = Stats.objects.get_or_create(user=user)
            return JsonResponse((model_to_dict(statistics)), status=200)

        else:
            print("token authentication failed")
            return JsonResponse({'message': 'authentication failed'})

    except Exception as e:
        return JsonResponse({'status': 'stats EXCEPTION OCCURED', 'exception': str(e)}, status=400)
