from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.response import Response

from game.models import *


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'text', 'background', 'answers')


class AnswerSerializer(serializers.ModelSerializer):


    class Meta:
        model = Answer
        fields = ('id', 'text', 'next_question')