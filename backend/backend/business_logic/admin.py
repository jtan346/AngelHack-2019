from django.contrib import admin
from .models import *

class AccountAdmin(admin.ModelAdmin):
    model = Account
    list_display = ('user', 'handphoneno')

admin.site.register(Account, AccountAdmin)


