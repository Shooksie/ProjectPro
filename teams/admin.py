from django.contrib import admin
from .models import Team
from .models import TeamProjects
from .models import TeamUsers
# Register your models here.

from .forms import TeamModelForm


class TeamUsersInline(admin.StackedInline):
    model = TeamUsers
    extra = 3


class TeamProjectsInline(admin.StackedInline):
    model = TeamProjects
    extra = 3


class TeamAdmin(admin.ModelAdmin):
    form = TeamModelForm
    inlines = [TeamUsersInline, TeamProjectsInline]
    list_display = ('team_name', 'team_description')


admin.site.register(Team, TeamAdmin)

