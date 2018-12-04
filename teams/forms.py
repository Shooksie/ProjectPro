from django import forms
from .models import Team


class TeamModelForm(forms.ModelForm):
    team_description = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Team
        fields = '__all__'

