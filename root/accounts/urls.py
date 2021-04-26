from django.urls import path
from .views import sign_in, sign_up, sign_out, ajax_reg, profile


urlpatterns = [
    path('sign_up', sign_up),
    path('sign_out', sign_out),
    path('sign_in', sign_in),
    path('profile', profile),
    path('ajax_reg', ajax_reg),
]