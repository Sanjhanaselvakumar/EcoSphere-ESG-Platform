from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Phase 1: Organization
router.register(r'v1/users/departments', views.DepartmentViewSet, basename='department')
router.register(r'v1/users/employees', views.EmployeeViewSet, basename='employee')

# Phase 2: Environmental
router.register(r'v1/environmental/emission-factors', views.EmissionFactorViewSet, basename='emissionfactor')
router.register(r'v1/environmental/goals', views.EnvironmentalGoalViewSet, basename='environmentalgoal')
router.register(r'v1/environmental/carbon-transactions', views.CarbonTransactionViewSet, basename='carbontransaction')

# Phase 3: Social & Engagement
router.register(r'v1/social/categories', views.CategoryViewSet, basename='category')
router.register(r'v1/social/badges', views.BadgeViewSet, basename='badge')
router.register(r'v1/social/rewards', views.RewardViewSet, basename='reward')
router.register(r'v1/social/challenges', views.ChallengeViewSet, basename='challenge')
router.register(r'v1/social/challenge-participations', views.ChallengeParticipationViewSet, basename='challengeparticipation')
router.register(r'v1/social/csr-activities', views.CsrActivityViewSet, basename='csractivity')
router.register(r'v1/social/csr-participations', views.EmployeeParticipationViewSet, basename='csrparticipation')

# Final Phase: Governance
router.register(r'v1/governance/audits', views.AuditViewSet, basename='audit')
router.register(r'v1/governance/compliance-issues', views.ComplianceIssueViewSet, basename='complianceissue')
router.register(r'v1/governance/policies', views.EsgPolicyViewSet, basename='esgpolicy')
router.register(r'v1/governance/policy-acknowledgements', views.PolicyAcknowledgementViewSet, basename='policyacknowledgement')

# Final Phase: Reports
router.register(r'v1/reports/department-scores', views.DepartmentScoreViewSet, basename='departmentscore')
router.register(r'v1/reports/product-profiles', views.ProductEsgProfileViewSet, basename='productesgprofile')

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('', include(router.urls)),
]
