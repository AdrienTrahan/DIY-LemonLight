"""djangotest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.http import HttpResponse, HttpResponseNotFound
from django.conf.urls import url
from django.template import Context, loader
from django.template import RequestContext
from django.shortcuts import render
import djangotest.views as view

urlpatterns = [
    url('image', view.image),
    url('sendHue', view.sendHue),
    url('sendSaturation', view.sendSat),
    url('sendValue', view.sendVal),
    url('getRectangle', view.getRectangle),
    url('', view.home),
]


