<svelte:options immutable={true} />

<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  // todos and previous todos
  export let todos = [];
  let prevTodos = todos;
  let autoscroll = false;

  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  // In a reactive statement compare how exactly new `todos` has been changed.
  // If items count in the array has been increased - it means that new item
  // was added, so we need to scroll. For that, we're setting the `autoscroll`
  // flag to `true`. After if statement, we're updating `prevTodos` with new `todos`.
  $: {
    if (todos.length > prevTodos.length) autoscroll = true;
    prevTodos = todos;
  }

  // `afterUpdate` method fires right after the DOM updates, so it's where we need
  // to apply the scroll logic.
  afterUpdate(() => {
    // If `autoscroll` is set to `true` - we should scroll to the bottom where is
    // the new item appeared and set `autoscroll` back to `false`.
    if (autoscroll) {
      listDiv.scrollTo({ top: listDiv.scrollHeight, behavior: 'smooth' });
      autoscroll = false;
    }
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
  <div class="todo-list" style:max-height="150px" style:overflow="auto" bind:this={listDiv}>
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
