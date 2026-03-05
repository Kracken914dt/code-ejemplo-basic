// Elementos del DOM
const mensajeInput = document.getElementById('mensaje');
const desplazamientoInput = document.getElementById('desplazamiento');
const resultadoDiv = document.getElementById('resultado');
const cifrarBtn = document.getElementById('cifrarBtn');
const descifrarBtn = document.getElementById('descifrarBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const copiarBtn = document.getElementById('copiarBtn');


function cifradoCesar(texto, desplazamiento, descifrar = false) {
    if (descifrar) {
        desplazamiento = -desplazamiento;
    }
    
    let resultado = '';
    
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        
 
        if (char >= 'A' && char <= 'Z') {
            let codigo = ((char.charCodeAt(0) - 65 + desplazamiento + 26) % 26) + 65;
            resultado += String.fromCharCode(codigo);
        }

        else if (char >= 'a' && char <= 'z') {
            let codigo = ((char.charCodeAt(0) - 97 + desplazamiento + 26) % 26) + 97;
            resultado += String.fromCharCode(codigo);
        }
        
        else {
            resultado += char;
        }
    }
    
    return resultado;
}

// Función para validar la entrada
function validarEntrada() {
    const mensaje = mensajeInput.value.trim();
    const desplazamiento = parseInt(desplazamientoInput.value);
    
    if (!mensaje) {
        mostrarResultado('⚠️ Por favor, escribe un mensaje', false);
        return null;
    }
    
    if (isNaN(desplazamiento) || desplazamiento < 1 || desplazamiento > 25) {
        mostrarResultado('⚠️ El desplazamiento debe estar entre 1 y 25', false);
        return null;
    }
    
    return { mensaje, desplazamiento };
}

// Función para mostrar el resultado
function mostrarResultado(texto, exito = true) {
    resultadoDiv.textContent = texto;
    
    if (exito) {
        resultadoDiv.classList.add('success');
        setTimeout(() => {
            resultadoDiv.classList.remove('success');
        }, 500);
    }
}

// Event Listeners
cifrarBtn.addEventListener('click', () => {
    const datos = validarEntrada();
    if (datos) {
        const textoCifrado = cifradoCesar(datos.mensaje, datos.desplazamiento);
        mostrarResultado(textoCifrado);
    }
});

descifrarBtn.addEventListener('click', () => {
    const datos = validarEntrada();
    if (datos) {
        const textoDescifrado = cifradoCesar(datos.mensaje, datos.desplazamiento, true);
        mostrarResultado(textoDescifrado);
    }
});

limpiarBtn.addEventListener('click', () => {
    mensajeInput.value = '';
    resultadoDiv.textContent = '';
    desplazamientoInput.value = 3;
    mensajeInput.focus();
});

copiarBtn.addEventListener('click', () => {
    const texto = resultadoDiv.textContent;
    
    if (!texto || texto.startsWith('⚠️')) {
        mostrarResultado('⚠️ No hay nada que copiar', false);
        return;
    }
    
    navigator.clipboard.writeText(texto).then(() => {
        const originalText = copiarBtn.textContent;
        copiarBtn.textContent = '✓ Copiado!';
        copiarBtn.style.background = '#2e7d32';
        
        setTimeout(() => {
            copiarBtn.textContent = originalText;
            copiarBtn.style.background = '#4caf50';
        }, 2000);
    }).catch(err => {
        mostrarResultado('❌ Error al copiar', false);
    });
});

// Permitir cifrar con Enter
mensajeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        cifrarBtn.click();
    }
});

// Validar rango de desplazamiento en tiempo real
desplazamientoInput.addEventListener('input', () => {
    let valor = parseInt(desplazamientoInput.value);
    if (valor > 25) desplazamientoInput.value = 25;
    if (valor < 1) desplazamientoInput.value = 1;
});

// Mensaje de bienvenida
console.log('%c🔐 Cifrador César activado', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('Creado con HTML, CSS y JavaScript');
