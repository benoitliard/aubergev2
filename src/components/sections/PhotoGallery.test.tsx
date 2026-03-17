import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoGallery from './PhotoGallery';

const images = [
  { src: '/images/room.jpg', alt: 'Chambre avec vue' },
  { src: '/images/bistro.jpg', alt: 'Salle du Bistro' },
  { src: '/images/garden.jpg', alt: 'Terrasse et jardins' },
];

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('PhotoGallery', () => {
  describe('renders without crashing', () => {
    it('renders a section with the gallery label', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByRole('region', { name: 'Galerie de photos' })).toBeInTheDocument();
    });
  });

  describe('images', () => {
    it('renders all images with correct alt text', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByAltText('Chambre avec vue')).toBeInTheDocument();
      expect(screen.getByAltText('Salle du Bistro')).toBeInTheDocument();
      expect(screen.getByAltText('Terrasse et jardins')).toBeInTheDocument();
    });

    it('sets correct src', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByAltText('Chambre avec vue')).toHaveAttribute('src', '/images/room.jpg');
    });
  });

  describe('counter', () => {
    it('shows position counter', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByText('1 / 3')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('disables previous button at start', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    });

    it('advances when next is clicked', async () => {
      const user = userEvent.setup();
      render(<PhotoGallery images={images} />);
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });
  });

  describe('className prop', () => {
    it('merges custom className', () => {
      render(<PhotoGallery images={images} className="extra-class" />);
      expect(screen.getByRole('region', { name: 'Galerie de photos' })).toHaveClass('extra-class');
    });
  });
});
