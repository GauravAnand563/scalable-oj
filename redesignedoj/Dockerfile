FROM python:3.10.4-buster

WORKDIR /usr/src/app

COPY . .

RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python3 manage.py migrate
RUN python3 manage.py makemigrations
RUN python3 manage.py loaddata initial_data.json
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

