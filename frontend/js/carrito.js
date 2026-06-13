const contenedorCarrito = document.getElementById('contenedor-carrito');
const totalCarrito = document.getElementById('total-carrito');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const calcularTotal = () => {
    return carrito.reduce((acc, producto) => {
        return acc + (Number(producto.precio) * producto.quantity);
    }, 0);
};

const renderizarCarrito = () => {
    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <p class="text-slate-400">
                El carrito está vacío.
            </p>
        `;

        totalCarrito.textContent = '$0';
        return;
    }

    carrito.forEach(producto => {
        const subtotal = Number(producto.precio) * producto.quantity;

        const item = `
            <article class="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl grid grid-cols-[1fr_180px_180px] items-center gap-6">

                <div>
                    <p class="text-sm text-emerald-400 uppercase tracking-widest mb-2">
                        ${producto.categoria}
                    </p>

                    <h2 class="text-2xl font-bold">
                        ${producto.nombre}
                    </h2>

                    <p class="text-slate-400 mt-2">
                        Precio unitario: $${producto.precio}
                    </p>

                    <button
                        onclick="eliminarProducto('${producto._id}')"
                        class="mt-4 text-sm bg-red-500/20 text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/30 transition">

                        Eliminar

                    </button>
                </div>

                <div class="flex items-center justify-center gap-4">

                    <button
                        onclick="restarCantidad('${producto._id}')"
                        class="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl hover:border-emerald-400 transition">
                        -
                    </button>

                    <span class="text-xl font-bold">
                        ${producto.quantity}
                    </span>

                    <button
                        onclick="sumarCantidad('${producto._id}')"
                        class="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl hover:border-emerald-400 transition">
                        +
                    </button>

                </div>

                <p class="text-3xl font-bold text-white text-right">
                    $${subtotal}
                </p>

            </article>
        `;

        contenedorCarrito.innerHTML += item;
    });

    totalCarrito.textContent = `$${calcularTotal()}`;
};

const sumarCantidad = (id) => {
    const producto = carrito.find(item => item._id === id);

    if (producto) {
        producto.quantity += 1;
        guardarCarrito();
        renderizarCarrito();
    }
};

const restarCantidad = (id) => {
    const producto = carrito.find(item => item._id === id);

    if (producto) {
        producto.quantity -= 1;

        if (producto.quantity <= 0) {
            carrito = carrito.filter(item => item._id !== id);
        }

        guardarCarrito();
        renderizarCarrito();
    }
};

const eliminarProducto = (id) => {

    carrito = carrito.filter(producto => producto._id !== id);

    guardarCarrito();

    renderizarCarrito();

};

const finalizarCompra = async () => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const token = localStorage.getItem('token');

    if (!usuarioLogueado || !token) {
        alert('Debés iniciar sesión para finalizar la compra');
        window.location.href = './login.html';
        return;
    }

    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const order = {
        products: carrito.map(producto => {
            return {
                productId: producto._id,
                quantity: producto.quantity
            };
        })
    };

    try {
        const respuesta = await fetch('/api/v1/sales/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order)
        });

        if (!respuesta.ok) {
            throw new Error('Error al finalizar la compra');
        }

        const resultado = await respuesta.json();

        console.log(resultado);

        localStorage.removeItem('carrito');
        carrito = [];

        alert('Compra finalizada exitosamente');

        renderizarCarrito();

    } catch (error) {
        console.error(error);
        alert('Error al finalizar la compra');
    }
};

btnFinalizarCompra.addEventListener('click', finalizarCompra);

renderizarCarrito();