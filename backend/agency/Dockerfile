FROM python

WORKDIR /usr/src/app

COPY req.txt ./

RUN pip install -r req.txt

ENTRYPOINT python manage.py migrate && python manage.py makemigrations && python manage.py runserver 0.0.0.0:8000