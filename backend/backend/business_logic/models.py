from django.db import models

from django.contrib.auth.models import User
from django.core.validators import *

class InsuredUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True, blank=True)
    handphoneno = models.IntegerField(null=True, blank=True,
      validators=[
          MaxValueValidator(99999999),
          MinValueValidator(80000000)
      ]
    )
    status = models.CharField(max_length=50, null=True, blank=True)
    nok = models.CharField(max_length=50, null=True, blank=True)
    nokcontact = models.CharField(max_length=50, null=True, blank=True)
    location = models.CharField(max_length=50, null=True, blank=True)


class CommonUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True, blank=True)
    handphoneno = models.IntegerField(null=True, blank=True,
      validators=[
          MaxValueValidator(99999999),
          MinValueValidator(80000000)
      ]
    )
    numfound = models.CharField(max_length=50, null=True, blank=True)

class Submission(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=50, null=True, blank=True)



# class N(models.Model):
#     name = models.CharField(max_length=50, null=True, blank=True)
#     status = models.CharField(max_length=50, null=True, blank=True)
#     nok = models.CharField(max_length=50, null=True, blank=True)
#     nokcontact = models.CharField(max_length=50, null=True, blank=True)




