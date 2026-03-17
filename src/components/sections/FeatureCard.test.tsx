import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';

const defaultProps = {
  title: "L'Auberge",
  description: 'Un hébergement de charme en plein Charlevoix.',
  image: '/images/auberge.jpg',
  primaryCta: { label: 'Je découvre les chambres', href: '/auberge' },
  secondaryCta: { label: 'Je réserve une chambre', href: '/reservations' },
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
      render(<FeatureCard {...defaultProps} />);
      expect(screen.getByText(/hébergement de charme/)).toBeInTheDocument();
    });
  });

  describe('CTA props', () => {
    it('renders the primary CTA as a pill button', () => {
      render(<FeatureCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: 'Je découvre les chambres' });
      expect(link).toHaveAttribute('href', '/auberge');
      expect(link).toHaveClass('rounded-full');
    });

    it('renders the secondary CTA as an underlined link', () => {
      render(<FeatureCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: 'Je réserve une chambre' });
      expect(link).toHaveAttribute('href', '/reservations');
      expect(link).toHaveClass('underline');
    });

    it('does not render secondary CTA when omitted', () => {
      render(<FeatureCard {...defaultProps} secondaryCta={undefined} />);
      expect(screen.queryByRole('link', { name: 'Je réserve une chambre' })).not.toBeInTheDocument();
    });
  });

  describe('universe prop', () => {
    it('applies reversed flex direction for bistro', () => {
      render(<FeatureCard {...defaultProps} universe="bistro" />);
      expect(screen.getByRole('article').className).toContain('lg:flex-row-reverse');
    });

    it('does not reverse for auberge', () => {
      render(<FeatureCard {...defaultProps} universe="auberge" />);
      expect(screen.getByRole('article').className).not.toContain('lg:flex-row-reverse');
    });
  });

  describe('accessibility', () => {
    it('has an aria-label matching the title', () => {
      render(<FeatureCard {...defaultProps} />);
      expect(screen.getByRole('article', { name: "L'Auberge" })).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className', () => {
      render(<FeatureCard {...defaultProps} className="custom-style" />);
      expect(screen.getByRole('article')).toHaveClass('custom-style');
    });
  });
});
