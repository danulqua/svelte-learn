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
    event.preventDefault();
    console.log(event.detail);
  }
</script>

<h2>{todos.length} {todos.length === 1 ? 'todo' : 'todos'}</h2>
<TodoList {todos} on:addtodo={handleAddTodo} />
<Button on:click={() => (todos = [])}>Clear todos</Button>

<style>
</style>
