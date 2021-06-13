'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.todoData ? JSON.parse(localStorage.todoData) : [];

const renderStorage = () => {
    localStorage.todoData = JSON.stringify(todoData);
};

const render = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    renderStorage();

    todoData.forEach( (item, i) => {
        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', () => {
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', () => {
            todoData.splice(i, 1);
            render();
        });

    });
};

todoControl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (headerInput.value.trim() !== '') {
        const newTodo = {
            value: headerInput.value.trim(),
            completed: false
        };
    
        headerInput.value = '';
    
        todoData.push(newTodo);
        renderStorage();
        render();
    }

});

render();