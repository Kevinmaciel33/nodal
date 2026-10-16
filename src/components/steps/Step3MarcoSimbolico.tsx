import React from 'react';
import { BookOpen, Sparkles, Feather, HelpCircle } from 'lucide-react';
import type { CicloPrograma } from '../../types';

interface Step3MarcoSimbolicoProps {
  ciclo: CicloPrograma;
  onChangeCiclo: (nuevo: CicloPrograma) => void;
}

export const Step3MarcoSimbolico: React.FC<Step3MarcoSimbolicoProps> = ({ ciclo, onChangeCiclo }) => {
  const marco = ciclo.marcoSimbolico;

  const handleUpdate = (field: keyof typeof marco, value: string) => {
    onChangeCiclo({
      ...ciclo,
      marcoSimbolico: {
        ...marco,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Paso 3: Marco Simbólico e Historia Motivadora
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          El marco simbólico brinda la mística, el ambiente de aventura y el sentido a las actividades del ciclo (ej: Caballeros Radiantes, Selva, El Principito, etc.).
        </p>
      </div>

      {/* Lema */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
          Lema o Nombre del Ciclo
        </label>
        <div className="relative">
          <input
            type="text"
            value={marco.lemaCiclo}
            onChange={(e) => handleUpdate('lemaCiclo', e.target.value)}
            placeholder="Ej: “Viaje antes que destino: Radiantes en camino”"
            className="w-full pl-9 pr-3 py-2.5 text-base font-medium rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
          <Sparkles className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Sinopsis de la Historia */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Feather className="w-4 h-4 text-emerald-600" />
            Sinopsis / Historia Motivadora
          </h3>
          <span className="text-xs text-slate-400">Podés usar párrafos separados</span>
        </div>

        <div>
          <textarea
            rows={6}
            value={marco.sinopsis}
            onChange={(e) => handleUpdate('sinopsis', e.target.value)}
            placeholder="Escribí aquí el relato o mundo imaginario que inspirará a los chicos durante este período (ej. la historia de los Caballeros Radiantes en las Llanuras Quebradas, la vida en la selva con Mowgli, etc.)."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Analogía con la Promesa y Ley Scout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-slate-800">
            Conexión Pedagógica con la Promesa y la Ley Scout
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          ¿Cómo se refleja la historia en la vida real de los chicos? (Por ejemplo: cómo los juramentos de los personajes equivalen a la Promesa Scout y al compromiso diario).
        </p>

        <div>
          <textarea
            rows={5}
            value={marco.analogiaLeyPromesa}
            onChange={(e) => handleUpdate('analogiaLeyPromesa', e.target.value)}
            placeholder="Ej: La meta es que los protagonistas puedan 'volver a nombrar los juramentos' como símbolo de renovar su Promesa Scout. Usaremos la historia de los personajes y sus valores como espejo..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>
      </div>
    </div>
  );
};
