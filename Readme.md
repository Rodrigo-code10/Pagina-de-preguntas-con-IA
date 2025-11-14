# Quiz de Café con Gemini API

Este proyecto es un **quiz interactivo sobre café** que genera preguntas de opción múltiple de manera dinámica usando la **API de Google Gemini**. Cada pregunta se centra en temas relacionados con el café, como tipos de granos, cata, temperatura de extracción, métodos de preparación y proporciones de café y agua.


## Tecnologías usadas

- **JavaScript** 
- **HTML/CSS**
- **Bootstrap** 
- **API de Google Gemini** (`gemini-2.0-flash`)

## API_KEY
Este proyecto es solo **para fines educativos**, por lo que cada usuario debe usar **su propia API Key** de Google Gemini, por lo que al abrir el archivo ***script.js*** debes:

```JavaScript
const API_KEY = "TU_API_KEY";  // Reemplaza por tu propia clave de Google Gemini
```

## Funcionamiento

1. Al cargar la página, se genera una pregunta aleatoria sobre café.
2. La pregunta se obtiene mediante la API de Gemini usando un fetch POST.
3. Cada respuesta correcta se marca en verde, la incorrecta en rojo.
4. Los puntajes se guardan en localStorage, para mantener el conteo de respuestas correctas e incorrectas.
5. Los temas cubiertos incluyen:
    - Tipos de granos y su tostado
    - Degustación y cata de café
    - Temperatura y tiempo de extracción
    - Uso de métodos para preparar café
    - Proporciones de café y agua

## Ejemplo de respuesta de la API

La API devuelve un JSON con la pregunta, opciones y la respuesta correcta:

```json
{
  "question": "¿Cuál es la temperatura ideal del agua para preparar un espresso correctamente?",
  "options": [
      "a) 70-75°C",
      "b) 85-90°C",
      "c) 90-96°C",
      "d) 100°C"
  ],
  "correct_answer": "c) 90-96°C",
  "explanation": "La temperatura del agua entre 90 y 96°C permite extraer los compuestos del café de manera equilibrada."
}

