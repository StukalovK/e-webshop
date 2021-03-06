from django.shortcuts import render, redirect
from .models import *
from django.core.paginator import Paginator
from django.http import JsonResponse
import json


def index(request):
    all_products = Product.objects.all()
    paginator = Paginator(all_products, 4)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    numbers = [x for x in range(1, page_obj.paginator.num_pages + 1)]
    return render(request, 'catalog/index.html', context={
        'title': 'Галерея товаров',
        #'all_products': all_offers,
        'page_obj': page_obj,
        'numbers': numbers,
    })


def create(request):
    return render(request, 'catalog/create.html', context={
        'title': 'Добавления товара',
    })


def details(request, id):
    return render(request, 'catalog/details.html', context={
        'title': 'Просмотр информации о товаре',
    })


def update(request, id):
    return render(request, 'catalog/update.html', context={
        'title': 'Редактирование товаров',
    })


def delete(request, id):
    return render(request, 'catalog/delete.html', context={
        'title': 'Удаление товара',
    })


def select(request, cid):
    return render(request, 'orders/select.html', context={
        'title': 'Выборка по категории',
        'sel_goods': Product.objects.filter(category_id=cid),
    })


def ajax_select(request):
    response = dict()
    cid = request.GET['trans_cid']
    sel_products = Product.objects.filter(category_id=cid)

    dict_products = list()
    for sp in sel_products:
        dict_products.append({
            'title': sp.title,
            'about': sp.about,
            'producer': sp.producer,
            'category': sp.category,
            'picture': sp.picture,
            'price': sp.price,
            'count': sp.count,
        })
    json_products = json.dump(dict_products)
    response['sel_products'] = Product.objects.filter(json_products)
    return JsonResponse(response)




