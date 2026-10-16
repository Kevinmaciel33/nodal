import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  BookOpen, 
  Target, 
  Calendar, 
  Flame, 
  FileCheck2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STEPS: StepItem[] = [
  { id: 1, label: '1. Datos y Equipo', shortLabel: 'Equipo', icon: Users },
  { id: 2, label: '2. Diagnóstico y Patrullas', shortLabel: 'Patrullas', icon: ShieldAlert },
  { id: 3, label: '3. Marco Simbólico', shortLabel: 'Marco', icon: BookOpen },
  { id: 4, label: '4. Objetivos del Ciclo', shortLabel: 'Objetivos', icon: Target },
  { id: 5, label: '5. Calendario Trimestral', shortLabel: 'Sábados', icon: Calendar },
  { id: 6, label: '6. Fichas de Actividad', shortLabel: 'Actividades', icon: Flame },
  { id: 7, label: '7. Vista Previa y Word', shortLabel: 'Exportar', icon: FileCheck2 },
];

interface StepNavigationProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, onSelectStep }) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-2">
        {/* Barra de Pasos Deslizable / Responsive */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1 py-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-emerald-200 text-emerald-900 font-bold'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface StepFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}

export const StepFooter: React.FC<StepFooterProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
}) => {
  return (
    <div className="bg-white border-t border-slate-200 py-3 px-4 sticky bottom-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <span className="text-xs font-medium text-slate-400">
          Paso {currentStep} de {totalSteps}
        </span>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            ✓ ¡Todo listo para exportar!
          </div>
        )}
      </div>
    </div>
  );
};
