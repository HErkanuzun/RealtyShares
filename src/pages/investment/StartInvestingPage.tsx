import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconArrowRight, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import { AnimatedCard } from '../../components/ui/animated-card';
import { AnimatedButton } from '../../components/ui/animated-button';

interface InvestmentForm {
  investmentAmount: string;
  investmentType: string;
  riskTolerance: string;
  investmentDuration: string;
}

const initialForm: InvestmentForm = {
  investmentAmount: '',
  investmentType: '',
  riskTolerance: '',
  investmentDuration: '',
};

export const StartInvestingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<InvestmentForm>(initialForm);

  const updateForm = (key: keyof InvestmentForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically submit the form data
    navigate('/market');
  };

  const steps = [
    {
      title: "Investment Amount",
      description: "How much would you like to invest?",
      content: (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              value={form.investmentAmount}
              onChange={(e) => updateForm('investmentAmount', e.target.value)}
              className="input-modern w-full text-2xl pl-8"
              placeholder="Enter amount"
              min="1000"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-light">$</span>
          </div>
          <p className="text-secondary-light text-sm">Minimum investment: $1,000</p>
        </div>
      )
    },
    {
      title: "Investment Type",
      description: "Select your preferred investment type",
      content: (
        <div className="grid gap-4">
          {['Commercial', 'Residential', 'Industrial'].map((type) => (
            <button
              key={type}
              onClick={() => updateForm('investmentType', type)}
              className={`p-4 rounded-lg transition-all ${
                form.investmentType === type
                  ? 'bg-secondary text-white'
                  : 'bg-primary-light text-secondary-light hover:bg-secondary/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Risk Tolerance",
      description: "What's your risk comfort level?",
      content: (
        <div className="grid gap-4">
          {[
            { value: 'conservative', label: 'Conservative (Lower risk, stable returns)' },
            { value: 'moderate', label: 'Moderate (Balanced risk and returns)' },
            { value: 'aggressive', label: 'Aggressive (Higher risk, potential for higher returns)' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateForm('riskTolerance', value)}
              className={`p-4 rounded-lg text-left transition-all ${
                form.riskTolerance === value
                  ? 'bg-secondary text-white'
                  : 'bg-primary-light text-secondary-light hover:bg-secondary/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Investment Duration",
      description: "How long do you plan to invest?",
      content: (
        <div className="grid gap-4">
          {[
            { value: 'short', label: 'Short Term (1-2 years)' },
            { value: 'medium', label: 'Medium Term (3-5 years)' },
            { value: 'long', label: 'Long Term (5+ years)' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateForm('investmentDuration', value)}
              className={`p-4 rounded-lg text-left transition-all ${
                form.investmentDuration === value
                  ? 'bg-secondary text-white'
                  : 'bg-primary-light text-secondary-light hover:bg-secondary/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )
    }
  ];

  const currentStep = steps[step - 1];
  const isLastStep = step === steps.length;
  const canProceed = form[Object.keys(form)[step - 1] as keyof InvestmentForm] !== '';

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedCard className="glass p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-white">{currentStep.title}</h1>
              <span className="text-secondary-light">Step {step} of {steps.length}</span>
            </div>
            <p className="text-secondary-light">{currentStep.description}</p>
          </div>

          <div className="mb-8">
            {currentStep.content}
          </div>

          <div className="flex justify-between">
            <AnimatedButton
              onClick={() => setStep(prev => prev - 1)}
              className="btn-secondary flex items-center gap-2"
              disabled={step === 1}
            >
              <IconArrowLeft size={20} />
              Back
            </AnimatedButton>

            <AnimatedButton
              onClick={() => isLastStep ? handleSubmit() : setStep(prev => prev + 1)}
              className="btn-primary flex items-center gap-2"
              disabled={!canProceed}
            >
              {isLastStep ? (
                <>
                  Complete
                  <IconCheck size={20} />
                </>
              ) : (
                <>
                  Next
                  <IconArrowRight size={20} />
                </>
              )}
            </AnimatedButton>
          </div>
        </AnimatedCard>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index + 1 === step
                    ? 'bg-secondary'
                    : index + 1 < step
                    ? 'bg-secondary-light'
                    : 'bg-primary-light'
                }`}
                animate={{
                  scale: index + 1 === step ? 1.2 : 1
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};