# Generated by Django 5.0.2 on 2024-11-27 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0004_reservation_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='reservation_code',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='reservation',
            name='end_date',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='start_date',
            field=models.DateField(blank=True),
        ),
    ]
