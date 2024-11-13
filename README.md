PROJECT NAME - VALIDATE SOUTH AFRICA ID 

PROJECT DESCRIPTION - This project enables users to submit South African ID numbers, view details associated with those IDs, and display related holidays. It includes a Django backend for API management and a React frontend for the user interface.

--------------------------------------------------------------------------------------------------------------------------------
PROJECT OVERVIEW: 
The SA ID Checker project provides an interface for entering, viewing, and validating South African ID numbers. 

Users can:

    #Submit an ID number to see if it's valid.
    #View details associated with the ID (birth date, gender, citizenship).
    #Retrieve holiday details if any are associated with the ID.

-------------------------------------------------------------------------------------------------------------------------------
-TECHNOLOGIES USED:

    #Backend: Django, Django REST Framework
    #Frontend: React, fetch (for API requests)
    #Database: MYSQL (default, can be switched as needed)
    #Other: CORS (Cross-Origin Resource Sharing) setup for local development

-------------------------------------------------------------------------------------------------------------------------------
SETUP AND INSTALLATION

-Clone the repository:

    # git clone https://github.com/sh-maker/validate-south-african-id.git
    # cd validate-south-african-id

-Backend (Django)

    # change the directory using the command "cd backend\id_checker_project"
    # Install all the requirements required "pip install -r requirements.txt"
    # Apply Migrations:
        -> python manage.py makemigrations
        -> python manage.py migrate
    # Run the server using the command "python manage.py runserver"

-Frontend (React)

    # change the directory using the command "cd frontend\sa-id_checker"
    # Install npm using the command "npm install"
    # Run the server using the command "npm start"

-------------------------------------------------------------------------------------------------------------------------------
USAGE:

1-> Start both backend and frontend servers.
2-> Add an ID on the main page by entering the ID and clicking submit. This will display ID details and any holidays.
3-> View ID List on the /list route, where clicking on any ID redirects to detailed information.

-------------------------------------------------------------------------------------------------------------------------------
API DOCUMENTATION:

#POST API:

    -API URL: http://localhost:8000/api/id-info/
    -METHOD: POST
    -BODY: 
    {
    "id_number": "9001015009087"
    }

    -RESPONSE:
        {
            "id_info": 
            {
                "id": 26,
                "id_number": "9001015009087",
                "birth_date": "1990-01-01",
                "gender": "Male",
                "citizenship": "True",
                "search_count": 1
            },
            "holidays": [
                {
                    "id": 11,
                    "name": "New Year's Day",
                    "description": "New Year’s Day is celebrated with a blend of both diversity and tradition in countries such as South Africa on January 1 each year.",
                    "date": "1990-01-01",
                    "type": "National holiday",
                    "id_info": 26
                }
            ]
        }


#GET API

    -API URL: http://localhost:8000/api/id-info/9001015009087/
    -METHOD: GET
    
    -RESPONSE: 
        {
            "id_info": {
                "id": 26,
                "id_number": "9001015009087",
                "birth_date": "1990-01-01",
                "gender": "Male",
                "citizenship": "True",
                "search_count": 1
            },
            "holidays": [
                {
                    "id": 11,
                    "name": "New Year's Day",
                    "description": "New Year’s Day is celebrated with a blend of both diversity and tradition in countries such as South Africa on January 1 each year.",
                    "date": "1990-01-01",
                    "type": "National holiday",
                    "id_info": 26
                }
            ]
        }
                


#LIST API 

    -API URL: http://localhost:8000/api/list-info/
    -METHOD: GET
    
    -RESPONSE: 
        [
            {
                "id": 24,
                "id_number": "7508053088092",
                "birth_date": "1975-08-05",
                "gender": "Female",
                "citizenship": "True",
                "search_count": 1
            },
            {
                "id": 25,
                "id_number": "8505122158085",
                "birth_date": "1985-05-12",
                "gender": "Female",
                "citizenship": "True",
                "search_count": 1
            },
            {
                "id": 26,
                "id_number": "9001015009087",
                "birth_date": "1990-01-01",
                "gender": "Male",
                "citizenship": "True",
                "search_count": 1
            }
        ]

-------------------------------------------------------------------------------------------------------------------------------


