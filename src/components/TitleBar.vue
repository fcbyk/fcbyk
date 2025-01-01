<template>
  <div class="title-bar">
    <button class="btn-1"></button>
    <button class="btn-2"></button>
    <button class="btn-3"></button>
  </div>
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

.title-bar {
  pointer-events: auto;
  white-space: nowrap;
  padding: 0 80px 0 120px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  overflow: hidden;
  line-height: 30px;
  height: 30px;
  box-sizing: border-box;
  background: rgba(250, 250, 250, 0.9);
  border-radius: 1rem 1rem 0 0;
  color: #333;
  text-align: center;
  cursor: move;
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