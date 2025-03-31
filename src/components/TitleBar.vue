<template>
  <button class="btn-1"></button>
  <button class="btn-2"></button>
  <button class="btn-3"></button>
</template>

<style lang="scss" scoped>
@mixin btn($left, $color, $content) {
  position: absolute;
  top: 7.5px;
  left: $left;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: $color;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    &::before {
      content: $content;
      color: white;
      font-size: 10px;
    }
  }
}

.btn-1 {
  @include btn(15px, #ff5f57, "×");
}

.btn-2 {
  @include btn(35px, #ffbd2e, "");
}

.btn-3 {
  @include btn(55px, #28c840, "");
}

@media (max-width: 600px) {
  .btn-1,
  .btn-2,
  .btn-3 {
    display: none;
  }
}
</style>