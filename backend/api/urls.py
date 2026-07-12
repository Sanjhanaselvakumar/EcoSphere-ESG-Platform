from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet, basename='department')
router.register(r'employees', views.EmployeeViewSet, basename='employee')

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('v1/users/', include(router.urls)),
]
