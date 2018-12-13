from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.utils import timezone
from django.urls import reverse
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin

from .constants import TicketState, TicketPriorityChoices

# Create your views here.
class TestDashboard(generic.TemplateView):
    template_name = 'dashboards/test_bash_dashboard.html'

# class ArticleDashboard(generic.TemplateView):
#


# Create your views here.
class TicketsDashboard(generic.TemplateView, LoginRequiredMixin):
    template_name = 'dashboards/ticket_dashboard.html'

    def get_context_data(self, **kwargs):
        context = super(TicketsDashboard, self).get_context_data(**kwargs)
        context.update({
            'ticket_states': TicketState.convert_choices_to_dict(),
            'ticket_priority': TicketPriorityChoices.convert_choices_to_dict()
        })

        return context


class ReactTest(generic.TemplateView, LoginRequiredMixin):
    template_name = 'dashboards/react_test.html'

    def get_context_data(self, **kwargs):
        context = super(ReactTest, self).get_context_data(**kwargs)
        context.update({
            'ticket_states': TicketState.convert_choices_to_dict(),
            'ticket_priority': TicketPriorityChoices.convert_choices_to_dict()
        })

        return context
