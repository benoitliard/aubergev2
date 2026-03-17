import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingCTA } from './FloatingCTA';

describe('FloatingCTA', () => {
  describe('renders without crashing', () => {
    it('renders a link element', () => {
      render(<FloatingCTA href="/reservations" />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('label prop', () => {
    it('defaults to "Je réserve" as the label', () => {
      render(<FloatingCTA href="/reservations" />);
      expect(screen.getByRole('link', { name: 'Je réserve' })).toBeInTheDocument();
    });

    it('renders a custom label when provided', () => {
      render(<FloatingCTA href="/reservations" label="Book now" />);
      expect(screen.getByRole('link', { name: 'Book now' })).toBeInTheDocument();
    });

    it('uses the label as visible text', () => {
      render(<FloatingCTA href="/reservations" label="Reserve" />);
      expect(screen.getByText('Reserve')).toBeInTheDocument();
    });
  });

  describe('href prop', () => {
    it('sets the correct href on the link', () => {
      render(<FloatingCTA href="/reservations" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/reservations');
    });

    it('works with external URLs', () => {
      render(<FloatingCTA href="https://beds24.com/booking" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://beds24.com/booking');
    });
  });

  describe('accessibility', () => {
    it('has an aria-label matching the label', () => {
      render(<FloatingCTA href="/reservations" label="Je réserve" />);
      expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Je réserve');
    });
  });

  describe('className prop', () => {
    it('merges custom className on the link', () => {
      render(<FloatingCTA href="/reservations" className="extra-class" />);
      expect(screen.getByRole('link')).toHaveClass('extra-class');
    });
  });
});
