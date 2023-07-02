from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import BookSerializer
from .models import Book
import os
from PIL import Image
from django.conf import settings
from django.http import JsonResponse
from .ml_utils import predicttext
import logging


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def create(self, request, *args, **kwargs):
        cover = request.data['cover']
        title = request.data['title']
        Book.objects.create(title=title, cover=cover)
        
        # Perform any additional logic or computations here
        result=predicttext("path")

        return JsonResponse({"result": result}, status=201)

    

    
