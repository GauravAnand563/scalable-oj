from django.urls import include, path
from . import views
urlpatterns = [
        path('register/', views.register, name='Register users API'),
        path('login/', views.login, name='Login users API'),
        path('logout/', views.logout, name='Logout users API'),
        path('activate/<str:uidb64>/<str:token>', views.ActivateUserMethod, name='Account Verification API'),
        path('getProfile/', views.getProfile, name='Get Profile users API'),
        # path('stats/', views.stats, name='Get Statistics users API'),
]
 