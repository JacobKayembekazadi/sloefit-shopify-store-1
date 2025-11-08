import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ goal: "", frequency: "", preference: "" });

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Build Your Routine</h1>
            <p className="text-muted-foreground">Answer 3 quick questions to get personalized recommendations</p>
          </div>

          <Card className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">What's your primary goal?</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('goal', 'strength')}>
                    Build Strength
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('goal', 'fat-loss')}>
                    Lose Fat
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('goal', 'maintain')}>
                    Stay Lean & Energized
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">How often do you train?</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('frequency', '2-3x')}>
                    2-3x per week
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('frequency', '4-5x')}>
                    4-5x per week
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-lg h-auto py-4" onClick={() => handleAnswer('frequency', '6-7x')}>
                    6-7x per week
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Your recommendation is ready!</h2>
                <div className="p-6 rounded-lg bg-primary/10 border border-primary">
                  <h3 className="text-xl font-bold mb-2">
                    {answers.goal === 'strength' ? 'Strength System' : answers.goal === 'fat-loss' ? 'Shred System' : 'Daily Base System'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Based on your goals, we recommend this stack to help you get results.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Add to Cart <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
