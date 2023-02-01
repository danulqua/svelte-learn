<svelte:options immutable={true} />

<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  export let todos = [];

  const dispatch = createEventDispatcher();
  let inputText = '';

  function handleAddTodo() {
    const isNotPrevented = dispatch('addtodo', inputText, {
      cancelable: true
    });

    if (isNotPrevented) inputText = '';
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
