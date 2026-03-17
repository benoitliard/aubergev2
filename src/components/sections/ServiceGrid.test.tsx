import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceGrid } from './ServiceGrid';

const services = [
  { title: 'Hébergement', description: 'Chambres confortables', image: '/img/auberge.jpg', href: '/auberge' },
  { title: 'Restauration', description: 'Le Bistro', image: '/img/bistro.jpg', href: '/bistro' },
  { title: 'Événements', description: 'Programmation culturelle', image: '/img/evenements.jpg', href: '/evenements' },
];

describe('ServiceGrid', () => {
  describe('renders without crashing', () => {
    it('renders a section with the services label', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getByRole('region', { name: 'Nos services' })).toBeInTheDocument();
    });
  });

  describe('services prop', () => {
    it('renders service titles (mobile + desktop = doubled)', () => {
      render(<ServiceGrid services={services} />);
      // Each card appears twice (mobile list + desktop columns)
      expect(screen.getAllByText('Hébergement')).toHaveLength(2);
      expect(screen.getAllByText('Restauration')).toHaveLength(2);
      expect(screen.getAllByText('Événements')).toHaveLength(2);
    });

    it('renders descriptions', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getAllByText('Le Bistro')).toHaveLength(2);
    });

    it('renders CTA links for each card', () => {
      render(<ServiceGrid services={services} />);
      const links = screen.getAllByRole('link', { name: 'En savoir plus' });
      // 3 services × 2 layouts = 6
      expect(links).toHaveLength(6);
    });
  });

  describe('className prop', () => {
    it('merges custom className on the section', () => {
      render(<ServiceGrid services={services} className="my-grid" />);
      expect(screen.getByRole('region', { name: 'Nos services' })).toHaveClass('my-grid');
    });
  });
});
