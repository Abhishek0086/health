from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .services import gemini_service

@csrf_exempt
@require_http_methods(["POST"])
def generate_response(request):
    try:
        # Parse incoming JSON data
        data = json.loads(request.body)
        message = data.get('message', '')

        # Generate AI response
        response_text = gemini_service.generate_response(message)

        return JsonResponse({
            'response': response_text
        })
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=400)
