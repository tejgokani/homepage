(() => {
  // Quotes database for Finance 101 tips
  const financeQuotes = [
    "Beware of small expenses, small hole can sink a big ship",
    "An investment in knowledge pays the best interest.",
    "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    "Risk comes from not knowing what you're doing.",
    "The four most dangerous words in investing are: 'This time it's different.'",
    "Price is what you pay. Value is what you get.",
    "In investing, what is comfortable is rarely profitable.",
    "The individual investor should act consistently as an investor and not as a speculator."
  ];

  // Bull and Bear collision animation on canvas
  const bullBearCanvas = document.getElementById('bullBearCanvas');
  const bbCtx = bullBearCanvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = bullBearCanvas.width = window.innerWidth;
    height = bullBearCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Simple shapes representing bull and bear
  const bull = {
    x: width * 0.25,
    y: height / 2,
    size: 80,
    color: '#00ff99',
    speed: 5,
  };

  const bear = {
    x: width * 0.75,
    y: height / 2,
    size: 80,
    color: '#ff3300',
    speed: 5,
  };

  function drawBull() {
    bbCtx.fillStyle = bull.color;
    bbCtx.beginPath();
    bbCtx.moveTo(bull.x, bull.y);
    bbCtx.lineTo(bull.x - bull.size, bull.y + bull.size / 2);
    bbCtx.lineTo(bull.x - bull.size, bull.y - bull.size / 2);
    bbCtx.closePath();
    bbCtx.fill();
  }

  function drawBear() {
    bbCtx.fillStyle = bear.color;
    bbCtx.beginPath();
    bbCtx.arc(bear.x, bear.y, bear.size / 2, 0, Math.PI * 2);
    bbCtx.fill();
  }

  let collision = false;

  function animateBullBear() {
    bbCtx.clearRect(0, 0, width, height);

    if (!collision) {
      bull.x += bull.speed;
      bear.x -= bear.speed;

      if (bull.x + bull.size >= bear.x - bear.size / 2) {
        collision = true;
      }
    }

    drawBull();
    drawBear();

    if (!collision) {
      requestAnimationFrame(animateBullBear);
    } else {
      // After collision, fade out animation container and show homepage
      fadeOutAnimationContainer();
    }
  }

  function fadeOutAnimationContainer() {
    const container = document.getElementById('animation-container');
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      opacity -= 0.05;
      container.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeInterval);
        container.style.display = 'none';
        showHomepage();
      }
    }, 50);
  }

function showHomepage() {
  const homepage = document.getElementById('homepage');
  homepage.classList.remove('hidden');
  // Removed stock chart animation as per request
  // animateStockChart();
  startFinanceTipsRotation();
  initSponsorCube();
}


let currentTipIndex = 0;
const financeTipElement = document.getElementById('finance-tip-text');

function startFinanceTipsRotation() {
  if (!financeTipElement) return;
  setInterval(() => {
    currentTipIndex = (currentTipIndex + 1) % financeQuotes.length;
    financeTipElement.textContent = financeQuotes[currentTipIndex];
  }, 12000); // Change tip every 12 seconds
}

// Sponsor revolving cube (placeholder implementation)
function initSponsorCube() {
  const container = document.getElementById('sponsor-cube-container');
  if (!container) return;

  // Placeholder: You can replace this with a 3D cube implementation using CSS or WebGL
  container.innerHTML = '<p style="color:#00ff99; text-align:center; font-size:14px; padding-top:45px;">Sponsor Cube Here</p>';

  // TODO: Upload sponsor company symbols and website links here
}

// Start the bull and bear animation on page load
window.onload = () => {
  animateBullBear();
};
})();
