import React, { useState, useEffect } from 'react';
import type { CicloPrograma } from './types';
import { EJEMPLO_ARCHIVO_TORMENTAS } from './data/presets';
import { Header } from './components/Header';
import { StepNavigation, StepFooter } from './components/StepNavigation';
import { Step1General } from './components/steps/Step1General';
import { Step2Diagnostico } from './components/steps/Step2Diagnostico';
import { Step3MarcoSimbolico } from './components/steps/Step3MarcoSimbolico';
import { Step4Objetivos } from './components/steps/Step4Objetivos';
import { Step5Calendario } from './components/steps/Step5Calendario';
import { Step6Actividades } from './components/steps/Step6Actividades';
import { Step7Export } from './components/steps/Step7Export';

const STORAGE_KEY = 'nodal_ciclo_programa_draft';

export const App: React.FC = () => {
  // Cargar estado inicial desde localStorage o arrancar con el ejemplo completo
  const [ciclo, setCiclo] = useState<CicloPrograma>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error al recuperar borrador de localStorage', e);
    }
    return EJEMPLO_ARCHIVO_TORMENTAS;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Autoguardado en tiempo real en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ciclo));
    } catch (e) {
      console.error('Error al autoguardar en localStorage', e);
    }
  }, [ciclo]);

  // Navegación
  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(7, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1General ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 2:
        return <Step2Diagnostico ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 3:
        return <Step3MarcoSimbolico ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 4:
        return <Step4Objetivos ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 5:
        return <Step5Calendario ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 6:
        return <Step6Actividades ciclo={ciclo} onChangeCiclo={setCiclo} />;
      case 7:
        return <Step7Export ciclo={ciclo} onChangeCiclo={setCiclo} />;
      default:
        return <Step1General ciclo={ciclo} onChangeCiclo={setCiclo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Cabecera */}
      <Header ciclo={ciclo} onChangeCiclo={setCiclo} />

      {/* Navegación por Pasos (Wizard) */}
      <StepNavigation
        currentStep={currentStep}
        onSelectStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {renderActiveStep()}
      </main>

      {/* Pie de navegación Siguiente / Anterior */}
      <StepFooter
        currentStep={currentStep}
        totalSteps={7}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default App;
