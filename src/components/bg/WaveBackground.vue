<template>
  <canvas ref="canvas" class="wave-background"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#f0f8ff'
  },
  waveColorStart: {
    type: String,
    default: 'rgba(100, 200, 255, 0.7)'
  },
  waveColorEnd: {
    type: String,
    default: 'rgba(200, 240, 255, 0.3)'
  },
  waveHeight: {
    type: Number,
    default: 30
  },
  secondaryWaveHeight: {
    type: Number,
    default: 20
  },
  animationSpeed: {
    type: Number,
    default: 0.05
  },
  wavePosition: {
    type: Number,
    default: 0.5,
    validator: value => value >= 0 && value <= 1
  },
  boatColor: {
    type: String,
    default: '#8B4513'
  },
  boatSpeed: {
    type: Number,
    default: 1.5
  }
});

const canvas = ref(null);
let animationId = null;
let time = 0;
let boatX = 0;
let boatY = 0;
let boatAngle = 0;

const drawBoat = (ctx, x, y, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // 修正后的梯形船体（船头尖、船尾宽）
  ctx.beginPath();
  ctx.moveTo(-20, 0);    // 船尾左点
  ctx.lineTo(-30, -15);  // 船头左点
  ctx.lineTo(30, -15);   // 船头右点
  ctx.lineTo(20, 0);     // 船尾右点
  ctx.closePath();       // 连接回起点
  ctx.fillStyle = props.boatColor;
  ctx.fill();

  // 桅杆（稍微向前倾斜更真实）
  ctx.beginPath();
  ctx.moveTo(5, -15);    // 从船体偏后位置开始
  ctx.lineTo(5, -40);
  ctx.strokeStyle = '#654321';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 帆（调整为三角形帆）
  ctx.beginPath();
  ctx.moveTo(5, -35);    // 桅杆顶部偏下
  ctx.lineTo(25, -15);   // 向右延伸
  ctx.lineTo(5, -15);    // 回到桅杆底部
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fill();

  ctx.restore();
};

const initCanvas = () => {
  const ctx = canvas.value.getContext('2d');

  canvas.value.width = canvas.value.offsetWidth;
  canvas.value.height = canvas.value.offsetHeight;

  // 初始化小船位置在右侧外
  boatX = canvas.value.width + 50;
  let isBoatVisible = true;
  let respawnTimeout = null;

  const animate = () => {
    ctx.fillStyle = props.backgroundColor;
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

    // 创建波浪效果
    ctx.beginPath();
    const baseY = canvas.value.height * props.wavePosition;
    ctx.moveTo(0, baseY);

    for (let x = 0; x < canvas.value.width; x++) {
      const y = baseY +
        Math.sin(x * 0.01 + time) * props.waveHeight +
        Math.sin(x * 0.02 + time * 0.7) * props.secondaryWaveHeight;
      ctx.lineTo(x, y);

      // 更新小船所在位置的波浪高度
      if (isBoatVisible && Math.abs(x - boatX) < 2) {
        boatY = y;
        // 计算波浪斜率作为船的倾斜角度
        const x1 = x - 5;
        const y1 = baseY + Math.sin(x1 * 0.01 + time) * props.waveHeight +
          Math.sin(x1 * 0.02 + time * 0.7) * props.secondaryWaveHeight;
        const x2 = x + 5;
        const y2 = baseY + Math.sin(x2 * 0.01 + time) * props.waveHeight +
          Math.sin(x2 * 0.02 + time * 0.7) * props.secondaryWaveHeight;
        boatAngle = (y2 - y1) / (x2 - x1) * 0.2;
      }
    }

    ctx.lineTo(canvas.value.width, canvas.value.height);
    ctx.lineTo(0, canvas.value.height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height);
    gradient.addColorStop(0, props.waveColorStart);
    gradient.addColorStop(1, props.waveColorEnd);

    ctx.fillStyle = gradient;
    ctx.fill();

    // 更新小船位置
    if (isBoatVisible) {
      boatX -= props.boatSpeed;

      // 当小船完全离开左侧时，开始等待3秒
      if (boatX < -50) {
        isBoatVisible = false;
        if (respawnTimeout) clearTimeout(respawnTimeout);
        respawnTimeout = setTimeout(() => {
          boatX = canvas.value.width + 50;
          isBoatVisible = true;
        }, 3000); // 3秒等待时间
      }
    }

    // 只有当小船在可视区域内时才绘制
    if (isBoatVisible && boatX > -50 && boatX < canvas.value.width + 50) {
      drawBoat(ctx, boatX, boatY, boatAngle);
    }

    time += props.animationSpeed;
    animationId = requestAnimationFrame(animate);
  };

  animate();
};

const handleResize = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  initCanvas();
};

onMounted(() => {
  initCanvas();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.wave-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: block;
}
</style>