const listaCursos = [
    {
        id: 1,
        nombre: 'JavaScript',
        duracion: 3,
        precio: 15000,
        img: "assets/img/javascript-logo-javascript-icon-transparent-free-png.jpg"
    },
    {
        id: 2,
        nombre: 'Python',
        duracion: 3,
        precio: 17000,
        img: "assets/img/pythonLogo.jpg"
    }, {
        id: 3,
        nombre: 'Angular',
        duracion: 3.5,
        precio: 12500,
        img: "assets/img/angularLogo.png"
    }, {
        id: 4,
        nombre: 'React',
        duracion: 3.5,
        precio: 13500,
        img: "assets/img/re269re79-react-logo-react-logo-.png"
    }, {
        id: 5,
        nombre: 'TypeScript',
        duracion: 5,
        precio: 17200,
        img: "assets/img/TSLogo.png"
    }, {
        id: 6,
        nombre: 'C#',
        duracion: 5.8,
        precio: 18300,
        img: "assets/img/c-sharp-logo-png.png"
    }, {
        id: 7,
        nombre: 'C++',
        duracion: 5.8,
        precio: 18300,
        img: "assets/img/c++LOGO.png"
    }, {
        id: 8,
        nombre: '.NET',
        duracion: 6,
        precio: 18500,
        img: "assets/img/Microsoft_.NET_logo.svg.png"
    }, {
        id: 9,
        nombre: 'Desarrollo Web',
        duracion: 4,
        precio: 15000,
        img: "assets/img/DEVWEBLOGO.jpg"
    }, {
        id: 10,
        nombre: 'Node.js',
        duracion: 4,
        precio: 13300,
        img: "assets/img/NodeJSLOGO.jpg"
    }, {
        id: 11,
        nombre: 'Base de datos 1',
        duracion: 3,
        precio: 10000,
        img: "assets/img/sqlLogo.png"
    }, {
        id: 12,
        nombre: 'Base de datos 2',
        duracion: 3,
        precio: 10500,
        img: "assets/img/sqlLogo.png"
    }, {
        id: 13,
        nombre: 'Semi-Full Stack',
        duracion: 7,
        precio: 20000,
        img: "assets/img/html css and javascript.jpeg"
    }
]
const contenedorListaCursos = document.querySelector('.contenedorListaCursos');
let contadorElementosCarrito = document.querySelector('.contadorElementosCarrito');


if (localStorage.getItem('contadorCursos') ===  null) {
    contadorElementosCarrito.innerHTML = 0;
} else {
    contadorElementosCarrito.innerHTML = localStorage.getItem('contadorCursos');
}


listaCursos.forEach(curso => {
    const etiquetaCurso = document.createElement('div');
    etiquetaCurso.className = 'curso';
    etiquetaCurso.innerHTML = `
                    <h2 class="nombreCurso">Curso: ${curso.nombre}</h2>
                    <h2 class="duracionCurso">Duración de ${curso.duracion} meses</h2>
                    <h2 class="precioCurso">Precio ${curso.precio} pesos argentinos</h2>
                    <img class="imagenCurso" src="${curso.img}" alt="Logo del curso">
                    <div class="botones">
                        <button class="botonVerInfo">Acerca de ${curso.nombre}</button>
                        <button class="botonComprar${curso.id}" data-id="${curso.id}" data-precio="${curso.precio}">Agregar curso al carrito</button>
                    </div>
                `;

    contenedorListaCursos.appendChild(etiquetaCurso);

    const botonComprar = etiquetaCurso.querySelector(`.botonComprar${curso.id}`);

    botonComprar.addEventListener('click', ()=>{
        const idCurso = botonComprar.getAttribute('data-id');
        const valorCurso = botonComprar.getAttribute('data-precio');
        let carrito;
        if (localStorage.getItem('carrito')===null) {
            carrito = [];
        } else{
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        let almacenadoEnCarrito;
        function comprobarAlmacenamiento(carro){
            for (let i = 0; i < carro.length; i++) {
                if (carro[i].id == idCurso) {
                    return true;
                }
            }
            return false;
        }
        almacenadoEnCarrito = comprobarAlmacenamiento(carrito);

        if (almacenadoEnCarrito) {
            alert('El curso se encuentra en el carrito actualmente')
        } else {
            let nuevoCurso = {
                'id':idCurso,
                'precio':valorCurso
            };
            carrito.push(nuevoCurso);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            cursosAlmacenados=Number(contadorElementosCarrito.textContent);
            cursosAlmacenados++;
            localStorage.setItem('contadorCursos', Number(cursosAlmacenados));
            contadorElementosCarrito.innerHTML = localStorage.getItem('contadorCursos');
            //Pendiente: al recargar la página, que también traiga el contador del carrito actualizado
        }

    });

});





