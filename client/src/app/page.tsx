'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';
import { Heart, Activity, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-6 w-6 fill-primary" />
            <span className="text-lg font-bold">HealthMonitor</span>
          </div>
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

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-8 py-24 text-center px-4">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Cuidado e monitoramento <span className="text-primary">inteligente</span> para sua saúde
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe seus sinais vitais, gerencie consultas e mantenha seu histórico médico em um só lugar. Simples, seguro e acessível.
            </p>
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">Acessar Painel</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/register">Começar Agora</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Já tenho conta</Link>
                </Button>
              </>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mt-16 text-left w-full max-w-5xl">
            <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <Activity className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Monitoramento Contínuo</h3>
              <p className="text-muted-foreground">Registre e acompanhe seus dados vitais com gráficos intuitivos e alertas em tempo real.</p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Segurança de Dados</h3>
              <p className="text-muted-foreground">Suas informações médicas são criptografadas e protegidas com os mais altos padrões de segurança.</p>
            </div>
            <div className="flex flex-col gap-2 p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Conexão com Médicos</h3>
              <p className="text-muted-foreground">Compartilhe facilmente seu histórico com profissionais de saúde para um diagnóstico mais preciso.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HealthMonitor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

