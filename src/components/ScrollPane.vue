<template>
  <div class="scroll-pane">
    <div class="scroll-container" ref="scrollContainer">
      <div
        class="scroll-wrapper"
        ref="scrollWrapper"
        :style="{ left: left + 'px' }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      padding: 20,
      left: 0, // 子容器left值
    };
  },
  methods: {
    moveTo(e) {
      // 传入当前子元素e
      const containerW = this.$refs.scrollContainer.offsetWidth; // 父容器宽度
      const targetLeft = e.offsetLeft; // e左偏移量
      const targetW = e.offsetWidth; // e宽度
      const targetLW = targetLeft + targetW; // e的偏移量与e宽度之和
      // console.log(
      //   `父容器宽度：${containerW}`,
      //   `e的偏移量与e宽度之和：${targetLW}`,
      //   `this.left：${this.left}`,
      // );
      /**
       * 1、如果targetLW减去子容器偏移量的绝对值大于父容器宽度，
       *    子容器的left值就等于负的targetLW减去父容器宽度再加上padding，
       *    减去子容器偏移量的绝对值是为了判断当前子元素是否在左侧边界，如果
       *    不在左侧边界容器就不移动。
       * 2、如果当前元素的左偏移量减去子容器左偏移量的绝对值小于padding，那么
       *    子容器的左偏移量就等于负的e元素的左偏移量，如果是左边第一个元素
       *    就不加上padding值，反之则加上。
       */
      if (targetLW - Math.abs(this.left) > containerW) {
        this.left = -(targetLW - containerW + this.padding);
      } else if (targetLeft - Math.abs(this.left) < this.padding) {
        if (targetLeft === 0) {
          this.left = -targetLeft;
        } else {
          this.left = -targetLeft + this.padding;
        }
      }
      // else if (this.left === this.padding && containerW < targetLW) {
      //   this.left = -(targetLW - containerW + this.padding);
      // }
    },
  },
};
</script>

<style scoped>
.scroll-pane {
  height: 30px;
  position: relative;
  width: 100%;
}
.scroll-container {
  white-space: nowrap;
  width: 100%;
  height: 50px;
  /* margin: auto 20px; */
  position: relative;
}
.scroll-wrapper {
  position: absolute;
}
a.tab-item {
  display: inline-block;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  color: #000;
  position: relative;
}
a.tab-item:hover {
  color: #1890ff;
}

</style>
