from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = 'teams/team_dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'user': self.request.user,
        })

