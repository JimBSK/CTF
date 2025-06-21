from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class Challenge(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web'),
        ('crypto', 'Cryptography'),
        ('forensics', 'Forensics'),
        ('pwn', 'Pwn'),
        ('rev', 'Reverse Engineering'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    flag = models.CharField(max_length=100)
    points = models.IntegerField(default=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.category})"

class User(AbstractUser):
    score = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name="ctf_user_set",
        related_query_name="ctf_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="ctf_user_set",
        related_query_name="ctf_user",
    )

    class Meta:
        db_table = 'ctf_user'

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    submitted_flag = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

class Achievement(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')