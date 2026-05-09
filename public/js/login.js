function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch( 'http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response from server:', data);
            if (data.message === 'Login successful') {
                alert('Welcome, ' + data.user.username + '!');
                window.location.href = 'welcome-home.html'; // Redirect to dashboard
            } else {
                alert(data.message);
            }
        })
        .catch((err) => console.error('Error during login:', err));
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', { username, password });

        if (response.status === 200) {
            alert('Login successful!');
            console.log(response.data); // You can redirect the user to a dashboard or home page
            window.location.href = 'home.html'; // Adjust as per your project structure
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Invalid credentials. Please try again.');
        } else {
            console.error('Login error:', error);
            alert('Something went wrong. Please try again later.');
        }
    }
});
