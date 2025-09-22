from django.db import models

# Create your models here.

class Eng_w(models.Model):

    w=models.CharField(max_length=50)

    t=models.CharField(max_length=50)


