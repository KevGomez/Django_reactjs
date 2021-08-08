from django.urls import path
from rest_framework import urlpatterns, views
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ProfileView, IndexView, CustomAuthToken, RegisterView

urlpatterns = [
    path('profile/', ProfileView.as_view()),
    path('index/', IndexView.as_view()),
    path('login/', CustomAuthToken.as_view()),
    path('register/', RegisterView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)