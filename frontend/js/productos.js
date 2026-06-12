// URL del backend
const URL = 'http://localhost:3000/api/v1/products/all';


// Contenedores HTML
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorFiltros = document.getElementById('contenedor-filtros');


// Variable global donde guardamos productos
let productosGlobal = [];


// Función para renderizar productos
const renderizarProductos = (productos) => {

    // Limpiamos contenedor 
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {

        const tarjeta = `

            <article class="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden
            hover:border-emerald-400 transition flex flex-col">

                <div class="h-56 bg-slate-800 overflow-hidden">
                    <img 
                        src="${producto.imagen}" 
                        alt="${producto.nombre}"
                        onmouseenter="abrirModalImagen('${producto.imagen}', '${producto.nombre}')"
                        onmouseleave="cerrarModalImagen()"
                        class="w-full h-full object-cover hover:scale-110 transition duration-300"
                    >
                </div>

                <div class="p-6 flex flex-col flex-grow justify-between gap-6">

                    <div>

                        <p class="text-sm text-emerald-400 uppercase tracking-widest mb-3">
                            ${producto.categoria}
                        </p>

                        <h3 class="text-xl font-bold mb-3">
                            ${producto.nombre}
                        </h3>

                        <p class="text-slate-400 text-sm leading-relaxed">
                            ${producto.descripcion || 'Producto UrbanWear'}
                        </p>

                    </div>

                    <div>

                        <div class="flex justify-between items-center mb-4">

                            <p class="text-2xl font-bold text-white">
                                $${producto.precio}
                            </p>

                            <p class="text-sm text-slate-400">
                                Envío disponible
                            </p>

                        </div>

                        <button
                            onclick='agregarAlCarrito(${JSON.stringify(producto)})'
                            class="w-full bg-emerald-500 text-slate-950 font-bold px-6 py-3 rounded-xl 
                            hover:bg-emerald-400 transition">

                            Agregar

                        </button>

                    </div>

                </div>

            </article>
        `;

        contenedorProductos.innerHTML += tarjeta;

    });

};


// Función para renderizar filtros
const renderizarFiltros = () => {

    const categorias = [
        'Todos',
        ...new Set(productosGlobal.map(producto => producto.categoria))
    ];


    categorias.forEach(categoria => {

        const boton = `
            <button
                onclick="filtrarProductos('${categoria}')"
                class="bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl hover:border-emerald-400 transition">

                ${categoria}

            </button>
        `;

        contenedorFiltros.innerHTML += boton;

    });

};


// Función para filtrar productos
const filtrarProductos = (categoria) => {

    // Si selecciona TODOS
    if (categoria === 'Todos') {

        renderizarProductos(productosGlobal);

        return;
    }

    // Filtramos productos por categoría
    const productosFiltrados = productosGlobal.filter(producto => {
        return producto.categoria === categoria;
    });

    // Renderizamos productos filtrados
    renderizarProductos(productosFiltrados);

};


// Obtener productos desde back
const obtenerProductos = async () => {

    try {

        const respuesta = await fetch(URL);

        const productos = await respuesta.json();

        // Guardamos productos globalmente
        productosGlobal = productos;

        renderizarProductos(productosGlobal);

        renderizarFiltros();

    } catch (error) {

        console.error(error);

    }

};


// Función carrito
const agregarAlCarrito = (producto) => {

    const carritoStorage = localStorage.getItem('carrito');

    const carrito = carritoStorage
        ? JSON.parse(carritoStorage)
        : [];

    const productoExistente = carrito.find(item => item._id === producto._id);

    if (productoExistente) {
        productoExistente.quantity += 1;
    } else {
        carrito.push({
            ...producto,
            quantity: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto agregado al carrito');
};

const abrirModalImagen = (imagen, nombre) => {
    const modal = document.getElementById('modal-imagen');
    const imagenModal = document.getElementById('imagen-modal');

    imagenModal.src = imagen;
    imagenModal.alt = nombre;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

const cerrarModalImagen = () => {
    const modal = document.getElementById('modal-imagen');

    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

obtenerProductos();