import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  describe('renders without crashing', () => {
    it('renders a section element', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('title prop', () => {
    it('renders the default title "LES BALCONS"', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      expect(screen.getByRole('heading', { level: 1, name: 'LES BALCONS' })).toBeInTheDocument();
    });

    it('renders a custom title', () => {
      render(<Hero backgroundImage="/images/hero.jpg" title="Welcome" />);
      expect(screen.getByRole('heading', { level: 1, name: 'Welcome' })).toBeInTheDocument();
    });
  });

  describe('subtitle prop', () => {
    it('renders the default subtitle', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      expect(screen.getByText('Auberge & Bistro culturel')).toBeInTheDocument();
    });

    it('renders a custom subtitle', () => {
      render(<Hero backgroundImage="/images/hero.jpg" subtitle="A unique place" />);
      expect(screen.getByText('A unique place')).toBeInTheDocument();
    });

    it('does not render subtitle element when subtitle is empty string', () => {
      render(<Hero backgroundImage="/images/hero.jpg" subtitle="" />);
      expect(screen.queryByText('A unique place')).not.toBeInTheDocument();
    });
  });

  describe('tagline prop', () => {
    it('renders the tagline when provided', () => {
      render(
        <Hero backgroundImage="/images/hero.jpg" tagline="Votre escapade culturelle" />
      );
      expect(screen.getByText('Votre escapade culturelle')).toBeInTheDocument();
    });

    it('does not render a tagline element when not provided', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      expect(screen.queryByText('Votre escapade culturelle')).not.toBeInTheDocument();
    });
  });

  describe('CTA props', () => {
    it('renders the CTA link when both ctaLabel and ctaHref are provided', () => {
      render(
        <Hero
          backgroundImage="/images/hero.jpg"
          ctaLabel="Disponibilités"
          ctaHref="/reservations"
        />
      );
      expect(screen.getByRole('link', { name: 'Disponibilités' })).toHaveAttribute(
        'href',
        '/reservations'
      );
    });

    it('does not render CTA when only ctaLabel is provided', () => {
      render(<Hero backgroundImage="/images/hero.jpg" ctaLabel="Book" />);
      expect(screen.queryByRole('link', { name: 'Book' })).not.toBeInTheDocument();
    });

    it('does not render CTA when only ctaHref is provided', () => {
      render(<Hero backgroundImage="/images/hero.jpg" ctaHref="/reservations" />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('backgroundImage prop', () => {
    it('renders the background image', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      // The image is aria-hidden, query it via the DOM directly
      const img = document.querySelector('img[aria-hidden="true"]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/images/hero.jpg');
    });

    it('the background image has aria-hidden set to true', () => {
      render(<Hero backgroundImage="/images/hero.jpg" />);
      const img = document.querySelector('img');
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('accessibility', () => {
    it('has an aria-label on the section', () => {
      render(<Hero backgroundImage="/images/hero.jpg" title="LES BALCONS" />);
      expect(screen.getByRole('region', { name: 'LES BALCONS' })).toBeInTheDocument();
    });
  });
});
