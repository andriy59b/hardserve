from django.shortcuts import render
from django.http import JsonResponse
from openai import OpenAI
from .models import *

def query_openai(request):
    if request.method == 'GET':
        prompt = request.GET.get('prompt', '')

        client = OpenAI(
            base_url = "https://integrate.api.nvidia.com/v1",
            api_key = "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"
        )

        completion = client.chat.completions.create(
            model="meta/llama3-70b-instruct",
            messages=[
                {"role":"system","content":"You are a helpful assistant that specializes in discussing products, rations, ingredients, and related topics. You can provide information, answer questions, and offer suggestions. You do not answer on other topics. Here`s more inforamtion about user - {user}, he`s favorite products are {products}, favorite recipes are {recipes} and his weight history is {weight_history}"},
                {"role":"user","content": prompt}
            ],
            temperature=0.5,
            top_p=1,
            max_tokens=1024,
            stream=True
        )

        response_text = ''
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                response_text += chunk.choices[0].delta.content

        return JsonResponse({'response': response_text})
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)