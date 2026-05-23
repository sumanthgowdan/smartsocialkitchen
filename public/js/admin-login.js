function handleAdminLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    fetch('/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful!') {
                alert('Welcome, Admin!');
                window.location.href = 'ad.html'; // Redirect to admin dashboard
            } else {
                alert(data.message); // Show error message
            }
        })
        .catch(err => console.error('Error:', err));
}
