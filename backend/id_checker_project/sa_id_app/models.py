from django.db import models

# table created IDInfo 
class IDInfo(models.Model):
    id_number = models.CharField(max_length=13, unique=True)
    birth_date = models.DateField()
    gender = models.CharField(max_length=10)
    citizenship = models.CharField(max_length=20)
    search_count = models.IntegerField(default=1)

# table created PublicHoliday 
class PublicHoliday(models.Model):
    id_info = models.ForeignKey(IDInfo, on_delete=models.CASCADE, related_name="holidays")
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    type = models.CharField(max_length=50)
