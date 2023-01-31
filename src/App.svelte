<script>
  let name = 'Svelte';
  let src = 'https://dummyimage.com/200x150?text=random';
  let injected = '<input type="password" name="password">';
</script>

<h1>Hello, {name}!</h1>
<img {src} alt="Svelte text is so {name}'ish!" />
<div>{@html injected}</div>

<style>
  h1 {
    color: orangered;
  }
</style>
