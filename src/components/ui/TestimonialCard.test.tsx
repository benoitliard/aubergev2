import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialCard } from './TestimonialCard';

const defaultProps = {
  text: 'Un séjour inoubliable dans ce magnifique endroit.',
  author: 'Marie Tremblay',
};

describe('TestimonialCard', () => {
  describe('renders without crashing', () => {
    it('renders an article element', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has an aria-label containing the author name', () => {
      render(<TestimonialCard {...defaultProps} author="Jean Dupont" />);
      expect(
        screen.getByRole('article', { name: /Jean Dupont/ })
      ).toBeInTheDocument();
    });

    it('wraps content in a blockquote', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByRole('article').querySelector('blockquote')).toBeInTheDocument();
    });
  });

  describe('text prop', () => {
    it('renders the testimonial text', () => {
      render(<TestimonialCard {...defaultProps} text="Superbe experience!" />);
      expect(screen.getByText(/Superbe experience!/)).toBeInTheDocument();
    });
  });

  describe('author prop', () => {
    it('renders the author name', () => {
      render(<TestimonialCard {...defaultProps} author="Sophie Leblanc" />);
      expect(screen.getByText('Sophie Leblanc')).toBeInTheDocument();
    });
  });

  describe('source prop', () => {
    it('renders the source when provided', () => {
      render(<TestimonialCard {...defaultProps} source="Google Reviews" />);
      expect(screen.getByText('Google Reviews')).toBeInTheDocument();
    });

    it('does not render a source element when not provided', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.queryByText('Google Reviews')).not.toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className on the article', () => {
      render(<TestimonialCard {...defaultProps} className="my-card" />);
      expect(screen.getByRole('article')).toHaveClass('my-card');
    });
  });
});
