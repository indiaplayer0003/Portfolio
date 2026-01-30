import { memo, lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';

// Eager load above-the-fold content
import Hero from './components/sections/Hero';

// Lazy load below-the-fold sections
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

const SectionFallback = () => (
  <div className="min-h-[50vh]" style={{ contain: 'strict' }} />
);

const App = memo(() => {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </Layout>
  );
});

App.displayName = 'App';

export default App;
