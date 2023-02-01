<script>
  export let todos = [];

  let inputText = '';

  function handleAddTodo() {
    console.log(inputText);
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
    <button type="submit">Add todo</button>
  </form>
</div>
