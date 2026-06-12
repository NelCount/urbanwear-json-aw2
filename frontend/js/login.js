const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const response = await fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contraseña })
        });

        const data = await response.json();

        if (!response.ok) {
            mensaje.textContent = data;
            return;
        }

        localStorage.setItem('usuarioLogueado', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        mensaje.textContent = 'Login correcto';

        setTimeout(() => {
            window.location.href = './index.html';
        }, 1000);

    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error al iniciar sesión';
    }
});