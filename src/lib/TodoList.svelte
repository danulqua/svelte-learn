<svelte:options immutable={true} />

<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';
  import IoIosTrash from 'svelte-icons/io/IoIosTrash.svelte';
  import Button from './Button.svelte';

  export let todos = [];
  export let isLoading = false;
  export let isAdding = false;
  export let isError = false;
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
  {#if isLoading}
    <h2 class="state-text">Loading...</h2>
  {:else if isError}
    <h2 class="state-text">Error has been occurred.</h2>
  {:else if !todos.length}
    <h2 class="state-text">Todo list is empty.</h2>
  {:else}
    <div class="todo-list" style:max-height="150px" style:overflow="auto" bind:this={listDiv}>
      <ul>
        {#each todos as { id, title, completed } (id)}
          <li class="todo-item" class:completed>
            <label>
              <input
                type="checkbox"
                checked={completed}
                on:change={(e) => {
                  e.currentTarget.checked = completed;
                  handleToggleTodo(id);
                }}
              />
              {title}
            </label>
            <button class="btn-delete-todo" aria-label="Delete todo" on:click={() => handleDeleteTodo(id)}>
              <IoIosTrash />
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input
      type="text"
      placeholder="New todo name"
      bind:this={input}
      bind:value={inputText}
      disabled={isLoading || isAdding || isError}
    />
    <Button type="submit" disabled={!inputText || isLoading || isAdding || isError}>Add todo</Button>
  </form>
</div>

<style lang="scss">
  .todo-list-wrapper {
    padding: 10px;
    max-width: 350px;
    background-color: #777;

    .state-text {
      margin: 5px;
      text-align: center;
    }

    .todo-list {
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 0;
        margin: 0 0 10px 0;

        .todo-item {
          position: relative;
          display: flex;
          align-items: center;
          font-size: 20px;
          background-color: #555;
          padding: 5px 10px;

          label {
            display: flex;
            align-items: baseline;
            gap: 10px;
            cursor: pointer;
            padding-right: 20px;
          }

          .btn-delete-todo {
            position: absolute;
            right: 10px;
            height: 30px;
            display: none;
            background: none;
            border: none;
            cursor: pointer;

            :global(svg) {
              color: rgb(184, 53, 53);
            }
          }

          &:hover {
            .btn-delete-todo {
              display: block;
            }
          }

          &.completed {
            opacity: 0.5;
            text-decoration: line-through;
          }
        }
      }
    }

    .add-todo-form {
      background-color: #666;
      display: flex;
      gap: 10px;
      padding: 20px;

      input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border-radius: 10px;
        border: none;
        outline: none;
      }
    }
  }
</style>
