from django.db import models
from django.db.models import Model
from django.contrib.auth.models import User

from .constants import TicketPriorityChoices, TicketState


class Dashboard(Model):
    dashboard_id = models.CharField(max_length=200)
    dashboard_name = models.CharField(max_length=200)
    dashboard_title = models.CharField(max_length=500)
    dashboard_description = models.TextField()
    dashboard_body = models.TextField()

    def create_dashboard_id(self):
        self.dashboard_id = self.dashboard_title.__hash__()


# class User(models.)

class Project(Model):
    project_name = models.CharField(max_length=200)
    project_description = models.CharField(max_length=200)


class Block(Model):
    block_name = models.CharField(max_length=200)
    block_description = models.CharField(max_length=1000)


class ProjectBlocks(Model):
    block = models.ForeignKey(Block, null=True, blank=True, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.DO_NOTHING)


class Feature(Model):
    feature_name = models.CharField(max_length=200)
    feature_description = models.CharField(max_length=1000, null=True, blank=True)
    business_value = models.CharField(max_length=500, verbose_name='Project Business Value')


class FeatureBlock(Model):
    feature = models.ForeignKey(Feature, null=True, blank=True, on_delete=models.DO_NOTHING)
    block = models.ForeignKey(Block, null=True, blank=True, on_delete=models.DO_NOTHING)


class Ticket(Model):
    ticket_name = models.CharField(max_length=200)
    ticket_description = models.TextField()
    ticket_priority = models.IntegerField(choices=TicketPriorityChoices.CHOICES)
    ticket_state = models.IntegerField(choices=TicketState.CHOICES, default=TicketState.OPEN)


class TicketBlock(Model):
    ticket = models.ForeignKey(Ticket, null=True, blank=True, on_delete=models.DO_NOTHING)
    block = models.ForeignKey(Block, null=True, blank=True, on_delete=models.DO_NOTHING)


class FeatureTicket(Model):
    feature = models.ForeignKey(Feature, null=True, blank=True, on_delete=models.DO_NOTHING)
    ticket = models.ForeignKey(Ticket, null=True, blank=True, on_delete=models.DO_NOTHING)

