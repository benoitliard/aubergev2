import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestimonialCarousel } from './TestimonialCarousel';

const testimonials = [
  { category: { label: "L'Auberge", color: 'var(--color-yellow-500)' }, text: 'Un séjour inoubliable.', author: 'Marie T.' },
  { category: { label: 'Le Bistro', color: 'var(--color-purple-500)' }, text: 'Excellent rapport qualité-prix.', author: 'Jean D.' },
  { category: { label: "L'Auberge", color: 'var(--color-yellow-500)' }, text: 'Le bistro était fantastique.', author: 'Sophie L.' },
];

// ResizeObserver is not available in jsdom
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('TestimonialCarousel', () => {
  describe('renders without crashing', () => {
    it('renders the carousel section', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(
        screen.getByRole('region', { name: 'Témoignages clients' })
      ).toBeInTheDocument();
    });
  });

  describe('title prop', () => {
    it('renders the default title', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(
        screen.getByText('Ce que nos clients disent de nous')
      ).toBeInTheDocument();
    });

    it('renders a custom title when provided', () => {
      render(
        <TestimonialCarousel
          testimonials={testimonials}
          title="Nos avis clients"
        />
      );
      expect(screen.getByText('Nos avis clients')).toBeInTheDocument();
    });
  });

  describe('testimonials prop', () => {
    it('renders all testimonials', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getByText(/Un séjour inoubliable/)).toBeInTheDocument();
      expect(screen.getByText(/Excellent rapport qualité-prix/)).toBeInTheDocument();
      expect(screen.getByText(/Le bistro était fantastique/)).toBeInTheDocument();
    });

    it('renders author names', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getByText('Marie T.')).toBeInTheDocument();
      expect(screen.getByText('Jean D.')).toBeInTheDocument();
    });

    it('renders category pills', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getAllByText("L'Auberge")).toHaveLength(2);
      expect(screen.getByText('Le Bistro')).toBeInTheDocument();
    });
  });

  describe('counter', () => {
    it('shows the current position counter', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  describe('navigation arrows', () => {
    it('renders the previous button disabled at the start', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    });

    it('renders the next button enabled at the start', () => {
      render(<TestimonialCarousel testimonials={testimonials} />);
      expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('advances the carousel when next button is clicked', async () => {
      const user = userEvent.setup();
      render(<TestimonialCarousel testimonials={testimonials} />);
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Previous' })).not.toBeDisabled();
    });

    it('disables the next button when reaching the last testimonial', async () => {
      const user = userEvent.setup();
      const single = [testimonials[0]];
      render(<TestimonialCarousel testimonials={single} />);
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
  });
});
