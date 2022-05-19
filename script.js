class TodoList {
	constructor(el) {
		this.el = el;
		this.todos = [];
		this.list = el.children.namedItem('list')
		this.input = el.children.namedItem('input')

		this.el.addEventListener('click', (event) => {
			switch (event.target.dataset.action) {
				case 'set-status': {
					this.changeStatus(event.target.closest('li').dataset.id)
					break;
				}
				case 'delete-task': {
					this.removeTodo(event.target.closest('li').dataset.id)
					break;
				}
				case 'create': {
					if (this.input.value !== '') {
						todo1.addTodo(new Task(this.input.value, false))
					}
					break;
				}
				case 'find': {
					if (this.input.value !== '') {
						todo1.findTaskFromList(input.value)
					}
					break;
				}
				case 'move-up': {
					this.moveUp(event.target.closest('li').dataset.id)
				}
					break;
				case 'move-down': {
					this.moveDown(event.target.closest('li').dataset.id)
				}
			}
		})
	}

	addTodo(todo) {
		this.todos.push(todo);
		this.render(this.todos);
	}

	removeTodo(id) {
		this.todos = this.todos.filter((el) => el.id !== id);
		this.render(this.todos);
	}

	getTodos() {
		return this.todos;
	}

	findTaskFromList(value) {
		this.render(this.todos.filter(el => el.value.includes(value)))
	}

	changeStatus(id) {
		let index = this.todos.findIndex((el) => el.id === id);
		this.todos[index].status = !this.todos[index].status;
		this.render(this.todos);
	}

	moveUp(id) {
		let index = this.todos.findIndex((el) => el.id === id);
		if (index !== 0) {
			let el = this.todos[index];
			this.todos[index] = this.todos[index - 1];
			this.todos[index - 1] = el;
		}
		this.render(this.todos)
	}

	moveDown(id) {
		let index = this.todos.findIndex((el) => el.id === id);
		if (index < this.todos.length - 1) {
			let el = this.todos[index];
			this.todos[index] = this.todos[index + 1];
			this.todos[index + 1] = el;
		}
		this.render(this.todos)
	}

	render(todos = []) {
		let lis = '';
		for (let el of todos) {
			if (!el) {
				return;
			}
			let taskStatus = el.status ? 'status-done' : 'set-in-process';
			lis +=
				`<li data-id="${el.id}" class="${taskStatus}">${el.value}<button class="set-status" data-action="set-status">Change status</button><button class="delete-task" data-action="delete-task">Delete</button><button class="move-up" data-action="move-up">Move Up</button><button class="move-down" data-action="move-down">Move Down</button></li>`;
		}
		this.list.innerHTML = lis;
	}
}

class Task {
	constructor(value, status) {
		this.value = value;
		this.status = status;
		this.id = Math.random().toString(36).substr(2, 9);
	}
}

let ourTodos = document.querySelector('.container');

let todo1 = new TodoList(ourTodos);
todo1.addTodo(new Task('9345', true));
todo1.addTodo(new Task('2945hv', false));
todo1.addTodo(new Task('1784Ks', false));
