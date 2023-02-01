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

  function handleAddTodo(event) {
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
</script>

<h2>{todos.length} {todos.length === 1 ? 'todo' : 'todos'}</h2>
<TodoList {todos} on:addtodo={handleAddTodo} on:deletetodo={handleDeleteTodo} />
<Button on:click={() => (todos = [])} disabled={!todos.length}>Clear todos</Button>

<style>
</style>
