const fs = require('fs');
const path = require('path');

function renderTemplate(templateName, data) {
  try {
    // Read the pre-built and minified template
    const templatePath = path.join(__dirname, 'dist', `${templateName}.min.html`);
    let html = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders
    if (data.id) {
      html = html.replace(/\$\{order\?\.id\}/g, data.id);
      html = html.replace(/\$\{order\.id\}/g, data.id);
    }
    if (data.name) {
      html = html.replace(/\$\{order\.name\}/g, data.name);
    }
    if (data.price) {
      html = html.replace(/\$\{price\}/g, new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(data.price));
    }
    if (data.link) {
      html = html.replace(/\$\{link\}/g, data.link);
    }
    if (data.email) {
      html = html.replace(/\$\{order\.email\}/g, data.email);
    }


    // Generate plain text version
    let text = '';
    if (templateName === 'booking-confirmation') {
        text = `
New Booking from Pet88: #${data.id}

Hi ${data.name},

This is a confirmation for your booking with Pet88 for the amount of ${new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(data.price)}.

Please confirm your booking by clicking the following link:
${data.link}

Questions? Contact us at servicepet88@gmail.com.

You are receiving this email because you made a booking on Pet88.
To unsubscribe, please visit: https://example.com/unsubscribe?email=${data.email}
    `;
    } else if (templateName === 'welcome') {
        text = `
Welcome to Pet88!

Hi ${data.name},

Thanks for joining our community. We are excited to have you on board.

You can now book our services and manage your appointments.

Go to your dashboard: https://example.com/dashboard

Questions? Contact us at servicepet88@gmail.com.

You are receiving this email because you signed up on Pet88.
To unsubscribe, please visit: https://example.com/unsubscribe?email=${data.email}
    `;
    }


    return {
      html: html,
      text: text.trim(),
    };
  } catch (error) {
    console.error("Error rendering email template:", error);
    throw new Error(`Failed to render email template ${templateName}.`);
  }
}

module.exports = renderTemplate;