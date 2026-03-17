import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArrowButton } from './ArrowButton';

describe('ArrowButton', () => {
  describe('renders without crashing', () => {
    it('renders a button element', () => {
      render(<ArrowButton />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has aria-label "Next" for right direction by default', () => {
      render(<ArrowButton direction="right" />);
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    it('has aria-label "Previous" for left direction', () => {
      render(<ArrowButton direction="left" />);
      expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    });

    it('sets aria-disabled when state is disabled', () => {
      render(<ArrowButton state="disabled" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('disabled state', () => {
    it('disables the button when state is "disabled"', () => {
      render(<ArrowButton state="disabled" />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('does not disable the button when state is "default"', () => {
      render(<ArrowButton state="default" />);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('does not disable the button when state is "hover"', () => {
      render(<ArrowButton state="hover" />);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('onClick interaction', () => {
    it('calls onClick when clicked in default state', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ArrowButton state="default" onClick={handleClick} />);
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when state is disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<ArrowButton state="disabled" onClick={handleClick} />);
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('direction prop', () => {
    it('defaults to right direction', () => {
      render(<ArrowButton />);
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    });

    it('applies rotation transform for left direction', () => {
      render(<ArrowButton direction="left" />);
      const span = screen.getByRole('button').querySelector('span[aria-hidden]');
      expect(span).toHaveStyle({ transform: 'rotate(180deg)' });
    });

    it('does not apply rotation transform for right direction', () => {
      render(<ArrowButton direction="right" />);
      const span = screen.getByRole('button').querySelector('span[aria-hidden]');
      expect(span).not.toHaveStyle({ transform: 'rotate(180deg)' });
    });
  });

  describe('className prop', () => {
    it('merges custom className', () => {
      render(<ArrowButton className="extra-class" />);
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });
  });
});
