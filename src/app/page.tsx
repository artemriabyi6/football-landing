import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Courses from '../components/Courses';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Courses/>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}