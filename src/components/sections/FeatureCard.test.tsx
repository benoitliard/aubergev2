import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';

const defaultProps = {
  title: "L'Auberge",
  description: 'Un hébergement de charme en plein Charlevoix.',
  image: '/images/auberge.jpg',
  imageAlt: 'Vue de l\'auberge',
  ctaLabel: 'Découvrir l\'auberge',
  ctaHref: '/auberge',
  universe: 'auberge' as const,
};

describe('FeatureCard', () => {
  describe('renders without crashing', () => {
    it('renders an article element', () => {
      render(<FeatureCard {...defaultProps} />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  describe('title prop', () => {
    it('renders the title as an h2 heading', () => {
      render(<FeatureCard {...defaultProps} title="Le Bistro" />);
      expect(screen.getByRole('heading', { level: 2, name: 'Le Bistro' })).toBeInTheDocument();
    });
  });

  describe('description prop', () => {
    it('renders the description text', () => {
      render(<FeatureCard {...defaultProps} description="Notre auberge unique." />);
      expect(screen.getByText('Notre auberge unique.')).toBeInTheDocument();
    });
  });

  describe('CTA props', () => {
    it('renders the CTA link with correct label and href', () => {
      render(
        <FeatureCard
          {...defaultProps}
          ctaLabel="En savoir plus"
          ctaHref="/en-savoir-plus"
        />
      );
      const link = screen.getByRole('link', { name: 'En savoir plus' });
      expect(link).toHaveAttribute('href', '/en-savoir-plus');
    });
  });

  describe('image props', () => {
    it('renders the image with correct src and alt', () => {
      render(<FeatureCard {...defaultProps} image="/img/test.jpg" imageAlt="Test image" />);
      expect(screen.getByAltText('Test image')).toHaveAttribute('src', '/img/test.jpg');
    });
  });

  describe('universe prop', () => {
    it('renders with auberge universe', () => {
      render(<FeatureCard {...defaultProps} universe="auberge" />);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });

    it('renders with bistro universe', () => {
      render(<FeatureCard {...defaultProps} universe="bistro" />);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });

    it('applies reversed flex direction for bistro universe', () => {
      render(<FeatureCard {...defaultProps} universe="bistro" />);
      const article = screen.getByRole('article');
      expect(article.className).toContain('md:flex-row-reverse');
    });

    it('does not apply reversed flex direction for auberge universe', () => {
      render(<FeatureCard {...defaultProps} universe="auberge" />);
      const article = screen.getByRole('article');
      expect(article.className).not.toContain('md:flex-row-reverse');
    });
  });

  describe('accessibility', () => {
    it('has an aria-label matching the title', () => {
      render(<FeatureCard {...defaultProps} title="L'Auberge" />);
      expect(screen.getByRole('article', { name: "L'Auberge" })).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className on the article', () => {
      render(<FeatureCard {...defaultProps} className="custom-style" />);
      expect(screen.getByRole('article')).toHaveClass('custom-style');
    });
  });
});
