from .models import *
from .serializers import *

from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import boto3

this_region = 'ap-southeast-1'
rekognition = boto3.client('rekognition', this_region)

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

# class registerview(APIView):
#     def get(self, request):
#         accounts = Account.objects.all()
#         serializer = RegisterSerializer(accounts, many=True)
#         return Response(serializer.data)
#         pass
#
#     def post(self, request):
#         username = request.data['username']
#         password = request.data['password']
#         email = request.data['email']
#         full_name = request.data['name']
#         handphoneno = request.data['phone']
#
#         valid = User.objects.filter(username=username)
#         if valid is not None:
#             user = User(username=username, email=email, password=password)
#             user.save()
#             account = Account(user=user, full_name=full_name,  handphoneno=handphoneno)
#             account.save()
#
#             return Response("Created", status=status.HTTP_200_OK)

class logoutview(APIView):
    def get(self, request, format=None):
        logout(request)
        return redirect('api-auth/logout')


#Need to ensure logged in by Insured User
class updateInsuredProfilePic(APIView):
    def post(self, request):
        response_data = {}

        curuser = request.user

        #Assume always Insured User
        account = InsuredUser.objects.get(user=curuser)
        newPicture = request.data['picurl']

        #retrieve from s3
        account.picurl=newPicture
        account.save()

        response_data["Updated"] = True

        return Response(response_data, status=status.HTTP_200_OK)

#Need to ensure logged in by Common User
class matchSubmission(APIView):
    def post(self, request):
        response_data = {}

        curuser = request.user
        location = request.data['location']
        description = request.data['description']
        picurl = request.data['picurl']

        submission = Submission(user=curuser, location=location, description=description, picurl=picurl)
        submission.save()

        #Matching
        found = []
        allInsuredUsers = InsuredUser.objects.all()

        print(picurl)

        for iuser in allInsuredUsers:
            iuserpic = iuser.picurl
            result = self.findmatch(iuserpic, picurl)
            if result[0]:
                found.append((iuser, float(result[1])))

        found.sort(key=lambda e: e[1], reverse=True)
        #sort by highest similarity, get the highest similarity entry

        if found is not None:
            response_data["Match"] = True
            response_data["missingImage"] = found[0][0].picurl
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data["Match"] = False
            return Response(response_data, status=status.HTTP_200_OK)

    #SC: public/missing/15624358472572042379873501463203.jpg
    #Ben: public/missing/15624358824331709402352872999931.jpg
    #Sak: public/missing/15624360786313870125182038056140.jpg
    #Daniel: public/missing/1562435946490811720041599404789.jpg
    #YW: public/missing/15624360400726761846690061128035.jpg
    def findmatch(self, insuredPic, commonPic):
        response = rekognition.compare_faces(
            SimilarityThreshold=10,
            SourceImage={
                'S3Object': {
                    'Bucket': 'angelhackimages-dev',
                    # 'Name': 'public/missing/pizza1.png',
                    'Name': insuredPic,
                },
            },
            TargetImage={
                'S3Object': {
                    'Bucket': 'angelhackimages-dev',
                    # 'Name': 'public/missing/pizza2.png',
                    'Name': commonPic,
                },
            },
        )

        print(response['FaceMatches'][0]['Similarity'])
        if float(response['FaceMatches'][0]['Similarity']) > 70:
            return (True, response['FaceMatches'][0]['Similarity'])
        else:
            return (False, response['FaceMatches'][0]['Similarity'])










def missing_person(request):
    pass

def found_person(request):
    pass

def notifications(request):
    pass

def match(request):
    pass


import os


def testing(request):
    # s3 = boto3.resource('s3')
    this_region = 'ap-southeast-1'
    rekognition = boto3.client('rekognition', this_region)


    response = rekognition.compare_faces(
        SimilarityThreshold=10,
        SourceImage={
            'S3Object': {
                'Bucket': 'angelhackimages-dev',
                'Name': 'public/missing/pizza1.png',
            },
        },
        TargetImage={
            'S3Object': {
                'Bucket': 'angelhackimages-dev',
                'Name': 'public/missing/pizza2.png',
            },
        },
    )

    print(response['FaceMatches'][0]['Similarity'])

    return HttpResponse(response['FaceMatches'][0]['Similarity'])