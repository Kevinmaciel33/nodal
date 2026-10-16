import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Wand2, AlertCircle } from 'lucide-react';
import type { CicloPrograma, JornadaSabado } from '../../types';

interface Step5CalendarioProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step5Calendario: React.FC<Step5CalendarioProps> = ({ ciclo, onChangeCiclo }) => {
  const [fechaInicio, setFechaInicio] = useState('2025-05-17');
  const [cantidadSemanas, setCantidadSemanas] = useState(16);

  const handleGenerarSábados = () => {
    if (!fechaInicio) {
      alert('Por favor seleccioná una fecha de inicio.');
      return;
    }

    if (
      ciclo.jornadas.length > 0 &&
      !window.confirm(
        'Ya tenés jornadas cargadas. ¿Deseas regenerar la lista de sábados? Las actividades existentes se reemplazarán por la nueva grilla de fechas.'
      )
    ) {
      return;
    }

    // Calcular sábados
    const baseDate = new Date(fechaInicio + 'T12:00:00');
    const nuevasJornadas: JornadaSabado[] = [];

    for (let i = 0; i < cantidadSemanas; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i * 7);

      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const fechaStr = `${dia}/${mes}`;

      nuevasJornadas.push({
        id: `jornada-${i + 1}-${Date.now()}`,
        numeroSemana: i + 1,
        fecha: fechaStr,
        sinActividad: false,
        resumenActividad: i === 0 ? 'Inicio de ciclo' : i === cantidadSemanas - 1 ? 'Promesas / Cierre de ciclo' : 'Actividad ordinaria',
        actividades: [],
      });
    }

    onChangeCiclo({
      ...ciclo,
      jornadas: nuevasJornadas,
    });
  };

  const handleUpdateJornada = (
    id: string,
    field: keyof JornadaSabado,
    value: any
  ) => {
    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.map((j) => (j.id === id ? { ...j, [field]: value } : j)),
    });
  };

  const handleToggleSinActividad = (id: string, sinActividad: boolean) => {
    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.map((j) => {
        if (j.id !== id) return j;
        return {
          ...j,
          sinActividad,
          motivoSinActividad: sinActividad
            ? j.motivoSinActividad || 'Campamento / Feriado'
            : undefined,
          resumenActividad: sinActividad
            ? `${j.motivoSinActividad || 'Feriado'} (NO HAY ACTIVIDAD)`
            : j.resumenActividad.replace(' (NO HAY ACTIVIDAD)', ''),
        };
      }),
    });
  };

  const handleAddJornadaManual = () => {
    const num = ciclo.jornadas.length + 1;
    const nueva: JornadaSabado = {
      id: `jornada-${Date.now()}`,
      numeroSemana: num,
      fecha: 'Fecha',
      sinActividad: false,
      resumenActividad: 'Nueva reunión',
      actividades: [],
    };
    onChangeCiclo({
      ...ciclo,
      jornadas: [...ciclo.jornadas, nueva],
    });
  };

  const handleRemoveJornada = (id: string) => {
    onChangeCiclo({
      ...ciclo,
      jornadas: ciclo.jornadas.filter((j) => j.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          Paso 5: Constructor de Calendario Trimestral
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Generá la grilla de todos los sábados del trimestre, identificá los días con actividad normal y marcá feriados, campamentos o aniversarios.
        </p>
      </div>

      {/* Generador Rápido de Sábados */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
          <Wand2 className="w-4 h-4 text-emerald-600" />
          Autocompletar Grilla de Sábados
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Fecha del Primer Sábado
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Cantidad de Semanas (Sábados)
            </label>
            <input
              type="number"
              min={4}
              max={26}
              value={cantidadSemanas}
              onChange={(e) => setCantidadSemanas(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerarSábados}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
            <span>Calcular Sábados</span>
          </button>
        </div>
      </div>

      {/* Lista de Sábados / Grilla */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Grilla de Sábados ({ciclo.jornadas.length} jornadas planificadas)
            </h3>
            <p className="text-xs text-slate-500">
              Esta lista genera la tabla resumen del Word para consulta rápida de los dirigentes.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddJornadaManual}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Sábado</span>
          </button>
        </div>

        {ciclo.jornadas.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Aún no hay sábados en el calendario.</p>
            <p className="text-xs text-slate-400 mt-1">
              Usá el generador superior o agregá sábados manualmente.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {ciclo.jornadas.map((jornada, idx) => (
              <div
                key={jornada.id}
                className={`p-3 rounded-xl border transition-all flex flex-wrap items-center gap-3 ${
                  jornada.sinActividad
                    ? 'bg-red-50/50 border-red-200'
                    : 'bg-slate-50/50 border-slate-200'
                }`}
              >
                {/* Número y Fecha */}
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={jornada.fecha}
                    onChange={(e) => handleUpdateJornada(jornada.id, 'fecha', e.target.value)}
                    placeholder="DD/MM"
                    className="w-16 px-2 py-1 text-xs font-bold rounded border border-slate-300 bg-white text-center focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Checkbox Sin Actividad */}
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jornada.sinActividad}
                    onChange={(e) => handleToggleSinActividad(jornada.id, e.target.checked)}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span>¿Día sin actividad?</span>
                </label>

                {/* Título o Motivo */}
                <div className="flex-1 min-w-[200px]">
                  {jornada.sinActividad ? (
                    <input
                      type="text"
                      value={jornada.motivoSinActividad || ''}
                      onChange={(e) => {
                        handleUpdateJornada(jornada.id, 'motivoSinActividad', e.target.value);
                        handleUpdateJornada(jornada.id, 'resumenActividad', `${e.target.value} (NO HAY ACTIVIDAD)`);
                      }}
                      placeholder="Motivo (ej: Campamento de dirigentes / Feriado / Aniversario)"
                      className="w-full px-3 py-1.5 text-xs font-semibold text-red-700 rounded-lg border border-red-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-red-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={jornada.resumenActividad}
                      onChange={(e) => handleUpdateJornada(jornada.id, 'resumenActividad', e.target.value)}
                      placeholder="Actividad principal / Temática (ej. Nudos y amarres, Fuegos de cocina)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  )}
                </div>

                {/* Eliminar fila */}
                <button
                  type="button"
                  onClick={() => handleRemoveJornada(jornada.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded"
                  title="Eliminar sábado"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
