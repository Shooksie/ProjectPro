from django import forms
from .models import Project
from .models import Block
from .models import Ticket
from .models import Feature


class ProjectModelForm(forms.ModelForm):
    project_description = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Project
        fields = '__all__'


class BlockModelForm(forms.ModelForm):
    block_description = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Block
        fields = '__all__'


class TicketModelForm(forms.ModelForm):
    ticket_description = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Ticket
        fields = '__all__'


class FeatureModelForm(forms.ModelForm):
    feature_description = forms.CharField(widget=forms.Textarea)
    business_value = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Feature
        fields = '__all__'
