<script>
  import { v4 as uuid } from 'uuid';
  import TodoList from './lib/TodoList.svelte';

  let todos = [];
  let todoList;
  let promise = fetchTodos();

  function fetchTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((res) => {
      if (!res.ok) throw new Error('Error has been occured.');
      return res.json();
    });
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
{#await promise}
  <h2>Loading...</h2>
{:then todos}
  <TodoList
    {todos}
    bind:this={todoList}
    on:addtodo={handleAddTodo}
    on:deletetodo={handleDeleteTodo}
    on:toggletodo={handleToggleTodo}
  />
{:catch error}
  <h2>{error}</h2>
{/await}
<button on:click={() => (promise = fetchTodos())}>Refresh</button>
