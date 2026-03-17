import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PhotoGallery from './PhotoGallery';

const images = [
  { src: '/images/room.jpg', alt: 'Chambre avec vue' },
  { src: '/images/bistro.jpg', alt: 'Salle du Bistro' },
  { src: '/images/garden.jpg', alt: 'Terrasse et jardins' },
];

describe('PhotoGallery', () => {
  describe('renders without crashing', () => {
    it('renders a section with the gallery label', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByRole('region', { name: 'Galerie de photos' })).toBeInTheDocument();
    });
  });

  describe('images prop', () => {
    it('renders all 3 images with correct alt text', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByAltText('Chambre avec vue')).toBeInTheDocument();
      expect(screen.getByAltText('Salle du Bistro')).toBeInTheDocument();
      expect(screen.getByAltText('Terrasse et jardins')).toBeInTheDocument();
    });

    it('renders only the first 3 images when more are provided', () => {
      const moreImages = [
        ...images,
        { src: '/images/extra.jpg', alt: 'Extra image' },
      ];
      render(<PhotoGallery images={moreImages} />);
      expect(screen.queryByAltText('Extra image')).not.toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(3);
    });

    it('renders fewer than 3 images when array has fewer items', () => {
      render(<PhotoGallery images={[images[0], images[1]]} />);
      expect(screen.getAllByRole('img')).toHaveLength(2);
    });
  });

  describe('image sources', () => {
    it('sets correct src for each image', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByAltText('Chambre avec vue')).toHaveAttribute('src', '/images/room.jpg');
      expect(screen.getByAltText('Salle du Bistro')).toHaveAttribute('src', '/images/bistro.jpg');
    });
  });

  describe('list structure', () => {
    it('renders images inside a list', () => {
      render(<PhotoGallery images={images} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
  });

  describe('className prop', () => {
    it('merges custom className on the outer section', () => {
      render(<PhotoGallery images={images} className="extra-class" />);
      expect(screen.getByRole('region', { name: 'Galerie de photos' })).toHaveClass('extra-class');
    });
  });
});
