document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-box form'); // Select the form inside .form-box
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    const textarea = form.querySelector('textarea');

    const formData = {
      name: inputs[0].value,
      phone: inputs[1].value,
      email: inputs[2].value,
      collegeName: inputs[3].value,
      comments: textarea.value
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        form.reset();
      } else {
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form.');
    }
  });
});
