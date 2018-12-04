from django.db import models
from django.db.models import Model
from django.contrib.auth.models import User
from projects.models import Project

from .constants import TeamRoleChoices


class Team(Model):
    team_name = models.CharField(max_length=200)
    team_description = models.CharField(max_length=1000)


class TeamUsers(Model):
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    user_role = models.IntegerField(choices=TeamRoleChoices.CHOICES)


class TeamProjects(Model):
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.DO_NOTHING)
    projects = models.ForeignKey(Project, null=True, blank=True, on_delete=models.DO_NOTHING)
