# Generated by Django 2.2.2 on 2019-07-06 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0006_auto_20190707_0147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='insureduser',
            name='picurl',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='submission',
            name='picurl',
            field=models.TextField(blank=True, null=True),
        ),
    ]