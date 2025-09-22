from django.urls import path
from . import views

urlpatterns=[
    path('english/', views.index, name='eng'),
    path('english/sessions', views.sessions, name='eng_s'),
    path('english/exam', views.exam, name='eng_e'),

]