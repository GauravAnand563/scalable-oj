from os import stat
import os
import subprocess as sb
import json
from sys import stdout
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict


from .models import Submission
from problem.models import Problem, Testcase



def create_submission(request):
    try:

        # Only POST Method is accepted
        if(request.method!="POST"):
            return JsonResponse({'status':'Invalid Method'})


        if(not(request.user.is_authenticated)):
            return JsonResponse({'status':'User Authentication is required, which is not provided'}, status=400)

        if(not("problemcode" in request.headers and 
            
            "language" in request.headers)):

            return JsonResponse({'status':'Required Fields are missing in Create Problem API'}, status=400)

            
        
        user_id = request.user.id
        problemcode = request.headers["problemcode"]
        usercode=request.body.decode("utf-8")
        language=request.headers["language"]

 
        # newsubmission = Submission(user_id=user, problem_id=problem, usercode=userc)
        cppfilename = str(user_id)+"_"+str(problemcode)+"_code.cpp";
        f = open(cppfilename, "w")
        f.write(usercode)
        f.close()
        


        userCodeCompilationResults = ''


        isUserCodeAcceptable = True
        isRunTimeError = False
        isCompilationError = False


        isCompileSuccess=True
        try:
            
            tmpcompile = sb.run("g++ "+cppfilename, shell=True,stdout=sb.PIPE, stderr=sb.PIPE)
            
        except Exception:
            
            isCompileSuccess= False
            isCompilationError = True
            isUserCodeAcceptable = False
            verdict = "COMPILATION ERROR"
            status = "COMPILATION ERROR"



        
        
        
        if(tmpcompile.returncode != 0):
            userCodeCompilationResults += (tmpcompile.stderr).decode("utf-8")

        if(isCompileSuccess and tmpcompile.returncode != 0):
            isCompilationError = True
            isUserCodeAcceptable = False
            verdict = "COMPILATION ERROR"
            status = "COMPILATION ERROR"

        

        problemMainObj = Problem.objects.get(problemcode=problemcode)
        problemTestcases = Testcase.objects.filter(problem_id=problemMainObj.id)
        userCodeOutputText = ''



        if(isCompileSuccess and tmpcompile.returncode == 0):

            # Code Compilation Successfull, now running usercode against testcases
            # print("COMPILE SUCCESSFULL, now Moving to Testing against Testcases")
            



            # print(problemTestcases.values())

            userCodeOutputText = ''

            # for Each Testcase we are running 
            for eachProblemTestcaseIndex, eachProblemTestcase in enumerate(problemTestcases.values()):
                # print(eachProblemTestcase,eachProblemTestcase["input_path"])


                # Reading Input for Testcase from File
                getSTDINHandler = open(eachProblemTestcase["input_path"],"r")
                # print(getSTDINHandler.read())

                try:

                    tmpuseroutput = sb.run("./a.out",stdout=sb.PIPE, stderr=sb.PIPE, stdin=getSTDINHandler)
                    
                    
                except e:
                    isRunTimeError = True
                    isUserCodeAcceptable = False
                    verdict = "RUNTIME ERROR"
                    status = "RUNTIME ERROR AT TESTCASE "+str(eachProblemTestcase["title"]) + "(id="+str(eachProblemTestcaseIndex)+")"
                    break
                    # print("SF") 
                
                getSTDINHandler.close()

                userCodeOutputText += ' ----------------- TestcaseIndex='+str(eachProblemTestcaseIndex)+' ----------------- \n :STDOUT:  \n';
                userCodeOutputText += tmpuseroutput.stdout.decode("utf-8")
                userCodeOutputText += '\n:STDERR:\n'
                userCodeOutputText += tmpuseroutput.stderr.decode("utf-8")
                userCodeOutputText += '\n\n'



                

                if(tmpuseroutput.returncode != 0):
                    isRunTimeError = True
                    isUserCodeAcceptable = False
                    verdict = "RUNTIME ERROR"
                    status = "RUNTIME ERROR AT TESTCASE "+str(eachProblemTestcase["title"]) + "(id="+str(eachProblemTestcaseIndex)+")"
                    break


                getCorrectFileHandler = open(eachProblemTestcase["output_path"],"r")
                correctOutput = getCorrectFileHandler.read()
                getCorrectFileHandler.close()

                if(correctOutput.split() == str(tmpuseroutput.stdout.decode("utf-8")).split()):
                    continue
                else:
                    # print(eachProblemTestcaseIndex)
                    isUserCodeAcceptable = False
                    verdict = "WRONG ANSWER"
                    status = "WRONG ANSWER AT TESTCASE "+str(eachProblemTestcase["title"]) + "(id="+str(eachProblemTestcaseIndex)+")"
                    break

        if(isUserCodeAcceptable and not isRunTimeError and not isCompilationError):
            verdict = "ACCEPTED"
            status = "SUBMITTED"
        

            

        if(isCompilationError):
            userCodeOutputText = userCodeCompilationResults



        score = problemMainObj.score
        newSubmission = Submission.objects.create(problem_id=problemMainObj.id, user_id=user_id, usersubmissionfile='', verdict=verdict, language=language, status=status, score=score)

        # print(newSubmission)

        submissionPathForThisTestCase = 'files_usersubmissions/'+str(newSubmission.id)
                # to create directory if not exists
        if(not os.path.exists(submissionPathForThisTestCase)):
            os.makedirs(submissionPathForThisTestCase)

                # for storing users output whether it is correct or not it is the submission result
        f = open(str(submissionPathForThisTestCase+'/submission.txt'), "w")
        f.write(userCodeOutputText)
        f.close()

        newSubmission.usersubmissionfile = submissionPathForThisTestCase+'/submission.txt'
        newSubmission.save()

        if os.path.exists(cppfilename):
            os.remove(cppfilename)

            

        if os.path.exists("a.out"):
            os.remove("a.out")

        return JsonResponse({
            'verdict':verdict,
            'status' : status,    
            'submission':str(model_to_dict(newSubmission)),
            'output':  userCodeOutputText
        })



    except Exception as e: 
        return JsonResponse({'status':'User Submission EXCEPTION OCCURED', 'exception':str(e)}, status=400)






def getUserSubmissions(request):


        # Only POST Method is accepted
    if(request.method!="POST"):
        return JsonResponse({'status':'Invalid Method'})


    if(not(request.user.is_authenticated)):
        return JsonResponse({'status':'User Authentication is required, which is not provided'}, status=400)


        
    try:
        jsonData = json.loads(request.body)
        if(not("problemid" in jsonData)):
            return JsonResponse({'status':'Required Fields are missing in Create Problem API'}, status=400)

        problemid = jsonData["problemid"]
        userid = request.user.id
        submissions = Submission.objects.filter(user_id=userid, problem_id=problemid).order_by('-id')
        # print(submissions)
        dictsubmission = [model_to_dict(eachSubmission) for eachSubmission in submissions]

        
        return JsonResponse(dictsubmission, safe=False)


    except Exception as e:
        return JsonResponse({'status':'getUserSubmissions EXCEPTION OCCURED', 'exception':str(e)}, status=400)
