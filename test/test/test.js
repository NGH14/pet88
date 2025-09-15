const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const renderTemplate = require('../email-renderer');

describe('Email Templates', () => {
  let bookingOrder;
  let welcomeUser;

  before(() => {
    // Run build once before tests
    // This is not ideal, but for this project it's fine.
    // A better solution would be to have a separate test runner script
    // that runs the build first.
    const { execSync } = require('child_process');
    execSync('npm run build');

    bookingOrder = {
      id: '12345',
      name: 'John Doe',
      price: 500000,
      email: 'johndoe@example.com',
      link: `http://localhost:3000/confirm/12345`
    };

    welcomeUser = {
      name: 'Jane Doe',
      email: 'janedoe@example.com'
    };
  });

  describe('Booking Confirmation Email', () => {
    it('should render the HTML and Text versions correctly', () => {
      const { html, text } = renderTemplate('booking-confirmation', bookingOrder);

      // HTML assertions
      expect(html).to.include(bookingOrder.name);
      expect(html).to.include(bookingOrder.id);
      expect(html).to.match(/500\.000\s*₫/);
      expect(html).to.include('data:image/png;base64,');

      // Text assertions
      expect(text).to.include(bookingOrder.name);
      expect(text).to.include(bookingOrder.id);
      expect(text).to.match(/500\.000\s*₫/);

      // Save for manual inspection
      fs.writeFileSync(path.join(__dirname, 'rendered_booking.html'), html);
      fs.writeFileSync(path.join(__dirname, 'rendered_booking.txt'), text);
    });
  });

  describe('Welcome Email', () => {
    it('should render the HTML and Text versions correctly', () => {
      const { html, text } = renderTemplate('welcome', welcomeUser);

      // HTML assertions
      expect(html).to.include(welcomeUser.name);
      expect(html).to.include('data:image/png;base64,');

      // Text assertions
      expect(text).to.include(welcomeUser.name);

      // Save for manual inspection
      fs.writeFileSync(path.join(__dirname, 'rendered_welcome.html'), html);
      fs.writeFileSync(path.join(__dirname, 'rendered_welcome.txt'), text);
    });
  });
});