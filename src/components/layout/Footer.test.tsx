import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

/**
 * The Footer component renders two layouts (desktop + mobile) both in the DOM simultaneously.
 * Many elements are duplicated; we use getAllBy* variants and check length > 0.
 */
describe('Footer', () => {
  describe('renders without crashing', () => {
    it('renders a footer landmark', () => {
      render(<Footer />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('language prop — French (default)', () => {
    it('renders French navigation links', () => {
      render(<Footer lang="fr" />);
      expect(screen.getAllByRole('link', { name: 'À propos' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: "Offres d'emploi" }).length).toBeGreaterThan(0);
    });

    it('renders the French copyright text', () => {
      render(<Footer lang="fr" />);
      // Both desktop and mobile layouts render copyright; use getAllByText
      expect(screen.getAllByText(/Tous droits réservés/).length).toBeGreaterThan(0);
    });

    it('renders the French cancellation policy link', () => {
      render(<Footer lang="fr" />);
      expect(
        screen.getAllByRole('link', { name: "Politique d'annulation" }).length
      ).toBeGreaterThan(0);
    });

    it('renders the French privacy policy link', () => {
      render(<Footer lang="fr" />);
      expect(
        screen.getAllByRole('link', { name: 'Politique de confidentialité' }).length
      ).toBeGreaterThan(0);
    });
  });

  describe('language prop — English', () => {
    it('renders English navigation links', () => {
      render(<Footer lang="en" />);
      expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: 'Job offers' }).length).toBeGreaterThan(0);
    });

    it('renders the English copyright text', () => {
      render(<Footer lang="en" />);
      expect(screen.getAllByText(/All rights reserved/).length).toBeGreaterThan(0);
    });

    it('renders the English cancellation policy link', () => {
      render(<Footer lang="en" />);
      expect(
        screen.getAllByRole('link', { name: 'Cancellation policy' }).length
      ).toBeGreaterThan(0);
    });
  });

  describe('contact information', () => {
    it('renders the address', () => {
      render(<Footer />);
      expect(
        screen.getAllByText(/63 Rue Ambroise Fafard/).length
      ).toBeGreaterThan(0);
    });

    it('renders the phone number as a tel link', () => {
      render(<Footer />);
      const phoneLinks = screen.getAllByRole('link', { name: /\+1 581-705-2176/ });
      expect(phoneLinks.length).toBeGreaterThan(0);
      phoneLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'tel:+15817052176');
      });
    });

    it('renders the email as a mailto link', () => {
      render(<Footer />);
      const emailLinks = screen.getAllByRole('link', { name: /info@lesbalcons\.ca/ });
      expect(emailLinks.length).toBeGreaterThan(0);
      emailLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'mailto:info@lesbalcons.ca');
      });
    });
  });

  describe('social links', () => {
    it('renders the Facebook link', () => {
      render(<Footer />);
      expect(
        screen.getAllByRole('link', { name: /Facebook/ }).length
      ).toBeGreaterThan(0);
    });

    it('renders the Instagram link', () => {
      render(<Footer />);
      expect(
        screen.getAllByRole('link', { name: /Instagram/ }).length
      ).toBeGreaterThan(0);
    });

    it('renders the LinkedIn link', () => {
      render(<Footer />);
      expect(
        screen.getAllByRole('link', { name: /LinkedIn/ }).length
      ).toBeGreaterThan(0);
    });

    it('renders the TikTok link', () => {
      render(<Footer />);
      expect(
        screen.getAllByRole('link', { name: /TikTok/ }).length
      ).toBeGreaterThan(0);
    });

    it('opens social links in a new tab with safe rel attributes', () => {
      render(<Footer />);
      const facebookLink = screen.getAllByRole('link', { name: /Facebook/ })[0];
      expect(facebookLink).toHaveAttribute('target', '_blank');
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('logo', () => {
    it('renders the Les Balcons logo image', () => {
      render(<Footer />);
      // Both desktop and mobile layouts have a logo; getAllByAltText handles both
      expect(screen.getAllByAltText('Les Balcons').length).toBeGreaterThan(0);
    });
  });

  describe('external links', () => {
    it('opens external nav links in a new tab', () => {
      render(<Footer lang="fr" />);
      const giftCardLinks = screen.getAllByRole('link', { name: /Cartes-cadeaux/ });
      expect(giftCardLinks.length).toBeGreaterThan(0);
      giftCardLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});
