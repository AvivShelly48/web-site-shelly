import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Origin from './components/Origin';
import Films from './components/Films';
import Materials from './components/Materials';
import Architecture from './components/Architecture';
import Technology from './components/Technology';
import BrandSystem from './components/BrandSystem';
import Closing from './components/Closing';

export default function Home() {
  return (
    <main className="relative bg-[var(--velaro-black)]">
      <Hero />
      <Manifesto />
      <Origin />
      <Films />
      <Materials />
      <Architecture />
      <Technology />
      <BrandSystem />
      <Closing />
    </main>
  );
}
