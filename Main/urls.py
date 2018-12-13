"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from graphene_django.views import GraphQLView

from teams.views import Home
from user.views import UserPage

urlpatterns = [
    path('teams/', include('teams.urls')),
    path('polls/', include('polls.urls')),
    path('projects/', include('projects.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^graphql', GraphQLView.as_view(graphiql=True)),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('base.urls')),
    path('home/', Home.as_view(), name='home'),
    path('user/', UserPage.as_view(), name='user')
]

