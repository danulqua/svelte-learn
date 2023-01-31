<script>
  let count1 = 0;
  let count2 = 0;

  // String won't be updated since reactive statements order is important!
  // First, we need to call the `setCount2(count1)` in order to update count2,
  // and since string depends on `count2`, it should be delcared after function call.
  //
  // $: string = `Count2 is ${count2}`;
  // $: setCount2(count1);

  // This will work as expected
  $: setCount2(count1);
  $: string = `Count2 is ${count2}`;

  function increment1() {
    count1++;
  }

  function setCount2(value) {
    count2 = value;
  }
</script>

<button on:click={increment1}>Clicks: {count1}</button>
<p>{string}</p>

<style>
  button {
    padding: 10px 15px;
    border-radius: 5px;
  }
</style>
