import React, { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { text: string; included: boolean }[];
  popular?: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small projects and landing pages.',
    monthlyPrice: 499,
    yearlyPrice: 4490,
    cta: 'Get Started',
    features: [
      { text: 'Single page website', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: 'Contact form integration', included: true },
      { text: '2 revision rounds', included: true },
      { text: 'Source code delivery', included: true },
      { text: 'Custom animations', included: false },
      { text: 'CMS integration', included: false },
      { text: 'E-commerce features', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for businesses needing a complete web presence.',
    monthlyPrice: 999,
    yearlyPrice: 8990,
    cta: 'Get Started',
    popular: true,
    features: [
      { text: 'Multi-page website (up to 8)', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Advanced SEO optimization', included: true },
      { text: 'Contact form + CRM', included: true },
      { text: '5 revision rounds', included: true },
      { text: 'Source code delivery', included: true },
      { text: 'Custom animations', included: true },
      { text: 'CMS integration', included: true },
      { text: 'E-commerce features', included: false },
      { text: 'Priority support', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-scale applications with advanced functionality.',
    monthlyPrice: 2499,
    yearlyPrice: 22490,
    cta: 'Contact Me',
    features: [
      { text: 'Unlimited pages', included: true },
      { text: 'Responsive design', included: true },
      { text: 'Advanced SEO + Analytics', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Unlimited revisions', included: true },
      { text: 'Source code + documentation', included: true },
      { text: 'Custom animations', included: true },
      { text: 'CMS integration', included: true },
      { text: 'E-commerce features', included: true },
      { text: '24/7 Priority support', included: true },
    ],
  },
];

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const handleSelectPlan = (planName: string) => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your project needs. All plans include
            high-quality code and modern design.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-medium ${
                !isYearly ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                isYearly ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  isYearly ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isYearly ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-primary font-semibold">
                Save 25%
              </span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30 ring-2 ring-primary'
                  : 'bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                    <Zap size={12} />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold ${
                    plan.popular ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    plan.popular
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.popular ? 'text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    ${isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.popular
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    /{isYearly ? 'year' : 'project'}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check
                        size={16}
                        className={
                          plan.popular
                            ? 'text-primary-foreground'
                            : 'text-primary'
                        }
                      />
                    ) : (
                      <X
                        size={16}
                        className={
                          plan.popular
                            ? 'text-primary-foreground/30'
                            : 'text-muted-foreground/30'
                        }
                      />
                    )}
                    <span
                      className={
                        feature.included
                          ? plan.popular
                            ? 'text-primary-foreground'
                            : 'text-foreground'
                          : plan.popular
                          ? 'text-primary-foreground/40'
                          : 'text-muted-foreground/50'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
