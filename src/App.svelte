<script>
  import Button from './lib/Button.svelte';
  import GoStar from 'svelte-icons/go/GoStar.svelte';
  import GoRuby from 'svelte-icons/go/GoRuby.svelte';
</script>

<Button
  let:isLeftHovered
  size="large"
  shadow
  bgColor="blue"
  color="green"
  on:click|once={() => alert(true)}
  on:click={() => console.log('hello')}
>
  <div style:width="30px" slot="left">
    {#if isLeftHovered}
      <GoRuby />
    {:else}
      <GoStar />
    {/if}
  </div>
  Click me!
</Button>

<style>
</style>
