from django.urls import path, re_path
from .views import index, create, delete, update, \
    ajax_basket, ajax_basket_display, confirm, email



urlpatterns = [
    path('', index),
    path('index', index),
    path('confirm', confirm),
    path('create', create),
    path('email', email),
    re_path(r'^update/(?P<offer_id>[0-9]+)$', update),
    re_path(r'^delete/(?P<offer_id>[0-9]+)$', delete),
    path('ajax_basket', ajax_basket),
    path('ajax_basket_display', ajax_basket_display),
]