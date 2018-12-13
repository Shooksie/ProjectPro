from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from . import api_views

app_name = 'teams'
urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path('api/teams/', api_views.GetTeams.as_view(), name='all'),
    path('api/teams/update/', api_views.UpdateTeam.as_view(), name='update'),
]


# urlpatterns = format_suffix_patterns(urlpatterns)
