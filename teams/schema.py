# cookbook/ingredients/schema.py
import graphene

from graphene_django.types import DjangoObjectType

from .models import Team, TeamProjects, Roles, TeamRoles


class TeamType(DjangoObjectType):
    class Meta:
        model = Team


class ProjectType(DjangoObjectType):
    class Meta:
        model = TeamProjects


class Query(graphene.ObjectType):
    team = graphene.Field(TeamType,
                          id=graphene.Int(),
                          name=graphene.String())
    all_teams = graphene.List(TeamType)

    all_team_projects = graphene.List(ProjectType)

    def resolve_team(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Team.objects.get(pk=id)

        if name is not None:
            return Team.objects.get(team_name=name)

        return None

    def resolve_all_teams(self, info, **kwargs):
        return Team.objects.all()

    def resolve_all_projects(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return TeamProjects.objects.select_related('projects').all()


schema = graphene.Schema(query=Query)