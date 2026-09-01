# Evaluación Formativa 1 - Full Stack II
## CASO 2: ZONALIBROS

Sistema web de **Registro**, **Inicio de Sesión (Login)** y **Recuperación de Contraseña** desarrollado con **HTML5, CSS3 y JavaScript**.

---

### 👥 Integrantes del Equipo
* **Ignacio Muñoz**
* **Agustín Peña**
* **Oliver Vidal**

---

### 📖 Descripción del Caso
**ZONALIBROS** es una tienda en línea dedicada a la venta de libros raros, de colección y títulos de literatura clásica y moderna. El objetivo del proyecto es resolver la problemática de acceso de los usuarios mediante:
1. **Formulario de Registro robusto y guiado:** con validaciones en tiempo real y mensajes claros de error.
2. **Inicio de Sesión (Login):** verificación de credenciales con mensajes informativos y seguros.
3. **Módulo de Recuperación de Contraseña:** mecanismo directo para que los usuarios puedan recuperar el acceso a sus cuentas utilizando su correo institucional.

---

### 📁 Estructura del Proyecto
```text
├── assets/
│   ├── img/
│   │   └── R.jpg           # Imagen principal del Home
│   └── style.css           # Hoja de estilos compartida (Diseño responsivo)
├── home.html               # Página principal con imagen centrada y navegación
├── login.html              # Inicio de sesión y módulo de recuperación de contraseña
├── registro.html           # Formulario de registro con validaciones completas
├── main.js                 # Lógica de validación de formularios y autenticación simulada
└── README.md               # Documentación del proyecto
```

---

### ⚙️ Reglas de Validación Implementadas

#### 1. Formulario de Registro (`registro.html`)
* **Nombre Completo:**
  * Obligatorio.
  * Solo caracteres alfabéticos y espacios (permite tildes y ñ).
  * Máximo 100 caracteres.
* **Correo Electrónico:**
  * Obligatorio.
  * Formato estándar de correo institucional exclusivamente `@duoc.cl` (o `@duocuc.cl`).
  * Máximo 60 caracteres.
  * Único en el sistema (no permite correos duplicados).
* **Contraseña:**
  * Obligatorio.
  * Mínimo 10 caracteres.
  * Al menos 2 letras mayúsculas.
  * Al menos 1 letra minúscula.
  * Al menos 1 número.
  * Al menos 1 carácter especial (`@`, `#`, `$`, `%`).
* **Confirmación de Contraseña:**
  * Debe coincidir exactamente con la contraseña ingresada.
* **Teléfono (Opcional):**
  * Solo dígitos numéricos (entre 8 y 12 dígitos).
* **Géneros Favoritos:**
  * Checklist donde el usuario debe seleccionar al menos una preferencia literaria (*Ficción, No Ficción, Misterio, Terror, Suspenso, Historia*).

#### 2. Inicio de Sesión y Recuperación (`login.html`)
* Comprueba si el correo ingresado se encuentra registrado en el sistema.
* Mensaje claro y seguro si las credenciales son incorrectas.
* Enlace **"¿Olvidaste tu contraseña?"** para desplegar el formulario de recuperación de cuenta por correo institucional.

---

### 🧪 Cuentas de Prueba Precargadas
Para probar el inicio de sesión y la recuperación, se encuentran precargados los siguientes correos institucionales:
* `agu.pena@duoc.cl`
* `igna.munoz@duoc.cl`
* `oli.vidal@duoc.cl`
*(También puedes registrar un nuevo correo con `@duoc.cl` desde `registro.html` e iniciar sesión inmediatamente).*

---

### 🚀 Cómo Ejecutar el Proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/milloesagustin/Evaluaci-nFormativa-Munoz_Pena_Vidal.git
   ```
2. Abre `home.html` en cualquier navegador web moderno (Google Chrome, Edge, Firefox).
