from django.contrib.auth.mixins import LoginRequiredMixin

from base.api_views import APIView
from .forms import TeamModelForm
from .models import Team
from .models import TeamProjects
from .models import TeamUsers


class GetTeams(LoginRequiredMixin, APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    # authentication_classes = (authentication.CSRFCheck,)
    # permission_classes = (permissions.IsAdminUser,)

    def get_request(self, request, *args, **kwargs):
        """
        Return a list of all users.
        """
        teams = [{
            'team_name': team.team_name,
            'description': team.team_description,
            'id': team.id

        } for team in Team.objects.all().order_by('id')]
        return teams


class UpdateTeam(LoginRequiredMixin, APIView):
    def post_request(self, request, *args, **kwargs):
        created = bool(request.POST.get('id'))
        if created:
            form = TeamModelForm(request.POST, instance=Team.objects.get(id=int(request.POST.get('id'))))
        else:
            x = {
                'team_name': request.POST.get('team_name'),
                'team_description': request.POST.get('team_description'),
            }
            form = TeamModelForm(x)

        if form.is_valid():
            if created:
                model = form.save()
            else:
                model = Team(team_name=form.cleaned_data['team_name'],
                             team_description=form.cleaned_data['team_description'])
                model.save(force_insert=True)
            return {'success': 'ticket updated',
                    'created': not created,
                    'team': {'team_name': model.team_name,
                               'description': model.team_description,
                               'id': model.id,
                               }}
        else:
            return {'status': 400}
