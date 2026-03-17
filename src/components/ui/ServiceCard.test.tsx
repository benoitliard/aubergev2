import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from './ServiceCard';

const defaultProps = {
  title: "L'Auberge",
  description: 'A lovely place to stay',
  image: '/images/auberge.jpg',
  href: '/auberge',
};

describe('ServiceCard', () => {
  describe('renders without crashing', () => {
    it('renders an article element', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  describe('title prop', () => {
    it('renders the title as a heading', () => {
      render(<ServiceCard {...defaultProps} title="Le Bistro" />);
      expect(screen.getByRole('heading', { name: 'Le Bistro' })).toBeInTheDocument();
    });
  });

  describe('description prop', () => {
    it('renders the description', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByText('A lovely place to stay')).toBeInTheDocument();
    });
  });

  describe('CTA link variant', () => {
    it('renders a text link CTA by default', () => {
      render(<ServiceCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: 'En savoir plus' });
      expect(link).toHaveAttribute('href', '/auberge');
    });

    it('renders a custom CTA label', () => {
      render(<ServiceCard {...defaultProps} ctaLabel="Voir les offres" />);
      expect(screen.getByRole('link', { name: 'Voir les offres' })).toBeInTheDocument();
    });
  });

  describe('CTA button variant', () => {
    it('renders a pill button when ctaVariant is "button"', () => {
      render(
        <ServiceCard {...defaultProps} ctaVariant="button" ctaLabel="Découvrir" />
      );
      const link = screen.getByRole('link', { name: 'Découvrir' });
      expect(link).toHaveClass('rounded-full');
    });
  });

  describe('image prop', () => {
    it('renders the image as a decorative element', () => {
      render(<ServiceCard {...defaultProps} image="/img/test.jpg" />);
      const img = document.querySelector('img[aria-hidden="true"]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/img/test.jpg');
    });
  });

  describe('className prop', () => {
    it('merges custom className on the article', () => {
      render(<ServiceCard {...defaultProps} className="custom-class" />);
      expect(screen.getByRole('article')).toHaveClass('custom-class');
    });
  });
});
