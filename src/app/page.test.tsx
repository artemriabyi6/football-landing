import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {

  it('renders navigation', () => {
    render(<Home />);
    
    // Використовуємо getAllByText для навігаційних посилань, оскільки вони можуть бути в кількох місцях
    const navLinks = screen.getAllByText(/Про мене/i);
    expect(navLinks.length).toBeGreaterThan(0);
    
    const servicesLinks = screen.getAllByText(/Послуги/i);
    expect(servicesLinks.length).toBeGreaterThan(0);
    
    const testimonialsLinks = screen.getAllByText(/Відгуки/i);
    expect(testimonialsLinks.length).toBeGreaterThan(0);
    
    const contactLinks = screen.getAllByText(/Контакти/i);
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  

 

  

  
});