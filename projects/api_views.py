from base.api_views import APIView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Ticket
from .forms import TicketModelForm
from .constants import TicketState, TicketPriorityChoices

class GetTickets(LoginRequiredMixin, APIView):
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
        tickets = [{
            'name': ticket.ticket_name,
            'description': ticket.ticket_description,
            'priority': ticket.ticket_priority,
            'status': ticket.ticket_state,
            'available_states': TicketState.convert_choices_to_dict()[ticket.ticket_state],
            'id': ticket.id

        } for ticket in Ticket.objects.all()]
        return tickets


class UpdateTicket(LoginRequiredMixin, APIView):
    def post_request(self, request, *args, **kwargs):
        created = bool(request.POST.get('id'))
        if created:
            form = TicketModelForm(request.POST, instance=Ticket.objects.get(id=int(request.POST.get('id'))))
        else:
            x = {
                'ticket_name': request.POST.get('ticket_name'),
                'ticket_description': request.POST.get('ticket_description'),
                'ticket_priority': int(request.POST.get('ticket_priority')),
                'ticket_state': int(request.POST.get('ticket_state')),
            }
            form = TicketModelForm(x)

        if form.is_valid():

            if created:
                model = form.save()
            else:
                model = Ticket(ticket_name=form.cleaned_data['ticket_name'],
                               ticket_description=form.cleaned_data['ticket_description'],
                               ticket_priority=form.cleaned_data['ticket_priority'],
                               ticket_state=form.cleaned_data['ticket_state'])
                model.save(force_insert=True)

            return {'success': 'ticket updated',
                    'created': not created,
                    'ticket': {'name': model.ticket_name,
                               'description': model.ticket_description,
                               'priority': model.ticket_priority,
                               'id': model.id,
                               'status': model.ticket_state
                               }}
        else:
            return {'status': 400}


class FetchTickeApptMetaData(LoginRequiredMixin, APIView):
    def get_request(self, request, *args, **kwargs):
        return {'ticket_states': TicketState.convert_choices_to_dict(),
                'ticket_state_paths': TicketState.STATE_PATHS,
                'ticket_priorities': TicketPriorityChoices.convert_choices_to_dict()}
