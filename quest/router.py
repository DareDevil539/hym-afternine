from rest_framework import routers
from game.api.viewsets import QuestionViewSet

router = routers.DefaultRouter()

router.register('question', QuestionViewSet)