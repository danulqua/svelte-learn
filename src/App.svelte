<script>
  import { onMount } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import TodoList from './lib/TodoList.svelte';

  let todos = [];
  let todoList;
  let isLoading = false;
  let isError = false;

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
    todos = [
      ...todos,
      {
        id: uuid(),
        title: event.detail,
        completed: false
      }
    ];
  }

  function handleDeleteTodo(event) {
    todos = todos.filter((item) => item.id !== event.detail);
  }

  function handleToggleTodo(event) {
    todos = todos.map((item) => (item.id === event.detail ? { ...item, completed: !item.completed } : { ...item }));
  }
</script>

<h2>{todos.length} {todos.length === 1 ? 'todo' : 'todos'}</h2>
<TodoList
  {todos}
  {isLoading}
  {isError}
  bind:this={todoList}
  on:addtodo={handleAddTodo}
  on:deletetodo={handleDeleteTodo}
  on:toggletodo={handleToggleTodo}
/>
<button on:click={fetchTodos}>Refresh</button>
