import json
from django.views import View
from django.http import HttpResponse


class APIView(View):

    def get(self, request, *args, **kwargs):
        return HttpResponse(json.dumps(self.get_request(request, *args, **kwargs)))

    def post(self, request, *args, **kwargs):
        return HttpResponse(json.dumps(self.post_request(request, *args, **kwargs)))

    def get_request(self, request, *args, **kwargs):
        return {}

    def post_request(self, request, *args, **kwargs):
        return {}
