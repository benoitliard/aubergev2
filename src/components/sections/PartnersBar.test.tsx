import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PartnersBar } from './PartnersBar';

const partners = [
  { name: 'Tourisme Charlevoix', logo: '/logos/charlevoix.png' },
  {
    name: 'Québec Original',
    logo: '/logos/quebec-original.png',
    url: 'https://www.quebecoriginal.com',
  },
  { name: 'Auberges du coeur', logo: '/logos/auberges.png' },
];

describe('PartnersBar', () => {
  describe('renders without crashing', () => {
    it('renders a section with the partners label', () => {
      render(<PartnersBar partners={partners} />);
      expect(screen.getByRole('region', { name: 'Nos partenaires' })).toBeInTheDocument();
    });
  });

  describe('partners prop', () => {
    it('renders all partner logos', () => {
      render(<PartnersBar partners={partners} />);
      expect(screen.getByAltText('Tourisme Charlevoix')).toBeInTheDocument();
      expect(screen.getByAltText('Québec Original')).toBeInTheDocument();
      expect(screen.getByAltText('Auberges du coeur')).toBeInTheDocument();
    });

    it('renders partners inside a list', () => {
      render(<PartnersBar partners={partners} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(partners.length);
    });

    it('renders an empty list when no partners are provided', () => {
      render(<PartnersBar partners={[]} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  describe('partner with URL', () => {
    it('wraps the logo in a link when url is provided', () => {
      render(<PartnersBar partners={partners} />);
      const link = screen.getByRole('link', { name: /Visiter le site de Québec Original/ });
      expect(link).toHaveAttribute('href', 'https://www.quebecoriginal.com');
    });

    it('opens external links in a new tab', () => {
      render(<PartnersBar partners={partners} />);
      const link = screen.getByRole('link', { name: /Visiter le site de Québec Original/ });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('partner without URL', () => {
    it('does not wrap the logo in a link when url is not provided', () => {
      render(<PartnersBar partners={[{ name: 'Tourisme Charlevoix', logo: '/logos/charlevoix.png' }]} />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('logo images', () => {
    it('sets correct src for each logo', () => {
      render(<PartnersBar partners={partners} />);
      expect(screen.getByAltText('Tourisme Charlevoix')).toHaveAttribute(
        'src',
        '/logos/charlevoix.png'
      );
    });
  });

  describe('className prop', () => {
    it('merges custom className on the section', () => {
      render(<PartnersBar partners={partners} className="extra-class" />);
      expect(screen.getByRole('region', { name: 'Nos partenaires' })).toHaveClass('extra-class');
    });
  });
});
