from django.db import models

from django.contrib.auth.models import User
from django.core.validators import *

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=50, null=True, blank=True)
    handphoneno = models.IntegerField(null=True, blank=True,
      validators=[
          MaxValueValidator(99999999),
          MinValueValidator(80000000)
      ]
    )
