from django.conf import settings
from django.http import FileResponse, HttpResponse
from django.shortcuts import render
import os


def index(request):
    try:
        return render(request, 'index.html')
    except Exception:
        return HttpResponse(
            "Backend is running. Build the React app with `npm run build` in the frontend folder to serve this route.",
            content_type='text/plain',
            status=200,
        )


def load_icon(request):
    icon_path = os.path.join(settings.BASE_DIR, 'frontend/dist/icon.svg')
    if not os.path.exists(icon_path):
        icon_path = os.path.join(settings.BASE_DIR, 'frontend/public/favicon.svg')
    return FileResponse(open(icon_path, 'rb'), content_type='image/svg+xml')
