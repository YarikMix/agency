#!/bin/bash -x

python manage.py migrate
python manage.py makemigrations

exec "$@"