# Send transcription to SNS

En este apartado crearemos el *topic* de *SNS* dónde enviaremos las transcripciones y la lambda encargada de enviar dichas transcripciones cada vez que se crean en nuestro repositorio *S3*.

![Transcribe audio diagram](C:/Users/oriol/Documents/GitHub/Serverless_Audio_Translator/documentation-images/Serverless_Audio_Translator_part2.png)



## Creación del topic de SNS

> Pendiente de construcción...
>

## Creación de la lambda

Para hacerlo, iremos a la página del servicio *AWS Lambda* y pulsaremos el botón "Crear un función".

Igual que en el capítulo anterior, seleccionaremos la opción "Crear desde cero", daremos nombre a nuestra función, seleccionaremos Node.js 12.x cómo lenguaje de ejecución y seleccionaremos la opción de "Creación de un nuevo rol con permisos básicos de Lambda".

![Create Lambda - part 1](C:/Users/oriol/Documents/GitHub/Serverless_Audio_Translator/documentation-images/create_lambda_generic.png)

Una vez creada, eliminaremos el código de la función y lo reemplazaremos por el siguiente [código](./audio-translator-send-transcription-to-sns.js) que se encargará de obtener la transcripción del repositorio S3, obtener el texto completo de la transcripción y enviarlo al topic de SNS. Justo debajo del editor de código, hay una opción para editar las variables de entorno. Para que nuestra lambda funcione necesitaremos crear una variable de entorno:

| Clave            | Valor                   |
| ---------------- | ----------------------- |
| OUTPUT_SNS_TOPIC | \<Arn del topic de SNS> |

Para todas las demás opciones de configuración, nos quedamos con las dadas por defecto.

A continuación, añadiremos un desencadenador para nuestra lambda. Seleccionaremos la opción de *S3*, nuestro repositorio de transcripciones y dejaremos seleccionado el tipo de evento "Todos los eventos de creación de objetos".

![Create lambda - part 3](C:/Users/oriol/Documents/GitHub/Serverless_Audio_Translator/documentation-images/create_lambda_trigger_2.png)

Por último nos queda acabar de configurar el rol de ejecución de la lambda para que permita obtener objetos del repositorio S3 y enviar mensajes al topic de SNS. Para hacerlo, iremos a la pestaña de permisos y editaremos el rol de ejecución que nos aparezca.

Una vez en el editor del rol pulsaremos en el botón "Añadir una política insertada".

![Create lambda - part 5](C:/Users/oriol/Documents/GitHub/Serverless_Audio_Translator/documentation-images/edit_lambda_role.png)

En la nueva política que estamos creando añadiremos los siguientes permisos en el editor JSON. Nótese que no estamos definiendo a qué recursos exactos podemos ejecutar dichas acciones para simplificar la guía.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "sns:Publish"
            ],
            "Resource": "*"
        }
    ]
}
```

Ahora ya deberíamos poder ejecutar nuestra lambda sin problemas. Para hacer la prueba, subiremos un nuevo audio a nuestro repositorio de audios, veremos que aparece la transcripción en el repositorio de transcripciones y validaremos que el mensaje se ha enviado al topic de SNS.

## Consulta de mensajes en SNS

> Pendiente de construcción...
>

## Monitorización

Podéis validar que la lambda se está ejecutando cada vez que subáis un audio en el repositorio S3 revisando la pestaña de monitorización. Incluso podéis ver los logs de la ejecución pulsando en "Ver los registros de CloudWatch". Tened en cuenta que si la lambda no se ha llegado a ejecutar nunca, no se va a encontrar ningún log.

![Create lambda - part 5](C:/Users/oriol/Documents/GitHub/Serverless_Audio_Translator/documentation-images/lambda_monitorization.png)



---

Capítulo anterior: [Transcripción de audio](./02-translate-transcription-from-sns/guide.md)

Capítulo siguiente: [Traducción de transcripciones consumidas de SNS](./02-translate-transcription-from-sns/guide.md)

