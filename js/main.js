const listaCursos = [ //Listado de cursos hardcodeado
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

const contenedorListaCursos = document.querySelector('.contenedorListaCursos'); //contenedor de las tarjetas/cursos
let contadorElementosCarrito = document.querySelector('.contadorElementosCarrito'); //contador que representa los cursos agregados al carrito


if (localStorage.getItem('contadorCursos') ===  null) { //si no está el contador en el localStorage
    contadorElementosCarrito.innerHTML = 0;                 // el contenido del contador del carrito será 0
} else {                                                //Si no
    contadorElementosCarrito.innerHTML = localStorage.getItem('contadorCursos'); //el contador tomara como contenido el valor del contador de cursos en el localStorage
}                                                                                


listaCursos.forEach(curso => {  //se recorre el array y por cada objeto (curso) se crea contenido HTML
    const etiquetaCurso = document.createElement('div');
    etiquetaCurso.className = 'curso';
    etiquetaCurso.innerHTML = `
                    <h2 class="nombreCurso">Curso: ${curso.nombre}</h2>
                    <h2 class="duracionCurso">Duración de ${curso.duracion} meses</h2>
                    <h2 class="precioCurso">Precio ${curso.precio} pesos argentinos</h2>
                    <img class="imagenCurso" src="${curso.img}" alt="Logo del curso">
                    <div class="botones">
                        <button id="botonVerInfo" class="botonVerInfo">Acerca de ${curso.nombre}</button>
                        <button id="botonComprar" class="botonComprar${curso.id}" data-id="${curso.id}" data-precio="${curso.precio}" data-img="${curso.img}">Agregar curso al carrito</button>
                    </div>
                `;

    contenedorListaCursos.appendChild(etiquetaCurso);  //se agrega cada tarjeta/curso creado al contenedor

    const botonComprar = etiquetaCurso.querySelector(`.botonComprar${curso.id}`); //constante que toma cada botón con la clase botonComprar y el id
                                                                                  //para tomar exactamente un botón por vez
    botonComprar.addEventListener('click', ()=>{                //se le agrega un evento de tipo click
        const idCurso = botonComprar.getAttribute('data-id');   //se toma id del objeto de la tarjeta clickeada/seleccionada
        const valorCurso = botonComprar.getAttribute('data-precio'); //se toma el precio del objeto de la tarjeta clickeada/seleccionada
        const imgCurso = botonComprar.getAttribute('data-img');
        let carrito; //variable para guardar en el localStorage
        if (localStorage.getItem('carrito')===null) {  //si no se encuentra en el localStorage
            carrito = [];                                //se crea un array vacío
        } else{                                        //Si no:
            carrito = JSON.parse(localStorage.getItem('carrito')); //se toma el valor del item carrito del localStorage parseado
        }

        let almacenadoEnCarrito; //variable utilizada como booleano
        function comprobarAlmacenamiento(carro){  //comprobación del almacenamiento del carro para validar si un curso se encuentra o no en el mismo
            for (let i = 0; i < carro.length; i++) { //por cada elemento del carro
                if (carro[i].id == idCurso) {   //si el elemento.id coincide con el id del objeto tomado anteriormente
                    return true; //retorna true
                }
            }
            return false; //si no encuentra coincidencias, retorna false
        }
        almacenadoEnCarrito = comprobarAlmacenamiento(carrito); //la variable será igual a true o false
                                    //en base a eso:
        if (almacenadoEnCarrito) { //si se encuentra el elemento almacenado en el carrito:
            alert('El curso se encuentra en el carrito actualmente') //alert
        } else {                    //Si no:
            let nuevoCurso = {   //se crea un nuevo objeto con id y precio seleccionados del atributo data-id y data-precio 
                'id':idCurso,
                'precio':valorCurso,
                'img':imgCurso
            };
            carrito.push(nuevoCurso); //se agrega el objeto al array
            localStorage.setItem('carrito', JSON.stringify(carrito)); //se parsea a json y se envía al localStorage
            let cursosAlmacenados=Number(contadorElementosCarrito.textContent);  //variable que se le asigna el contenido del contador del carrito
            cursosAlmacenados++;                            //se aumenta el contador
            localStorage.setItem('contadorCursos', Number(cursosAlmacenados)); //se guarda en el localStorage el item contadorCursos que almacena el valor de la variable cursosAlmacenados
            contadorElementosCarrito.innerHTML = localStorage.getItem('contadorCursos'); //por último, el contenido del contador del HTML toma el valor del contador del storage

        }
    });
});

botonVaciarCarrito = document.querySelector('.btnVaciarCarrito');

botonVaciarCarrito.addEventListener('click', ()=>{
    localStorage.removeItem('contadorCursos');
    localStorage.removeItem('carrito');
    contadorElementosCarrito.innerHTML = 0;
})

// botonCarrito = document.querySelector('.cartBtn');

// botonCarrito.addEventListener('click',() =>{
//     document.querySelector('.offcanvas-body').innerHTML = localStorage.getItem('carrito');
// })




