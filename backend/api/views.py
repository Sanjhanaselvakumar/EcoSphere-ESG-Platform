from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, mixins
from rest_framework.viewsets import GenericViewSet

from .models import (
    Department, Employee,
    EmissionFactor, EnvironmentalGoal, CarbonTransaction,
    Category, Badge, Reward, Challenge, ChallengeParticipation,
    CsrActivity, EmployeeParticipation,
    Audit, ComplianceIssue, EsgPolicy, PolicyAcknowledgement,
    DepartmentScore, ProductEsgProfile,
)
from .serializers import (
    DepartmentSerializer, EmployeeSerializer,
    EmissionFactorSerializer, EnvironmentalGoalSerializer, CarbonTransactionSerializer,
    CategorySerializer, BadgeSerializer, RewardSerializer, ChallengeSerializer, ChallengeParticipationSerializer,
    CsrActivitySerializer, EmployeeParticipationSerializer,
    AuditSerializer, ComplianceIssueSerializer, EsgPolicySerializer, PolicyAcknowledgementSerializer,
    DepartmentScoreSerializer, ProductEsgProfileSerializer,
)

# ── Health Check ──────────────────────────────────────────────────────────────

@api_view(['GET'])
def health_check(request):
    """
    Basic health check endpoint to verify backend is running and CORS is working.
    """
    return Response({
        "status": "ok",
        "message": "EcoSphere ESG Platform Backend is running."
    })

# ── Phase 1: Organization (Read-Only) ─────────────────────────────────────────

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only endpoint for listing and retrieving departments."""
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only endpoint for listing and retrieving employees."""
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# ── Phase 2: Environmental ────────────────────────────────────────────────────

class EmissionFactorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for emission factor reference data.
    """
    queryset = EmissionFactor.objects.all()
    serializer_class = EmissionFactorSerializer

class EnvironmentalGoalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for environmental goals set by management.
    """
    queryset = EnvironmentalGoal.objects.all()
    serializer_class = EnvironmentalGoalSerializer

class CarbonTransactionViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    CRUD endpoint for carbon emission transactions. Deletion excluded for audit trail.
    """
    queryset = CarbonTransaction.objects.all()
    serializer_class = CarbonTransactionSerializer

# ── Phase 3: Social & Engagement ──────────────────────────────────────────────

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for lookup categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for gamification badges.
    """
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class RewardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for redeemable rewards.
    """
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

class ChallengeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for lists of challenges.
    """
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer

class CsrActivityViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for listing CSR activities.
    """
    queryset = CsrActivity.objects.all()
    serializer_class = CsrActivitySerializer

class ChallengeParticipationViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    CRUD endpoint for challenge participation records (no DELETE to preserve logging history).
    """
    queryset = ChallengeParticipation.objects.all()
    serializer_class = ChallengeParticipationSerializer

class EmployeeParticipationViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    CRUD endpoint for employee CSR activity participation records (no DELETE to preserve logging history).
    """
    queryset = EmployeeParticipation.objects.all()
    serializer_class = EmployeeParticipationSerializer

# ── Final Phase: Governance ───────────────────────────────────────────────────

class AuditViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for listing and retrieving audits.
    """
    queryset = Audit.objects.all()
    serializer_class = AuditSerializer

class ComplianceIssueViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    CRUD endpoint for compliance issues (no DELETE to preserve audit history).
    """
    queryset = ComplianceIssue.objects.all()
    serializer_class = ComplianceIssueSerializer

class EsgPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for viewing ESG policies.
    """
    queryset = EsgPolicy.objects.all()
    serializer_class = EsgPolicySerializer

class PolicyAcknowledgementViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    """
    CRUD endpoint for policy acknowledgements (no DELETE to preserve logging history).
    """
    queryset = PolicyAcknowledgement.objects.all()
    serializer_class = PolicyAcknowledgementSerializer

# ── Final Phase: Reports ──────────────────────────────────────────────────────

class DepartmentScoreViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for department scorecard tracking.
    """
    queryset = DepartmentScore.objects.all()
    serializer_class = DepartmentScoreSerializer

class ProductEsgProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for product ESG scorecards.
    """
    queryset = ProductEsgProfile.objects.all()
    serializer_class = ProductEsgProfileSerializer
