<script>
  export let size = 'small';
  export let shadow = false;
</script>

<!--
  In class directive you can use a shorthan like `class:class-name` if `class-name` is the
  classname and the prop has the same name
-->
<button class:size-sm={size === 'small'} class:size-lg={size === 'large'} class:shadow><slot>Fallback</slot></button>

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
      background-color: darken($color-main, 10%);
    }

    &:active {
      background-color: lighten($color-main, 10%);
    }
  }
</style>
