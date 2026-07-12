from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Department, Employee
from .serializers import DepartmentSerializer, EmployeeSerializer

@api_view(['GET'])
def health_check(request):
    """
    Basic health check endpoint to verify backend is running and CORS is working.
    """
    return Response({
        "status": "ok",
        "message": "EcoSphere ESG Platform Backend is running."
    })

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only API endpoint that allows departments to be viewed.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only API endpoint that allows employees to be viewed.
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
