from django.conf import settings


def account_options(request):
    return {
        "google_login_enabled": bool(
            settings.GOOGLE_CLIENT_ID and settings.GOOGLE_CLIENT_SECRET
        )
    }
