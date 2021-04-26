from django.shortcuts import render


def index(request):
    return render(request, 'home/index.html', context={
     'title': 'Главня',
    })


def contact(request):
    return render(request, 'home/contact.html', context={
     'title': 'Контакты',
    })


def about(request):
    return render(request, 'home/about.html', context={
     'title': 'Про сайт',
    })