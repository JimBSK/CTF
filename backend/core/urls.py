from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('/adminpanel/admin/', admin.site.urls),
    path('/adminpanel/api/', include('ctf.urls')), 
    path('/adminpanel/api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/adminpanel/api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
