<script>
  import { v4 as uuid } from 'uuid';
  import Button from './lib/Button.svelte';
  import TodoList from './lib/TodoList.svelte';

  let todos = [
    {
      id: uuid(),
      title: 'My todo',
      completed: true
    },
    {
      id: uuid(),
      title: '2nd todo',
      completed: false
    },
    {
      id: uuid(),
      title: 'Buy some bread',
      completed: false
    }
  ];

  let todoList;
  let clearInput;

  function handleAddTodo(event) {
    event.preventDefault();
    setTimeout(() => {
      todos = [
        ...todos,
        {
          id: uuid(),
          title: event.detail,
          completed: false
        }
      ];

      // todoList.clearInput();
      clearInput();
    }, 1000);
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
  bind:this={todoList}
  bind:clearInput
  on:addtodo={handleAddTodo}
  on:deletetodo={handleDeleteTodo}
  on:toggletodo={handleToggleTodo}
/>
<Button on:click={() => (todos = [])} disabled={!todos.length}>Clear todos</Button>
<button on:click={todoList.focusInput}>Focus</button>

<style>
</style>
