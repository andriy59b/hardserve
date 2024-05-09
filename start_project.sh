#!/bin/bash

kill_process_on_port() {
    lsof -i tcp:$1 | awk 'NR!=1 {print $2}' | xargs kill -9
}

cd server

echo "Виконання міграцій Django..."
python manage.py migrate

echo "Запуск Django сервера..."
kill_process_on_port 8000
python manage.py runserver &
cd ..

cd client
echo "Запуск React додатку..."
kill_process_on_port 3000
npm start &
cd ..

wait