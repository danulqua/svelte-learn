<script>
  import { v4 as uuid } from 'uuid';
  import TodoList from './lib/TodoList.svelte';

  const todos = [
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
</script>

<TodoList {todos} />

<style>
</style>
