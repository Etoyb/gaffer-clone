document.querySelector('.signin').addEventListener('submit', (e) => {
    e.preventDefault()
    const username = document.querySelector('.nameInput').value;
    const password = document.querySelector('.passInput').value;

    fetch('https://gaffer-hub-backend-yy35.onrender.com/auth/signin', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
        credentials: 'include'
    })
    .then (response => response.json())
    .then (data => {
      document.querySelector('.displayError').innerHTML = data;
    })
    .catch (error => console.log('error:',error))
});



document.querySelectorAll('.passInput, .inputPass').forEach(input => {
  input.type = input.type === "password" ? "text" : "password";
});
