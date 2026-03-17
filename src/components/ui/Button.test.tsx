import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('renders without crashing', () => {
    it('renders a button element by default', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders an anchor element when href is provided', () => {
      render(<Button href="/path">Go</Button>);
      expect(screen.getByRole('link', { name: 'Go' })).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('renders text children', () => {
      render(<Button>Reserve now</Button>);
      expect(screen.getByText('Reserve now')).toBeInTheDocument();
    });

    it('renders React node children', () => {
      render(
        <Button>
          <span>Icon</span> Label
        </Button>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });
  });

  describe('href prop', () => {
    it('sets the correct href on the anchor', () => {
      render(<Button href="/reservations">Book</Button>);
      expect(screen.getByRole('link', { name: 'Book' })).toHaveAttribute('href', '/reservations');
    });

    it('does not set href when disabled', () => {
      render(
        <Button href="/reservations" disabled>
          Book
        </Button>
      );
      // When disabled, the anchor has no href attribute
      const link = document.querySelector('a');
      expect(link).not.toHaveAttribute('href');
    });
  });

  describe('disabled state', () => {
    it('disables the button element', () => {
      render(<Button disabled>Submit</Button>);
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });

    it('sets aria-disabled on the anchor when disabled', () => {
      render(
        <Button href="/path" disabled>
          Go
        </Button>
      );
      const link = document.querySelector('a');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets tabIndex -1 on the anchor when disabled', () => {
      render(
        <Button href="/path" disabled>
          Go
        </Button>
      );
      const link = document.querySelector('a');
      expect(link).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('onClick interaction', () => {
    it('calls onClick when the button is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button', { name: 'Click me' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when the button is disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );
      await user.click(screen.getByRole('button', { name: 'Click me' }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('calls onClick when the anchor is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Button href="/path" onClick={handleClick}>
          Go
        </Button>
      );
      await user.click(screen.getByRole('link', { name: 'Go' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('className prop', () => {
    it('merges custom className into the element', () => {
      render(<Button className="my-custom-class">Styled</Button>);
      expect(screen.getByRole('button', { name: 'Styled' })).toHaveClass('my-custom-class');
    });
  });

  describe('variant prop', () => {
    it('defaults to primary variant', () => {
      render(<Button>Primary</Button>);
      const btn = screen.getByRole('button', { name: 'Primary' });
      expect(btn.className).toContain('bg-[var(--color-charcoal)]');
    });

    it('applies outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>);
      const btn = screen.getByRole('button', { name: 'Outline' });
      expect(btn.className).toContain('bg-transparent');
    });

    it('applies cta variant classes', () => {
      render(<Button variant="cta">CTA</Button>);
      const btn = screen.getByRole('button', { name: 'CTA' });
      expect(btn.className).toContain('bg-[var(--color-green-dark)]');
    });

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const btn = screen.getByRole('button', { name: 'Secondary' });
      expect(btn.className).toContain('underline');
    });
  });

  describe('size prop', () => {
    it('defaults to default size', () => {
      render(<Button>Default Size</Button>);
      const btn = screen.getByRole('button', { name: 'Default Size' });
      expect(btn.className).toContain('px-8');
    });

    it('applies small size classes', () => {
      render(<Button size="small">Small</Button>);
      const btn = screen.getByRole('button', { name: 'Small' });
      expect(btn.className).toContain('px-5');
    });
  });
});
