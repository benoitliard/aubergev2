import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialCard } from './TestimonialCard';

const defaultProps = {
  category: { label: "L'Auberge", color: 'var(--color-yellow-500)' },
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

  describe('category pill', () => {
    it('renders the category label', () => {
      render(<TestimonialCard {...defaultProps} />);
      expect(screen.getByText("L'Auberge")).toBeInTheDocument();
    });

    it('applies the category color as background', () => {
      render(<TestimonialCard {...defaultProps} />);
      const pill = screen.getByText("L'Auberge");
      expect(pill).toHaveStyle({ backgroundColor: 'var(--color-yellow-500)' });
    });
  });

  describe('text prop', () => {
    it('renders the testimonial text', () => {
      render(<TestimonialCard {...defaultProps} text="Superbe experience!" />);
      expect(screen.getByText('Superbe experience!')).toBeInTheDocument();
    });
  });

  describe('author prop', () => {
    it('renders the author name', () => {
      render(<TestimonialCard {...defaultProps} author="Sophie Leblanc" />);
      expect(screen.getByText('Sophie Leblanc')).toBeInTheDocument();
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

  describe('className prop', () => {
    it('merges custom className on the article', () => {
      render(<TestimonialCard {...defaultProps} className="my-card" />);
      expect(screen.getByRole('article')).toHaveClass('my-card');
    });
  });
});
