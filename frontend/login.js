
document.querySelector('.login').addEventListener('submit', (e) => {
 e.preventDefault();
    document.querySelector('.errorDis').innerHTML =''
    const username = document.querySelector('.nameLog').value;
    const password = document.querySelector('.inputPass').value;
  
    fetch('https://gaffer-hub-backend-yy35.onrender.com/auth/login', {
  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
        credentials: 'include',
    })
    .then( async response => {
        const data = await response.json()
        if (response.ok) {
            window.location.href = data.redirectUrl;
        } else {
            document.querySelector('.errorDis').innerHTML = data.message;
        }

    })
    .catch (error => console.log('error:',error))
  });
