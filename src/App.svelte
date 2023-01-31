<script>
  import Counter from './lib/Counter.svelte';

  const props = {
    initialCount: 10,
    maxCount: 20
  };
</script>

<Counter {...props} />

<style>
</style>
