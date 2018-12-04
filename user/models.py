from django.db import models
from django.db.models import Model
from django.contrib.auth.models import User

from projects.models import Ticket
# Create your models here.


class UserTickets(Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    ticket = models.ForeignKey(Ticket, on_delete=models.DO_NOTHING)

