from django.urls import path
from . import views

app_name = 'business_logic'

# API Endpoints

urlpatterns = [
    path('login', views.loginview.as_view()),
    path('match', views.match),
    path('missingpersons', views.missing_person),
    path('foundperson', views.found_person),
    path('notifications', views.notifications),
    path('register', views.registerview.as_view()),
    path('logout', views.logoutview.as_view())
]