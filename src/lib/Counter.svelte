<script>
  // Kind of weird, but this is how props is being defined.
  export let initialCount;

  // If you want to make prop optional, but keep it `undefined` -
  // you should explicitly give it an `undefined` value
  export let maxCount = undefined;

  // You can access all props
  //
  // console.log($$props)

  // You can acces only those props, that were passed to the component,
  // but weren't defined
  //
  // console.log($$restProps)

  let count = initialCount;
  $: string = `Count is ${count}`;

  function increment() {
    if (count === maxCount) return;
    count++;
  }
</script>

<button on:click={increment}>Clicks: {count}</button>
<p>{string}</p>

<style>
  button {
    padding: 10px 15px;
    border-radius: 5px;
  }
</style>
