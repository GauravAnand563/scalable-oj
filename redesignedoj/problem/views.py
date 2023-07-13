import os
import json
from django.shortcuts import render

from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers


from .models import Problem, Testcase, Tag


def create_problem(request):
    try:
        if(request.method != "POST"):
            return JsonResponse({'status':'Invalid create_problem Method'}, status=400)
        

        if(not(request.user.is_authenticated)):
            return JsonResponse({'status':'User Authentication is required, which is not provided'}, status=400)

        jsonData = json.loads(request.body)

        if(not("title" in jsonData and "description" in jsonData and "difficulty" in jsonData and "score" in jsonData and "tags" in jsonData and "problemcode" in jsonData and "testcases" in jsonData)):
            return JsonResponse({'status':'Required Fields are missing in Create Problem API'}, status=400)

        title = jsonData["title"]
        description = jsonData["description"]
        difficulty = jsonData["difficulty"]
        score = jsonData["score"]
        tags = jsonData["tags"]
        
        testcases = jsonData["testcases"]
        constraints = jsonData["constraints"]
        problemcode = jsonData["problemcode"]


        # Creating Problem Instance in Database
        author = request.user
        newproblem = Problem.objects.create(title=title, description=description, difficulty=difficulty, score=score, problemcode=problemcode, author=author, testcases = testcases,constraints = constraints)


        # Directory path of problem 
        testcasesPath = "files_testcases/"+str(problemcode)

        # print(testcasesPath)
        if(not os.path.exists(testcasesPath)):
            os.makedirs(testcasesPath)

        # for checking if given object is List or not
        if not isinstance(testcases, list):
            return JsonResponse({'status':'Invalid Testcases type'}, status=400)
        
        # Checking if all the keys are present in object or not
        for testcaseIndex,eachTestcase in enumerate(testcases):
            if(not(("input" in eachTestcase and "output" in eachTestcase))):
                return JsonResponse({'status':'Properties missing from testcases'}, status=400)
        

        # testcases file paths in list
        testcasesFilePathInList = []


        # Checking if all the keys are present in object or not
        for testcaseIndex,eachTestcase in enumerate(testcases):

            
            # creating directory if not exists
            if(not os.path.exists(testcasesPath+"/"+str(testcaseIndex))):
                os.makedirs(testcasesPath+"/"+str(testcaseIndex))
            
            # creating input and output files
            testcaseInputFilePath = testcasesPath+"/"+str(testcaseIndex)+"/input.txt"
            testcaseOutputFilePath = testcasesPath+"/"+str(testcaseIndex)+"/output.txt"


            fileHandler = open(testcaseInputFilePath,"w")
            fileHandler.write(eachTestcase["input"])
            fileHandler.close()

            fileHandler = open(testcaseOutputFilePath,"w")
            fileHandler.write(eachTestcase["output"])
            fileHandler.close()

            newTmptestcase = Testcase.objects.create(
                title=problemcode+'_testcase_'+str(testcaseIndex),
                input_path = testcaseInputFilePath, 
                output_path=testcaseOutputFilePath,
                problem_id = newproblem.id
                )

            # testcasesFilePathInList.append({'input':testcaseInputFilePath, 'output':testcaseOutputFilePath}) 

        # Storing Paths of Input & Output Files in Databases to reachout those files during problem submissions and testcase against user submissions
        newproblem.testcasesinputandoutput = str(testcasesFilePathInList)
        newproblem.save()




        if newproblem.pk is not None:
            return JsonResponse({'status':'Problem Created Successfully'}, status=200)
        else:
          return JsonResponse({'status':'Problem Creation Failed from create method'}, status=400)
        
    except Exception as e: 

        return JsonResponse({'status':'Create Problem EXCEPTION OCCURED', 'exception':str(e)}, status=400)





def getAllProblems(request):
    problems_list = Problem.objects.all()
    list_problems = []
    for each in problems_list:
        tagss = list(each.tags.all().values())
        # print(tagss)
        # tj = json.loads(tagss)
        dicteach = model_to_dict(each)

        # print(dicteach)
        dicteach["tags"] = tagss
        # print(dicteach)
        list_problems.append(dicteach)

    # print(list_problems)

    # list_result = [dict(entry) for entry in problems]
    return JsonResponse(list_problems, safe=False)

def getProblemsByPage(request,pageno):
    counts = (pageno-1)*50;
    problems = Problem.objects.all()[counts:counts+50]
    list_result = [model_to_dict(entry) for entry in problems]
    return JsonResponse(list_result, safe=False)

def getProblemById(request,id):
    if(request.method != "GET"):
        return JsonResponse({'status':'Invalid getProblemId Method'}, status=400)


    problem = Problem.objects.get(id=id)
    # print(problem)
    # print(problem)

    tagss = list(problem.tags.all().values())
    # print(tagss)
        # tj = json.loads(tagss)
    dicteach = model_to_dict(problem)
    dicteach["tags"] = tagss

    
    return JsonResponse(dicteach, safe=False)

def getTags(request):
    if(request.method != "GET"):
        return JsonResponse({'status':'Invalid getProblemId Method'}, status=400)


    tags = Tag.objects.all().values()
    
    # list_tags = []
    # for each in tags:
    #     # tj = json.loads(tagss)
    #     print(each)
    #     dicteach = model_to_dict(each)

    #     list_tags.append(dicteach)

    # print(list_tags)

    list_result = [dict(entry) for entry in tags]
    return JsonResponse(list_result, safe=False)