from rest_framework import viewsets
from .serializers import QuestionSerializer
from game.models import Question
from rest_framework.permissions import AllowAny

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (AllowAny,)

        return super(QuestionViewSet, self).get_permissions()


