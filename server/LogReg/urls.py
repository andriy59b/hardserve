from django.urls import path, include
from .views import UserRegistrationView, LoginView, PasswordResetRequestView, PasswordResetConfirmView, GoogleAuthRedirect, GoogleRedirectURIView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path("google-signup/", GoogleAuthRedirect.as_view()),
    path("google-signup/callback/", GoogleRedirectURIView.as_view(),   name='google-signup-callback')
]