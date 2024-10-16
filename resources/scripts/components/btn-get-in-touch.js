export function initCTABtns() {
  {
    const el = document.querySelectorAll('[data-el="cta"]');

    el.forEach(el => {

      // Place circle on mouse enter on mouse coordinates
      el?.addEventListener('mousemove', primBtnMouseMoveHandler);
    });
  }
} function primBtnMouseMoveHandler(e) {
  requestAnimationFrame(() => {
    const circle = this.querySelector('.circle');
    const pos = this.getBoundingClientRect();
    const circleWidth = circle.getBoundingClientRect().width;
    const mx = e?.clientX - pos.left - pos.width / 2 - circleWidth / 2;
    const my = e?.clientY - pos.top - pos.height / 2 - circleWidth / 2;
    circle.style.transform = 'translate(' + mx + 'px, ' + my + 'px)';
  });

}
