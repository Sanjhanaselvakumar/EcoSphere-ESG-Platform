from django.contrib import admin
from .models import (
    Audit, Badge, CarbonTransaction, Category, Challenge,
    ChallengeParticipation, ComplianceIssue, CsrActivity,
    Department, DepartmentScore, EmissionFactor, Employee,
    EmployeeParticipation, EnvironmentalGoal, EsgPolicy,
    PolicyAcknowledgement, ProductEsgProfile, Reward,
)

admin.site.register(Audit)
admin.site.register(Badge)
admin.site.register(CarbonTransaction)
admin.site.register(Category)
admin.site.register(Challenge)
admin.site.register(ChallengeParticipation)
admin.site.register(ComplianceIssue)
admin.site.register(CsrActivity)
admin.site.register(Department)
admin.site.register(DepartmentScore)
admin.site.register(EmissionFactor)
admin.site.register(Employee)
admin.site.register(EmployeeParticipation)
admin.site.register(EnvironmentalGoal)
admin.site.register(EsgPolicy)
admin.site.register(PolicyAcknowledgement)
admin.site.register(ProductEsgProfile)
admin.site.register(Reward)
