from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import QuestionSerializer, AnswerSerializer
from game.models import Question, Answer
from rest_framework.permissions import AllowAny


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    # def list(self, request):
    #
    #     print(queryset)
    #     serializer = AnswerSerializer(queryset)
    #     return Response(serializer.data)

    def retrieve(self, request, pk=None):

        queryset = Question.objects.get(pk=pk).answers.all()
        print(queryset)
        question_text = Question.objects.get(pk=pk).text
        return Response({'question': question_text, 'answers': queryset.values()})

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(QuestionViewSet, self).get_permissions()


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(AnswerViewSet, self).get_permissions()


