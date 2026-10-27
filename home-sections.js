document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const feedback = form.querySelector('.newsletter-feedback');
    feedback.textContent = 'This is a design preview. No subscription was sent.';
    feedback.hidden = false;
  });
});
