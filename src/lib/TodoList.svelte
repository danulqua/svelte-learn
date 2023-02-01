<svelte:options immutable={true} />

<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  export let todos = [];
  let prevTodos = todos;
  let autoscroll = false;

  export const clearInput = () => (inputText = '');
  export const focusInput = () => input.focus();

  $: {
    if (todos.length > prevTodos.length) autoscroll = true;
    prevTodos = todos;
  }

  afterUpdate(() => {
    if (autoscroll) {
      listDiv.scrollTo({ top: listDivScrollHeight, behavior: 'smooth' });
      autoscroll = false;
    }
  });

  const dispatch = createEventDispatcher();
  let input,
    inputText = '',
    listDiv,
    listDivScrollHeight;

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

{listDivScrollHeight}
<div class="todo-list-wrapper">
  <div class="todo-list" style:max-height="150px" style:overflow="auto" bind:this={listDiv}>
    <div bind:offsetHeight={listDivScrollHeight}>
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
  </div>

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input type="text" bind:this={input} bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add todo</Button>
  </form>
</div>
