//Seleccionamos los elementos del input
const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const btnCreate = document.querySelector('#btn-create');

//Seleccionamos el elemento de la lista
const lista = document.querySelector('#lista');

//Seleccionamos los elementos de los formularios
const formImputs = document.querySelector('#formInputs');

// //Seleccionamos los btn de la lista
// const btnDelete = document.querySelector('.button-delete');
// const btnCheck = document.querySelector('.button-check');

const closeBtn = document.querySelector('#cerrar-btn');


// (() => {
//     if (!user) {
//         window.location.href = "../HTML/Formulario.html";
//     }
// }) ()

//Cargar el local Storage
const user = JSON.parse(localStorage.getItem('user'));

formImputs.addEventListener('submit',async e => {
    e.preventDefault();

    if (inputName.value === '' || inputNumber.value === '') {
        alert('ambos campos deben estar llenos');
    } else {
        const responseJSON = await fetch('http://localhost:3000/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre: inputName.value, numero: inputNumber.value, user: user.username, checked: false}),
        });
        const response = await responseJSON.json();

        const ListItem = document.createElement('li');
        ListItem.innerHTML = `
    
    <li id="${response.id}" class="li">
        <button class="button-delete">
            <i class="fa-sharp fa-solid fa-xmark">
            </i>
        </button>
        <div class="container-parrafos">
            <p class="contacto-nombre"> ${response.nombre} </p>
            <p class="contacto-numero">${response.numero} </p>
        </div>
        <button class="button-check">
            <i class="fa-sharp fa-solid fa-check">
            </i>
        </button>
    </li>`;
        lista.append(ListItem);
        inputName.value = '';
        inputNumber.value = '';
    }
});

closeBtn.addEventListener('click', async e => {
    localStorage.removeItem('user');
    window.location.href = "../HTML/Formulario.html";
});

//Creamos un evento para eliminar el contenido del ul

lista.addEventListener('click', async e => {
    if (e.target.classList.contains('button-delete')) {
        console.log(e.target);
        //Conseguir id
        const id = e.target.parentElement.id;

        await fetch(`http://localhost:3000/contactos/${id}`, {
            method: 'DELETE'});
        
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('button-check')) {
        const id = e.target.parentElement.id;
        await fetch(`http://localhost:3000/contactos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: e.target.parentElement.classList.contains('check-item') ? false : true}),
        });

        e.target.parentElement.classList.toggle('check-item');
    }
});



//Creamos el evento para agregar todo e contenido guardado

const agregarItems = async () => {
    const response = await fetch('http://localhost:3000/contactos', {method: 'GET'});
    const items = await response.json();

    const userItems = items.filter(item => item.user === user.username);
    userItems.forEach(item => {

        const ListItem = document.createElement('li');
        ListItem.innerHTML = `
        <li id="${item.id}" class="li">
        <button class="button-delete">
            <i class="fa-sharp fa-solid fa-xmark">
            </i>
        </button>
        <div class="container-parrafos">
            <p class="contacto-nombre"> ${item.nombre} </p>
            <p class="contacto-numero">${item.numero} </p>
        </div>
        <button class="button-check">
            <i class="fa-sharp fa-solid fa-check">
            </i>
        </button>
    </li>`;
    lista.append(ListItem);
    });
}
agregarItems();


