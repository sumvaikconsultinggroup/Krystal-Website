import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner';
import { createLead } from '../../lib/api';

const steps = [
  { id: 1, title: 'Project Type' },
  { id: 2, title: 'Requirements' },
  { id: 3, title: 'Contact Details' },
];

export default function QuoteModal({ open, onOpenChange }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    productType: '',
    measurements: '',
    preferences: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number');
      return;
    }

    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        city: formData.city || null,
        lead_type: 'quote',
        project_type: formData.projectType,
        measurements: formData.measurements,
        preferences: `Product: ${formData.productType}. ${formData.preferences}`,
        message: formData.message,
      });

      toast.success('Quote request submitted! We\'ll contact you within 24 hours.');
      onOpenChange(false);
      setCurrentStep(1);
      setFormData({
        projectType: '',
        productType: '',
        measurements: '',
        preferences: '',
        name: '',
        phone: '',
        email: '',
        city: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" data-testid="quote-modal">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-serif text-2xl">Get a Free Quote</DialogTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in your details and we'll provide a customized quote within 24 hours.
          </p>
        </DialogHeader>

        <div className="px-6 pt-4">
          <Progress value={progress} className="h-1" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`text-xs ${
                  currentStep >= step.id ? 'text-[hsl(var(--accent))]' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6" data-testid="lead-form">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-medium">Project Type</Label>
                  <RadioGroup
                    value={formData.projectType}
                    onValueChange={(value) => handleChange('projectType', value)}
                    className="grid grid-cols-2 gap-3 mt-2"
                  >
                    {['Residential', 'Commercial', 'Villa', 'Apartment'].map((type) => (
                      <div key={type} className="flex items-center">
                        <RadioGroupItem value={type.toLowerCase()} id={type} className="peer sr-only" />
                        <Label
                          htmlFor={type}
                          className="flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-[hsl(var(--accent))] peer-data-[state=checked]:bg-[hsl(var(--accent))]/5 hover:bg-secondary transition-colors"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium">What are you looking for?</Label>
                  <RadioGroup
                    value={formData.productType}
                    onValueChange={(value) => handleChange('productType', value)}
                    className="grid grid-cols-2 gap-3 mt-2"
                  >
                    {['Windows', 'Doors', 'Both', 'Not Sure'].map((type) => (
                      <div key={type} className="flex items-center">
                        <RadioGroupItem value={type.toLowerCase()} id={`product-${type}`} className="peer sr-only" />
                        <Label
                          htmlFor={`product-${type}`}
                          className="flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-[hsl(var(--accent))] peer-data-[state=checked]:bg-[hsl(var(--accent))]/5 hover:bg-secondary transition-colors"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="measurements">Approximate Number of Openings</Label>
                  <Input
                    id="measurements"
                    placeholder="e.g., 5 windows, 2 doors"
                    value={formData.measurements}
                    onChange={(e) => handleChange('measurements', e.target.value)}
                    className="mt-2"
                    data-testid="lead-form-measurements"
                  />
                </div>

                <div>
                  <Label htmlFor="preferences">Special Requirements (Optional)</Label>
                  <Textarea
                    id="preferences"
                    placeholder="e.g., noise reduction priority, specific colors, budget range..."
                    value={formData.preferences}
                    onChange={(e) => handleChange('preferences', e.target.value)}
                    className="mt-2"
                    rows={3}
                    data-testid="lead-form-preferences"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-2"
                    required
                    data-testid="lead-form-name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="mt-2"
                    required
                    data-testid="lead-form-phone"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-2"
                      data-testid="lead-form-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Gurugram"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6 pt-4 border-t border-border">
            {currentStep > 1 ? (
              <Button variant="ghost" onClick={prevStep} data-testid="lead-form-prev-button">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="btn-accent" data-testid="lead-form-next-button">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-accent"
                data-testid="lead-form-submit-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
