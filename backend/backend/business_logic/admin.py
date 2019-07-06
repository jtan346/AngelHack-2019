from django.contrib import admin
from .models import *

class InsuredUserAdmin(admin.ModelAdmin):
    model = InsuredUser
    list_display = ('user', 'full_name', 'handphoneno', 'status', 'nok', 'nokcontact', 'location')

admin.site.register(InsuredUser, InsuredUserAdmin)

class CommonUserAdmin(admin.ModelAdmin):
    model = CommonUser
    list_display = ('user', 'full_name', 'handphoneno', 'numfound')

admin.site.register(CommonUser, CommonUserAdmin)

class SubmissionAdmin(admin.ModelAdmin):
    model = Submission
    list_display = ('user', 'location')

admin.site.register(Submission, SubmissionAdmin)

