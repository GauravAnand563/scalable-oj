from django.urls import include, path
from . import views
urlpatterns = [
        path('create_problem/', views.create_problem, name='main-view'),
        path('getAllProblems/<int:pageno>',views.getProblemsByPage, name='Get Problems by Page'),
        path('getAllProblems',views.getAllProblems, name='Get All Problems'),
        path('getProblemById/<int:id>',views.getProblemById, name='Get Problem By Id'),
        path('getTags',views.getTags, name='Get All Tags'),
]
