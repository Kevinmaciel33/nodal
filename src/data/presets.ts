import type { CicloPrograma, RamaScout } from '../types';

export const createEmptyCiclo = (rama: RamaScout = 'unidad'): CicloPrograma => ({
  version: 1,
  rama,
  nombreRama:
    rama === 'unidad'
      ? 'Unidad Scout'
      : rama === 'manada'
      ? 'Manada'
      : rama === 'caminantes'
      ? 'Comunidad Caminantes'
      : 'Comunidad Rover',
  grupoScout: 'Grupo Scout Ejemplo',
  distrito: 'Distrito 1',
  ano: new Date().getFullYear(),
  periodoFechas: 'Marzo a Junio',
  equipoEducadores: [{ id: '1', nombre: 'Educador/a 1', rol: 'Jefe/a de Rama' }],
  diagnostico: {
    cantidadProtagonistas: 0,
    altasBajasTexto: '',
    patrullas: [
      { id: 'p1', nombre: 'Patrulla 1', integrantes: [] },
      { id: 'p2', nombre: 'Patrulla 2', integrantes: [] },
    ],
    necesidadesInclusion: '',
    observacionesGrupales: '',
  },
  marcoSimbolico: {
    lemaCiclo: '',
    sinopsis: '',
    analogiaLeyPromesa: '',
  },
  objetivos: [
    {
      id: 'o1',
      area: 'Habilidades para la vida',
      numeroCodigo: '1',
      enunciadoOficial: 'Aplico mi conocimiento y habilidades para resolver desafíos prácticos.',
      metaEspecifica: 'Que los protagonistas adquieran técnicas prácticas de campismo y cabuyería básica.',
    },
  ],
  jornadas: [],
  anexos: [],
});

export const EJEMPLO_ARCHIVO_TORMENTAS: CicloPrograma = {
  version: 1,
  rama: 'unidad',
  nombreRama: 'UNIDAD EJEMPLO',
  grupoScout: 'Grupo Scout Ejemplo 123',
  distrito: 'Distrito Modelo',
  ano: 2025,
  periodoFechas: '17 de mayo a 30 de agosto',
  equipoEducadores: [
    { id: 'e1', nombre: 'Dirigente A', rol: 'Jefe/a de Rama (I.M.)' },
    { id: 'e2', nombre: 'Dirigente B', rol: 'M.A. en formación' },
    { id: 'e3', nombre: 'Dirigente C', rol: 'M.A. en formación' },
    { id: 'e4', nombre: 'Dirigente D', rol: 'M.A. en formación' },
    { id: 'e5', nombre: 'Dirigente E', rol: 'M.A. en formación' },
  ],
  diagnostico: {
    cantidadProtagonistas: 28,
    altasBajasTexto:
      'La Unidad está conformada por cuatro patrullas activas. En el último ciclo se despidió a protagonistas que pasaron a la rama Caminantes y se recibieron integrantes provenientes de la Manada y nuevas incorporaciones al grupo scout.',
    patrullas: [
      {
        id: 'p-yacares',
        nombre: 'Patrulla Yacarés',
        integrantes: [
          { id: 'i1', nombre: 'Protagonista A1', etapa: 'Pistas' },
          { id: 'i2', nombre: 'Protagonista A2', etapa: 'Pistas' },
          { id: 'i3', nombre: 'Protagonista A3', etapa: 'Pistas' },
          { id: 'i4', nombre: 'Protagonista A4', etapa: 'Pistas' },
          { id: 'i5', nombre: 'Protagonista A5', etapa: 'Travesía' },
          { id: 'i6', nombre: 'Protagonista A6', etapa: 'Travesía' },
          { id: 'i7', nombre: 'Protagonista A7', etapa: 'Pistas' },
        ],
      },
      {
        id: 'p-murcielagos',
        nombre: 'Patrulla Murciélagos',
        integrantes: [
          { id: 'i8', nombre: 'Protagonista B1', etapa: 'Senda' },
          { id: 'i9', nombre: 'Protagonista B2', etapa: 'Pistas' },
          { id: 'i10', nombre: 'Protagonista B3', etapa: 'Pistas' },
          { id: 'i11', nombre: 'Protagonista B4', etapa: 'Pistas' },
          { id: 'i12', nombre: 'Protagonista B5', etapa: 'Pistas' },
          { id: 'i13', nombre: 'Protagonista B6', etapa: 'Senda' },
          { id: 'i14', nombre: 'Protagonista B7', etapa: 'Pistas' },
        ],
      },
      {
        id: 'p-panteras',
        nombre: 'Patrulla Panteras',
        integrantes: [
          { id: 'i15', nombre: 'Protagonista C1', etapa: 'Travesía' },
          { id: 'i16', nombre: 'Protagonista C2', etapa: 'Senda' },
          { id: 'i17', nombre: 'Protagonista C3', etapa: 'Senda' },
          { id: 'i18', nombre: 'Protagonista C4', etapa: 'Pistas' },
          { id: 'i19', nombre: 'Protagonista C5', etapa: 'Pistas' },
          { id: 'i20', nombre: 'Protagonista C6', etapa: 'Pistas' },
          { id: 'i21', nombre: 'Protagonista C7', etapa: 'Pistas' },
        ],
      },
      {
        id: 'p-halcones',
        nombre: 'Patrulla Halcones',
        integrantes: [
          { id: 'i22', nombre: 'Protagonista D1', etapa: 'Senda' },
          { id: 'i23', nombre: 'Protagonista D2', etapa: 'Travesía' },
          { id: 'i24', nombre: 'Protagonista D3', etapa: 'Pistas' },
          { id: 'i25', nombre: 'Protagonista D4', etapa: 'Pistas' },
          { id: 'i26', nombre: 'Protagonista D5', etapa: 'Pistas' },
        ],
      },
    ],
    necesidadesInclusion:
      'Acompañamos a protagonistas con diversas necesidades educativas y de adaptación, buscando asegurar su inclusión afectiva y participación plena en todas las actividades de la unidad.',
    observacionesGrupales:
      'A lo largo del período anterior se observó una mejora continua en las relaciones interpersonales y en la autonomía del sistema de patrullas. Reforzamos el compromiso individual y el liderazgo de guías y subguías.',
  },
  marcoSimbolico: {
    lemaCiclo: '“Viaje antes que destino: Radiantes en camino”',
    sinopsis:
      'En un mundo de desafíos y tormentas, la historia nos presenta a una antigua orden guiada por juramentos de honor, servicio y valentía.\n\nEn medio de dificultades, un grupo de protagonistas aprende a superar la adversidad mediante el trabajo en equipo, la constancia y la lealtad mutua. Cada actividad vivida formará parte de un relato que los propios scouts construirán con sus acciones.',
    analogiaLeyPromesa:
      'La meta es que los protagonistas puedan “volver a nombrar los juramentos”, como símbolo de renovar y vivir su Promesa Scout. Usamos los valores de valentía y servicio de los personajes como espejo, relacionando sus desafíos con los puntos de la Ley Scout.',
  },
  objetivos: [
    {
      id: 'obj-1',
      area: 'Salud y bienestar',
      numeroCodigo: '3',
      enunciadoOficial:
        'Reconozco y expreso mis emociones, entendiendo cómo me afectan a mí y a las demás personas.',
      metaEspecifica:
        'Que los protagonistas logren entablar vínculos positivos dentro de su patrulla, fortaleciendo el compañerismo y el trabajo en equipo.',
    },
    {
      id: 'obj-2',
      area: 'Paz y desarrollo',
      numeroCodigo: '17',
      enunciadoOficial:
        'Valoro mi historia e identidad, la de mi País y respeto sus símbolos patrios.',
      metaEspecifica:
        'Que los protagonistas logren conocer y valorar la historia del Movimiento Scout y la vida de su fundador, entendiendo cómo sus ideales siguen vigentes.',
    },
    {
      id: 'obj-3',
      area: 'Habilidades para la vida',
      numeroCodigo: '42',
      enunciadoOficial:
        'Aplico mi conocimiento y habilidades para resolver los desafíos y oportunidades que se me presentan.',
      metaEspecifica:
        'Que los protagonistas adquieran y afiancen habilidades prácticas de campamento, con foco en la cabuyería y en desenvolverse con seguridad al aire libre.',
    },
  ],
  jornadas: [
    {
      id: 'j-1',
      numeroSemana: 1,
      fecha: '17/05',
      sinActividad: false,
      resumenActividad: 'Inicio de ciclo - explicación del marco simbólico',
      actividades: [
        {
          id: 'a1',
          nombre: 'Prólogo y Presentación del Lema',
          motivacion: 'Presentación de la temática y los juramentos de honor y servicio.',
          desarrollo:
            'Charla motivadora sobre el marco simbólico del ciclo y su conexión con la Ley y Promesa Scout.',
          materiales: 'Ninguno',
        },
        {
          id: 'a2',
          nombre: 'Juego de Estrategia por Patrulla',
          motivacion: 'Trabajo en equipo y defensa de los ideales de patrulla.',
          desarrollo:
            'Dinámica de orientación y búsqueda de objetivos por patrulla mediante pistas y coordinación grupal.',
          materiales: 'Banderín por patrulla',
        },
      ],
    },
    {
      id: 'j-2',
      numeroSemana: 2,
      fecha: '24/05',
      sinActividad: true,
      motivoSinActividad: 'Campamento de dirigentes (NO HAY ACTIVIDAD)',
      resumenActividad: 'Campamento de dirigentes - NO HAY ACTIVIDAD',
      actividades: [],
    },
    {
      id: 'j-3',
      numeroSemana: 3,
      fecha: '31/05',
      sinActividad: false,
      resumenActividad: 'Acantonamiento de guías y subguías',
      actividades: [
        {
          id: 'a3',
          nombre: 'Taller de Liderazgo y Sistema de Patrulla',
          motivacion: 'Formación para el consejo de guías.',
          desarrollo: 'Jornada de planificación y coordinación para los guías y subguías.',
          materiales: 'Cuaderno de bitácora y útiles',
        },
      ],
    },
    {
      id: 'j-4',
      numeroSemana: 4,
      fecha: '07/06',
      sinActividad: true,
      motivoSinActividad: 'Aniversario de grupo (NO HAY ACTIVIDAD)',
      resumenActividad: 'Aniversario de grupo - NO HAY ACTIVIDAD',
      actividades: [],
    },
    {
      id: 'j-5',
      numeroSemana: 5,
      fecha: '14/06',
      sinActividad: false,
      resumenActividad: 'Nudos y amarres básicos',
      actividades: [
        {
          id: 'a4',
          nombre: 'Cabuyería por Estaciones',
          motivacion: 'Aprender destrezas prácticas de campismo.',
          desarrollo:
            'Demostración y práctica de nudos scout: Llano, Ballestrinque, As de guía, Pescador y Margarita.',
          materiales: 'Soguines y cartón demostrativo',
        },
      ],
    },
    {
      id: 'j-6',
      numeroSemana: 6,
      fecha: '21/06',
      sinActividad: false,
      resumenActividad: 'Construcción con amarres',
      actividades: [
        {
          id: 'a5',
          nombre: 'Taller de Amarres Cuadrado y Redondo',
          desarrollo:
            'Construcción de estructuras sencillas y pruebas de resistencia por patrullas.',
          materiales: 'Palos y soguines por patrulla',
        },
      ],
    },
    {
      id: 'j-7',
      numeroSemana: 7,
      fecha: '28/06',
      sinActividad: false,
      resumenActividad: 'Trípodes e instalaciones de cocina',
      actividades: [
        {
          id: 'a6',
          nombre: 'Armado de Trípodes y Soporte de Olla',
          motivacion: 'Autosuficiencia en campamento.',
          desarrollo: 'Taller práctico de cocina de patrulla y armado de trípodes seguros.',
          materiales: 'Palos, soguines y ollas',
        },
      ],
    },
    {
      id: 'j-8',
      numeroSemana: 8,
      fecha: '05/07',
      sinActividad: false,
      resumenActividad: 'Gran construcción en equipo',
      actividades: [
        {
          id: 'a7',
          nombre: 'Montaje de Puente de Unidad',
          motivacion: 'Unión y coordinación de todas las patrullas para un objetivo común.',
          desarrollo:
            'División de tareas por patrulla para ensamblar una construcción mayor integradora.',
          materiales: 'Palos grandes y soguines',
        },
      ],
    },
    {
      id: 'j-9',
      numeroSemana: 9,
      fecha: '12/07',
      sinActividad: false,
      resumenActividad: 'Taller de fuegos y seguridad',
      actividades: [
        {
          id: 'a8',
          nombre: 'Fuegos Básicos (Pirámide, Pagoda y Estrella)',
          desarrollo: 'Medidas de seguridad, elección de leña y encendido responsable.',
          materiales: 'Leña y elementos de seguridad',
        },
      ],
    },
    {
      id: 'j-10',
      numeroSemana: 10,
      fecha: '19/07',
      sinActividad: false,
      resumenActividad: 'Acantonamiento de cocina de campamento',
      actividades: [
        {
          id: 'a9',
          nombre: 'Menú de Patrulla y Convivencia',
          desarrollo: 'Preparación de almuerzo grupal y dinámicas de higiene y orden.',
          materiales: 'Víveres y utensilios',
        },
      ],
    },
    {
      id: 'j-11',
      numeroSemana: 11,
      fecha: '26/07',
      sinActividad: false,
      resumenActividad: 'Historia scout e insignias',
      actividades: [
        {
          id: 'a10',
          nombre: 'La Aventura de Baden-Powell',
          desarrollo:
            'Representaciones teatrales e historietas sobre los orígenes del Movimiento Scout.',
          materiales: 'Hojas y colores',
        },
      ],
    },
    {
      id: 'j-12',
      numeroSemana: 12,
      fecha: '02/08',
      sinActividad: false,
      resumenActividad: 'Juego especial de la Ley Scout',
      actividades: [
        {
          id: 'a11',
          nombre: 'Juego de la Vida Scout',
          desarrollo:
            'Juego interactivo por patrullas con situaciones éticas cotidianas y respuestas solidarias.',
          materiales: 'Tablero y tarjetas de situación',
        },
      ],
    },
    {
      id: 'j-13',
      numeroSemana: 13,
      fecha: '09/08',
      sinActividad: false,
      resumenActividad: 'Cualidades y compañerismo',
      actividades: [
        {
          id: 'a12',
          nombre: 'Reconocimiento entre Compañeros',
          desarrollo: 'Dinámica para destacar las virtudes y talentos de cada patrullero.',
          materiales: 'Papel y lápiz',
        },
      ],
    },
    {
      id: 'j-14',
      numeroSemana: 14,
      fecha: '16/08',
      sinActividad: false,
      resumenActividad: 'Actividad de reflexión y Ley Scout',
      actividades: [
        {
          id: 'a13',
          nombre: 'Búsqueda de la Ley Scout',
          desarrollo: 'Juego de pistas y rompecabezas sobre los artículos de la Ley Scout.',
          materiales: 'Pistas y rompecabezas',
        },
      ],
    },
    {
      id: 'j-15',
      numeroSemana: 15,
      fecha: '23/08',
      sinActividad: false,
      resumenActividad: 'Construcción y cierre técnico',
      actividades: [
        {
          id: 'a14',
          nombre: 'Consolidación de Técnicas de Campamento',
          desarrollo: 'Revisión final de cabuyería y construcciones previas al cierre.',
          materiales: 'Palos y cuerdas',
        },
      ],
    },
    {
      id: 'j-16',
      numeroSemana: 16,
      fecha: '30/08',
      sinActividad: false,
      resumenActividad: 'Día de promesas scout y cierre de ciclo',
      actividades: [
        {
          id: 'a15',
          nombre: 'Ceremonia de Promesas y Cierre',
          desarrollo:
            'Renovación de juramentos scout y entrega de insignias de progresión con las familias.',
          materiales: 'Insignias y Libro de honor',
        },
      ],
    },
  ],
  anexos: [
    {
      id: 'anexo-1',
      titulo: 'Juego de la vida scout (Tarjetas de Situación)',
      objetivo:
        'Avanzar hacia el “Campamento Base” enfrentando desafíos y tomando decisiones responsables.',
      edadRecomendada: '10 a 14 años',
      jugadores: 'Por patrullas de 4 a 8 integrantes',
      materiales: 'Tablero tipo oca, dado grande, fichas y tarjetas.',
      reglas:
        'Tirar el dado por turnos. Al caer en casilla especial, responder la tarjeta de situación con valores scouts.',
      tarjetas: [
        {
          id: 't1',
          situacion: 'Ves a un compañero solo en el campamento mientras todos juegan. ¿Qué hacés?',
          respuestaSugerida: 'Me acerco, lo incluyo y lo hago sentir parte del equipo.',
        },
        {
          id: 't2',
          situacion: 'Tu patrulla tiene que ordenar el rincón pero querés seguir jugando. ¿Qué hacés?',
          respuestaSugerida: 'Colaboro con mi patrulla, porque es una responsabilidad común.',
        },
        {
          id: 't3',
          situacion: 'Durante una caminata, alguien se cansa y se queda atrás. ¿Cómo lo ayudás?',
          respuestaSugerida: 'Camino a su ritmo, lo animo y comparto la carga. Nadie se queda solo.',
        },
        {
          id: 't4',
          situacion: 'En un juego descubrís que tu equipo cometió un error sin que lo vean. ¿Qué hacés?',
          respuestaSugerida: 'Aviso con honestidad, porque el scout es sincero y digno de confianza.',
        },
      ],
    },
  ],
};
