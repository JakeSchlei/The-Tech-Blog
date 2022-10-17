const $emailInput = document.getElementById('emailInput');
const $passwordInput = document.getElementById('passwordInput');
const $signUpBtn = document.getElementById('signUpBtn');


$signUpBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const emailInput = $emailInput.value;
  const passwordInput = $passwordInput.value;

  if (emailInput.trim().length === 0) {
    alert('Email must be provided');
    return;
  }

  if (passwordInput.trim().length === 0) {
    alert('Password must be provided');
    return;
  }

  try {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      })
    });
    
    const user = await res.json();
    if (user) {
        console.log('We made it', user)
    }
  } catch (error) {
    console.log(error);
  }


});
