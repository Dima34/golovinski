<style>
  #loader {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: black;
    z-index: 6;
  }

  .loader-container {
    display: flex;
    gap: 25px;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    overflow: hidden;
  }

  #loader_left-container {
    margin-left: 50px;
  }

  #loader_right-container {
    margin-right: 50px;
  }

  #loader_left-container,
  #loader_right-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  #loader_percentage {
    flex-shrink: 0;
  }

  #loader_left-item,
  #loader_right-item {
    position: absolute;
    transition: .1s;
  }

  #loader_left-item {
    right: 0;
  }

  #loader_percentage,
  #loader_left-item, #loader_right-item {
    color: #FFF;
    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -1.44px;
    text-transform: uppercase;
  }

  .hor-hide-wrapper {
    display: flex;
    align-items: flex-end;
    height: 24px;
  }

  .hor-hide-container {
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    height: 24px;
  }

  .loading-ended .hor-hide-container {
    animation: shrinkHeight .5s ease-in-out forwards;
  }

  .loading-ended #loader_left-container .hor-hide-container {
    animation-delay: .1s;
  }

  .loading-ended #loader_center-container .hor-hide-container {
    animation-delay: .18s;
  }

  .loading-ended #loader_right-container .hor-hide-container {
    animation-delay: .26s;
  }

  @keyframes shrinkHeight {
    0% {
      height: 24px;
    }
    100% {
      height: 0;
    }
  }
</style>

<div id="loader">
  <div class="loader-container">
    <div id="loader_left-container">
      <div class="hor-hide-wrapper">
        <div class="hor-hide-container">
          <span id="loader_left-item">stay</span>
        </div>
      </div>
    </div>

    <div id="loader_center-container">
      <div class="hor-hide-wrapper">
        <div class="hor-hide-container">
          <span id="loader_percentage">0%</span>
        </div>
      </div>
    </div>

    <div id="loader_right-container">
      <div class="hor-hide-wrapper">
        <div class="hor-hide-container">
          <span id="loader_right-item">here</span>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
  const loader = document.getElementById('loader')
  const leftElem = document.getElementById('loader_left-item')
  const leftContainer = document.getElementById('loader_left-container')
  const rightElem = document.getElementById('loader_right-item')
  const rightContainer = document.getElementById('loader_right-container')
  const percentageText = document.getElementById('loader_percentage')

  function cubicBezier(t, p0, p1, p2, p3) {
    const u = 1 - t
    return (u ** 3) * p0 + 3 * (u ** 2) * t * p1 + 3 * u * (t ** 2) * p2 + (t ** 3) * p3
  }

  function findTForX(xTarget, p0, p1, p2, p3, epsilon = 0.001) {
    let lower = 0
    let upper = 1
    let t = (upper + lower) / 2
    while (upper - lower > epsilon) {
      const x = cubicBezier(t, p0, p1, p2, p3)
      if (x < xTarget) {
        lower = t
      } else {
        upper = t
      }
      t = (upper + lower) / 2
    }
    return t
  }

  function animateWithBezier(percentage, duration, bezierPoints, onComplete) {
    const [p0x, p1x, p2x, p3x] = bezierPoints // Для осі X
    const [p0y, p1y, p2y, p3y] = [0, 0, 1, 1] // Лінійна зміна для осі Y
    let startTime = null

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsedTime = Math.min((timestamp - startTime) / duration, 1)
      const easedT = findTForX(elapsedTime, p0x, p1x, p2x, p3x)
      const easedProgress = cubicBezier(easedT, p0y, p1y, p2y, p3y)

      updateLoader(easedProgress)

      if (elapsedTime < 1) {
        requestAnimationFrame(step)
      } else if (onComplete) {
        onComplete()
      }
    }

    requestAnimationFrame(step)
  }

  function updateLoader(percentage) {
    const currentPercentage = Math.round(percentage * 100)
    percentageText.textContent = `${currentPercentage}`

    leftElem.style.right = `${percentage * 100}%`
    rightElem.style.left = `${percentage * 100}%`
  }

  function simulateLoading() {
    const bezierPoints = [0, 0, 0, 1]
    const duration = 2000
    const finalPercentage = 100

    const leftElemWidth = leftElem.getBoundingClientRect().width
    const rightElemWidth = rightElem.getBoundingClientRect().width
    const leftContainerMargin = getComputedStyle(leftContainer)['margin-left']
    const rightContainerMargin = getComputedStyle(rightContainer)['margin-right']

    leftContainer.style.marginLeft = `calc(${leftContainerMargin} + ${leftElemWidth}px)`
    rightContainer.style.marginRight = `calc(${rightContainerMargin} + ${rightElemWidth}px)`

    animateWithBezier(finalPercentage, duration, bezierPoints, () => {
      loader.classList.add('loading-ended')
      setTimeout(() => {
        loader.style.display = "none"
        document.querySelector("body").classList.add("loaded")

        const onLoaderLoaded = new CustomEvent('onLoaderLoaded');
        window.dispatchEvent(onLoaderLoaded);
      }, 1000)
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(simulateLoading, 1000)
  })

</script>
