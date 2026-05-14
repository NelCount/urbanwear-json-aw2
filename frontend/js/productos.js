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
        
            <article class="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl p-8 
            hover:border-emerald-400 transition h-[260px] flex flex-col justify-between">

                <div>

                    <p class="text-sm text-emerald-400 uppercase tracking-widest mb-4">
                        ${producto.categoria}
                    </p>

                    <h3 class="text-2xl font-bold">
                        ${producto.nombre}
                    </h3>

                </div>

                <div class="flex justify-between items-end gap-4">

                    <p class="text-3xl font-bold text-white">
                        $${producto.precio}
                    </p>

                    <button
                        onclick='agregarAlCarrito(${JSON.stringify(producto)})'
                        class="bg-emerald-500 text-slate-950 font-bold px-6 py-3 rounded-xl 
                        hover:bg-emerald-400 transition">

                        Agregar

                    </button>

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

    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto agregado al carrito');

};

obtenerProductos();