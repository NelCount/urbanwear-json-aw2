const usuarioNavbar = document.getElementById('usuario-navbar');
const btnLogout = document.getElementById('btn-logout');
const linkLogin = document.getElementById('link-login');
const linkRegister = document.getElementById('link-register');

const usuarioStorage = localStorage.getItem('usuarioLogueado');

if (usuarioStorage) {
    const usuario = JSON.parse(usuarioStorage);

    usuarioNavbar.textContent = `Hola, ${usuario.nombre}`;

    linkLogin.classList.add('hidden');
    linkRegister.classList.add('hidden');
    btnLogout.classList.remove('hidden');
}

btnLogout.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = './login.html';
});