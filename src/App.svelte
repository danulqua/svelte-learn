<script>
  import { onMount, tick } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import TodoList from './lib/TodoList.svelte';

  let todos = [];
  let todoList;
  let isLoading = false;
  let isAdding = false;
  let isError = false;
  let disabledItems = [];

  onMount(() => {
    fetchTodos();
  });

  async function fetchTodos() {
    try {
      todos = [];
      isLoading = true;
      isError = false;

      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Error has been occured.');

      todos = await response.json();
    } catch (err) {
      isError = true;
    } finally {
      isLoading = false;
    }
  }

  async function handleAddTodo(event) {
    event.preventDefault();

    try {
      isAdding = true;
      isError = false;

      const reqOptions = {
        method: 'POST',
        body: JSON.stringify({ title: event.detail, completed: false }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', reqOptions);
      if (!response.ok) throw new Error('Error has been occured.');

      const newTodo = await response.json();
      todos = [...todos, { ...newTodo, id: uuid() }];
      todoList.clearInput();
    } catch (err) {
      isError = true;
    } finally {
      isAdding = false;
      await tick();
      todoList.focusInput();
    }
  }

  async function handleDeleteTodo(event) {
    const todoId = event.detail;
    if (disabledItems.includes(todoId)) return;

    try {
      isError = false;
      disabledItems = [...disabledItems, todoId];

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error has been occured.');

      todos = todos.filter((item) => item.id !== todoId);
    } catch (err) {
      isError = true;
    } finally {
      disabledItems = disabledItems.filter((id) => id !== todoId);
    }
  }

  async function handleToggleTodo(event) {
    const todoId = event.detail;
    if (disabledItems.includes(todoId)) return;

    try {
      isError = false;
      disabledItems = [...disabledItems, todoId];
      const todo = todos.find((item) => item.id === todoId);

      const reqOptions = {
        method: 'PATCH',
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, reqOptions);
      if (!response.ok) throw new Error('Error has been occured.');

      const updatedTodo = await response.json();
      todos = todos.map((item) => (item.id === updatedTodo.id ? { ...updatedTodo } : { ...item }));
    } catch (err) {
      isError = true;
    } finally {
      disabledItems = disabledItems.filter((id) => id !== todoId);
    }
  }
</script>

<h2>{todos.length} {todos.length === 1 ? 'todo' : 'todos'}</h2>
<TodoList
  {todos}
  {isLoading}
  {isAdding}
  {isError}
  {disabledItems}
  bind:this={todoList}
  on:addtodo={handleAddTodo}
  on:deletetodo={handleDeleteTodo}
  on:toggletodo={handleToggleTodo}
  let:todo
  let:index
>
  <svelte:fragment slot="title">{index} - {todo.title}</svelte:fragment>
</TodoList>
<button on:click={fetchTodos}>Refresh</button>
