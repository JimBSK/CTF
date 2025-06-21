from rest_framework import generics
from .models import Challenge
from .serializers import ChallengeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Submission
from rest_framework.views import APIView
from .serializers import SubmissionSerializer
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class ScoreboardView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.order_by('-score')

class ChallengeListCreateView(generics.ListCreateAPIView):
    queryset = Challenge.objects.filter(is_active=True)
    serializer_class = ChallengeSerializer

class ChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
class SubmitFlagView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        challenge_id = request.data.get('challenge_id')
        submitted_flag = request.data.get('flag')
        
        try:
            challenge = Challenge.objects.get(id=challenge_id)
            submission = Submission.objects.create(
                user=request.user,
                challenge=challenge,
                submitted_flag=submitted_flag,
                is_correct=(submitted_flag == challenge.flag)
            )
            
            if submission.is_correct:
                request.user.score += challenge.points
                request.user.save()
                
            return Response(SubmissionSerializer(submission).data)
            
        except Challenge.DoesNotExist:
            return Response({'error': 'Challenge not found'}, status=status.HTTP_404_NOT_FOUND)
        
