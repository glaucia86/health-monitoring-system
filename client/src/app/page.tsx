'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import {
  Heart,
  Activity,
  Shield,
  Users,
  Stethoscope,
  User,
  Bell,
  Calendar,
  LineChart,
  Clock,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Lock,
  MessageCircle,
  FileText,
  Pill,
  HeartPulse,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { m } from '@/lib/motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn,
} from '@/lib/motion';

// Stats data
const stats = [
  { value: '10k+', label: 'Usuários ativos' },
  { value: '50k+', label: 'Registros diários' },
  { value: '99.9%', label: 'Uptime garantido' },
  { value: '24/7', label: 'Suporte disponível' },
];

// Main features
const features = [
  {
    icon: Activity,
    title: 'Monitoramento Contínuo',
    description: 'Registre e acompanhe seus dados vitais com gráficos intuitivos e alertas personalizados em tempo real.',
  },
  {
    icon: Shield,
    title: 'Segurança de Dados',
    description: 'Suas informações médicas são criptografadas com AES-256 e protegidas com os mais altos padrões de segurança.',
  },
  {
    icon: Users,
    title: 'Conexão com Médicos',
    description: 'Compartilhe facilmente seu histórico com profissionais de saúde para diagnósticos mais precisos.',
  },
  {
    icon: Bell,
    title: 'Lembretes Inteligentes',
    description: 'Receba notificações para medicamentos, consultas e exames programados automaticamente.',
  },
  {
    icon: LineChart,
    title: 'Relatórios Detalhados',
    description: 'Visualize tendências de saúde com gráficos interativos e exporte relatórios em PDF.',
  },
  {
    icon: Calendar,
    title: 'Agenda Integrada',
    description: 'Gerencie consultas, exames e compromissos de saúde em um calendário unificado.',
  },
];

// How it works steps
const steps = [
  {
    number: '01',
    title: 'Crie sua conta',
    description: 'Cadastre-se gratuitamente em menos de 2 minutos com seus dados básicos.',
  },
  {
    number: '02',
    title: 'Configure seu perfil',
    description: 'Adicione informações de saúde, medicamentos e contatos de emergência.',
  },
  {
    number: '03',
    title: 'Monitore sua saúde',
    description: 'Registre sinais vitais, acompanhe gráficos e receba alertas personalizados.',
  },
  {
    number: '04',
    title: 'Compartilhe com médicos',
    description: 'Exporte relatórios e permita acesso seguro aos profissionais de saúde.',
  },
];

// Testimonials
const testimonials = [
  {
    quote: 'O HealthMonitor mudou a forma como cuido da saúde da minha mãe. Os alertas de medicação são essenciais!',
    author: 'Maria Silva',
    role: 'Cuidadora Familiar',
    avatar: 'MS',
  },
  {
    quote: 'Como enfermeiro, ter acesso ao histórico completo dos pacientes em um só lugar facilita muito meu trabalho.',
    author: 'Carlos Santos',
    role: 'Enfermeiro',
    avatar: 'CS',
  },
  {
    quote: 'Finalmente consigo acompanhar minha pressão e glicose de forma organizada. Recomendo a todos!',
    author: 'Ana Oliveira',
    role: 'Paciente',
    avatar: 'AO',
  },
];

// Benefits for each role
const rolesBenefits = {
  caregiver: [
    { icon: HeartPulse, text: 'Monitoramento de múltiplos pacientes' },
    { icon: Bell, text: 'Alertas de medicação e consultas' },
    { icon: FileText, text: 'Relatórios detalhados de saúde' },
    { icon: MessageCircle, text: 'Comunicação direta com pacientes' },
  ],
  patient: [
    { icon: Smartphone, text: 'Acesso fácil pelo celular' },
    { icon: Pill, text: 'Lembretes de medicação' },
    { icon: Lock, text: 'Dados protegidos e privados' },
    { icon: Calendar, text: 'Agenda de consultas integrada' },
  ],
};

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Redirect authenticated users to dashboard (FR-013)
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen flex-col bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-6 w-6 fill-primary" />
            <span className="text-lg font-bold">HealthMonitor</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como funciona
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Depoimentos
            </a>
          </nav>
          <nav>
            {isAuthenticated ? (
              <Button asChild>
                <Link href="/dashboard">Ir para Dashboard</Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container mx-auto flex flex-col items-center justify-center gap-8 py-20 md:py-32 text-center px-4 relative z-10"
          >
            <m.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-primary/10 text-primary">
              <HeartPulse className="h-4 w-4" />
              <span>Plataforma completa de monitoramento de saúde</span>
            </m.div>

            <m.div variants={fadeInUp} className="space-y-4 max-w-4xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Cuidado e monitoramento{' '}
                <span className="text-primary relative">
                  inteligente
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 150 2 298 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                  </svg>
                </span>{' '}
                para sua saúde
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Acompanhe sinais vitais, gerencie medicamentos, consultas e mantenha seu histórico médico em um só lugar. 
                <span className="text-foreground font-medium"> Simples, seguro e acessível.</span>
              </p>
            </m.div>

            {/* Role Selection Cards */}
            <m.div variants={fadeInUp} className="flex flex-col md:flex-row gap-6 mt-4 w-full max-w-3xl">
              {!isAuthenticated ? (
                <>
                  {/* Caregiver Card */}
                  <Link href="/login?type=caregiver" className="flex-1 group">
                    <div className="relative p-6 rounded-2xl border-2 border-primary/20 bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Stethoscope className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Sou Cuidador / Profissional</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Gerencie pacientes, acompanhe sinais vitais e organize medicações em um painel completo.
                        </p>
                        <ul className="space-y-2 mb-4">
                          {rolesBenefits.caregiver.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <benefit.icon className="h-4 w-4 text-primary" />
                              {benefit.text}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                          Acessar como cuidador
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Patient Card */}
                  <Link href="/login?type=patient" className="flex-1 group">
                    <div className="relative p-6 rounded-2xl border-2 border-muted bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-muted/50 rounded-bl-full" />
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                          <User className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Sou Paciente</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Acompanhe sua saúde, receba lembretes de medicação e compartilhe dados com seu médico.
                        </p>
                        <ul className="space-y-2 mb-4">
                          {rolesBenefits.patient.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <benefit.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              {benefit.text}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 text-muted-foreground font-medium group-hover:text-primary group-hover:gap-3 transition-all">
                          Acessar como paciente
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <Button size="lg" asChild className="mx-auto">
                  <Link href="/dashboard" className="gap-2">
                    Acessar Painel
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </m.div>

            {/* Stats */}
            <m.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t w-full max-w-4xl"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </m.div>
          </m.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <m.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-background mb-4">
                <Activity className="h-4 w-4 text-primary" />
                <span>Recursos poderosos</span>
              </m.div>
              <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Tudo que você precisa para{' '}
                <span className="text-primary">cuidar da saúde</span>
              </m.h2>
              <m.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Uma plataforma completa com ferramentas intuitivas para monitoramento, gestão e acompanhamento de saúde.
              </m.p>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, i) => (
                <m.div
                  key={i}
                  variants={staggerItem}
                  className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <m.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-primary/10 text-primary mb-4">
                <Clock className="h-4 w-4" />
                <span>Simples e rápido</span>
              </m.div>
              <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Como funciona
              </m.h2>
              <m.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comece a monitorar sua saúde em poucos minutos com nosso processo simples.
              </m.p>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {steps.map((step, i) => (
                <m.div key={i} variants={staggerItem} className="relative">
                  <div className="text-6xl font-bold text-primary/10 mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </m.div>
              ))}
            </m.div>

            <m.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button size="lg" asChild className="gap-2">
                <Link href="/register">
                  Criar conta gratuita
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </m.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center mb-16"
            >
              <m.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm bg-background mb-4">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>Depoimentos</span>
              </m.div>
              <m.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                O que nossos usuários dizem
              </m.h2>
              <m.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Milhares de pessoas já transformaram a forma como cuidam da saúde com o HealthMonitor.
              </m.p>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((testimonial, i) => (
                <m.div
                  key={i}
                  variants={staggerItem}
                  className="p-6 rounded-2xl border bg-card"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 pointer-events-none" />
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <m.div variants={fadeInUp} className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Comece a cuidar da sua saúde{' '}
                <span className="text-primary">hoje mesmo</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Junte-se a milhares de usuários que já transformaram a forma como monitoram e cuidam da saúde.
                Cadastro gratuito, sem necessidade de cartão de crédito.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/register">
                    <CheckCircle2 className="h-5 w-5" />
                    Criar conta gratuita
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <Link href="/login">
                    Já tenho uma conta
                  </Link>
                </Button>
              </div>
            </m.div>
          </m.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <Heart className="h-6 w-6 fill-primary" />
                <span className="text-lg font-bold">HealthMonitor</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma completa de monitoramento de saúde para cuidadores e pacientes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">Como funciona</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HealthMonitor. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

