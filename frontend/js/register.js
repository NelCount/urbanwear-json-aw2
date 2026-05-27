const registerForm = document.getElementById('registerForm');
const mensaje = document.getElementById('mensaje');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {

        const response = await fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                apellido,
                email,
                contraseña
            })
        });

        const data = await response.json();

        if (!response.ok) {
            mensaje.textContent = data;
            return;
        }

        mensaje.textContent = 'Usuario registrado correctamente';

        setTimeout(() => {
            window.location.href = './login.html';
        }, 1500);

    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error al registrar usuario';
    }
});