import React from 'react';
import { Plus, Trash2, UserPlus, HeartHandshake, ShieldAlert, Award } from 'lucide-react';
import type { CicloPrograma, Patrulla, IntegrantePatrulla } from '../../types';

interface Step2DiagnosticoProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step2Diagnostico: React.FC<Step2DiagnosticoProps> = ({ ciclo, onChangeCiclo }) => {
  const diagnostico = ciclo.diagnostico;

  const handleAddPatrulla = () => {
    const nombreDefault = `Patrulla ${diagnostico.patrullas.length + 1}`;
    const nuevaPatrulla: Patrulla = {
      id: Date.now().toString(),
      nombre: nombreDefault,
      integrantes: [],
    };
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: [...diagnostico.patrullas, nuevaPatrulla],
      },
    });
  };

  const handleRemovePatrulla = (patrullaId: string) => {
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: diagnostico.patrullas.filter((p) => p.id !== patrullaId),
      },
    });
  };

  const handleUpdatePatrullaNombre = (patrullaId: string, nombre: string) => {
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: diagnostico.patrullas.map((p) =>
          p.id === patrullaId ? { ...p, nombre } : p
        ),
      },
    });
  };

  const handleAddIntegrante = (patrullaId: string) => {
    const nuevoIntegrante: IntegrantePatrulla = {
      id: Date.now().toString(),
      nombre: '',
      etapa: 'Pistas',
    };
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: diagnostico.patrullas.map((p) =>
          p.id === patrullaId
            ? { ...p, integrantes: [...p.integrantes, nuevoIntegrante] }
            : p
        ),
      },
    });
  };

  const handleUpdateIntegrante = (
    patrullaId: string,
    integranteId: string,
    field: 'nombre' | 'etapa',
    value: string
  ) => {
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: diagnostico.patrullas.map((p) => {
          if (p.id !== patrullaId) return p;
          return {
            ...p,
            integrantes: p.integrantes.map((i) =>
              i.id === integranteId ? { ...i, [field]: value } : i
            ),
          };
        }),
      },
    });
  };

  const handleRemoveIntegrante = (patrullaId: string, integranteId: string) => {
    onChangeCiclo({
      ...ciclo,
      diagnostico: {
        ...diagnostico,
        patrullas: diagnostico.patrullas.map((p) => {
          if (p.id !== patrullaId) return p;
          return {
            ...p,
            integrantes: p.integrantes.filter((i) => i.id !== integranteId),
          };
        }),
      },
    });
  };

  const totalChicos = diagnostico.patrullas.reduce(
    (acc, p) => acc + p.integrantes.length,
    0
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-600" />
          Paso 2: Diagnóstico de la Rama y Conformación de Patrullas
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Completá el estado de la rama, los chicos por patrulla con sus etapas de progresión, y situaciones particulares a acompañar.
        </p>
      </div>

      {/* Resumen cuantitativo y altas/bajas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Composición Numérica y Altas / Bajas
          </h3>
          <div className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-3 py-1 rounded-full border border-emerald-200">
            Total en patrullas: {totalChicos} chicos/as
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Descripción de altas, pases de rama y situación actual
          </label>
          <textarea
            rows={3}
            value={diagnostico.altasBajasTexto}
            onChange={(e) =>
              onChangeCiclo({
                ...ciclo,
                diagnostico: { ...diagnostico, altasBajasTexto: e.target.value },
              })
            }
            placeholder="Ej: La Unidad está conformada por 31 protagonistas en 4 patrullas. Despedimos a 5 que pasaron a Caminantes y recibimos 16 de Manada..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Patrullas e Integrantes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Patrullas / Equipos y Etapas de Progresión
            </h3>
            <p className="text-xs text-slate-500">
              Esta información alimentará automáticamente la tabla de patrullas del documento Word.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddPatrulla}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Patrulla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diagnostico.patrullas.map((patrulla) => (
            <div
              key={patrulla.id}
              className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <input
                  type="text"
                  value={patrulla.nombre}
                  onChange={(e) =>
                    handleUpdatePatrullaNombre(patrulla.id, e.target.value)
                  }
                  placeholder="Nombre de patrulla (ej. Halcones)"
                  className="font-bold text-slate-800 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500 rounded px-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePatrulla(patrulla.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded"
                  title="Eliminar patrulla"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lista de integrantes */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {patrulla.integrantes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2 text-center">
                    Sin integrantes asignados
                  </p>
                ) : (
                  patrulla.integrantes.map((int) => (
                    <div
                      key={int.id}
                      className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-slate-200 text-xs shadow-2xs"
                    >
                      <input
                        type="text"
                        value={int.nombre}
                        onChange={(e) =>
                          handleUpdateIntegrante(
                            patrulla.id,
                            int.id,
                            'nombre',
                            e.target.value
                          )
                        }
                        placeholder="Nombre y Apellido"
                        className="flex-1 px-2 py-1 rounded border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 bg-slate-50/30"
                      />
                      <select
                        value={int.etapa}
                        onChange={(e) =>
                          handleUpdateIntegrante(
                            patrulla.id,
                            int.id,
                            'etapa',
                            e.target.value
                          )
                        }
                        className="px-2 py-1 rounded border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 bg-slate-50 font-medium text-slate-700"
                      >
                        <option value="Pistas">Pistas</option>
                        <option value="Rumbo">Rumbo</option>
                        <option value="Senda">Senda</option>
                        <option value="Travesía">Travesía</option>
                        <option value="Huella">Huella</option>
                        <option value="Caza">Caza</option>
                        <option value="Partida">Partida</option>
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveIntegrante(patrulla.id, int.id)
                        }
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Quitar integrante"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={() => handleAddIntegrante(patrulla.id)}
                className="w-full py-1.5 border border-dashed border-emerald-300 rounded-lg text-xs text-emerald-700 font-medium hover:bg-emerald-50 flex items-center justify-center gap-1 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sumar integrante a {patrulla.nombre}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Acompañamiento e Inclusión y Observaciones Grupales */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          Acompañamiento, Inclusión y Dinámicas de Grupo
        </h3>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Situaciones particulares de salud, inclusión o acompañamiento
          </label>
          <textarea
            rows={2}
            value={diagnostico.necesidadesInclusion}
            onChange={(e) =>
              onChangeCiclo({
                ...ciclo,
                diagnostico: {
                  ...diagnostico,
                  necesidadesInclusion: e.target.value,
                },
              })
            }
            placeholder="Ej: Actualmente acompañamos a un protagonista con mutismo selectivo, dos con diagnóstico en el espectro autista y uno con TDA..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Observaciones grupales (Sistema de patrullas, relaciones interpersonales, compromiso)
          </label>
          <textarea
            rows={2}
            value={diagnostico.observacionesGrupales}
            onChange={(e) =>
              onChangeCiclo({
                ...ciclo,
                diagnostico: {
                  ...diagnostico,
                  observacionesGrupales: e.target.value,
                },
              })
            }
            placeholder="Ej: A lo largo del ciclo anterior se observó una mejora en las relaciones interpersonales, pero es necesario reforzar el compromiso individual..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>
      </div>
    </div>
  );
};
