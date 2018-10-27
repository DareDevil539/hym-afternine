from rest_framework import routers
from game.api.viewsets import QuestionViewSet, AnswerViewSet

router = routers.DefaultRouter()
router.register('answer', AnswerViewSet)
router.register('question', QuestionViewSet)
router.register('', QuestionViewSet)

