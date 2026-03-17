import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IntroText from './IntroText';

describe('IntroText', () => {
  describe('renders without crashing', () => {
    it('renders a section element', () => {
      render(<IntroText text="Some intro text." />);
      // IntroText renders a <section> which has no implicit ARIA role unless labelled
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('text prop', () => {
    it('renders the provided text', () => {
      render(<IntroText text="Niché dans les hauteurs de Baie-Saint-Paul." />);
      expect(
        screen.getByText('Niché dans les hauteurs de Baie-Saint-Paul.')
      ).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className on the outer section', () => {
      render(<IntroText text="Hello" className="bg-green" />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('bg-green');
    });

    it('works without a custom className', () => {
      render(<IntroText text="Hello" />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('paragraph element', () => {
    it('renders the text inside a paragraph', () => {
      render(<IntroText text="Test paragraph content." />);
      const paragraph = screen.getByText('Test paragraph content.');
      expect(paragraph.tagName).toBe('P');
    });
  });
});
