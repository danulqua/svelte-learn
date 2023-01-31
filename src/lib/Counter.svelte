<script>
  let count = 0;

  // known problem - string isn't being updated when count updates
  let string = `You have clicked ${count} times.`;

  function increment() {
    count++;
  }
</script>

<button on:click={increment}>Clicks: {count}</button>
<div>{string}</div>

<style>
  button {
    padding: 10px 15px;
    border-radius: 5px;
  }
</style>
