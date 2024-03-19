'use client';
import React from 'react';
import StepHeader from './step-header';

function MigratePage() {
  const [activeStep, setActiveStep] = React.useState(0);

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div>
      <StepHeader />
    </div>
  );
}

export default MigratePage;
