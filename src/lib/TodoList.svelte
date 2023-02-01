<script>
  import { v4 as uuid } from 'uuid';
  import Button from './Button.svelte';

  export let todos = [];

  let inputText = '';

  function handleAddTodo() {
    todos = [
      ...todos,
      {
        id: uuid(),
        title: inputText,
        completed: false
      }
    ];

    inputText = '';
  }
</script>

<div class="todo-list-wrapper">
  <ul>
    {#each todos as { id, title }, idx (id)}
      {@const todoNumber = idx + 1}

      <li>{todoNumber} - {title}</li>
    {/each}
  </ul>

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input type="text" bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add todo</Button>
  </form>
</div>
