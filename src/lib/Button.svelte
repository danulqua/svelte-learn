<script>
  export let size = 'small';
  export let shadow = false;
  export let bgColor = undefined;
  export let color = undefined;
</script>

<button
  style:color
  style:background-color={bgColor}
  class:size-sm={size === 'small'}
  class:size-lg={size === 'large'}
  class:shadow><slot>Fallback</slot></button
>

<style lang="scss">
  button {
    border: none;
    outline: none;
    background-color: $color-main;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;

    &.size-sm {
      padding: 15px 20px;
    }

    &.size-lg {
      padding: 20px 25px;
      font-size: 22px;
    }

    &.shadow {
      box-shadow: 0 0 10px $color-main;
    }

    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
    }

    &:active {
      background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
    }
  }
</style>
