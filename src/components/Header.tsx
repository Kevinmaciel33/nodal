import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, Sparkles } from 'lucide-react';
import type { CicloPrograma, RamaScout } from '../types';
import { EJEMPLO_ARCHIVO_TORMENTAS, createEmptyCiclo } from '../data/presets';

interface HeaderProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Header: React.FC<HeaderProps> = ({ ciclo, onChangeCiclo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCargarEjemplo = () => {
    if (
      window.confirm(
        '¿Deseas cargar el ejemplo real del "Archivo de las Tormentas (Unidad 2025)"? Esto reemplazará los datos actuales.'
      )
    ) {
      onChangeCiclo(EJEMPLO_ARCHIVO_TORMENTAS);
    }
  };

  const handleLimpiar = () => {
    if (window.confirm('¿Deseas vaciar el formulario para comenzar un nuevo ciclo desde cero?')) {
      onChangeCiclo(createEmptyCiclo(ciclo.rama));
    }
  };

  const handleExportarJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(ciclo, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `nodal_borrador_${ciclo.rama}_${ciclo.ano || 2025}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportarJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onChangeCiclo(parsed);
        alert('¡Borrador cargado con éxito!');
      } catch (err) {
        alert('Error al leer el archivo JSON: formato inválido.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const ramasInfo: Record<RamaScout, { label: string; bg: string; text: string; border: string }> = {
    manada: { label: 'Manada', bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
    unidad: { label: 'Unidad Scout', bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' },
    caminantes: { label: 'Caminantes', bg: 'bg-sky-100', text: 'text-sky-900', border: 'border-sky-300' },
    rovers: { label: 'Rovers', bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' },
  };

  const currentRama = ramasInfo[ciclo.rama] || ramasInfo.unidad;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md">
            <span className="text-xl">⚜️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0">Nodal</h1>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${currentRama.bg} ${currentRama.text} ${currentRama.border}`}>
                {currentRama.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 m-0">Generador de Ciclos de Programa Scout</p>
          </div>
        </div>

        {/* Acciones de Cabecera */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Botón Cargar Ejemplo */}
          <button
            type="button"
            onClick={handleCargarEjemplo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors shadow-xs"
            title="Cargar el ciclo de ejemplo real del archivo de las tormentas"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Cargar Ejemplo Real</span>
          </button>

          {/* Importar JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportarJson}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Importar un borrador previo en JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar</span>
          </button>

          {/* Exportar JSON */}
          <button
            type="button"
            onClick={handleExportarJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Guardar borrador en archivo JSON para compartir o continuar luego"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Guardar Borrador</span>
          </button>

          {/* Reiniciar */}
          <button
            type="button"
            onClick={handleLimpiar}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Reiniciar y crear un ciclo vacío"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuevo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
