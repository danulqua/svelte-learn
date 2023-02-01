<svelte:options immutable={true} />

<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';
  import IoIosTrash from 'svelte-icons/io/IoIosTrash.svelte';
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
      listDiv.scrollTo({ top: listDiv.scrollHeight, behavior: 'smooth' });
      autoscroll = false;
    }
  });

  const dispatch = createEventDispatcher();
  let input,
    inputText = '',
    listDiv;

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
        <li class="todo-item">
          <label>
            <input type="checkbox" checked={completed} on:change={() => handleToggleTodo(id)} />
            {title}
            <button class="btn-delete-todo" on:click={() => handleDeleteTodo(id)}><IoIosTrash /></button>
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input type="text" placeholder="New todo name" bind:this={input} bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add todo</Button>
  </form>
</div>

<style lang="scss">
  .btn-delete-todo {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 30px;
  }

  .todo-item {
    label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
</style>
