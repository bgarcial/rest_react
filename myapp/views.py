from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
import random
# Create your views here.

# solo recibe request GET
# retornamos una lista de numeros al front end
@api_view(['GET'])
def random_number(request):
    number = request.query_params.get('number', None)
    # Con None me devuelve el error, sirve para manejarlo mediante la
    # siguiente excepción, en caso de que tomemos un dato equivocado

    if number is None:
        raise ValidationError('I need a number')
    try:
        number = int(number)
    except ValueError:
        raise ValidationError("Not a number")

    if not (0 <= number <= 100):
        raise ValidationError('Enter number 0 - 100 range')




    return Response([ {'rnd' : random.random(), 'i': [i]} for i in range(number)])
    #list comprehensions to random number generate


#@api_view(['GET'])
