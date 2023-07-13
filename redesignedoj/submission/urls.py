from django.urls import include, path
from . import views
urlpatterns = [
        path('create_submission/', views.create_submission, name='Creating Submission API'),
        path('get_user_submissions/', views.getUserSubmissions, name='Get user Submissions API')
]
