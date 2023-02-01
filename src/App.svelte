<script>
  import Button from './lib/Button.svelte';
  import GoStar from 'svelte-icons/go/GoStar.svelte';
</script>

<Button size="small" shadow bgColor="blue" color="green">
  <GoStar slot="left" />
  Click me!
</Button>

<style>
</style>
