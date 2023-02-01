<svelte:options immutable={true} />

<script>
  import { afterUpdate, beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
  import Button from './Button.svelte';

  export let todos = [];
  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  onMount(() => {
    console.log('Mounted');
    return () => console.log('Destroyed (in onMount)');
  });

  onDestroy(() => {
    console.log('Destroyed (in onDestroy)');
  });

  beforeUpdate(() => {
    if (listDiv) {
      console.log(listDiv.clientHeight);
    }
  });

  afterUpdate(() => {
    console.log(listDiv.clientHeight);
  });

  const dispatch = createEventDispatcher();
  let input;
  let inputText = '';
  let listDiv;

  function handleAddTodo() {
    const isNotPrevented = dispatch('addtodo', inputText, {
      cancelable: true
    });

    if (isNotPrevented) inputText = '';
  }

  function handleDeleteTodo(todoId) {
    dispatch('deletetodo', todoId);
  }

  function handleToggleTodo(todoId) {
    dispatch('toggletodo', todoId);
  }
</script>

<div class="todo-list-wrapper">
  <div class="todo-list" bind:this={listDiv}>
    <ul>
      {#each todos as { id, title, completed } (id)}
        <li>
          <label>
            <input type="checkbox" checked={completed} on:change={() => handleToggleTodo(id)} />
            {title}
            <button on:click={() => handleDeleteTodo(id)}>Delete</button>
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input type="text" bind:this={input} bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add todo</Button>
  </form>
</div>
