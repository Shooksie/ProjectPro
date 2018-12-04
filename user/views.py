from django.views.generic import TemplateView


class UserPage(TemplateView):
    template_name = 'user/user-hompage.html'
