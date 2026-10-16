export type RamaScout = 'manada' | 'unidad' | 'caminantes' | 'rovers';

export type EtapaProgresion = 
  | 'Pistas' 
  | 'Rumbo' 
  | 'Senda' 
  | 'Travesía' 
  | 'Caza' 
  | 'Huella' 
  | 'Partida' 
  | 'Integración';

export type AreaCrecimiento = 
  | 'Salud y bienestar' 
  | 'Paz y desarrollo' 
  | 'Habilidades para la vida' 
  | 'Corporalidad' 
  | 'Creatividad' 
  | 'Carácter' 
  | 'Afectividad' 
  | 'Sociabilidad' 
  | 'Espiritualidad';

export interface Educador {
  id: string;
  nombre: string;
  rol: string; // ej. Jefa de Rama IM, M.A. en formación, Ayudante
  contacto?: string;
}

export interface IntegrantePatrulla {
  id: string;
  nombre: string;
  etapa: string; // ej: Pistas, Rumbo, Senda, Travesía
}

export interface Patrulla {
  id: string;
  nombre: string; // ej: Halcones, Yacares, Murcielagos, Panteras
  integrantes: IntegrantePatrulla[];
}

export interface Diagnostico {
  cantidadProtagonistas: number;
  altasBajasTexto: string;
  patrullas: Patrulla[];
  necesidadesInclusion: string; // TEA, Mutismo, TDA, etc.
  observacionesGrupales: string; // Dinámicas, sistema de patrullas, compromisos
}

export interface MarcoSimbolico {
  lemaCiclo: string; // ej: “Viaje antes que destino: Radiantes en camino”
  sinopsis: string; // Historia/ambientación (ej. Roshar, Brandon Sanderson, etc.)
  analogiaLeyPromesa: string; // Cómo se vinculan los desafíos con los juramentos/Ley Scout
}

export interface ObjetivoEducativo {
  id: string;
  area: AreaCrecimiento;
  numeroCodigo: string; // ej: "3", "17", "42"
  enunciadoOficial: string; // ej: Reconozco y expreso mis emociones...
  metaEspecifica: string; // ej: Que los protagonistas logren entablar vínculos positivos...
}

export interface ActividadDetalle {
  id: string;
  nombre: string;
  motivacion?: string;
  desarrollo: string;
  materiales: string;
}

export interface JornadaSabado {
  id: string;
  numeroSemana: number;
  fecha: string; // Formato legible ej: 17/05 o 2025-05-17
  sinActividad: boolean;
  motivoSinActividad?: string; // ej: "Campamento de dirigentes", "Aniversario de grupo"
  resumenActividad: string; // Título resumen para el calendario resumido (ej: "Nudos y amarres")
  actividades: ActividadDetalle[];
}

export interface TarjetaJuego {
  id: string;
  situacion: string;
  respuestaSugerida: string;
}

export interface Anexo {
  id: string;
  titulo: string; // ej: "Juego de la vida scout"
  objetivo?: string;
  edadRecomendada?: string;
  jugadores?: string;
  materiales?: string;
  reglas?: string;
  tarjetas: TarjetaJuego[];
}

export interface CicloPrograma {
  // Generales
  version: number;
  rama: RamaScout;
  nombreRama: string; // ej: UNIDAD ÑANCU
  grupoScout: string; // ej: Grupo Scout San Cayetano 741
  distrito: string;
  ano: number;
  periodoFechas: string; // ej: "17 de mayo a 30 de agosto"
  equipoEducadores: Educador[];

  // Secciones
  diagnostico: Diagnostico;
  marcoSimbolico: MarcoSimbolico;
  objetivos: ObjetivoEducativo[];
  jornadas: JornadaSabado[];
  anexos: Anexo[];
}
