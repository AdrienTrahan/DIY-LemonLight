import base64
from django.conf.urls import url
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.template import Context, loader
from django.template import RequestContext
from django.shortcuts import render
from django.views import View
import numpy as np
import cv2
import json

maxhue = 179
minhue = 0
maxsat = 255
minsat = 0
maxval = 255
minval = 0

width2 = 0
height2 = 0
x = 0
y = 0
cap = cv2.VideoCapture(0)

def sendHue(request):
    global maxhue
    global minhue
    maxhue = int(request.GET["max"])
    minhue = int(request.GET["min"])
    return HttpResponse("")

def sendSat(request):
    global maxsat
    global minsat
    maxsat = int(request.GET["max"])
    minsat = int(request.GET["min"])
    
    
    return HttpResponse("")

def sendVal(request):
    global maxval
    global minval
    maxval = int(request.GET["max"])
    minval = int(request.GET["min"])
    return HttpResponse(" ")

def getRectangle(request):
    response_data = {}
    response_data['width'] = str(width2)
    response_data['height'] = str(height2)
    response_data['y'] = str(y)
    response_data['x'] = str(x)
    return HttpResponse(json.dumps(response_data))

def home(request):
    return render(request, 'djangotest/index.html')

def image(request):
    global y
    global x
    global width2
    global height2
    ret, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (minhue, minsat, minval), (maxhue, maxsat, maxval))
    blurred = cv2.blur(mask, (10, 10))
    holla, thresholded = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY)
    cont, hierarchy = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if (len(cont) > 0):
        best = 0
        w = 0
        h = 0
        for i in range(len(cont)):
            x2, y2, w2, h2 = cv2.boundingRect(cont[i])
            if (h2 > h and w2 > w):
                w = w2
                h = h2
                best = i
        x2, y2, w2, h2 = cv2.boundingRect(cont[best])
        width2 = w2
        height2 = h2
        x = x2
        y = y2
        cv2.rectangle(frame, (x2, y2), (x2 + w2, y2 + h2), (255, 0, 0), 10)
    else:
        x = 0
        y = 0
        width2 = 0
        height2 = 0
    retval, buffer = cv2.imencode('.jpg', thresholded)
    encoded_string = base64.b64encode(buffer)
    retval2, buffer2 = cv2.imencode('.jpg', frame)
    encoded_string2 = base64.b64encode(buffer2)
    response_data = {}
    response_data['image'] = str(encoded_string, 'utf-8')
    response_data['image2'] = str(encoded_string2, 'utf-8')
    response_data['width'] = str(width2)
    response_data['height'] = str(height2)
    response_data['x'] = str(x)
    response_data['y'] = str(y)
    return HttpResponse(json.dumps(response_data))

