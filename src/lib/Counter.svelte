<script>
  let count1 = 0;
  let count2 = 0;

  // Not going to work because reactive variables doesn't appear on the
  // right hand side of the expression
  // $: string = `You have clicked ${sumInorrect()} times.`;

  // Works because `count1` and `count2` exist on the right hand side
  $: string = `You have clicked ${sumCorrect(count1, count2)} times.`;

  function increment1() {
    count1++;
  }

  function increment2() {
    count2++;
  }

  // Not going to work in the reactive `$:` statement
  // function sumIncorrect() {
  //   return count1 + count2;
  // }

  // Works in the reactive `$:` statement
  function sumCorrect(a, b) {
    return a + b;
  }
</script>

<button on:click={increment1}>Clicks: {count1}</button>
<button on:click={increment2}>Clicks: {count2}</button>
<p>{string}</p>

<style>
  button {
    padding: 10px 15px;
    border-radius: 5px;
  }
</style>
