from django.contrib import admin
from .models import Problem, Testcase, Tag
# Register your models here.
admin.site.register(Problem)
admin.site.register(Testcase)
admin.site.register(Tag)