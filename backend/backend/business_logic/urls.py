from django.urls import path, include
from . import views

app_name = 'business_logic'

# API Endpoints

urlpatterns = [
    path('login', views.loginview.as_view()),
    path('match', views.match),
    path('missingpersons', views.missing_persons.as_view()),
    path('notifications', views.notifications),

    path('foundperson', views.matchSubmission.as_view()),
    path('updateProfile', views.updateInsuredProfilePic.as_view()),

    # path('register', views.registerview.as_view()),
    path('logout', views.logoutview.as_view()),
    path('test', views.testing),
]