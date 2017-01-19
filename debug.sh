cd frontend && watchify ./bundle.js -v -o ../rest_react/static/frontend/bundle.js -t [ babelify --presets es2015,react] &
python manage.py runserver
