import React from 'react';
import { Plus, Trash2, Users, Shield, Calendar, Sparkles } from 'lucide-react';
import type { CicloPrograma, RamaScout } from '../../types';

interface Step1GeneralProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step1General: React.FC<Step1GeneralProps> = ({ ciclo, onChangeCiclo }) => {
  const ramas: { id: RamaScout; nombre: string; color: string; desc: string }[] = [
    { id: 'manada', nombre: 'Manada (Lobatos/Lobeznas)', color: 'border-amber-400 bg-amber-50 text-amber-900', desc: '7 a 11 años' },
    { id: 'unidad', nombre: 'Unidad Scout', color: 'border-emerald-500 bg-emerald-50 text-emerald-950', desc: '11 a 14 años' },
    { id: 'caminantes', nombre: 'Comunidad Caminantes', color: 'border-sky-500 bg-sky-50 text-sky-950', desc: '14 a 17 años' },
    { id: 'rovers', nombre: 'Comunidad Rover', color: 'border-rose-500 bg-rose-50 text-rose-950', desc: '17 a 21 años' },
  ];

  const handleAddEducador = () => {
    const nuevoEducador = {
      id: Date.now().toString(),
      nombre: '',
      rol: 'Educador/a Scout',
    };
    onChangeCiclo({
      ...ciclo,
      equipoEducadores: [...ciclo.equipoEducadores, nuevoEducador],
    });
  };

  const handleUpdateEducador = (id: string, field: 'nombre' | 'rol', val: string) => {
    onChangeCiclo({
      ...ciclo,
      equipoEducadores: ciclo.equipoEducadores.map((e) =>
        e.id === id ? { ...e, [field]: val } : e
      ),
    });
  };

  const handleRemoveEducador = (id: string) => {
    onChangeCiclo({
      ...ciclo,
      equipoEducadores: ciclo.equipoEducadores.filter((e) => e.id !== id),
    });
  };

  const ramaDefaults: Record<RamaScout, string> = {
    manada: 'Manada',
    unidad: 'Unidad Scout',
    caminantes: 'Comunidad Caminantes',
    rovers: 'Comunidad Rover',
  };

  return (
    <div className="space-y-6">
      {/* Encabezado del Paso */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Paso 1: Identificación de la Rama y Equipo de Educadores
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Definí los datos institucionales, la rama a la que pertenece la planificación y los miembros del equipo dirigente.
        </p>
      </div>

      {/* Selector de Rama */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Seleccioná la Rama / Sección
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ramas.map((r) => {
            const isSelected = ciclo.rama === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() =>
                  onChangeCiclo({
                    ...ciclo,
                    rama: r.id,
                    nombreRama: ramaDefaults[r.id],
                  })
                }
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? `${r.color} shadow-sm ring-2 ring-emerald-500 ring-offset-1 font-semibold`
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm">{r.nombre}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Formulario de Datos Institucionales */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          Datos Institucionales y Período
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nombre de la Rama / Sección
            </label>
            <input
              type="text"
              value={ciclo.nombreRama}
              onChange={(e) => onChangeCiclo({ ...ciclo, nombreRama: e.target.value })}
              placeholder="Ej: UNIDAD ÑANCU o MANADA WAINGUNGA"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Grupo Scout y Número
            </label>
            <input
              type="text"
              value={ciclo.grupoScout}
              onChange={(e) => onChangeCiclo({ ...ciclo, grupoScout: e.target.value })}
              placeholder="Ej: Grupo Scout San Cayetano 741"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Distrito / Zona
            </label>
            <input
              type="text"
              value={ciclo.distrito}
              onChange={(e) => onChangeCiclo({ ...ciclo, distrito: e.target.value })}
              placeholder="Ej: Distrito 3 - Zona 8"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Período de Fechas y Año
            </label>
            <input
              type="text"
              value={ciclo.periodoFechas}
              onChange={(e) => onChangeCiclo({ ...ciclo, periodoFechas: e.target.value })}
              placeholder="Ej: 17 de mayo a 30 de agosto"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Lema o Frase Motivadora del Ciclo
          </label>
          <div className="relative">
            <input
              type="text"
              value={ciclo.marcoSimbolico.lemaCiclo}
              onChange={(e) =>
                onChangeCiclo({
                  ...ciclo,
                  marcoSimbolico: { ...ciclo.marcoSimbolico, lemaCiclo: e.target.value },
                })
              }
              placeholder="Ej: “Viaje antes que destino: Radiantes en camino”"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
            <Sparkles className="w-4 h-4 text-amber-500 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Equipo de Educadores */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Equipo de Educadores / Dirigentes
            </h3>
            <p className="text-xs text-slate-500">
              Indicá los nombres y roles (ej. Jefa de Rama IM, M.A. en formación, Ayudante).
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddEducador}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Educador</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {ciclo.equipoEducadores.map((educador) => (
            <div
              key={educador.id}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50/40"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={educador.nombre}
                  onChange={(e) => handleUpdateEducador(educador.id, 'nombre', e.target.value)}
                  placeholder="Nombre y Apellido (ej. Lorena Vinjoy)"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={educador.rol}
                  onChange={(e) => handleUpdateEducador(educador.id, 'rol', e.target.value)}
                  placeholder="Rol (ej. Jefa de Rama I.M. o M.A. en formación)"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveEducador(educador.id)}
                disabled={ciclo.equipoEducadores.length <= 1}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                title="Eliminar educador"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
