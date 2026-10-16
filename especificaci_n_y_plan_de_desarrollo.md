# Especificación de Proyecto: Generador Web de Planificaciones Scout (3 Meses)

Documento de requerimientos, arquitectura y guía técnica para el desarrollo y despliegue gratuito de una aplicación web asistida orientada a dirigentes y educadores scout.

---

## 1. Visión del Producto

Una aplicación web interactiva que funciona como un asistente guiado por pasos (Wizard). Permite a los dirigentes scout ingresar de forma progresiva todos los datos de un ciclo de programa trimestral (objetivos, énfasis de área, cronograma sábado a sábado y fichas técnicas) y exportar automáticamente un documento Word (`.docx`) formateado y listo para presentación formal o revisión de consejo.

### Requisitos Clave de Arquitectura:
- **Costo $0:** Alojamiento estático gratuito y procesamiento 100% del lado del cliente (Client-Side).
- **Sin backend obligatorio:** No requiere servidores activos ni base de datos para funcionar.
- **Persistencia local:** Capacidad de pausar y continuar el trabajo sin pérdida de datos.

---

## 2. Flujo del Asistente (Paso a Paso)

```
[Paso 1: Identificación y Equipo]
           ↓
[Paso 2: Objetivos Educativos y Áreas]
           ↓
[Paso 3: Constructor de Cronograma (Sábados)]
           ↓
[Paso 4: Fichas Detalladas de Actividad]
           ↓
[Paso 5: Resumen y Exportación a Word]
```

### Paso 1: Datos Generales
- **Rama:** Manada, Unidad Scout, Caminantes, Rovers.
- **Grupo Scout y Distrito.**
- **Período:** Trimestre (ej. Marzo – Mayo), año.
- **Marco simbólico / Lema del ciclo:** Temática motivadora del período.
- **Equipo de Educadores:** Nombres, roles y datos de contacto.

### Paso 2: Énfasis y Objetivos Educativos
- Selección de áreas de crecimiento a priorizar:
  - Corporalidad
  - Creatividad
  - Carácter
  - Afectividad
  - Sociabilidad
  - Espiritualidad
- Objetivos terminales o metas de progreso vinculadas a las actividades del período.

### Paso 3: Constructor de Cronograma Trimestral
- **Generador de Fechas:** Selector de fecha del primer sábado y cantidad de semanas (habitualmente entre 11 y 14 semanas). La app debe autocompletar la grilla de fechas.
- **Categorización por jornada:**
  - *Reunión Habitual* (en sede de grupo).
  - *Salida / Visita* (parques, museos, servicio).
  - *Campamento / Acantonamiento*.
  - *Actividad Distrital o Nacional*.
  - *Feriado / Sin actividad regular*.
- **Desglose de cada jornada:**
  - Horario estimado (ej. 14:30 a 18:00).
  - Actividad principal / Gran juego / Taller.
  - Rincón de Patrulla / Seisena / Equipo.
  - Ceremonia o momento de reflexión.
  - Dirigente responsable.

### Paso 4: Fichas Técnicas de Actividades Clave (Opcional)
- Nombre de la actividad.
- Objetivos específicos.
- Materiales e insumos necesarios.
- Logística y medidas de seguridad / Gestión de riesgos.
- Responsable de ejecución.

### Paso 5: Vista Previa y Descarga
- Visualización de tabla resumen.
- Botón principal de **Descargar Planificación (.docx)**.
- Botón alternativo de **Exportar/Importar Borrador (.json)**.

---

## 3. Opciones de Generación del Documento Word

### Estrategia A: Generación dinámica desde cero (`docx.js`)
- **Librerías:** `docx` + `file-saver`.
- **Ventaja:** No depende de archivos externos; crea estilos, tablas con bordes, encabezados y saltos de página directamente desde código JavaScript.

```typescript
import { Document, Packer, Paragraph, Table, TableRow, TableCell, HeadingLevel, WidthType } from "docx";
import { saveAs } from "file-saver";

export const descargarPlanificacionDocx = async (data: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `Planificación Trimestral - ${data.rama}`,
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({ text: `Período: ${data.periodo}` }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Fecha", bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: "Tipo", bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: "Actividad", bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: "Responsable", bold: true })] }),
                ],
              }),
              ...data.reuniones.map((r: any) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(r.fecha || "")] }),
                    new TableCell({ children: [new Paragraph(r.tipo || "")] }),
                    new TableCell({ children: [new Paragraph(r.actividad || "")] }),
                    new TableCell({ children: [new Paragraph(r.responsable || "")] }),
                  ],
                })
              ),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Planificacion_${data.rama}_${data.periodo}.docx`);
};
```

### Estrategia B: Relleno de Plantilla Institucional Preexistente (`docxtemplater`)
- **Librerías:** `docxtemplater` + `pizzip` + `file-saver`.
- **Ventaja:** Permite tomar un Word prediseñado con logos del grupo o asociación, membrete oficial y tipografías predefinidas, rellenando tags como `{rama}`, `{periodo}` y bucles de tabla `{#reuniones}...{/reuniones}`.

---

## 4. Stack Tecnológico Sugerido

| Capa | Herramienta | Razón |
| :--- | :--- | :--- |
| **Framework Web** | React / Vite o Next.js | Renderizado rápido, manejo de estado reactivo y tipado robusto. |
| **Estilos / UI** | Tailwind CSS + shadcn/ui | Componentes accesibles (Accordions, Steps, Dialogs, Tables). |
| **Generador Word** | `docx` (versión 8+) | Compatible 100% con navegadores modernos sin Node runtime. |
| **Persistencia** | `localStorage` | Previene pérdida de datos si se recarga la página. |
| **Control de Versiones**| Git / GitHub | Integración continua con el proveedor de hosting. |

---

## 5. Plataformas de Despliegue 100% Gratuitas

1. **Vercel (`vercel.com`):**
   - Ideal para React, Vite o Next.js.
   - Conexión directa a GitHub: cada `git push` genera un despliegue automático.
   - Dominio SSL gratuito `nombre-app.vercel.app`.
2. **Cloudflare Pages (`pages.cloudflare.com`):**
   - Ancho de banda ilimitado y despliegues automáticos desde GitHub.
   - Latencia mínima global.
3. **GitHub Pages:**
   - Despliegue directo desde la pestaña `Settings > Pages` de tu repositorio si la aplicación exporta HTML/JS estático.

---

## 6. Funcionalidades de Calidad de Vida (QoL) para Dirigentes

1. **Autocompletado de Sábados:** Al indicar el sábado de inicio y la duración (ej. 12 semanas), calcular automáticamente todas las fechas intermedias sumando 7 días por iteración.
2. **Autoguardado en tiempo real:** Persistir el formulario en `localStorage` con cada cambio.
3. **Exportar / Importar Borrador en JSON:** Permite que un dirigente guarde un archivo liviano `.json`, se lo pase a otro educador del equipo por WhatsApp o Drive, y este lo cargue en la web para seguir editando.
4. **Plantillas preconfiguradas:** Botón para rellenar automáticamente actividades modelo (Juego amplio, Raid de patrulla, Taller de construcciones, Fogón, Cierre de ciclo).