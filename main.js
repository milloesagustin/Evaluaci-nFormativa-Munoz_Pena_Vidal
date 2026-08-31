document.addEventListener('DOMContentLoaded', () => {
    
    const formRegistro = document.getElementById('registroForm');
    const correosRegistrados = ['agu.pena@duocuc.cl', 'igna.munozo@duocuc.cl', 'oli.vidal@duocuc.cl']; 

    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            limpiarErrores(); 

            if (validarFormulario()) {
                const correoNuevo = document.getElementById('correo').value.trim();
                correosRegistrados.push(correoNuevo);
                
                alert("¡Registro exitoso en ZONALIBROS! Ya puedes iniciar sesión.");
                formRegistro.reset(); 
            }
        });
    }

    function validarFormulario() {
        let esValido = true;
        
        //Validar Nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre === '' || nombre.length > 100 || !esSoloTexto(nombre)) {
            mostrarError('errorNombre', 'Obligatorio: Solo letras y máximo 100 caracteres.');
            esValido = false;
        }

        //Validación de Correo
        const correo = document.getElementById('correo').value.trim();
        if (correo === '' || correo.length > 60 || !correo.includes('@') || !correo.includes('.')) {
            mostrarError('errorCorreo', 'Debes ingresar un correo válido (debe contener @ y un punto).');
            esValido = false;
        } else if (correosRegistrados.includes(correo)) {
            mostrarError('errorCorreo', 'Este correo ya se encuentra registrado en el sistema.');
            esValido = false;
        }

        //Validación de Contraseña
        const password = document.getElementById('password').value;
        if (!esPasswordSegura(password)) {
            mostrarError('errorPassword', 'Debe tener mínimo 10 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (@#$%).');
            esValido = false;
        }

        //Confirmación de Contraseña
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword || confirmPassword === '') {
            mostrarError('errorConfirmPassword', 'Las contraseñas no coinciden.');
            esValido = false;
        }

        //Validación de Teléfono
        const telefono = document.getElementById('telefono').value.trim();
        if (telefono !== '' && !esSoloNumeros(telefono)) {
            mostrarError('errorTelefono', 'Si ingresas un teléfono, debe contener solo números.');
            esValido = false;
        }

        //Validación de Género Favorito
        const generosSeleccionados = document.querySelectorAll('input[name="genero"]:checked');
        if (generosSeleccionados.length === 0) {
            mostrarError('errorGenero', 'Debes seleccionar al menos un género favorito.');
            esValido = false;
        }

        return esValido;
    }

    //Funciones AUX

    function esSoloTexto(texto) {
        // Definimos qué caracteres son válidos
        const permitidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ ";
        for (let i = 0; i < texto.length; i++) {
            if (!permitidos.includes(texto[i])) {
                return false; // Si encuentra un carácter raro, falla inmediatamente
            }
        }
        return true;
    }

    function esSoloNumeros(texto) {
        const numeros = "0123456789";
        for (let i = 0; i < texto.length; i++) {
            if (!numeros.includes(texto[i])) {
                return false;
            }
        }
        return true;
    }

    function esPasswordSegura(password) {
        // Validamos el largo mínimo
        if (password.length < 10) return false;

        let tieneMayuscula = false;
        let tieneMinuscula = false;
        let tieneNumero = false;
        let tieneEspecial = false;
        const caracteresEspeciales = "@#$%"; 

        // Revisamos letra por letra usando el ciclo for
        for (let i = 0; i < password.length; i++) {
            let letra = password[i];

            if (letra >= 'A' && letra <= 'Z') {
                tieneMayuscula = true;
            } else if (letra >= 'a' && letra <= 'z') {
                tieneMinuscula = true;
            } else if (letra >= '0' && letra <= '9') {
                tieneNumero = true;
            } else if (caracteresEspeciales.includes(letra)) {
                tieneEspecial = true;
            }
        }

        // Retorna verdadero solo si TODAS las condiciones se cumplieron
        return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
    }

    // --- FUNCIONES DE INTERFAZ ---

    function mostrarError(idElemento, mensaje) {
        const spanError = document.getElementById(idElemento);
        if (spanError) {
            spanError.textContent = mensaje;
            spanError.style.display = 'block';
            spanError.style.color = 'red'; 
        }
    }

    function limpiarErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
});