from django.conf.urls import url
from myapp import views
from django.views.generic.base import TemplateView
#from .views

urlpatterns = [
    url(r'^random/', views.random_number, name='random'),
    url(r'^', TemplateView.as_view(template_name='myapp/index.html'))
]
