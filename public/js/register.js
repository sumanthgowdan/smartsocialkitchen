// document.getElementById('register-form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const response = await fetch('http://localhost:3000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, email, password }),
//     });

//     if (response.ok) {
//         alert('Registration successful! Redirecting to login...');
//         window.location.href = 'login.html'; // Redirect to the login page
//     } else {
//         const data = await response.json();
//         alert(data.message); // Display error message
//     }
// });



document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Username validation: must be within 20 characters
    if (username.length === 0 || username.length > 20) {
        alert('Username must be between 1 and 20 characters.');
        return;
    }

    // Password validation: at least one uppercase letter, one special character, and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert('Registration successful! Redirecting to login...');
            window.location.href = 'login.html'; // Redirect to the login page
        } else {
            const data = await response.json();
            alert(data.message); // Display error message from server
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});
