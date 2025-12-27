import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Progress } from '../components/ui/progress';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { createLead } from '../lib/api';
import { getBreadcrumbSchema, getLocalBusinessSchema } from '../lib/seo';

const steps = [
  { id: 1, title: 'Project' },
  { id: 2, title: 'Requirements' },
  { id: 3, title: 'Schedule' },
  { id: 4, title: 'Contact' },
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    leadType: 'site_visit',
    projectType: '',
    productType: '',
    measurements: '',
    preferences: '',
    preferredDate: '',
    preferredTime: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
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
        lead_type: formData.leadType,
        project_type: formData.projectType,
        measurements: formData.measurements,
        preferences: `Product: ${formData.productType}. Preferred: ${formData.preferredDate} ${formData.preferredTime}. ${formData.preferences}`,
        message: formData.message,
      });

      toast.success('Request submitted! We\'ll contact you within 24 hours to confirm.');
      setCurrentStep(1);
      setFormData({
        leadType: 'site_visit',
        projectType: '',
        productType: '',
        measurements: '',
        preferences: '',
        preferredDate: '',
        preferredTime: '',
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
    <>
      <Helmet>
        <title>Contact Us | Book Site Visit | Krystal Magic World</title>
        <meta name="description" content="Contact Krystal Magic World for uPVC windows and doors. Book a free site visit, get a quote, or call us at +91 98765 43210. Serving Gurugram and Delhi NCR." />
        <link rel="canonical" href="https://krystalmagicworld.com/contact" />
        <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema(breadcrumbs))}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl sm:text-5xl mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Book a free site visit or get a quote. We're here to help you find the perfect solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6 md:p-8" data-testid="lead-form">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl mb-2">Book a Site Visit</h2>
                  <p className="text-sm text-muted-foreground">
                    Fill in your details and we'll schedule a free consultation.
                  </p>
                </div>

                {/* Progress */}
                <Progress value={progress} className="h-1 mb-2" />
                <div className="flex justify-between mb-8">
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

                {/* Step 1: Project Type */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-sm font-medium">I want to:</Label>
                      <RadioGroup
                        value={formData.leadType}
                        onValueChange={(value) => handleChange('leadType', value)}
                        className="grid grid-cols-2 gap-3 mt-2"
                      >
                        {[{ value: 'site_visit', label: 'Book Site Visit' }, { value: 'quote', label: 'Get a Quote' }].map((opt) => (
                          <div key={opt.value} className="flex items-center">
                            <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                            <Label
                              htmlFor={opt.value}
                              className="flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-[hsl(var(--accent))] peer-data-[state=checked]:bg-[hsl(var(--accent))]/5 hover:bg-secondary transition-colors"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Project Type</Label>
                      <RadioGroup
                        value={formData.projectType}
                        onValueChange={(value) => handleChange('projectType', value)}
                        className="grid grid-cols-2 gap-3 mt-2"
                      >
                        {['Residential', 'Commercial', 'Villa', 'Apartment'].map((type) => (
                          <div key={type} className="flex items-center">
                            <RadioGroupItem value={type.toLowerCase()} id={`proj-${type}`} className="peer sr-only" />
                            <Label
                              htmlFor={`proj-${type}`}
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

                {/* Step 2: Requirements */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-sm font-medium">Looking for</Label>
                      <RadioGroup
                        value={formData.productType}
                        onValueChange={(value) => handleChange('productType', value)}
                        className="grid grid-cols-2 gap-3 mt-2"
                      >
                        {['Windows', 'Doors', 'Both', 'Not Sure'].map((type) => (
                          <div key={type} className="flex items-center">
                            <RadioGroupItem value={type.toLowerCase()} id={`prod-${type}`} className="peer sr-only" />
                            <Label
                              htmlFor={`prod-${type}`}
                              className="flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-[hsl(var(--accent))] peer-data-[state=checked]:bg-[hsl(var(--accent))]/5 hover:bg-secondary transition-colors"
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="measurements">Approximate Openings</Label>
                      <Input
                        id="measurements"
                        placeholder="e.g., 5 windows, 2 doors"
                        value={formData.measurements}
                        onChange={(e) => handleChange('measurements', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferences">Special Requirements (Optional)</Label>
                      <Textarea
                        id="preferences"
                        placeholder="e.g., noise reduction, specific colors..."
                        value={formData.preferences}
                        onChange={(e) => handleChange('preferences', e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        className="mt-2"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Preferred Time</Label>
                      <RadioGroup
                        value={formData.preferredTime}
                        onValueChange={(value) => handleChange('preferredTime', value)}
                        className="grid grid-cols-3 gap-3 mt-2"
                      >
                        {['Morning', 'Afternoon', 'Evening'].map((time) => (
                          <div key={time} className="flex items-center">
                            <RadioGroupItem value={time.toLowerCase()} id={`time-${time}`} className="peer sr-only" />
                            <Label
                              htmlFor={`time-${time}`}
                              className="flex items-center justify-center w-full px-4 py-3 border rounded-lg cursor-pointer peer-data-[state=checked]:border-[hsl(var(--accent))] peer-data-[state=checked]:bg-[hsl(var(--accent))]/5 hover:bg-secondary transition-colors"
                            >
                              {time}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
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
                        <Label htmlFor="email">Email</Label>
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

                    <div>
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Any other details..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
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
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+919876543210" className="text-muted-foreground hover:text-foreground">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--accent))] hover:underline"
                      >
                        Chat with us
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@krystalmagicworld.com" className="text-muted-foreground hover:text-foreground">
                        info@krystalmagicworld.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Plot No. 45, Sector 18,<br />
                        Udyog Vihar, Gurugram,<br />
                        Haryana 122015
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[hsl(var(--accent))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.6837968887566!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Krystal Magic World Location"
                ></iframe>
              </div>

              {/* Service Areas */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {['Gurugram', 'Delhi', 'Noida', 'Faridabad', 'Ghaziabad', 'Greater Noida'].map((city) => (
                    <span key={city} className="px-3 py-1 bg-secondary text-sm rounded-full">
                      {city}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
