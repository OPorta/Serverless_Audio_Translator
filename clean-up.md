# Limpieza de los recursos creados

Una vez finalizada nuestro laboratorio, es mejor borrar nuestros recursos de AWS para evitar futuros cargos en nuestra cuenta de AWS.

## Eliminación lambdas

Iremos al servicio *AWS Lambda* y eliminaremos las lambdas que hemos creado:

* Lambda de transcripción de audio
* Lambda de envío de las transcripciones a SNS
* Lambda de traducción de transcripciones recibidas de SNS
* Lambda de guardado de transcripciones recibidas de SNS
* Lambda de consulta de transcripciones en DynamoDB

## Eliminación topic SNS

Iremos al servicio *Simple Notification Service* > *Temas* y eliminaremos el tema que hemos creado.

## Eliminación S3 Buckets

Iremos al servicio *S3* y eliminaremos los buckets que hemos creado:

* Bucket de audios
* Bucket de transcripciones
* Bucket de traducciones

## Eliminación tabla DynamoDB

Iremos al servicio *DynamoDB* > *Tablas* y eliminaremos la tabla que hemos creado.

## Eliminación API Gateway

Iremos al servicio *API Gateway* y eliminaremos la API que hemos creado.
