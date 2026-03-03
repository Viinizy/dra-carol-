import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  MapPin, 
  Phone, 
  Star, 
  ChevronRight, 
  Menu, 
  X, 
  Clock, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { cn } from './lib/utils';
import { useInView } from 'react-intersection-observer';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Procedimentos', href: '#procedures' },
    { name: 'Avaliações', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex flex-col">
          <span className="text-2xl font-serif tracking-widest uppercase">Carol Orlando</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-light -mt-1 opacity-70">Biomédica Esteta</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5531975651744" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 bg-ink text-white rounded-full text-sm font-medium hover:bg-gold transition-all"
          >
            Agendar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-ink"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-ink/5 md:hidden py-8 px-6 flex flex-col space-y-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/5531975651744" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Agendar pelo WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={cn("mb-16", centered && "text-center")}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
        className="editorial-title"
      >
        {title}
      </motion.h2>
    </div>
  );
};

const ProcedureCard = ({ title, description, image, delay }: { title: string, description: string, image: string, delay: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl bg-nude aspect-[3/4]"
    >
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl text-white mb-2 font-serif">{title}</h3>
        <p className="text-white/80 text-sm font-light mb-4 line-clamp-2 transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          {description}
        </p>
        <button className="text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 group/btn">
          Ver detalhes <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, text, rating }: { name: string, text: string, rating: number }) => (
  <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={cn(i < Math.floor(rating) ? "fill-gold text-gold" : "text-gray-200")} />
      ))}
    </div>
    <p className="italic text-ink/80 mb-6 font-serif leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-nude flex items-center justify-center font-serif text-gold">
        {name.charAt(0)}
      </div>
      <span className="font-medium text-sm tracking-wide">{name}</span>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/p/AF1QipPC6OH3PBsgZjLUAElcTLxM3RUBF80Tow9lCJ1V=w1000-h1500" 
            alt="Dra. Carol Orlando" 
            className="w-full h-full object-cover opacity-30 md:opacity-100 md:w-1/2 md:ml-auto"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-6 block">
                Beleza com propósito
              </span>
              <h1 className="editorial-title mb-8">
                Harmonia com <br />
                <span className="italic text-gold">identidade.</span>
              </h1>
              <p className="editorial-subtitle mb-10 max-w-lg">
                Biomédica especializada em Botox e Harmonização Facial em Contagem/MG. 
                Resgatando sua melhor versão com naturalidade e segurança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/5531975651744" className="btn-primary flex items-center justify-center gap-2">
                  Agendar pelo WhatsApp <MessageCircle size={18} />
                </a>
                <a href="#procedures" className="btn-secondary flex items-center justify-center">
                  Ver Procedimentos
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-nude relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden aspect-[4/5] relative z-10"
            >
              <img 
                src="https://lh3.googleusercontent.com/p/AF1QipOpOnggGiq3ErpQYCDPcRgabpSH2Upsq-kMH3iJ=w1000-h1500" 
                alt="Ambiente Acolhedor" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-gold/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl -z-0" />
          </div>

          <div>
            <SectionTitle 
              subtitle="Sobre a Dra." 
              title="Curar a identidade através da autoestima." 
            />
            <div className="space-y-6 text-ink/80 leading-relaxed font-light text-lg">
              <p>
                Minha missão vai além da estética. Acredito que cada rosto conta uma história única e meu papel é realçar o que você já tem de mais belo, preservando sua essência.
              </p>
              <p>
                Com atendimento humanizado e técnicas avançadas, busco proporcionar resultados naturais que elevam a confiança e o bem-estar de cada paciente que passa pelas minhas mãos.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-gold">100%</span>
                  <span className="text-xs uppercase tracking-widest font-semibold">Segurança</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-gold">Natural</span>
                  <span className="text-xs uppercase tracking-widest font-semibold">Resultados</span>
                </div>
              </div>
              <blockquote className="pt-10 border-t border-ink/10 italic font-serif text-2xl text-ink">
                “Mais que estética, é identidade.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section id="procedures" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            centered 
            subtitle="Nossos Serviços" 
            title="Procedimentos Personalizados" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProcedureCard 
              delay={0.1}
              title="Lavieen"
              description="O laser de Thulium que proporciona o efeito 'BB Cream' na pele, tratando manchas, poros e textura."
              image="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.2}
              title="Limpeza de Pele"
              description="Remoção de impurezas e renovação celular para uma pele saudável, limpa e radiante."
              image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.3}
              title="Bumbum"
              description="Tratamentos exclusivos para contorno, volume e melhora da textura da região glútea."
              image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.4}
              title="Flacidez"
              description="Tecnologias avançadas e bioestimuladores para devolver a firmeza e sustentação da pele."
              image="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.5}
              title="Celulite"
              description="Protocolos personalizados para reduzir o aspecto de 'casca de laranja' e melhorar a circulação."
              image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.6}
              title="Estrias"
              description="Tratamentos focados na regeneração do tecido e melhora visual de estrias brancas e vermelhas."
              image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.7}
              title="Gordura Localizada"
              description="Eliminação de depósitos de gordura resistentes com técnicas não invasivas e seguras."
              image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=2070"
            />
            <ProcedureCard 
              delay={0.8}
              title="Botox Facial"
              description="Suavização de rugas e linhas de expressão com foco em um resultado natural e descansado."
              image="https://lh3.googleusercontent.com/gps-cs-s/AHVAwer_oOJap8C7WDIQ9E7fUJR53p8mVoh7JaxNj8fUBj8LB7kf7EVYjpKpmIj_5liIu8CMwkKlHHkmTDRG06yHwI1ozhKOFmSG8CE5GUYrzzUHIYy23ctU-JfCXdUoiogArZN6w7amgus6bzwq=w1000-h1500-k-no"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="section-padding bg-ink text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                Experiências Reais
              </span>
              <h2 className="editorial-title text-white">O que dizem nossas pacientes</h2>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="text-4xl font-serif text-gold">4.9</div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
                </div>
                <span className="text-xs uppercase tracking-widest opacity-60">+100 avaliações no Google</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              rating={5}
              name="Mariana Silva"
              text="Ambiente tranquilo e profissionais simpáticas. O resultado do meu botox ficou super natural, exatamente como eu queria!"
            />
            <TestimonialCard 
              rating={5}
              name="Fernanda Oliveira"
              text="A melhor clínica de estética de Contagem. A Dra. Carol é extremamente cuidadosa e detalhista. Recomendo de olhos fechados."
            />
            <TestimonialCard 
              rating={5}
              name="Juliana Costa"
              text="Lugar perfeito para cuidar de mim com todos os mimos. Me senti muito segura durante todo o procedimento de harmonização."
            />
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Instagram className="mx-auto mb-6 text-gold" size={40} />
          <h2 className="editorial-title mb-4">@dra.carolorlando_</h2>
          <p className="editorial-subtitle mb-12">Acompanhe nosso dia a dia e resultados no Instagram</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              "https://lh3.googleusercontent.com/p/AF1QipOpOnggGiq3ErpQYCDPcRgabpSH2Upsq-kMH3iJ=s800-h800",
              "https://lh3.googleusercontent.com/p/AF1QipOKvfThq8ZzrSGmW_0kDAytvYtSavt76N5SNJ6A=w800-h800",
              "https://lh3.googleusercontent.com/p/AF1QipPC6OH3PBsgZjLUAElcTLxM3RUBF80Tow9lCJ1V=w800-h800",
              "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer_oOJap8C7WDIQ9E7fUJR53p8mVoh7JaxNj8fUBj8LB7kf7EVYjpKpmIj_5liIu8CMwkKlHHkmTDRG06yHwI1ozhKOFmSG8CE5GUYrzzUHIYy23ctU-JfCXdUoiogArZN6w7amgus6bzwq=w800-h800-k-no"
            ].map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer">
                <img 
                  src={url} 
                  alt="Instagram Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white" size={24} />
                </div>
              </div>
            ))}
          </div>
          
          <a 
            href="https://instagram.com/dra.carolorlando_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Seguir no Instagram <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="section-padding bg-nude">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <SectionTitle 
              subtitle="Contato" 
              title="Agende sua avaliação personalizada" 
            />
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Localização</h4>
                  <p className="text-ink/70 font-light">Três Barras – Contagem/MG</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Telefone / WhatsApp</h4>
                  <p className="text-ink/70 font-light">(31) 97565-1744</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Horário de Atendimento</h4>
                  <p className="text-ink/70 font-light">Segunda a Sexta: 09h às 19h</p>
                </div>
              </div>
              
                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/5531975651744" 
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    Falar com a equipe <MessageCircle size={18} />
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/qSH1qqF6uR2MBkZb7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    Traçar rota <MapPin size={18} />
                  </a>
                </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-auto border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.107449553535!2d-44.07928582415144!3d-19.91980898146747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69594148abe27%3A0x2c080d5727cc9fc0!2sDra.%20Carol%20Orlando!5e0!3m2!1spt-BR!2sbr!4v1709496000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Localização da Clínica"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ink/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-serif tracking-widest uppercase">Carol Orlando</span>
            <span className="text-[8px] uppercase tracking-[0.3em] font-light opacity-60">Biomédica Esteta</span>
          </div>
          
          <div className="flex gap-8 text-xs uppercase tracking-widest font-medium opacity-60">
            <a href="#home" className="hover:text-gold transition-colors">Início</a>
            <a href="#about" className="hover:text-gold transition-colors">Sobre</a>
            <a href="#procedures" className="hover:text-gold transition-colors">Serviços</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contato</a>
          </div>

          <div className="text-[10px] uppercase tracking-widest opacity-40">
            © 2024 Dra. Carol Orlando. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/5531975651744" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
