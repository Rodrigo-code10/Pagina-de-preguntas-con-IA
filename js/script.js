const MODEL = "gemini-2.0-flash"; // Modelo actualizado a 2.5
const API_KEY = "TU_API_KEY";  //AQUI CAMBIAR POR TU API_KEY
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function respuestaAPI(){
    const temas = [
        "tipos de granos y su tostado",
        "degustación y cata de café",
        "temperatura y tiempo de extracción",
        "uso de métodos para preparar café",
        "proporciones de café y agua"];

    const temaAleatorio = temas[Math.floor(Math.random() * temas.length)];

    const prompt = `En el contexto del café. Genera una pregunta de opción múltiple sobre el siguiente tema ${temaAleatorio}. Proporciona cuatro opciones de respuesta y señala cuál es la correcta.    
    Genera la pregunta y sus posibles respuestas en formato JSON como el siguiente ejemplo, asegurándote de que el resultado SÓLO contenga el objeto JSON y no texto adicional enseguida te doy dos ejemplos:  
    1. Sobre degustación y cata de café:
    {
    "question": "¿Cuál de los siguientes sentidos se considera más importante al realizar una cata de café?",
    "options": [
        "a) Vista",
        "b) Olfato",
        "c) Tacto",
        "d) Oído"
    ],
    "correct_answer": "b) Olfato",
    "explanation": "El olfato es fundamental en la cata de café, ya que permite percibir los aromas y matices que diferencian los distintos tipos de café."
    }
    2. Sobre temperatura y tiempo de extracción:
    {
    "question": "¿Cuál es la temperatura ideal del agua para preparar un espresso correctamente?",
    "options": [
        "a) 70-75°C",
        "b) 85-90°C",
        "c) 90-96°C",
        "d) 100°C"
    ],
    "correct_answer": "c) 90-96°C",
    "explanation": "La temperatura del agua entre 90 y 96°C permite extraer los compuestos del café de manera equilibrada, evitando sabores amargos o subextraídos."
    }
    `;

    try {
        const response = await fetch(
            url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    // Opcional: añadir la configuración de generación
                    generationConfig: {
                        temperature: 0.25,
                        responseMimeType: "application/json"
                    },
                }),
            }
        );
    
        // Manejo de errores de HTTP
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error HTTP ${response.status}: ${JSON.stringify(errorData)}`);
        }
    
        const data = await response.json();
        console.log("Respuesta transformada a json:", data);
    
        // Extracción simple del texto de la respuesta, asumiendo que la respuesta tiene al menos una 'candidate' y 'part'     
        const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
        const textResultTrimmed = textResult.trim();
        const firstBraceIndex = textResultTrimmed.indexOf('{');
        const lastBraceIndex = textResultTrimmed.lastIndexOf('}');
        const jsonString = textResultTrimmed.substring(firstBraceIndex, lastBraceIndex + 1);
    
        if (jsonString) {            
            const questionData = JSON.parse(jsonString);
            console.log(questionData);
            return questionData;
        } else {
            console.log("No se pudo extraer el texto de la respuesta.");
        }
    
    } catch (error) {
        console.error("Hubo un error en la petición:", error);
        document.getElementById('question').textContent = 'Error al cargar la pregunta. Por favor, revisa la clave API o la consola.';
        return null;
    }
}

//respuestaAPI();

async function cargarPregunta() {
    // Mostrar mensaje de carga
    document.getElementById('question').className = 'text-warning';
    document.getElementById('question').textContent = 'Cargando pregunta de Gemini...';
    document.getElementById('options').innerHTML = '';

    const datosPregunta = await respuestaAPI();
    console.log(datosPregunta);

    if (datosPregunta) {
        document.getElementById('question').className = 'text-success';
        console.log("Datos de la pregunta recibidos:", datosPregunta);
        desplegarPregunta(datosPregunta);
    }
}

function desplegarPregunta(datosPregunta){
    document.getElementById("question").innerHTML = datosPregunta.question;
    //document.getElementById("question").innerHTML = datosPregunta['question'];

    const opciones = document.getElementById("options");
    let v = 0;
    let f = 0;

    const ul = document.createElement("ul");
    ul.classList.add("list-unstyled");

        const l1 = document.createElement("li");
        const boton1 = document.createElement("button");
        boton1.classList.add("btn", "btn-light");
        boton1.innerHTML = datosPregunta.options[0];
        boton1.addEventListener("click", () => {
            if (datosPregunta.options[0] == datosPregunta.correct_answer) {
              boton1.classList.replace("btn-light", "btn-success");
              v=1;
            } else {
              boton1.classList.replace("btn-light", "btn-danger");
              f=1;
            }
            guardarPuntaje(v,f);
        });
        l1.appendChild(boton1);
        ul.appendChild(l1);

        const l2 = document.createElement("li");
        const boton2 = document.createElement("button");
        boton2.classList.add("btn", "btn-light");
        boton2.innerHTML = datosPregunta.options[1];
        boton2.addEventListener("click", () => {
            if (datosPregunta.options[1] == datosPregunta.correct_answer) {
              boton2.classList.replace("btn-light", "btn-success");
              v=1;
            } else {
              boton2.classList.replace("btn-light", "btn-danger");
              f=1;
            }
            guardarPuntaje(v,f);
        });
        l2.appendChild(boton2);
        ul.appendChild(l2);

        const l3 = document.createElement("li");
        const boton3 = document.createElement("button")
        boton3.classList.add("btn", "btn-light");
        boton3.innerHTML = datosPregunta.options[2];
        boton3.addEventListener("click", () => {
            if (datosPregunta.options[2] == datosPregunta.correct_answer) {
              boton3.classList.replace("btn-light", "btn-success");
              v=1;
            } else {
              boton3.classList.replace("btn-light", "btn-danger");
              f=1;
            }
            guardarPuntaje(v,f);
        });
        l3.appendChild(boton3);
        ul.appendChild(l3);

        const l4 = document.createElement("li");
        const boton4 = document.createElement("button");
        boton4.classList.add("btn", "btn-light");
        boton4.innerHTML = datosPregunta.options[3];
        boton4.addEventListener("click", () => {
            if (datosPregunta.options[3] == datosPregunta.correct_answer) {
              boton4.classList.replace("btn-light", "btn-success");
              v=1;
            } else {
              boton4.classList.replace("btn-light", "btn-danger");
              f=1;
            }
            guardarPuntaje(v,f);
        });
        l4.appendChild(boton4);
        ul.appendChild(l4);

    opciones.appendChild(ul);
}

function guardarPuntaje(correctas,incorrectas){
    let puntaje = JSON.parse(localStorage.getItem("score")) || {
        Correctas: 0,
        Incorrectas: 0
    };
    
    puntaje.Correctas += correctas;
    puntaje.Incorrectas += incorrectas;

    localStorage.setItem("score", JSON.stringify(puntaje));

    setTimeout(() => {
        window.onload ();
    }, 2000);
}   

function desplegarPuntajes(){
    const puntaje=JSON.parse(localStorage.getItem('score')) || {};
    const correctas = document.getElementById("correctas");
    const incorrectas = document.getElementById("incorrectas");

    correctas.innerHTML = puntaje.Correctas || 0;
    incorrectas.innerHTML = puntaje.Incorrectas || 0;
}

window.onload = () => {
    console.log("Página cargada y función inicial ejecutada.");
    desplegarPuntajes();
    cargarPregunta();    
};



