<template>
    <canvas ref="canvas" class="wave-background"></canvas>
  </template>
  
  <script>
  import { onMounted, onUnmounted, ref } from 'vue';
  
  export default {
    name: 'WaveBackground',
    props: {
      // 背景颜色
      backgroundColor: {
        type: String,
        default: '#f0f8ff'
      },
      // 波浪颜色渐变起始色
      waveColorStart: {
        type: String,
        default: 'rgba(100, 200, 255, 0.7)'
      },
      // 波浪颜色渐变结束色
      waveColorEnd: {
        type: String,
        default: 'rgba(200, 240, 255, 0.3)'
      },
      // 波浪高度
      waveHeight: {
        type: Number,
        default: 30
      },
      // 次要波浪高度
      secondaryWaveHeight: {
        type: Number,
        default: 20
      },
      // 动画速度
      animationSpeed: {
        type: Number,
        default: 0.05
      },
      // 波浪位置 (0-1, 0是顶部, 1是底部)
      wavePosition: {
        type: Number,
        default: 0.5,
        validator: value => value >= 0 && value <= 1
      }
    },
    setup(props) {
      const canvas = ref(null);
      let animationId = null;
      let time = 0;
  
      const initCanvas = () => {
        const ctx = canvas.value.getContext('2d');
        
        // 设置画布大小为父容器大小
        canvas.value.width = canvas.value.offsetWidth;
        canvas.value.height = canvas.value.offsetHeight;
        
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
          }
          
          ctx.lineTo(canvas.value.width, canvas.value.height);
          ctx.lineTo(0, canvas.value.height);
          ctx.closePath();
          
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height);
          gradient.addColorStop(0, props.waveColorStart);
          gradient.addColorStop(1, props.waveColorEnd);
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
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
  
      return {
        canvas
      };
    }
  };
  </script>
  
  <style scoped>
  .wave-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* 确保背景在内容后面 */
    display: block;
  }
  </style>