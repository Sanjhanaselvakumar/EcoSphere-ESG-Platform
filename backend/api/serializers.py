from rest_framework import serializers
from .models import (
    Department, Employee,
    EmissionFactor, EnvironmentalGoal, CarbonTransaction,
    Category, Badge, Reward, Challenge, ChallengeParticipation,
    CsrActivity, EmployeeParticipation,
    Audit, ComplianceIssue, EsgPolicy, PolicyAcknowledgement,
    DepartmentScore, ProductEsgProfile,
)

# ── Phase 1: Organization ─────────────────────────────────────────────────────

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

# ── Phase 2: Environmental ────────────────────────────────────────────────────

class EmissionFactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionFactor
        fields = '__all__'

class EnvironmentalGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalGoal
        fields = '__all__'

class CarbonTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonTransaction
        fields = '__all__'

    def validate_activity_amount(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError(
                "activity_amount must be a positive number."
            )
        return value

    def validate_carbon_emission(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError(
                "carbon_emission must be a positive number."
            )
        return value

# ── Phase 3: Social & Engagement ──────────────────────────────────────────────

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

    def validate_points_required(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("points_required cannot be negative.")
        return value

    def validate_stock(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("stock cannot be negative.")
        return value

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'

    def validate_xp(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("xp cannot be negative.")
        return value

class ChallengeParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeParticipation
        fields = '__all__'

    def validate_progress(self, value):
        if value is not None and (value < 0 or value > 100):
            raise serializers.ValidationError("progress must be between 0 and 100.")
        return value

    def validate_xp_awarded(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("xp_awarded cannot be negative.")
        return value

class CsrActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CsrActivity
        fields = '__all__'

class EmployeeParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeParticipation
        fields = '__all__'

    def validate_points_earned(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("points_earned cannot be negative.")
        return value

# ── Final Phase: Governance & Reports ─────────────────────────────────────────

class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audit
        fields = '__all__'

class ComplianceIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceIssue
        fields = '__all__'

class EsgPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = EsgPolicy
        fields = '__all__'

class PolicyAcknowledgementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyAcknowledgement
        fields = '__all__'

class DepartmentScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepartmentScore
        fields = '__all__'

class ProductEsgProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductEsgProfile
        fields = '__all__'
