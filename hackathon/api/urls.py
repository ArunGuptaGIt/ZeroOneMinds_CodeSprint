from django.urls import path
from . import views

urlpatterns = [
    path('signup/',views.UserSignup,name=''),
    path('storage/',views.StorageMethods,name=''),

]
