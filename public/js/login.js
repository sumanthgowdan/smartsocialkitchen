function handleLogin(event) {

    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username,
            password
        })

    })

        .then((response) => response.json())

        .then((data) => {

            console.log('Response from server:', data);

            if (data.message === 'Login successful') {

                // Save logged in user details
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("username", data.user.username);

                alert('Welcome, ' + data.user.username + '!');

                // Redirect
                window.location.href = 'welcome-home.html';

            } else {

                alert(data.message);

            }

        })

        .catch((err) => {

            console.error('Error during login:', err);

        });

}