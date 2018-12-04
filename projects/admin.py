from django.contrib import admin

from .models import Project
from .models import ProjectBlocks
from .models import Block
from .models import Feature
from .models import Ticket
from .models import TicketBlock

from .forms import BlockModelForm
from .forms import ProjectModelForm
from .forms import FeatureModelForm
from .forms import TicketModelForm


class ProjectBlockInline(admin.StackedInline):
    model = ProjectBlocks
    extra = 3


class ProjectAdmin(admin.ModelAdmin):
    form = ProjectModelForm
    inlines = [ProjectBlockInline]
    list_display = ('project_name', 'project_description')


admin.site.register(Project, ProjectAdmin)


class TicketBlockInline(admin.StackedInline):
    model = TicketBlock
    extra = 3


class FeatureBlockInline(admin.StackedInline):
    model = ProjectBlocks
    extra = 3


class BlockAdmin(admin.ModelAdmin):
    form = BlockModelForm
    inlines = [TicketBlockInline, FeatureBlockInline]
    list_display = ('block_name', 'block_description')


admin.site.register(Block, BlockAdmin)


class TicketAdmin(admin.ModelAdmin):
    form = TicketModelForm
    list_display = ('ticket_name', 'ticket_priority')

admin.site.register(Ticket, TicketAdmin)
