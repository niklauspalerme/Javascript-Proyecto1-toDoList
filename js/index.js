/////////////////////////////////
// Variables ////////////////////
/////////////////////////////////

//Donde se van agregar las variables
let listaToDo = document.getElementById("to-do-list");

/////////////////////////////////
// Eventos///////////////////////
/////////////////////////////////

eventTriggered();

function eventTriggered() {
  console.log("Manejador de eventos");

  // Contenido cargado
  document.addEventListener("DOMContentLoaded", showLocalStorageNotes);

  listaToDo.addEventListener("click", deleteNote);
}

/////////////////////////////////
// Funciones ////////////////////
/////////////////////////////////

//1-Agregar Nota
function addingNote(e) {
  //Vemos si entra el metodo y paramos el evento
  e.preventDefault();

  //Capturamos el valor agregar
  let nota = document.getElementById("textArea").value;
  console.log(nota);

  //Lo agregamos al front-end
  if (nota === "") {
    console.log("No hay valor en la nota");
  } else {
    let jumbotron = document.createElement("div");
    jumbotron.className = "jumbotron";

    let nuevaNota = document.createElement("p");
    nuevaNota.className = "lead";
    nuevaNota.innerText = nota;

    let espacio = document.createElement("hr");
    espacio.className = "my-4";

    let button = document.createElement("a");
    button.innerText = "Delete";
    button.className = "btn btn-outline-danger nico";

    jumbotron.appendChild(nuevaNota);
    jumbotron.appendChild(espacio);
    jumbotron.appendChild(button);

    listaToDo.appendChild(jumbotron);

    //Agregamos al Storage la nota
    addingNoteStorage(nota);
  }

  //Agregamos Fecha si agrego
  let date = document.getElementById("date").value;
  if (date === "") {
    console.log("No tiene nada de fecha");
  } else {
    let titulo = "TO-DO-LIST";
    console.log("Tiene valor");
    let dateStorage = (document.getElementById("title").innerHTML =
      titulo + "(" + date + ")");
    clearContents(document.getElementById("date"));
    localStorage.setItem("date", dateStorage);
  }

  //Limpiamos pantalla
  clearContents(document.querySelector("#textArea"));
}

//2-Agregamos el elemento al storage
function addingNoteStorage(nota) {
  //Obtenemos lo que esta en el localStorage
  let arrayNotas = getLocalStorageList();
  console.log(`Àntes en el Storage ${arrayNotas}`);
  arrayNotas.push(nota);
  console.log(`Despues en el Storage ${arrayNotas}`);

  //Agregamos al LocalStorage
  localStorage.setItem("notas", JSON.stringify(arrayNotas));
}

//3-Obtenemos lo que esta en el Local Storage, retorna un array
function getLocalStorageList() {
  let notas;
  // Revisamos los valoes de local storage-
  if (localStorage.getItem("notas") === null) {
    notas = [];
    // Retornamos arreglo vacio
  } else {
    notas = JSON.parse(localStorage.getItem("notas"));
    //retornamos un json con todos los valores
  }
  return notas;
}

//4-Limpieza del textArea
function clearContents(event) {
  event.value = "";
}

//5-Mostrar la data y Persistencia en el front-end
function showLocalStorageNotes() {
  //Obtengo lo que hay en el LocalStorage
  let arrayNotas = getLocalStorageList();

  arrayNotas.forEach((nota) => {
    let jumbotron = document.createElement("div");
    jumbotron.className = "jumbotron";

    let nuevaNota = document.createElement("p");
    nuevaNota.className = "lead";
    nuevaNota.innerText = nota;

    let espacio = document.createElement("hr");
    espacio.className = "my-4";

    let button = document.createElement("a");
    button.innerText = "Delete";
    button.className = "btn btn-outline-danger nico";

    jumbotron.appendChild(nuevaNota);
    jumbotron.appendChild(espacio);
    jumbotron.appendChild(button);

    listaToDo.appendChild(jumbotron);
  });

  //Cargamos la fecha en pantalla
  if (localStorage.getItem("date") === null) {
    document.getElementById("title").innerHTML = "TO-DO-LIST";
    console.log("Cargando e storage");
  } else {
    document.getElementById("title").innerHTML = localStorage.getItem("date");
  }
}

//6-Eliminar todas las notas
function removeAllNotes(event) {
  event.preventDefault();

  localStorage.clear();
  clearAllList();
}

//7-Limpiar toda la lista de front-end y localsStorage
function clearAllList() {
  console.log(listaToDo);
  listaToDo.textContent = "";
}

//8- Eliminar una nota
function deleteNote(e) {
  if (e.target.classList[2] === "nico") {
    let notaBorrar =
      e.target.previousElementSibling.previousElementSibling.innerText;
    e.target.parentElement.remove();
    deleteNoteLocalStorage(notaBorrar);
  }
}

//9 - Borral del LocalStorage
function deleteNoteLocalStorage(nota) {
  //Obtenemos lo que esta en memoria en forma de array
  let notas = getLocalStorageList();

  console.log(notas);

  notas.forEach(function (notax, index) {
    if (notax == nota)
      //Si coincide la nota con el array, la elimina
      notas.splice(index, 1);
  });

  console.log(notas);

  //Agregamos el array transformado en string a localStorage
  localStorage.setItem("notas", JSON.stringify(notas));
}
