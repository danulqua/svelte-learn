<script>
  import { tick } from 'svelte';
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
      title:
        'Aute id anim enim reprehenderit minim. Tempor irure anim ut dolor velit nisi nulla nulla id excepteur velit. Sit nostrud culpa ipsum veniam. Ad est veniam consequat adipisicing consectetur voluptate fugiat deserunt ex consectetur duis laboris nostrud. Eiusmod pariatur incididunt aliqua aliquip occaecat amet in excepteur aute eiusmod incididunt.',
      completed: false
    }
  ];

  let todoList;

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
  bind:this={todoList}
  on:addtodo={handleAddTodo}
  on:deletetodo={handleDeleteTodo}
  on:toggletodo={handleToggleTodo}
/>
<Button on:click={() => (todos = [])} disabled={!todos.length}>Clear todos</Button>

<style>
</style>
