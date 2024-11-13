from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import IDInfo, PublicHoliday
from .serializers import IDInfoSerializer, PublicHolidaySerializer
import requests
from datetime import datetime, date

# Validate Checksum for Luhn Algorithm
def validate_checksum(id_number):
    reversed_digits = list(map(int, reversed(id_number)))  
    total = 0

    for i, digit in enumerate(reversed_digits):
        if i % 2 == 1:  
            digit *= 2
            if digit > 9:
                digit -= 9  
        total += digit  

    if total % 10 == 8 or total % 10 == 9:
        return True, "Valid ID number"
    else:
        return False, "Invalid checksum in ID number"

# Validate South African ID and fetch date of birth, gender and citizenship
def validate_sa_id(id_number):
    if len(id_number) != 13 or not id_number.isdigit():  
        return False, {"error": "Invalid ID number."}

    if not validate_checksum(id_number):
        return False, {"error": "Invalid checksum in ID number."}

    try:
        year = int(id_number[0:2])
        month = int(id_number[2:4])
        day = int(id_number[4:6])

        if year > 22:  
            birth_year = 1900 + year
        else:
            birth_year = 2000 + year

        gender_digit = int(id_number[6:10])
        gender = "Male" if gender_digit >= 5000 else "Female"

        is_citizen = id_number[10] == "0" 

        birth_date = date(birth_year, month, day) 

        return True, {
            "date_of_birth": birth_date,
            "gender": gender,
            "is_citizen": is_citizen
        }
    except ValueError:
        return False, {"error": "Invalid date in ID number."}

# calendar API to fetch public holidays
def get_public_holidays(year):
    # API_KEY = 'rNk1ri6Zw3XPf151cZpOdb4bwEszJPlQ'
    API_KEY = 'YOUR_API_KEY'
    url = f"https://calendarific.com/api/v2/holidays?&api_key={API_KEY}&country=ZA&year={year}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json().get('response', {}).get('holidays', [])
    else:
        return []
    
class IDInfoView(APIView):
    # POST API for inserting data in database
    def post(self, request):
        id_number = request.data.get('id_number')
        is_valid, decoded_data = validate_sa_id(id_number)
        if not is_valid:
            return Response({"error": decoded_data["error"]}, status=status.HTTP_400_BAD_REQUEST)

        # saving in IDInfo database
        id_info, created = IDInfo.objects.get_or_create(
            id_number=id_number,
            defaults={
                "birth_date": decoded_data["date_of_birth"],
                "gender": decoded_data["gender"],
                "citizenship": decoded_data["is_citizen"]
            }
        )
        if not created:
            id_info.search_count += 1
            id_info.save()

        holidays = get_public_holidays(decoded_data["date_of_birth"].year)
        for holiday in holidays:
            holiday_date = holiday["date"]["iso"]
            try:
                holiday_date_parsed = datetime.strptime(holiday_date, "%Y-%m-%dT%H:%M:%S%z").date()
            except ValueError:
                holiday_date_parsed = datetime.strptime(holiday_date, "%Y-%m-%d").date()

            # saving in PublicHoliday database           
            if holiday_date_parsed == id_info.birth_date:
                PublicHoliday.objects.get_or_create(
                    id_info=id_info,
                    name=holiday["name"],
                    description=holiday["description"],
                    date=holiday_date_parsed,
                    type=holiday["type"][0]
                )

        id_info_serializer = IDInfoSerializer(id_info)
        holiday_serializer = PublicHolidaySerializer(id_info.holidays.all(), many=True)
        return Response({"id_info": id_info_serializer.data, "holidays": holiday_serializer.data})

    # GET API for particular id number
    def get(self, request, id_number):
        id_info = get_object_or_404(IDInfo, id_number=id_number)
        id_info_serializer = IDInfoSerializer(id_info)
        holiday_serializer = PublicHolidaySerializer(id_info.holidays.all(), many=True)
        return Response({"id_info": id_info_serializer.data, "holidays": holiday_serializer.data})

# LIST API for listing all id numbers
class IDInfoListView(APIView):
    def get(self, request):
        id_info_list = IDInfo.objects.all()
        id_info_serializer = IDInfoSerializer(id_info_list, many=True)
        return Response(id_info_serializer.data, status=status.HTTP_200_OK)