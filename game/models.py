from django.db import models

# Create your models here.


class Answer(models.Model):

    text = models.TextField()

    next_question = models.ForeignKey('Question',
                                      on_delete=models.CASCADE,
                                      related_name='question_in_a',
                                      null=True,
                                      blank=True)

    def __str__(self):
        return self.text


class Question(models.Model):

    background = models.CharField(max_length=100, null=True)

    text = models.TextField()

    answers = models.ManyToManyField('Answer',
                                     related_name='answer_in_q',
                                     null=True,
                                     blank=True)

    def __str__(self):
        return self.text


