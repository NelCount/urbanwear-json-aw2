# UrbanWear - Estructura JSON

Este proyecto corresponde a la primera entrega de la materia Aplicaciones Web 2.

El objetivo es modelar una estructura de datos en formato JSON que represente un sistema de ventas de una tienda online.

## 📦 Contexto

UrbanWear es una tienda de ropa urbana que permite a los usuarios comprar productos a través de una plataforma digital.

## 📁 Estructura del proyecto

El proyecto está compuesto por tres archivos JSON interrelacionados:

### 1. usuarios.json
Contiene la información de los usuarios del sistema.

Campos principales:
- id
- nombre
- apellido
- email
- contraseña
- activo (booleano)
- admin (booleano)

---

### 2. productos.json
Contiene el catálogo de productos disponibles.

Campos principales:
- id
- nombre
- desc
- precio
- imagen
- categoria
- stock
- disponible (booleano)

---

### 3. ventas.json
Contiene las transacciones realizadas por los usuarios.

Campos principales:
- id
- id_usuario (relación con usuarios.json)
- fecha
- total
- direccion
- productos (array de objetos con id_producto y cantidad)
- pagada (booleano)
- entregada (booleano)

---

## Relación entre archivos

- Un usuario puede tener múltiples ventas.
- Una venta pertenece a un único usuario.
- Una venta puede incluir múltiples productos.
- Los productos dentro de una venta se relacionan mediante su id.

---

## Tipos de datos utilizados

Se utilizan distintos tipos de datos para representar correctamente la información:

- Numéricos: id, precio, stock, total, cantidad
- Cadenas de texto: nombre, email, descripcion, direccion
- Booleanos: activo, admin, disponible, pagada, entregada

---

## Próximos pasos

Este proyecto será utilizado para futuras entregas. 

---

## Autor

Nelson Sanchez