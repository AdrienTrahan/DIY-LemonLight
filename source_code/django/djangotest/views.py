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
import copy

type = "normal"
pipelines = [{'minhue':0, 'maxhue':179, 'minsat':0, 'maxsat':255, 'minval': 0, 'maxval': 255, 'width': 0, 'height': 0, 'x': 0, 'y': 0}]
current = 1
cap = cv2.VideoCapture(0)

def changeType(request):
    global type
    print(type)
    type = (request.GET["type"])
    return HttpResponse(" ")

def removePipeline(request):
    global pipelines
    global current
    if pipelines.__len__() == current:
        current -= 1
    if pipelines.__len__() != 1:
        pipelines  = pipelines[:-1]
    return HttpResponse(" ")

def addPipeline(request):
    global pipelines
    pipelines.append({'minhue':0, 'maxhue':179, 'minsat':0, 'maxsat':255, 'minval': 0, 'maxval': 255});  
    return HttpResponse(" ")

def retrievePipelines(request):
    global pipelines
    return HttpResponse(str(pipelines))

def changePipeline(request):
    number = (request.GET["pipeline"])
    global current
    if int(number) <= pipelines.__len__():
        current = int(number)
    return HttpResponse(" ")

def sendHue(request):
    global maxhue
    global minhue
    global pipelines
    global current
    pipelines[current - 1]['maxhue'] = int(request.GET["max"])
    pipelines[current - 1]['minhue'] = int(request.GET["min"])
    return HttpResponse("")

def sendSat(request):
    global maxsat
    global minsat
    global pipelines
    global current
    pipelines[current - 1]['maxsat'] = int(request.GET["max"])
    pipelines[current - 1]['minsat'] = int(request.GET["min"])


    return HttpResponse("")

def sendVal(request):
    global maxval
    global minval
    global pipelines
    global current
    pipelines[current - 1]['maxval'] = int(request.GET["max"])
    pipelines[current - 1]['minval'] = int(request.GET["min"])
    return HttpResponse(" ")

def getRectangle(request):
    response_data = {}

    response_data['width'] = str(pipelines[current - 1]['width'])
    response_data['height'] = str(pipelines[current - 1]['height'])
    response_data['y'] = str(pipelines[current - 1]['y'])
    response_data['x'] = str(pipelines[current - 1]['x'])
    return HttpResponse(json.dumps(response_data))

def home(request):
    return render(request, 'djangotest/index.html')

def image(request):
    global y
    global x
    global width2
    global height2
    ret, frame = cap.read()
    frame = cv2.resize(frame, (150, 100))
    hello = copy.copy(frame);
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (pipelines[current - 1]['minhue'], pipelines[current - 1]['minsat'], pipelines[current - 1]['minval']), (pipelines[current - 1]['maxhue'], pipelines[current - 1]['maxsat'], pipelines[current - 1]['maxval']))
    blurred = cv2.blur(mask, (10, 10))
    holla, thresholded = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY)
    _, cont, hierarchy = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
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

        pipelines[current - 1]['width'] = w2
        pipelines[current - 1]['height'] = h2
        pipelines[current - 1]['x'] = x2
        pipelines[current - 1]['y'] = y2
        cv2.rectangle(frame, (x2, y2), (x2 + w2, y2 + h2), (255, 0, 0), 10)
    else:
        pipelines[current - 1]['x'] = 0
        pipelines[current - 1]['y'] = 0
        pipelines[current - 1]['height'] = 0
        pipelines[current - 1]['width'] = 0

    response_data = {}
    global type
    if (type == "normal"):
        retval, buffer = cv2.imencode('.jpg', hello)
        encoded_string = base64.b64encode(buffer)
        response_data['image'] = str(encoded_string, 'utf-8')
    elif (type == "masked"):
        retval, buffer = cv2.imencode('.jpg', mask)
        encoded_string = base64.b64encode(buffer)
        response_data['image'] = str(encoded_string, 'utf-8')
    elif (type == "thresholded"):
        retval, buffer = cv2.imencode('.jpg', thresholded)
        encoded_string = base64.b64encode(buffer)
        response_data['image'] = str(encoded_string, 'utf-8')
    elif (type == "final"):
        retval, buffer = cv2.imencode('.jpg', frame)
        encoded_string = base64.b64encode(buffer)
        response_data['image'] = str(encoded_string, 'utf-8')


    response_data['width'] = str(pipelines[current - 1]['width'])
    response_data['height'] = str(pipelines[current - 1]['height'])
    response_data['x'] = str(pipelines[current - 1]['x'])
    response_data['y'] = str(pipelines[current - 1]['y'])
    return HttpResponse(json.dumps(response_data))

