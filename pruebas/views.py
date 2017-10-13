from django.http import HttpResponse
from django.shortcuts import render

def primer_mensaje(request):
    return HttpResponse('Primer mensaje')

def mensaje_html(request):
    return render(request, 'index.html', {
        'valor_dinamico': request.GET.get('nombre'),
        'valor_fijo': 'Este es un valor fijo'
    })

def boots_html(request):
    return render(request, 'grid_ajax_ep.html', {})
