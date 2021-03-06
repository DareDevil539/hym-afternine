# Generated by Django 2.1.2 on 2018-10-27 01:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20181027_0450'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='question_in_a', to='game.Question'),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='answer_in_q', to='game.Answer'),
        ),
    ]
