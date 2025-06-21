from django.urls import path
from .views import ChallengeListCreateView, ChallengeDetailView
from .views import SubmitFlagView

urlpatterns = [
    path('challenges/', ChallengeListCreateView.as_view(), name='challenge-list'),
    path('challenges/<int:pk>/', ChallengeDetailView.as_view(), name='challenge-detail'),
    path('submit/', SubmitFlagView.as_view(), name='submit-flag'),
]