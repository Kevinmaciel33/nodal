# Nodal ⚜️
### Asistente Web para la Creación de Ciclos de Programa Scout

**Nodal** es una aplicación web interactiva diseñada para dirigentes y educadores scout. Funciona como un asistente paso a paso (Wizard) que permite ingresar progresivamente toda la información pedagógica de un ciclo trimestral y **generar automáticamente un documento Word (`.docx`) formal** idéntico al requerido por consejos de grupo y jefaturas.

---

## 🌟 Características Principales

1. **Flujo Guiado en 7 Pasos:**
   - **Paso 1: Identificación y Equipo:** Rama (Manada, Unidad Scout, Caminantes, Rovers), Grupo Scout, Distrito, período y dirigentes a cargo.
   - **Paso 2: Diagnóstico y Patrullas:** Altas/bajas, tabla dinámica de integrantes por patrulla y etapas de progresión (*Pistas, Rumbo, Senda, Travesía*), más cuadro de inclusión (TEA, TDAH, mutismo).
   - **Paso 3: Marco Simbólico:** Lema motivador, sinopsis del universo temático y su conexión pedagógica con la Promesa y Ley Scout.
   - **Paso 4: Objetivos del Ciclo:** Selección por Áreas de Crecimiento con código y meta concreta.
   - **Paso 5: Calendario Trimestral:** Calculador inteligente de sábados a partir de la fecha de inicio y semanas, con detección de feriados o días sin actividad.
   - **Paso 6: Fichas de Actividad:** Desglose sábado a sábado con nombre de la actividad, motivación mística, dinámica paso a paso y materiales.
   - **Paso 7: Resumen, Anexos y Word:** Módulo de juegos/tarjetas y exportación directa en formato `.docx`.

2. **Costo $0 y 100% Client-Side:**
   - No requiere servidor ni base de datos.
   - El documento Word se crea y empaqueta directamente en el navegador del usuario utilizando `docx.js`.

3. **Persistencia y Colaboración:**
   - **Autoguardado continuo en `localStorage`**: podés cerrar el navegador o recargar la página sin perder el avance.
   - **Guardar / Importar Borrador en `.json`**: permite compartir la planificación por WhatsApp o Drive con otros educadores del equipo para continuarla en otra máquina.
   - **Botón "Cargar Ejemplo Real"**: precarga el ciclo completo del ejemplo *"El Archivo de las Tormentas (Unidad Ñancu 2025)"*.

---

## 🚀 Cómo ejecutar en desarrollo

Para iniciar la aplicación en tu computadora:

```bash
# Instalar dependencias (si aún no se instalaron)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en tu navegador web.

---

## 📦 Compilación para producción y despliegue

```bash
# Compilar proyecto estático
npm run build
```

Los archivos finales se generarán en la carpeta `dist/`, listos para subir a **Vercel**, **Cloudflare Pages** o **GitHub Pages** de forma gratuita.
