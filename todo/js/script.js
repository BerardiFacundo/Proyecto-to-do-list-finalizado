// Array para almacenar las tareas
let todos = [];

// Seleccionar elementos del DOM
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Función para crear una nueva tarea
function createTodo(text) {
    return {
        id: Date.now(),
        text: text,
        completed: false
    };
}

// Función para añadir una tarea a la lista
function addTodo(event) {
    event.preventDefault();
    const todoText = input.value.trim();
    if (todoText) {
        const todo = createTodo(todoText);
        todos.push(todo);
        renderTodos();
        input.value = '';
    }
}

// Función para eliminar una tarea
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Función para marcar una tarea como completada
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
}

// Función para renderizar las tareas en el DOM
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div class="todo-actions">
                <button onclick="toggleTodo(${todo.id})">${todo.completed ? 'Desmarcar' : 'Completar'}</button>
                <button onclick="deleteTodo(${todo.id})">Eliminar</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Event listener para el formulario
form.addEventListener('submit', addTodo);

// Renderizar las tareas iniciales
renderTodos();