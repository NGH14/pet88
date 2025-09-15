# Pet88 Email Template System

This project contains a professional, reusable, and testable email templating system for Pet88. It uses Pug for clean templates, Sass for manageable styles, and Gulp for an automated build process.

## Folder Structure

```
.
├── dist/                  # Compiled, production-ready HTML files
├── node_modules/          # Project dependencies
├── src/                   # Source files for your templates
│   ├── images/            # Local images for your emails
│   ├── layouts/           # The main email layout/skeleton
│   ├── partials/          # Reusable parts of emails (header, footer)
│   ├── booking-confirmation.pug # The booking confirmation email
│   └── welcome.pug        # The welcome email
├── test/                  # Test files
│   └── test.js            # The main test file
├── email-renderer.js      # Function to render emails in your app
├── gulpfile.js            # The Gulp build script
├── package.json           # Project configuration and dependencies
└── README.md              # This file
```

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

## How to Use

### Creating a New Email

1.  Create a new `.pug` file in the `src/` directory (e.g., `src/reminder.pug`).
2.  Extend the main layout and add your content:
    ```pug
    extends layouts/main.pug

    block content
      // Your email-specific content goes here
      h1 Appointment Reminder
      p Don't forget your appointment tomorrow!
    ```
3.  Run the build command (see below) to compile your new template.

### Available CLI Commands

*   **Build All Emails:**
    This command compiles all Pug and Sass files, inlines the CSS and images, and places the final, optimized HTML files in the `dist/` directory.
    ```bash
    npm run build
    ```

*   **Run Tests:**
    This command runs the unit tests to ensure that your email templates are rendering correctly with the right data and that all images are properly embedded.
    ```bash
    npm test
    ```

*   **Watch for Changes:**
    This command will watch for any changes in your `.pug` or `.scss` files and automatically run the build process. This is useful during development.
    ```bash
    npm run watch
    ```

### Using the Renderer in Your Application

To send an email from your Node.js application, use the `renderTemplate` function from `email-renderer.js`.

1.  **Import the function:**
    ```javascript
    const renderTemplate = require('./path/to/email-renderer.js');
    ```

2.  **Call the function with the template name and data:**
    The function returns an object with `html` and `text` properties, which you can then pass to your email sending library (e.g., Nodemailer).

    ```javascript
    // Example: Sending a booking confirmation
    const { html, text } = renderTemplate('booking-confirmation', {
      id: order.id,
      name: order.name,
      price: order.price,
      email: order.email,
      link: link
    });

    transporter.sendMail({
      from: '"Pet88" <booking@yourdomain.com>',
      to: order.email,
      subject: 'Pet88: Booking Confirmation',
      html: html,
      text: text,
    });
    ```

## Anti-Spam Best Practices

Remember to use a **transactional email service** (like Amazon SES, SendGrid, or Postmark) and set up **DNS authentication** (SPF, DKIM, DMARC) for your domain to ensure your emails land in the inbox.
