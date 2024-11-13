from django.urls import path
from .views import IDInfoView, IDInfoListView

urlpatterns = [
    path('id-info/', IDInfoView.as_view(), name='id-info-create'),
    path('id-info/<str:id_number>/', IDInfoView.as_view(), name='id-info-detail'),
    path('list-info/', IDInfoListView.as_view(), name='id-info-list'),
]
