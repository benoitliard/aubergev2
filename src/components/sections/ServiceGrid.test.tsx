import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceGrid } from './ServiceGrid';

const services = [
  { title: 'Hébergement', image: '/img/auberge.jpg', href: '/auberge' },
  { title: 'Restauration', description: 'Le Bistro', image: '/img/bistro.jpg', href: '/bistro' },
  { title: 'Événements', image: '/img/evenements.jpg', href: '/evenements' },
];

describe('ServiceGrid', () => {
  describe('renders without crashing', () => {
    it('renders a section with the services label', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getByRole('region', { name: 'Nos services' })).toBeInTheDocument();
    });
  });

  describe('services prop', () => {
    it('renders one ServiceCard per service', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getAllByRole('link')).toHaveLength(services.length);
    });

    it('renders service titles', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getByText('Hébergement')).toBeInTheDocument();
      expect(screen.getByText('Restauration')).toBeInTheDocument();
      expect(screen.getByText('Événements')).toBeInTheDocument();
    });

    it('renders optional descriptions when provided', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getByText('Le Bistro')).toBeInTheDocument();
    });

    it('renders an empty list when services is empty', () => {
      render(<ServiceGrid services={[]} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  describe('list structure', () => {
    it('renders services inside a list', () => {
      render(<ServiceGrid services={services} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(services.length);
    });
  });

  describe('href values', () => {
    it('each service card links to the correct href', () => {
      render(<ServiceGrid services={services} />);
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/auberge');
      expect(links[1]).toHaveAttribute('href', '/bistro');
      expect(links[2]).toHaveAttribute('href', '/evenements');
    });
  });

  describe('className prop', () => {
    it('merges custom className on the section', () => {
      render(<ServiceGrid services={services} className="my-grid" />);
      expect(screen.getByRole('region', { name: 'Nos services' })).toHaveClass('my-grid');
    });
  });
});
