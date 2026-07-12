from django.db import models

class Audit(models.Model):
    audit_id = models.AutoField(primary_key=True)
    audit_name = models.CharField(max_length=100, blank=True, null=True)
    audit_date = models.DateField(blank=True, null=True)
    auditor = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, default='Scheduled', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'audit'

class Badge(models.Model):
    badge_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    unlock_rule = models.CharField(max_length=255, blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'badge'

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category'

class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=20, blank=True, null=True)
    head = models.CharField(max_length=100, blank=True, null=True)
    employee_count = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'department'

class EmissionFactor(models.Model):
    factor_id = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=100)
    unit = models.CharField(max_length=50, blank=True, null=True)
    emission_factor = models.DecimalField(max_digits=10, decimal_places=4)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'emissionfactor'

class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100, blank=True, null=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True, db_column='department_id', related_name='employees')
    xp = models.IntegerField(default=0, blank=True, null=True)
    points = models.IntegerField(default=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employee'

class CarbonTransaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True, db_column='department_id', related_name='carbon_transactions')
    factor = models.ForeignKey(EmissionFactor, models.DO_NOTHING, blank=True, null=True, db_column='factor_id', related_name='carbon_transactions')
    activity_name = models.CharField(max_length=100, blank=True, null=True)
    activity_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    carbon_emission = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    transaction_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'carbontransaction'

class Challenge(models.Model):
    challenge_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, blank=True, null=True, db_column='category_id', related_name='challenges')
    description = models.TextField(blank=True, null=True)
    xp = models.IntegerField(blank=True, null=True)
    difficulty = models.CharField(max_length=10, blank=True, null=True)
    evidence_required = models.BooleanField(default=True, blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, default='Draft', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'challenge'

class ChallengeParticipation(models.Model):
    challenge_participation_id = models.AutoField(primary_key=True)
    challenge = models.ForeignKey(Challenge, models.DO_NOTHING, blank=True, null=True, db_column='challenge_id', related_name='participations')
    employee = models.ForeignKey(Employee, models.DO_NOTHING, blank=True, null=True, db_column='employee_id', related_name='challenge_participations')
    progress = models.IntegerField(default=0, blank=True, null=True)
    proof = models.CharField(max_length=255, blank=True, null=True)
    approval = models.CharField(max_length=15, default='Pending', blank=True, null=True)
    xp_awarded = models.IntegerField(default=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'challengeparticipation'

class ComplianceIssue(models.Model):
    issue_id = models.AutoField(primary_key=True)
    audit = models.ForeignKey(Audit, models.DO_NOTHING, blank=True, null=True, db_column='audit_id', related_name='issues')
    severity = models.CharField(max_length=10, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    owner = models.CharField(max_length=100, blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=10, default='Open', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'complianceissue'

class CsrActivity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, blank=True, null=True, db_column='category_id', related_name='csr_activities')
    description = models.TextField(blank=True, null=True)
    activity_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, default='Upcoming', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'csractivity'

class DepartmentScore(models.Model):
    score_id = models.AutoField(primary_key=True)
    department = models.ForeignKey(Department, models.DO_NOTHING, blank=True, null=True, db_column='department_id', related_name='scores')
    environmental_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    social_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    governance_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    total_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'departmentscore'

class EmployeeParticipation(models.Model):
    participation_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, models.DO_NOTHING, blank=True, null=True, db_column='employee_id', related_name='csr_participations')
    activity = models.ForeignKey(CsrActivity, models.DO_NOTHING, blank=True, null=True, db_column='activity_id', related_name='participations')
    proof = models.CharField(max_length=255, blank=True, null=True)
    approval_status = models.CharField(max_length=15, default='Pending', blank=True, null=True)
    points_earned = models.IntegerField(default=0, blank=True, null=True)
    completion_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'employeeparticipation'

class EnvironmentalGoal(models.Model):
    goal_id = models.AutoField(primary_key=True)
    goal_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    target_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    target_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=15, default='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'environmentalgoal'

class EsgPolicy(models.Model):
    policy_id = models.AutoField(primary_key=True)
    policy_name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    effective_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=15, default='Active', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'esgpolicy'

class PolicyAcknowledgement(models.Model):
    acknowledgement_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, models.DO_NOTHING, blank=True, null=True, db_column='employee_id', related_name='policy_acknowledgements')
    policy = models.ForeignKey(EsgPolicy, models.DO_NOTHING, blank=True, null=True, db_column='policy_id', related_name='acknowledgements')
    acknowledgement_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=15, default='Pending', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policyacknowledgement'

class ProductEsgProfile(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    environmental_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    social_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    governance_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'productesgprofile'

class Reward(models.Model):
    reward_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    points_required = models.IntegerField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=15, default='Available', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reward'
