document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('spriteCanvas');
  const ctx = canvas.getContext('2d');
  const spriteImage = new Image();
  spriteImage.src = './600х600х7x144.avif';

  const totalFrames = 144;
  const columns = 7;
  const frameWidth = 600;
  const frameHeight = 600;
  
  canvas.width = frameWidth
  canvas.height = frameHeight

  spriteImage.onload = () => {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(scrollFraction * totalFrames)
      );

      drawFrame(frameIndex);
    });

    // Початковий малюнок
    drawFrame(0);
  };

  function drawFrame(frameIndex) {
    const column = frameIndex % columns;
    const row = Math.floor(frameIndex / columns);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      spriteImage,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
});