from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import traceback
from django.conf import settings
import os

from .model_utils import predict_parkinsons, predict_spiral


@csrf_exempt
def predict_api_view(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        temp_path = default_storage.save('temp_' + image_file.name, image_file)
        full_path = os.path.join(default_storage.location, temp_path)

        try:
            result = predict_parkinsons(full_path)
            return JsonResponse(result, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        finally:
            if os.path.exists(full_path):
                os.remove(full_path)
    return JsonResponse({'error': 'Please send a POST request with an image.'}, status=400)

@csrf_exempt
def predict_spiral_api_view(request):
    try:
        img_file = request.FILES.get('image')
        if not img_file:
            return JsonResponse({'error': 'No image uploaded'}, status=400)

        img_path = os.path.join(settings.MEDIA_ROOT, img_file.name)
        with open(img_path, 'wb+') as f:
            for chunk in img_file.chunks():
                f.write(chunk)

        result = predict_spiral(img_path)
        return JsonResponse(result)

    except Exception as e:
        print("❌ Error in /predict/spiral/:", e)
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)