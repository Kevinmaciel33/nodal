import React, { useState } from 'react';
import { Flame, Plus, Trash2, ChevronDown, ChevronUp, Package, Compass } from 'lucide-react';
import type { CicloPrograma, ActividadDetalle } from '../../types';

interface Step6ActividadesProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step6Actividades: React.FC<Step6ActividadesProps> = ({ ciclo, onChangeCiclo }) => {
  const jornadasConActividad = ciclo.jornadas.filter((j) => !j.sinActividad);
  const [openJornadaId, setOpenJornadaId] = useState<string>(
    jornadasConActividad[0]?.id || ''
  );

  const handleAddActividad = (jornadaId: string) => {
    const nuevaActividad: ActividadDetalle = {
      id: Date.now().toString(),
      nombre: 'Nueva actividad',
      motivacion: '',
      desarrollo: '',
      materiales: 'Sin materiales',
    };

    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.map((j) => {
        if (j.id !== jornadaId) return j;
        return {
          ...j,
          actividades: [...j.actividades, nuevaActividad],
        };
      }),
    });
  };

  const handleUpdateActividad = (
    jornadaId: string,
    actividadId: string,
    field: keyof ActividadDetalle,
    value: string
  ) => {
    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.map((j) => {
        if (j.id !== jornadaId) return j;
        return {
          ...j,
          actividades: j.actividades.map((a) =>
            a.id === actividadId ? { ...a, [field]: value } : a
          ),
        };
      }),
    });
  };

  const handleRemoveActividad = (jornadaId: string, actividadId: string) => {
    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.map((j) => {
        if (j.id !== jornadaId) return j;
        return {
          ...j,
          actividades: j.actividades.filter((a) => a.id !== actividadId),
        };
      }),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-600" />
          Paso 6: Fichas Detalladas de Actividades por Sábado
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Para cada sábado con actividad, detallá el juego, taller o momento educativo: su motivación mística, dinámica de desarrollo y materiales.
        </p>
      </div>

      {jornadasConActividad.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500 text-sm">
            No hay sábados con actividad configurados en el Paso 5.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {jornadasConActividad.map((jornada) => {
            const isOpen = openJornadaId === jornada.id;
            return (
              <div
                key={jornada.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Cabecera del Acordeón del Sábado */}
                <div
                  onClick={() => setOpenJornadaId(isOpen ? '' : jornada.id)}
                  className="px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                      Día {jornada.fecha}
                    </span>
                    <span className="font-semibold text-sm text-slate-800">
                      {jornada.resumenActividad || 'Reunión ordinaria'}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({jornada.actividades.length}{' '}
                      {jornada.actividades.length === 1 ? 'actividad' : 'actividades'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddActividad(jornada.id);
                        if (!isOpen) setOpenJornadaId(jornada.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Sumar Actividad</span>
                    </button>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Contenido Desplegable */}
                {isOpen && (
                  <div className="p-5 space-y-5 border-t border-slate-100 bg-white">
                    {jornada.actividades.length === 0 ? (
                      <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl">
                        <p className="text-xs text-slate-400 mb-2">
                          Aún no hay actividades cargadas para el día {jornada.fecha}.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAddActividad(jornada.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar Primera Actividad</span>
                        </button>
                      </div>
                    ) : (
                      jornada.actividades.map((act, actIdx) => (
                        <div
                          key={act.id}
                          className="border border-slate-200 rounded-xl p-4 bg-slate-50/30 space-y-3.5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-xs font-bold text-slate-400">
                                #{actIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={act.nombre}
                                onChange={(e) =>
                                  handleUpdateActividad(
                                    jornada.id,
                                    act.id,
                                    'nombre',
                                    e.target.value
                                  )
                                }
                                placeholder="Nombre de la actividad (ej. Lucha de altos príncipes, Relevo de nudos)"
                                className="w-full px-3 py-1.5 text-sm font-semibold text-slate-800 rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveActividad(jornada.id, act.id)
                              }
                              className="text-slate-400 hover:text-red-500 p-1.5"
                              title="Eliminar actividad"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Motivación */}
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                              <Compass className="w-3 h-3 text-amber-500" />
                              Motivación (vinculada al marco simbólico o temática)
                            </label>
                            <textarea
                              rows={2}
                              value={act.motivacion || ''}
                              onChange={(e) =>
                                handleUpdateActividad(
                                  jornada.id,
                                  act.id,
                                  'motivacion',
                                  e.target.value
                                )
                              }
                              placeholder="Ej: Kaladin junto a su escuadrón defendía las fronteras... Al igual que ellos, los scouts deben proteger sus bordones..."
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Desarrollo */}
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              Desarrollo y Reglas de la Actividad
                            </label>
                            <textarea
                              rows={3}
                              value={act.desarrollo}
                              onChange={(e) =>
                                handleUpdateActividad(
                                  jornada.id,
                                  act.id,
                                  'desarrollo',
                                  e.target.value
                                )
                              }
                              placeholder="Detallá la dinámica: cómo se divide la unidad, consigna, etapas de juego y cierre..."
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          {/* Materiales */}
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                              <Package className="w-3 h-3 text-slate-400" />
                              Materiales e Insumos
                            </label>
                            <input
                              type="text"
                              value={act.materiales}
                              onChange={(e) =>
                                handleUpdateActividad(
                                  jornada.id,
                                  act.id,
                                  'materiales',
                                  e.target.value
                                )
                              }
                              placeholder="Ej: Soguines, 4 palos por patrulla, vendas, banderines (o 'Ninguno')"
                              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
