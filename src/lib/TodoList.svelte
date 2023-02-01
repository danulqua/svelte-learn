<script>
  export let todos = [];
</script>

<ul>
  {#each todos as { id, title }, idx (id)}
    {@const todoNumber = idx + 1}
    <li>{todoNumber} - {title}</li>
  {/each}
</ul>
