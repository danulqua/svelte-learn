<!--
  Slots are like children in React, so it's possible to pass something
  directly inside the component like so: <Button>Something</Button> 

  If you don't pass anything like so: <Button />, but still want to display fallback
  at least - inside the component you should put your fallback inside the <slot></slot>.
-->
<button><slot>Fallback</slot></button>

<style lang="scss">
  button {
    border: none;
    outline: none;
    background-color: $color-main;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      color: $color-main;
      background-color: #fff;
    }
  }
</style>
