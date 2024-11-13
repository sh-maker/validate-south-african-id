from rest_framework import serializers
from .models import IDInfo, PublicHoliday

class IDInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDInfo
        fields = '__all__'

class PublicHolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicHoliday
        fields = '__all__'
