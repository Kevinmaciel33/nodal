import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Users, 
  Calendar, 
  Flame, 
  Plus, 
  Trash2,
  Gamepad2
} from 'lucide-react';
import type { CicloPrograma, Anexo, TarjetaJuego } from '../../types';
import { exportarCicloADocx } from '../../services/docxExport';

interface Step7ExportProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step7Export: React.FC<Step7ExportProps> = ({ ciclo, onChangeCiclo }) => {
  const [generandoWord, setGenerandoWord] = useState(false);
  const [descargadoExitoso, setDescargadoExitoso] = useState(false);

  // Estadísticas
  const totalPatrullas = ciclo.diagnostico.patrullas.length;
  const totalChicos = ciclo.diagnostico.patrullas.reduce(
    (acc, p) => acc + p.integrantes.length,
    0
  );
  const totalSemanas = ciclo.jornadas.length;
  const totalActividades = ciclo.jornadas.reduce(
    (acc, j) => acc + j.actividades.length,
    0
  );

  const handleDescargarDocx = async () => {
    try {
      setGenerandoWord(true);
      await exportarCicloADocx(ciclo);
      setDescargadoExitoso(true);
      setTimeout(() => setDescargadoExitoso(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al generar el archivo Word.');
    } finally {
      setGenerandoWord(false);
    }
  };

  const handleAddAnexoJuego = () => {
    const nuevoAnexo: Anexo = {
      id: Date.now().toString(),
      titulo: 'Juego especial de la Ley Scout',
      objetivo: 'Reforzar las decisiones responsables en equipo.',
      edadRecomendada: '10 a 14 años',
      materiales: 'Tarjetas de preguntas y tablero',
      reglas: 'Responder las situaciones y avanzar en equipo.',
      tarjetas: [
        {
          id: 't1',
          situacion: 'Ves a un compañero solo en el campamento.',
          respuestaSugerida: 'Me acerco y lo integro a la actividad.',
        },
      ],
    };
    onChangeCiclo({
      ...ciclo,
      anexos: [...(ciclo.anexos || []), nuevoAnexo],
    });
  };

  const handleAddTarjetaAnexo = (anexoId: string) => {
    const nuevaTarjeta: TarjetaJuego = {
      id: Date.now().toString(),
      situacion: '',
      respuestaSugerida: '',
    };
    onChangeCiclo({
      ...ciclo,
      anexos: ciclo.anexos.map((a) =>
        a.id === anexoId ? { ...a, tarjetas: [...a.tarjetas, nuevaTarjeta] } : a
      ),
    });
  };

  const handleUpdateTarjeta = (
    anexoId: string,
    tarjetaId: string,
    field: 'situacion' | 'respuestaSugerida',
    val: string
  ) => {
    onChangeCiclo({
      ...ciclo,
      anexos: ciclo.anexos.map((a) => {
        if (a.id !== anexoId) return a;
        return {
          ...a,
          tarjetas: a.tarjetas.map((t) =>
            t.id === tarjetaId ? { ...t, [field]: val } : t
          ),
        };
      }),
    });
  };

  const handleRemoveAnexo = (anexoId: string) => {
    onChangeCiclo({
      ...ciclo,
      anexos: ciclo.anexos.filter((a) => a.id !== anexoId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-600" />
          Paso 7: Resumen, Anexos y Exportación a Word (.docx)
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Revisá el resumen de tu ciclo de programa y descargá el archivo Word formateado listo para presentar.
        </p>
      </div>

      {/* Banner de Descarga Principal */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-2">
            Planificación Lista
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Descargar Documento Word (.docx)
          </h3>
          <p className="text-sm text-emerald-100 mt-2">
            Genera un documento Word con encabezados, tablas institucionales de patrullas, calendario y fichas de actividad formateadas profesionalmente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleDescargarDocx}
            disabled={generandoWord}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-bold text-base hover:bg-emerald-50 active:scale-98 transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-5 h-5 text-emerald-700" />
            <span>
              {generandoWord ? 'Generando documento...' : 'Descargar Planificación (.docx)'}
            </span>
          </button>

          {descargadoExitoso && (
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/30 text-white border border-white/20 text-sm font-semibold animate-fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span>¡Archivo descargado con éxito!</span>
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de Estadísticas del Ciclo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
          <Calendar className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <div className="text-2xl font-extrabold text-slate-800">{totalSemanas}</div>
          <div className="text-xs text-slate-500 font-medium">Sábados Planificados</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
          <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-extrabold text-slate-800">{totalActividades}</div>
          <div className="text-xs text-slate-500 font-medium">Actividades Detalladas</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
          <Users className="w-5 h-5 text-sky-600 mx-auto mb-1" />
          <div className="text-2xl font-extrabold text-slate-800">{totalChicos}</div>
          <div className="text-xs text-slate-500 font-medium">Chicos en {totalPatrullas} Patrullas</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
          <Sparkles className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-2xl font-extrabold text-slate-800">{ciclo.objetivos.length}</div>
          <div className="text-xs text-slate-500 font-medium">Objetivos Educativos</div>
        </div>
      </div>

      {/* Gestión de Anexos (Juegos, Preguntas, Dinámicas) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-emerald-600" />
              Anexos Opcionales (Juegos Mayores, Tarjetas de Preguntas)
            </h3>
            <p className="text-xs text-slate-500">
              Podés incorporar tarjetas de dilemas scout, tableros o reglamentos de juegos como en el ejemplo.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddAnexoJuego}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Anexo / Juego</span>
          </button>
        </div>

        {ciclo.anexos && ciclo.anexos.length > 0 ? (
          <div className="space-y-4">
            {ciclo.anexos.map((anexo) => (
              <div
                key={anexo.id}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <input
                    type="text"
                    value={anexo.titulo}
                    onChange={(e) =>
                      onChangeCiclo({
                        ...ciclo,
                        anexos: ciclo.anexos.map((a) =>
                          a.id === anexo.id ? { ...a, titulo: e.target.value } : a
                        ),
                      })
                    }
                    placeholder="Título del anexo (ej. Juego de la vida scout)"
                    className="font-bold text-sm text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAnexo(anexo.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-500">Objetivo del juego:</label>
                    <input
                      type="text"
                      value={anexo.objetivo || ''}
                      onChange={(e) =>
                        onChangeCiclo({
                          ...ciclo,
                          anexos: ciclo.anexos.map((a) =>
                            a.id === anexo.id ? { ...a, objetivo: e.target.value } : a
                          ),
                        })
                      }
                      className="w-full px-2 py-1 rounded border border-slate-200 bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500">Reglas básicas:</label>
                    <input
                      type="text"
                      value={anexo.reglas || ''}
                      onChange={(e) =>
                        onChangeCiclo({
                          ...ciclo,
                          anexos: ciclo.anexos.map((a) =>
                            a.id === anexo.id ? { ...a, reglas: e.target.value } : a
                          ),
                        })
                      }
                      className="w-full px-2 py-1 rounded border border-slate-200 bg-white mt-0.5"
                    />
                  </div>
                </div>

                {/* Tarjetas de preguntas */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Tarjetas de Situación / Preguntas ({anexo.tarjetas.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddTarjetaAnexo(anexo.id)}
                      className="text-xs text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Sumar tarjeta</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {anexo.tarjetas.map((t, idx) => (
                      <div
                        key={t.id}
                        className="bg-white p-2 rounded-lg border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-400">T{idx + 1}:</span>
                          <input
                            type="text"
                            value={t.situacion}
                            onChange={(e) =>
                              handleUpdateTarjeta(anexo.id, t.id, 'situacion', e.target.value)
                            }
                            placeholder="Situación (ej: Ves a un scout solo en una actividad...)"
                            className="flex-1 px-2 py-0.5 border border-slate-200 rounded"
                          />
                        </div>
                        <input
                          type="text"
                          value={t.respuestaSugerida}
                          onChange={(e) =>
                            handleUpdateTarjeta(
                              anexo.id,
                              t.id,
                              'respuestaSugerida',
                              e.target.value
                            )
                          }
                          placeholder="Respuesta sugerida / valor scout..."
                          className="w-full px-2 py-0.5 border border-slate-100 rounded italic text-slate-600 bg-slate-50/50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No hay anexos agregados (opcional).</p>
        )}
      </div>

      {/* Previsualización del Documento (Hoja A4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            Vista Previa de Estructura del Documento
          </h3>
          <span className="text-xs text-slate-400">Previsualización fiel al Word</span>
        </div>

        {/* Hoja simulada */}
        <div className="bg-slate-50/80 rounded-xl p-6 sm:p-8 border border-slate-200 font-serif text-slate-800 text-xs sm:text-sm space-y-4 max-h-96 overflow-y-auto">
          <div className="text-center space-y-1">
            <div className="font-bold text-base tracking-wide uppercase">
              {ciclo.nombreRama}
            </div>
            <div className="text-slate-600">{ciclo.grupoScout}</div>
            <div className="font-semibold text-slate-900 pt-1">Ciclo de programa</div>
            <div className="italic text-slate-700 font-medium">
              {ciclo.marcoSimbolico.lemaCiclo || '“Sin lema”'}
            </div>
            <div className="text-xs text-slate-500 font-sans">{ciclo.periodoFechas}</div>
          </div>

          <div className="border-t border-slate-300 pt-3 space-y-2">
            <div className="font-sans font-bold text-slate-900 uppercase tracking-wider text-xs">
              Diagnóstico
            </div>
            <p className="text-justify text-slate-700 leading-relaxed font-sans text-xs">
              El equipo dirigente se encuentra conformado por{' '}
              {ciclo.equipoEducadores.map((e) => `${e.nombre} (${e.rol})`).join(', ')}.
            </p>
            {ciclo.diagnostico.altasBajasTexto && (
              <p className="text-justify text-slate-700 leading-relaxed font-sans text-xs">
                {ciclo.diagnostico.altasBajasTexto}
              </p>
            )}
          </div>

          <div className="border-t border-slate-300 pt-3 space-y-2">
            <div className="font-sans font-bold text-slate-900 uppercase tracking-wider text-xs">
              Marco Simbólico
            </div>
            <p className="text-justify text-slate-700 leading-relaxed font-sans text-xs line-clamp-3">
              {ciclo.marcoSimbolico.sinopsis || 'Sin sinopsis cargada.'}
            </p>
          </div>

          <div className="border-t border-slate-300 pt-3 space-y-2">
            <div className="font-sans font-bold text-slate-900 uppercase tracking-wider text-xs">
              Calendario ({ciclo.jornadas.length} Sábados)
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs font-sans">
              {ciclo.jornadas.slice(0, 8).map((j) => (
                <div key={j.id} className="flex justify-between py-0.5 border-b border-slate-200">
                  <span className="font-bold">{j.fecha}:</span>
                  <span className="truncate max-w-[140px] text-slate-600">
                    {j.sinActividad ? j.motivoSinActividad || 'Sin actividad' : j.resumenActividad}
                  </span>
                </div>
              ))}
              {ciclo.jornadas.length > 8 && (
                <div className="text-xs text-slate-400 italic py-1 col-span-2">
                  ... y {ciclo.jornadas.length - 8} sábados más en el documento descargable.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
