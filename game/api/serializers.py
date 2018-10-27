from rest_framework import serializers
from game.models import *


class QuestionSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        q = Question.objects.create(**validated_data)
        return q

    class Meta:
        model = Question
        fields = ('id', 'text', 'background', 'answers')