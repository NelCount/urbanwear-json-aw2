const contenedorCarrito = document.getElementById('contenedor-carrito');

const totalCarrito = document.getElementById('total-carrito');

const carritoStorage = localStorage.getItem('carrito');

const carrito = carritoStorage
    ? JSON.parse(carritoStorage)
    : [];

let total = 0;

carrito.forEach(producto => {

    total += Number(producto.precio);

    const item = `
    <article class="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex justify-between items-center">

        <div>
            <p class="text-sm text-emerald-400 uppercase tracking-widest mb-2">
                ${producto.categoria}
            </p>

            <h2 class="text-2xl font-bold">
                ${producto.nombre}
            </h2>
        </div>

        <p class="text-3xl font-bold text-white">
            $${producto.precio}
        </p>

    </article>
    `;

    contenedorCarrito.innerHTML += item;

});

totalCarrito.textContent = `$${total}`;

const btnFinalizarCompra = document.getElementById('btn-finalizar-compra'); 

const finalizarCompra = async () => {

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    if (!usuarioLogueado) {
        alert('Debés iniciar sesión para finalizar la compra');
        window.location.href = './login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogueado);

    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const order = {
        userId: usuario.id,
        products: carrito.map(producto => {
            return {
                productId: producto.id,
                quantity: 1
            };
        })
    };

    try {
        const respuesta = await fetch('/api/v1/sales/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!respuesta.ok) {
            throw new Error('Error al finalizar la compra');
        }

        const resultado = await respuesta.json();

        console.log(resultado);

        localStorage.removeItem('carrito');

        alert('Compra finalizada exitosamente');

        location.reload();

    } catch (error) {
        console.error(error);
        alert('Error al finalizar la compra');
    }
};

btnFinalizarCompra.addEventListener('click', finalizarCompra);