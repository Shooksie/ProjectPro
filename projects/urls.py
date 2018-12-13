from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from . import api_views

app_name = 'projects'
urlpatterns = [
    path('api/tickets/', api_views.GetTickets.as_view(), name='all'),
    path('api/tickets/meta/', api_views.FetchTickeApptMetaData.as_view(), name='ticket_meta'),
    path('api/tickets/edit/', api_views.UpdateTicket.as_view(), name='update_ticket'),
    path('/', views.TestDashboard.as_view(), name=''),
    path('tickets/', views.TicketsDashboard.as_view(), name='tickets'),
    path('react-test/', views.ReactTest.as_view(), name='tickets'),
]


# urlpatterns = format_suffix_patterns(urlpatterns)
