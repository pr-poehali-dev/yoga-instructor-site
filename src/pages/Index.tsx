import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO = 'https://cdn.poehali.dev/projects/09183084-ebb5-419d-89cb-2cf7cad2be05/files/213ef681-0ada-4065-bff2-3f5869514b33.jpg';
const PORTRAIT = 'https://cdn.poehali.dev/projects/09183084-ebb5-419d-89cb-2cf7cad2be05/files/3d384b5e-795e-4796-af9d-ca25f9b0a440.jpg';
const STUDIO = 'https://cdn.poehali.dev/projects/09183084-ebb5-419d-89cb-2cf7cad2be05/files/71d2a42d-dd46-4c15-b780-233fd9ebd163.jpg';

const NAV = [
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'portfolio', label: 'Занятия' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'blog', label: 'Блог' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  { icon: 'User', title: 'Индивидуальная практика', desc: 'Персональная программа под ваше тело, ритм и цели.', price: '3 500 ₽ / занятие' },
  { icon: 'Users', title: 'Групповые занятия', desc: 'Хатха и виньяса в малых группах до 8 человек.', price: '1 200 ₽ / занятие' },
  { icon: 'Sunrise', title: 'Утренние медитации', desc: 'Дыхание и осознанность для мягкого начала дня.', price: '800 ₽ / занятие' },
  { icon: 'Mountain', title: 'Ретриты и выезды', desc: 'Погружение в практику на природе на несколько дней.', price: 'от 25 000 ₽' },
];

const SCHEDULE = [
  { day: 'Понедельник', time: '08:00 — 09:30', name: 'Утренняя виньяса' },
  { day: 'Среда', time: '19:00 — 20:30', name: 'Хатха для всех' },
  { day: 'Пятница', time: '08:00 — 09:00', name: 'Медитация и дыхание' },
  { day: 'Суббота', time: '11:00 — 12:30', name: 'Йога восстановления' },
];

const PORTFOLIO = [
  { img: STUDIO, title: 'Групповая практика', tag: 'Студия' },
  { img: HERO, title: 'Йога на рассвете', tag: 'Видео' },
  { img: PORTRAIT, title: 'Личные занятия', tag: 'Фото' },
  { img: STUDIO, title: 'Ретрит у моря', tag: 'Мероприятие' },
];

const REVIEWS = [
  { text: 'Занятия с Анной вернули мне ощущение тела и спокойствие. Каждая практика — как глоток тишины.', name: 'Мария К.' },
  { text: 'Никогда не думала, что йога может быть настолько мягкой и при этом глубокой. Спасибо за внимание к деталям.', name: 'Ольга Д.' },
  { text: 'После ретрита будто заново родился. Очень бережный и профессиональный подход.', name: 'Дмитрий П.' },
];

const BLOG = [
  { date: '12 июня', title: 'Зачем нужно дыхание уджайи', desc: 'Разбираем технику, которая делает практику глубже.' },
  { date: '28 мая', title: 'Утренние ритуалы для энергии', desc: 'Пять простых практик для бодрого начала дня.' },
  { date: '14 мая', title: 'Йога и сон: как успокоить ум', desc: 'Мягкие асаны для вечернего расслабления.' },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md py-4 border-b border-border' : 'py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-serif text-2xl tracking-widest-xl text-primary">ПРАНА</button>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-primary transition-colors">{n.label}</button>
            ))}
          </nav>
          <button className="hidden lg:block" onClick={() => scrollTo('contacts')}>
            <span className="text-sm border border-primary/40 rounded-full px-5 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-all">Записаться</span>
          </button>
          <button className="lg:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden mt-4 px-6 pb-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-muted-foreground hover:text-primary">{n.label}</button>
            ))}
            <button onClick={() => scrollTo('contacts')} className="text-left text-primary font-medium">Записаться</button>
          </div>
        )}
      </header>

      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO} alt="Йога на рассвете" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 w-full pt-20">
          <p className="reveal text-sm tracking-widest-xl uppercase text-primary mb-6">Йога · Дыхание · Тишина</p>
          <h1 className="reveal font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-primary max-w-3xl" style={{ transitionDelay: '0.1s' }}>
            Пространство для <em className="italic">медитации</em> и движения
          </h1>
          <p className="reveal mt-8 text-lg text-foreground/80 max-w-md" style={{ transitionDelay: '0.2s' }}>
            Анна Соколова — инструктор по йоге с 12-летним опытом. Помогаю вернуться к телу, дыханию и внутренней опоре.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4" style={{ transitionDelay: '0.3s' }}>
            <Button onClick={() => scrollTo('schedule')} className="rounded-full px-8 h-12 text-base">Расписание занятий</Button>
            <Button onClick={() => scrollTo('about')} variant="outline" className="rounded-full px-8 h-12 text-base border-primary/30">Узнать больше</Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal relative">
            <img src={PORTRAIT} alt="Анна Соколова" className="w-full aspect-[4/5] object-cover rounded-sm" />
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-8 py-6 rounded-sm hidden md:block">
              <p className="font-serif text-4xl">12</p>
              <p className="text-xs tracking-widest uppercase mt-1">лет практики</p>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-6">Обо мне</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">Каждое дыхание — возвращение к себе</h2>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              Я пришла в йогу, чтобы справиться с тревогой, и осталась в ней навсегда. Прошла обучение в Индии и России, изучала хатху, виньясу и медитативные практики.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              В своих занятиях я создаю мягкое, безопасное пространство, где нет места спешке и оценкам — только вы, ваше тело и тишина внутри.
            </p>
            <div className="mt-10 flex gap-10">
              <div><p className="font-serif text-3xl text-primary">500+</p><p className="text-xs text-muted-foreground tracking-wide uppercase mt-1">учеников</p></div>
              <div><p className="font-serif text-3xl text-primary">8</p><p className="text-xs text-muted-foreground tracking-wide uppercase mt-1">ретритов</p></div>
              <div><p className="font-serif text-3xl text-primary">∞</p><p className="text-xs text-muted-foreground tracking-wide uppercase mt-1">спокойствия</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center max-w-xl mx-auto mb-16">
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-4">Услуги</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Форматы практики</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="reveal bg-card p-8 rounded-sm border border-border hover:border-primary/30 transition-all hover:-translate-y-1 duration-500" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Icon name={s.icon} size={32} className="text-primary/70" />
                <h3 className="font-serif text-2xl text-primary mt-6">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.desc}</p>
                <p className="text-sm text-primary mt-6 font-medium">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-4">Расписание</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Ближайшие занятия</h2>
          </div>
          <div className="space-y-px">
            {SCHEDULE.map((row, i) => (
              <div key={i} className="reveal group flex items-center justify-between py-6 px-6 border-b border-border hover:bg-secondary/40 transition-colors" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="flex items-baseline gap-6">
                  <span className="text-sm text-muted-foreground w-28 shrink-0">{row.day}</span>
                  <span className="font-serif text-xl md:text-2xl text-primary">{row.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="hidden sm:block text-sm text-muted-foreground">{row.time}</span>
                  <Button onClick={() => scrollTo('contacts')} variant="ghost" size="sm" className="rounded-full opacity-70 group-hover:opacity-100">Записаться</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center max-w-xl mx-auto mb-16">
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-4">Занятия</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Портфолио практик</h2>
            <p className="text-muted-foreground mt-4">Фото и видео с занятий, ретритов и мероприятий</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="reveal group relative overflow-hidden rounded-sm cursor-pointer aspect-[3/4]" style={{ transitionDelay: `${i * 0.08}s` }}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs tracking-widest uppercase text-primary-foreground/80">{p.tag}</span>
                  <p className="font-serif text-xl text-primary-foreground">{p.title}</p>
                </div>
                {p.tag === 'Видео' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name="Play" size={22} className="text-primary ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-4">Отзывы</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Слова учеников</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-sm p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Icon name="Quote" size={28} className="text-accent" />
                <p className="font-serif text-xl text-primary/90 leading-relaxed mt-4 italic">«{r.text}»</p>
                <p className="text-sm text-muted-foreground mt-6 tracking-wide">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <p className="text-sm tracking-widest-xl uppercase text-muted-foreground mb-4">Блог</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Заметки о практике</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG.map((b, i) => (
              <article key={i} className="reveal group cursor-pointer" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">{b.date}</p>
                <h3 className="font-serif text-2xl text-primary mt-3 group-hover:text-primary/70 transition-colors">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{b.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary mt-5">
                  Читать <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal bg-primary text-primary-foreground rounded-sm p-10 md:p-16 grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm tracking-widest-xl uppercase text-primary-foreground/60 mb-4">Контакты</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Начните свою практику сегодня</h2>
              <p className="text-primary-foreground/70 mt-6 leading-relaxed">Напишите мне, и мы подберём формат, который подойдёт именно вам.</p>
              <div className="mt-10 space-y-4">
                <a href="tel:+79000000000" className="flex items-center gap-3 text-primary-foreground/90 hover:text-primary-foreground transition-colors"><Icon name="Phone" size={18} /> +7 (900) 000-00-00</a>
                <a href="mailto:hello@prana-yoga.ru" className="flex items-center gap-3 text-primary-foreground/90 hover:text-primary-foreground transition-colors"><Icon name="Mail" size={18} /> hello@prana-yoga.ru</a>
                <p className="flex items-center gap-3 text-primary-foreground/90"><Icon name="MapPin" size={18} /> Москва, студия «Лотос»</p>
              </div>
              <div className="flex gap-4 mt-8">
                {['Instagram', 'Send', 'Youtube'].map((ic) => (
                  <button key={ic} className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all">
                    <Icon name={ic} size={18} />
                  </button>
                ))}
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Ваше имя" className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors" />
              <input type="tel" placeholder="Телефон" className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors" />
              <textarea placeholder="Сообщение" rows={4} className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors resize-none" />
              <Button type="submit" variant="secondary" className="w-full rounded-sm h-12 text-base">Отправить заявку</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-xl tracking-widest-xl text-primary">ПРАНА</span>
          <p className="text-sm text-muted-foreground">© 2026 Анна Соколова · Йога-практика</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
