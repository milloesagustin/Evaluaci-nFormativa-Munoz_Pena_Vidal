document.addEventListener('DOMContentLoaded', () => {
    // Captura de elementos del DOM
    const formRegistro = document.getElementById('registroForm');
    const formLogin = document.getElementById('loginForm');
    const formRecuperar = document.getElementById('recuperarForm');
    const btnToggleRecuperar = document.getElementById('btnToggleRecuperar');
    const seccionRecuperar = document.getElementById('seccionRecuperar');
    const btnCancelarRecuperar = document.getElementById('btnCancelarRecuperar');

    // Correos registrados de prueba
    const correosRegistrados = [
        'agu.pena@duoc.cl', 
        'igna.munoz@duoc.cl', 
        'oli.vidal@duoc.cl',
        'agu.pena@duocuc.cl', 
        'igna.munozo@duocuc.cl', 
        'oli.vidal@duocuc.cl'
    ]; 

    // Manejo del formulario de registro
    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            limpiarErrores(); 

            if (validarFormularioRegistro()) {
                const correoNuevo = document.getElementById('correo').value.trim().toLowerCase();
                correosRegistrados.push(correoNuevo);
                
                alert("¡Registro exitoso en ZONALIBROS! Ahora puedes iniciar sesión con tu cuenta institucional.");
                formRegistro.reset();
                window.location.href = 'login.html';
            }
        });
    }

    // Manejo del formulario de login
    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            limpiarErrores();

            let esValido = true;
            const correoInput = document.getElementById('correoLogin');
            const passwordInput = document.getElementById('passwordLogin');
            
            const correoIngresado = correoInput ? correoInput.value.trim().toLowerCase() : '';
            const passwordIngresada = passwordInput ? passwordInput.value : '';

            if (correoIngresado === '') {
                mostrarError('errorLogin', 'Por favor, ingresa tu correo electrónico.');
                esValido = false;
            } else if (passwordIngresada === '') {
                mostrarError('errorLogin', 'Por favor, ingresa tu contraseña.');
                esValido = false;
            } else if (!correosRegistrados.includes(correoIngresado)) {
                mostrarError('errorLogin', 'Nombre de usuario o contraseña incorrectos. Si olvidaste tu clave, utiliza la opción de recuperación.');
                esValido = false;
            }

            if (esValido) {
                alert(`¡Bienvenido a ZONALIBROS, ${correoIngresado}!`);
                window.location.href = 'home.html';
            }
        });
    }

    // Mostrar u ocultar sección de recuperación de contraseña
    if (btnToggleRecuperar && seccionRecuperar) {
        btnToggleRecuperar.addEventListener('click', (e) => {
            e.preventDefault();
            seccionRecuperar.style.display = seccionRecuperar.style.display === 'none' ? 'block' : 'none';
            limpiarErrores();
        });
    }

    if (btnCancelarRecuperar && seccionRecuperar) {
        btnCancelarRecuperar.addEventListener('click', () => {
            seccionRecuperar.style.display = 'none';
            limpiarErrores();
        });
    }

    // Manejo del formulario de recuperación
    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (evento) => {
            evento.preventDefault();
            limpiarErrores();

            const correoRecuperarInput = document.getElementById('correoRecuperar');
            const correoRecuperar = correoRecuperarInput ? correoRecuperarInput.value.trim().toLowerCase() : '';
            const mensajeRecuperar = document.getElementById('mensajeRecuperar');

            if (correoRecuperar === '') {
                mostrarError('errorRecuperar', 'Ingresa el correo electrónico asociado a tu cuenta.');
                return;
            }

            if (!esCorreoDuocValido(correoRecuperar)) {
                mostrarError('errorRecuperar', 'Debes ingresar un correo institucional válido (@duoc.cl).');
                return;
            }

            if (correosRegistrados.includes(correoRecuperar)) {
                if (mensajeRecuperar) {
                    mensajeRecuperar.className = 'success-msg';
                    mensajeRecuperar.textContent = `¡Listo! Se ha enviado un enlace de recuperación seguro a ${correoRecuperar}. Revisa tu bandeja de entrada.`;
                    mensajeRecuperar.style.display = 'block';
                }
                formRecuperar.reset();
            } else {
                mostrarError('errorRecuperar', 'El correo ingresado no se encuentra registrado en el sistema.');
            }
        });
    }

    // Validar datos del registro
    function validarFormularioRegistro() {
        let esValido = true;
        
        // Validar nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre === '') {
            mostrarError('errorNombre', 'El nombre completo es obligatorio.');
            esValido = false;
        } else if (nombre.length > 100) {
            mostrarError('errorNombre', 'El nombre no debe superar los 100 caracteres.');
            esValido = false;
        } else if (!esSoloTexto(nombre)) {
            mostrarError('errorNombre', 'El nombre solo debe contener letras y espacios.');
            esValido = false;
        }

        // Validar correo institucional
        const correo = document.getElementById('correo').value.trim().toLowerCase();
        if (correo === '') {
            mostrarError('errorCorreo', 'El correo electrónico es obligatorio.');
            esValido = false;
        } else if (correo.length > 60) {
            mostrarError('errorCorreo', 'El correo no debe superar los 60 caracteres.');
            esValido = false;
        } else if (!esCorreoDuocValido(correo)) {
            mostrarError('errorCorreo', 'Formato inválido: solo se aceptan correos institucionales con dominio @duoc.cl (ej: usuario@duoc.cl).');
            esValido = false;
        } else if (correosRegistrados.includes(correo)) {
            mostrarError('errorCorreo', 'Este correo ya se encuentra registrado en el sistema.');
            esValido = false;
        }

        // Validar contraseña
        const password = document.getElementById('password').value;
        if (password === '') {
            mostrarError('errorPassword', 'La contraseña es obligatoria.');
            esValido = false;
        } else if (!esPasswordSegura(password)) {
            mostrarError('errorPassword', 'Debe tener al menos 10 caracteres, mínimo 2 mayúsculas, 1 minúscula, 1 número y 1 carácter especial (@#$%).');
            esValido = false;
        }

        // Validar confirmación de contraseña
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (confirmPassword === '') {
            mostrarError('errorConfirmPassword', 'Debes confirmar tu contraseña.');
            esValido = false;
        } else if (password !== confirmPassword) {
            mostrarError('errorConfirmPassword', 'Las contraseñas no coinciden.');
            esValido = false;
        }

        // Validar teléfono opcional
        const telefono = document.getElementById('telefono').value.trim();
        if (telefono !== '') {
            if (!esSoloNumeros(telefono)) {
                mostrarError('errorTelefono', 'El teléfono debe contener únicamente dígitos numéricos.');
                esValido = false;
            } else if (telefono.length < 8 || telefono.length > 12) {
                mostrarError('errorTelefono', 'Ingresa un número de teléfono válido (entre 8 y 12 dígitos).');
                esValido = false;
            }
        }

        // Validar género
        const generosSeleccionados = document.querySelectorAll('input[name="genero"]:checked');
        if (generosSeleccionados.length === 0) {
            mostrarError('errorGenero', 'Debes seleccionar al menos un género literario favorito.');
            esValido = false;
        }

        return esValido;
    }

    // Funciones auxiliares
    function esSoloTexto(texto) {
        const permitidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ ";
        for (let i = 0; i < texto.length; i++) {
            if (!permitidos.includes(texto[i])) return false; 
        }
        return true;
    }

    function esSoloNumeros(texto) {
        const numeros = "0123456789";
        for (let i = 0; i < texto.length; i++) {
            if (!numeros.includes(texto[i])) return false;
        }
        return true;
    }

    function esCorreoDuocValido(correo) {
        if (!correo || correo.length > 60) return false;
        const patronCorreoDuoc = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|duocuc\.cl)$/i;
        return patronCorreoDuoc.test(correo);
    }

    function esPasswordSegura(password) {
        if (password.length < 10) return false;
        
        let countMayusculas = 0;
        let countMinusculas = 0;
        let countNumeros = 0;
        let countEspeciales = 0;
        const caracteresEspeciales = "@#$%"; 

        for (let i = 0; i < password.length; i++) {
            const letra = password[i];
            if (letra >= 'A' && letra <= 'Z') {
                countMayusculas++;
            } else if (letra >= 'a' && letra <= 'z') {
                countMinusculas++;
            } else if (letra >= '0' && letra <= '9') {
                countNumeros++;
            } else if (caracteresEspeciales.includes(letra)) {
                countEspeciales++;
            }
        }

        return (countMayusculas >= 2 && countMinusculas >= 1 && countNumeros >= 1 && countEspeciales >= 1);
    }

    // Mostrar y limpiar mensajes de error
    function mostrarError(idElemento, mensaje) {
        const spanError = document.getElementById(idElemento);
        if (spanError) {
            spanError.textContent = mensaje;
            spanError.style.display = 'block';
        }
    }

    function limpiarErrores() {
        const errores = document.querySelectorAll('.error, .error-msg');
        errores.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        const mensajesExito = document.querySelectorAll('.success-msg');
        mensajesExito.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    }
});