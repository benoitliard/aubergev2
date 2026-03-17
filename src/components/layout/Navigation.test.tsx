import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';

/**
 * The Navigation component renders links in two places:
 *   1. The desktop nav bar (always in DOM, hidden via CSS on mobile)
 *   2. The mobile overlay (always in DOM, hidden via CSS on desktop)
 *
 * So getAllBy* is used when queries would otherwise match multiple elements.
 */
describe('Navigation', () => {
  describe('renders without crashing', () => {
    it('renders the main navigation landmark', () => {
      render(<Navigation />);
      expect(
        screen.getByRole('navigation', { name: 'Navigation principale' })
      ).toBeInTheDocument();
    });
  });

  describe('logo', () => {
    it('renders logo links pointing to the home page', () => {
      render(<Navigation />);
      const homeLinks = screen.getAllByRole('link', { name: /Retour à l'accueil/ });
      expect(homeLinks.length).toBeGreaterThan(0);
      homeLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/');
      });
    });

    it('renders logo images with correct src', () => {
      render(<Navigation />);
      const logoImages = screen.getAllByAltText('Les Balcons');
      expect(logoImages.length).toBeGreaterThan(0);
      // At least one should be the dark variant for the nav bar
      const srcs = logoImages.map((img) => img.getAttribute('src'));
      expect(srcs).toContain('/logo-dark.svg');
    });
  });

  describe('nav links', () => {
    it('renders navigation links for the default fr lang', () => {
      render(<Navigation lang="fr" />);
      // Each link appears in both desktop nav and mobile overlay
      expect(screen.getAllByRole('link', { name: "L'Auberge" }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Le Bistro' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Groupes et affaires' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Événements' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Contact' }).length).toBeGreaterThan(0);
    });

    it('uses /en prefix for English links', () => {
      render(<Navigation lang="en" />);
      const aubergeLinks = screen.getAllByRole('link', { name: "L'Auberge" });
      aubergeLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/en/auberge');
      });
    });

    it('uses no prefix for French links', () => {
      render(<Navigation lang="fr" />);
      const aubergeLinks = screen.getAllByRole('link', { name: "L'Auberge" });
      aubergeLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/auberge');
      });
    });
  });

  describe('active link', () => {
    it('marks the matching link with aria-current="page" in both navs', () => {
      render(<Navigation currentPath="/auberge" />);
      const aubergeLinks = screen.getAllByRole('link', { name: "L'Auberge" });
      aubergeLinks.forEach((link) => {
        expect(link).toHaveAttribute('aria-current', 'page');
      });
    });

    it('does not mark non-matching links as current', () => {
      render(<Navigation currentPath="/auberge" />);
      const bistroLinks = screen.getAllByRole('link', { name: 'Le Bistro' });
      bistroLinks.forEach((link) => {
        expect(link).not.toHaveAttribute('aria-current');
      });
    });
  });

  describe('reservation CTA', () => {
    it('renders "Je réserve" links pointing to the reservationUrl', () => {
      render(<Navigation reservationUrl="https://beds24.com/booking" />);
      const reserveLinks = screen.getAllByRole('link', { name: 'Je réserve' });
      expect(reserveLinks.length).toBeGreaterThan(0);
      reserveLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://beds24.com/booking');
      });
    });

    it('defaults reservationUrl to "#reserver"', () => {
      render(<Navigation />);
      const reserveLinks = screen.getAllByRole('link', { name: 'Je réserve' });
      reserveLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '#reserver');
      });
    });
  });

  describe('mobile menu', () => {
    it('renders the hamburger button', () => {
      render(<Navigation />);
      expect(
        screen.getByRole('button', { name: 'Ouvrir le menu' })
      ).toBeInTheDocument();
    });

    it('opens the mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
      // After opening, multiple "Fermer le menu" buttons appear (hamburger toggle + overlay close)
      expect(screen.getAllByRole('button', { name: 'Fermer le menu' }).length).toBeGreaterThan(0);
    });

    it('closes the mobile menu when the close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
      const closeButtons = screen.getAllByRole('button', { name: 'Fermer le menu' });
      await user.click(closeButtons[0]);
      expect(
        screen.getByRole('button', { name: 'Ouvrir le menu' })
      ).toBeInTheDocument();
    });

    it('closes the mobile menu when Escape is pressed', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
      await user.keyboard('{Escape}');
      expect(
        screen.getByRole('button', { name: 'Ouvrir le menu' })
      ).toBeInTheDocument();
    });

    it('sets aria-expanded to true on the hamburger button when menu is open', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      // The hamburger/toggle button has aria-controls
      const hamburger = screen.getByRole('button', { name: 'Ouvrir le menu' });
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      await user.click(hamburger);
      // After clicking, the same button now shows "Fermer le menu" and aria-expanded=true
      // Query by aria-controls to get the specific toggle button
      const toggleButton = document.querySelector('button[aria-controls="mobile-menu"]') as HTMLElement;
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('mobile overlay', () => {
    it('renders the mobile menu dialog', () => {
      render(<Navigation />);
      expect(screen.getByRole('dialog', { name: 'Menu de navigation' })).toBeInTheDocument();
    });
  });
});
