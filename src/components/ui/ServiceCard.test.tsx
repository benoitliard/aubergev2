import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceCard } from './ServiceCard';

const defaultProps = {
  title: 'L\'Auberge',
  image: '/images/auberge.jpg',
  href: '/auberge',
};

describe('ServiceCard', () => {
  describe('renders without crashing', () => {
    it('renders a link', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('title prop', () => {
    it('renders the title text', () => {
      render(<ServiceCard {...defaultProps} title="Le Bistro" />);
      expect(screen.getByRole('heading', { name: 'Le Bistro' })).toBeInTheDocument();
    });
  });

  describe('href prop', () => {
    it('links to the correct href', () => {
      render(<ServiceCard {...defaultProps} href="/bistro" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/bistro');
    });
  });

  describe('image prop', () => {
    it('renders the background image as an aria-hidden decorative element', () => {
      render(<ServiceCard {...defaultProps} image="/img/test.jpg" />);
      // The image is aria-hidden="true", query by DOM
      const img = document.querySelector('img[aria-hidden="true"]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/img/test.jpg');
    });
  });

  describe('description prop', () => {
    it('renders the description when provided', () => {
      render(
        <ServiceCard {...defaultProps} description="A lovely place to stay" />
      );
      expect(screen.getByText('A lovely place to stay')).toBeInTheDocument();
    });

    it('does not render a description element when not provided', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.queryByText(/lovely/)).not.toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className on the link', () => {
      render(<ServiceCard {...defaultProps} className="custom-class" />);
      expect(screen.getByRole('link')).toHaveClass('custom-class');
    });
  });
});
