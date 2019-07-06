from .models import *
from .serializers import *

from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

class loginview(APIView):
    def post(self, request):
        response_data = {}
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                response_data["Authenticated"] = True
                return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data["Authenticated"] = False
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

def logout(request):
    pass

class registerview(APIView):
    def get(self, request):
        accounts = Account.objects.all()
        serializer = RegisterSerializer(accounts, many=True)
        return Response(serializer.data)
        pass

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        full_name = request.data['name']
        handphoneno = request.data['phone']

        valid = User.objects.filter(username=username)
        if valid is not None:
            user = User(username=username, email=email, password=password)
            user.save()
            account = Account(user=user, full_name=full_name,  handphoneno=handphoneno)
            account.save()

            return Response("Created", status=status.HTTP_200_OK)

class logoutview(APIView):
    def get(self, request, format=None):
        logout(request)
        return redirect('api-auth/logout')

def missing_person(request):
    pass

def found_person(request):
    pass

def notifications(request):
    pass

def match(request):
    pass

import boto3
import os


def testing(request):
    s3 = boto3.resource('s3')
    my_bucket = s3.Bucket('angelhackimages-dev')
    this_region = 'ap-southeast-1'
    rekognition = boto3.client('rekognition', this_region)


    response = rekognition.compare_faces(
        SimilarityThreshold=10,
        SourceImage={
            'S3Object': {
                'Bucket': 'angelhackimages-dev',
                'Name': 'public/missing/15624231784037885658086915518324.jpg',
            },
        },
        TargetImage={
            'S3Object': {
                'Bucket': 'angelhackimages-dev',
                'Name': 'public/missing/15624103511747964560133694515418.jpg',
            },
        },
    )

    print(response)

    return HttpResponse('Pass')