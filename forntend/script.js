// ── Navbar solid on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 30);
}, { passive: true });


// ── Scroll reveal ──
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('up');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revEls.forEach(el => revObs.observe(el));


// ── Typewriter effect ──
const roles = ['Java Developer', 'Python Developer', 'Problem Solver', 'App Builder'];
let ri = 0, ci = 0, del = false;

const typed = document.getElementById('typed-role');

function typeLoop() {
  const word = roles[ri];

  if (!del) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      del = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, del ? 55 : 90);
}

typeLoop();


// ── Contact form (BACKEND CONNECTED) ──
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('fc-name').value.trim();
  const email = document.getElementById('fc-email').value.trim();
  const topic = document.getElementById('fc-topic').value.trim();
  const message = document.getElementById('fc-message').value.trim();

  const status = document.getElementById('formStatus');
  const btn = document.getElementById('submitBtn');
  const label = document.getElementById('btnLabel');

  status.className = 'form-status';

  // validation
  if (!name) {
    status.className = 'form-status err';
    status.textContent = '⚠ Please enter your name.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.className = 'form-status err';
    status.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  if (!message) {
    status.className = 'form-status err';
    status.textContent = '⚠ Please write a message.';
    return;
  }

  btn.disabled = true;
  label.textContent = 'Sending…';

  try {

    const res = await fetch("https://portfolio-backend-xneg.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, topic, message })
    });

    const data = await res.json();

    if (data.success) {
      status.className = 'form-status ok';
      status.textContent = '✅ Message sent successfully!';
      this.reset();
    } else {
      throw new Error();
    }

  } catch (error) {

    console.log(error);

    status.className = 'form-status err';
    status.textContent = '⚠ Something went wrong!';
  }

  btn.disabled = false;
  label.textContent = 'Send Message';
});