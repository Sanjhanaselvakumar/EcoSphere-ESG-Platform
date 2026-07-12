from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def health_check(request):
    """
    Basic health check endpoint to verify backend is running and CORS is working.
    """
    return Response({
        "status": "ok",
        "message": "EcoSphere ESG Platform Backend is running."
    })
