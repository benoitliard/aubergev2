import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  describe('renders without crashing', () => {
    it('renders a section element', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('static content', () => {
    it('renders the title "Les Balcons"', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      expect(screen.getByRole('heading', { level: 1, name: 'Les Balcons' })).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      expect(screen.getByText('Auberge & Bistro culturel')).toBeInTheDocument();
    });

    it('renders the description', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      expect(screen.getByText(/séjour convivial/)).toBeInTheDocument();
    });
  });

  describe('hero image', () => {
    it('renders the hero image with the provided src', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      const img = screen.getByAltText("L'Auberge Les Balcons à Baie-Saint-Paul");
      expect(img).toHaveAttribute('src', '/images/hero.jpg');
    });

    it('accepts a custom alt text', () => {
      render(<Hero heroImage="/images/hero.jpg" heroImageAlt="Custom alt" />);
      expect(screen.getByAltText('Custom alt')).toBeInTheDocument();
    });
  });

  describe('booking widget', () => {
    it('renders the booking form by default', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      const form = document.querySelector('form[action*="beds24"]');
      expect(form).toBeInTheDocument();
    });

    it('hides the booking form when showBooking is false', () => {
      render(<Hero heroImage="/images/hero.jpg" showBooking={false} />);
      expect(document.querySelector('form[action*="beds24"]')).not.toBeInTheDocument();
    });

    it('passes lang to the booking widget', () => {
      render(<Hero heroImage="/images/hero.jpg" lang="en" />);
      const langInput = document.querySelector('input[name="lang"][value="en"]');
      expect(langInput).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has an aria-label on the section', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      expect(screen.getByRole('region', { name: 'Les Balcons' })).toBeInTheDocument();
    });

    it('the arch mask SVG is hidden from screen readers', () => {
      render(<Hero heroImage="/images/hero.jpg" />);
      const svg = document.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });
  });
});
