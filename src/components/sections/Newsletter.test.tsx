import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from './Newsletter';

describe('Newsletter', () => {
  describe('renders without crashing', () => {
    it('renders the section with the newsletter heading', () => {
      render(<Newsletter />);
      expect(
        screen.getByRole('heading', { name: /Restez au courant des nouveautés/ })
      ).toBeInTheDocument();
    });
  });

  describe('form fields', () => {
    it('renders the email input', () => {
      render(<Newsletter />);
      expect(screen.getByLabelText(/Adresse courriel/)).toBeInTheDocument();
    });

    it('renders the communication type select', () => {
      render(<Newsletter />);
      expect(screen.getByLabelText(/Type de communication/)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      render(<Newsletter />);
      expect(
        screen.getByRole('button', { name: "Je m'abonne à l'infolettre" })
      ).toBeInTheDocument();
    });

    it('select has all four communication type options', () => {
      render(<Newsletter />);
      const select = screen.getByLabelText(/Type de communication/);
      expect(select).toHaveDisplayValue('Tous');
      const options = select.querySelectorAll('option');
      expect(options).toHaveLength(4);
    });
  });

  describe('email validation', () => {
    it('shows an error when submitting with an empty email', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(screen.getByRole('alert')).toHaveTextContent("L'adresse courriel est requise.");
    });

    it('shows an error when submitting with an invalid email', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.type(screen.getByLabelText(/Adresse courriel/), 'not-an-email');
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Veuillez entrer une adresse courriel valide.'
      );
    });

    it('marks email input as aria-invalid on error', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(screen.getByLabelText(/Adresse courriel/)).toHaveAttribute('aria-invalid', 'true');
    });

    it('clears the error message when user types in the email field', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(screen.getByRole('alert')).toBeInTheDocument();
      await user.type(screen.getByLabelText(/Adresse courriel/), 'a');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('successful submission', () => {
    it('shows success message after valid submission', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.type(
        screen.getByLabelText(/Adresse courriel/),
        'test@example.com'
      );
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(screen.getByRole('status')).toHaveTextContent('Merci pour votre abonnement !');
    });

    it('hides the form after successful submission', async () => {
      const user = userEvent.setup();
      render(<Newsletter />);
      await user.type(
        screen.getByLabelText(/Adresse courriel/),
        'test@example.com'
      );
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(
        screen.queryByRole('form')
      ).not.toBeInTheDocument();
    });

    it('calls onSubmit with trimmed email and selected type', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<Newsletter onSubmit={handleSubmit} />);
      await user.type(
        screen.getByLabelText(/Adresse courriel/),
        '  hello@example.com  '
      );
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'hello@example.com',
        type: 'tous',
      });
    });

    it('calls onSubmit with the selected communication type', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<Newsletter onSubmit={handleSubmit} />);
      await user.selectOptions(
        screen.getByLabelText(/Type de communication/),
        'evenements'
      );
      await user.type(
        screen.getByLabelText(/Adresse courriel/),
        'test@example.com'
      );
      await user.click(screen.getByRole('button', { name: "Je m'abonne à l'infolettre" }));
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        type: 'evenements',
      });
    });
  });
});
