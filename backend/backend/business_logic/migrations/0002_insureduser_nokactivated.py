# Generated by Django 2.2.2 on 2019-07-06 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='insureduser',
            name='nokactivated',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
