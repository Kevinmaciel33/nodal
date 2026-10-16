import React from 'react';
import { Target, Plus, Trash2, Lightbulb } from 'lucide-react';
import type { CicloPrograma, ObjetivoEducativo, AreaCrecimiento } from '../../types';

interface Step4ObjetivosProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step4Objetivos: React.FC<Step4ObjetivosProps> = ({ ciclo, onChangeCiclo }) => {
  const areasDisponibles: AreaCrecimiento[] = [
    'Salud y bienestar',
    'Paz y desarrollo',
    'Habilidades para la vida',
    'Corporalidad',
    'Creatividad',
    'Carácter',
    'Afectividad',
    'Sociabilidad',
    'Espiritualidad',
  ];

  const handleAddObjetivo = (area: AreaCrecimiento = 'Habilidades para la vida') => {
    const nuevoObj: ObjetivoEducativo = {
      id: Date.now().toString(),
      area,
      numeroCodigo: (ciclo.objetivos.length + 1).toString(),
      enunciadoOficial: '',
      metaEspecifica: '',
    };
    onChangeCiclo({
      ...ciclo,
      objetivos: [...ciclo.objetivos, nuevoObj],
    });
  };

  const handleUpdateObjetivo = (
    id: string,
    field: keyof ObjetivoEducativo,
    val: string
  ) => {
    onChangeCiclo({
      ...ciclo,
      objetivos: ciclo.objetivos.map((o) =>
        o.id === id ? { ...o, [field]: val } : o
      ),
    });
  };

  const handleRemoveObjetivo = (id: string) => {
    onChangeCiclo({
      ...ciclo,
      objetivos: ciclo.objetivos.filter((o) => o.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Paso 4: Objetivos Educativos y Áreas de Crecimiento
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Definí las metas educativas que se trabajarán a través de las actividades del ciclo trimestral.
        </p>
      </div>

      {/* Tarjeta de Sugerencia / Ayuda */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3 text-xs text-sky-900">
        <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Recomendación pedagógica:</span> Habitualmente se eligen entre 2 y 4 objetivos centrales para un ciclo de 3 meses, enfocados en áreas complementarias (ej: Salud y bienestar, Paz y desarrollo, Habilidades prácticas de campismo).
        </div>
      </div>

      {/* Lista de Objetivos */}
      <div className="space-y-4">
        {ciclo.objetivos.map((obj, idx) => (
          <div
            key={obj.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-semibold text-sm text-slate-800">
                  Objetivo #{idx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveObjetivo(obj.id)}
                disabled={ciclo.objetivos.length <= 1}
                className="text-slate-400 hover:text-red-600 p-1 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                title="Eliminar objetivo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Área de Crecimiento
                </label>
                <select
                  value={obj.area}
                  onChange={(e) =>
                    handleUpdateObjetivo(obj.id, 'area', e.target.value as AreaCrecimiento)
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-medium"
                >
                  {areasDisponibles.map((a) => (
                    <option key={a} value={a}>
                      Área {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Número / Código Oficial
                </label>
                <input
                  type="text"
                  value={obj.numeroCodigo}
                  onChange={(e) =>
                    handleUpdateObjetivo(obj.id, 'numeroCodigo', e.target.value)
                  }
                  placeholder="Ej: 3 o 17 o 42"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Enunciado Oficial (Manual de objetivos)
                </label>
                <input
                  type="text"
                  value={obj.enunciadoOficial}
                  onChange={(e) =>
                    handleUpdateObjetivo(obj.id, 'enunciadoOficial', e.target.value)
                  }
                  placeholder="Ej: Reconozco y expreso mis emociones..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Meta formativa concreta para este ciclo
              </label>
              <textarea
                rows={2}
                value={obj.metaEspecifica}
                onChange={(e) =>
                  handleUpdateObjetivo(obj.id, 'metaEspecifica', e.target.value)
                }
                placeholder="Ej: Que los protagonistas logren entablar vínculos positivos dentro de su patrulla, fortaleciendo el compañerismo y el trabajo en equipo..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botón Añadir Objetivo */}
      <button
        type="button"
        onClick={() => handleAddObjetivo()}
        className="w-full py-3 border-2 border-dashed border-emerald-300 rounded-2xl text-sm font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Agregar Nuevo Objetivo al Ciclo</span>
      </button>
    </div>
  );
};
