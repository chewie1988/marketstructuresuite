// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.indicator-card, .step, .blog-card, .data-stat-card, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Formspree or similar — replace ACTION_URL with your endpoint
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        contactForm.innerHTML = `
          <div style="text-align:center; padding: 40px 0;">
            <div style="font-size: 2rem; margin-bottom: 16px;">✅</div>
            <h3 style="color: var(--accent); margin-bottom: 12px;">Request Received</h3>
            <p style="color: var(--text-muted);">Thanks for your interest. I'll be in touch within 24 hours with your access details.</p>
          </div>`;
      } else {
        btn.textContent = original;
        btn.disabled = false;
        alert('Something went wrong. Please try again or DM on TradingView.');
      }
    }).catch(() => {
      btn.textContent = original;
      btn.disabled = false;
      alert('Something went wrong. Please try again or DM on TradingView.');
    });
  });
}
