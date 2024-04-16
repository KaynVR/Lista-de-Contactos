//Selectores de los Elementos del Registro
const formRegister = document.querySelector('#form-register');
const InputRegister = document.querySelector('#input-register');

//Selectores de los Elementos del Login
const formLogin = document.querySelector('#form-inicio');
const InputInicio = document.querySelector('#input-inicio');

//Selector del Elemento p de notificacion
const notification = document.querySelector('.notification');

//Evento para el registro

formLogin.addEventListener('submit', async e => {

    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    const users = await response.json();
    const user = users.find(user => user.username === InputInicio.value);

    if (!user) {
        mensaje('El usuario no existe');
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../HTML/ListaDeTareas.html'
    }
});

//Evento para Ingresar

formRegister.addEventListener('submit', async e => {

    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', {method: 'GET'})
    const users = await response.json();
    const user = users.find(user => user.username === InputRegister.value);

    if (InputRegister.value === '') {
        mensaje('El usuario no puede estar vacio');
    } else if (user) {
        mensaje('El usuario ingresado ya existe');
    } else {
        await fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: InputRegister.value})
        });
        mensaje(`El usuario ${InputRegister.value} ha sido creado`);
        InputRegister.value = '';
    }
});



//Funcion para ense;ar el mensaje de notificacion
function mensaje (error) {
    notification.innerHTML = error;
    notification.classList.add('mostrar-notificacion');
    setTimeout(() => {
        notification.classList.remove('mostrar-notificacion')
    }, 3000);
};