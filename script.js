// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Cache DOM Elements
const dinoCharacter = document.getElementById('dino-character');
const dinoScrollWrapper = document.getElementById('dino-jump-wrapper'); // Jump wrapper for vertical shifts
const dinoContainer = document.getElementById('dino-container');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

/* ==========================================================================
   1. SCROLL DETECTOR (IDLE / RUNNING DIRECTIONS)
   ========================================================================== */
let isScrolling = false;
let isScrollingForward = true;
let scrollTimeout;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  isScrolling = true;
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > lastScrollY) {
    isScrollingForward = true;
  } else if (currentScrollY < lastScrollY) {
    isScrollingForward = false;
  }
  
  lastScrollY = currentScrollY;
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 100);
});

/* ==========================================================================
   2. DINO TRACK VISIBILITY TRIGGER
   ========================================================================== */
// Fade in the track container after scrolling past the Hero content
gsap.to('#dino-track-container', {
  opacity: 1,
  scrollTrigger: {
    trigger: '#hero',
    start: 'bottom bottom', // When Hero bottom reaches screen bottom
    end: 'bottom 80%',     // Fades in quickly as you scroll down
    scrub: true
  }
});

/* ==========================================================================
   3. HORIZONTAL OBSTACLE MOVEMENTS (Pure Transforms)
   ========================================================================== */
// Helper to build horizontal slide ScrollTrigger
function buildObstacleTL(trigger, obstacleId, travelDist = '-135vw') {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  tl.to(obstacleId, { x: travelDist, ease: 'none' }, 0);
  return tl;
}

// Hero Cactus (Single cactus)
const heroTL = gsap.timeline({
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});
heroTL.to('#obs-hero-cactus', { x: '-135vw', ease: 'none' }, 0);

// About Section (Spaced Bush and Flower)
const aboutTL = gsap.timeline({
  scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true }
});
aboutTL.to('#obs-about-bush',   { x: '-165vw', ease: 'none' }, 0);
aboutTL.to('#obs-about-flower', { x: '-165vw', ease: 'none' }, 0);

// Vision Section (Tiny Cactus)
buildObstacleTL('#vision', '#obs-vision-cactus');

// Objectives Section (Server obstacle + cloud and rock decorations)
const objectivesTL = gsap.timeline({
  scrollTrigger: { trigger: '#objectives', start: 'top bottom', end: 'bottom top', scrub: true }
});
objectivesTL.to('#obs-objectives-server', { x: '-135vw', ease: 'none' }, 0);
objectivesTL.to('#obs-objectives-cloud',  { x: '-150vw', ease: 'none' }, 0);
objectivesTL.to('#obs-objectives-rock',   { x: '-135vw', ease: 'none' }, 0);

// Objectives Cards Fade/Stagger Animation
gsap.from('#objectives .objective-card', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#objectives',
    start: 'top 75%',
    toggleActions: 'play none none none'
  }
});

// Objectives Workstation Fade Up
gsap.from('#objectives .objectives-illustration', {
  opacity: 0,
  scale: 0.95,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#objectives',
    start: 'top 70%',
    toggleActions: 'play none none none'
  }
});

// Domains Section (Laptop only)
const domainsTL = gsap.timeline({
  scrollTrigger: { trigger: '#domains', start: 'top bottom', end: 'bottom top', scrub: true }
});
domainsTL.to('#obs-domains-laptop', { x: '-135vw', ease: 'none' }, 0);

// Facilities Section (Server rack)
buildObstacleTL('#facilities', '#obs-facilities-server');

// Projects Section (Shield)
buildObstacleTL('#projects', '#obs-projects-shield');

// Events Section (Bird at ducking height)
const eventsTL = gsap.timeline({
  scrollTrigger: { trigger: '#events', start: 'top bottom', end: 'bottom top', scrub: true }
});
eventsTL.to('#obs-events-bird', { x: '-135vw', ease: 'none' }, 0);

// Footer Section (Finish Flag stops just ahead of Dino at 18% viewport)
const footerTL = gsap.timeline({
  scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom bottom', scrub: true }
});
footerTL.to('#obs-footer-flag', { x: '-92vw', ease: 'none' }, 0);

/* ==========================================================================
   4. DYNAMIC COORDINATE-BASED COLLISION DETECTION LOOP
   ========================================================================== */
// Active obstacles to monitor
const obstacles = [
  document.getElementById('obs-hero-cactus'),
  document.getElementById('obs-about-bush'),
  document.getElementById('obs-about-flower'),
  document.getElementById('obs-vision-cactus'),
  document.getElementById('obs-objectives-server'),
  document.getElementById('obs-domains-laptop'),
  document.getElementById('obs-facilities-server'),
  document.getElementById('obs-projects-shield'),
  document.getElementById('obs-events-bird'),
  document.getElementById('obs-footer-flag')
];
const activeObstacles = obstacles.filter(obs => obs !== null);

let manualJumpY = 0;
let isManualJumping = false;
let currentState = 'idle';

// Main physics frame update
function updatePhysics() {
  let isJumping = false;
  let isDucking = false;
  let isCelebrating = false;
  
  let targetY = 0;
  let targetScaleY = 1;
  
  const dinoRect = dinoContainer.getBoundingClientRect();
  const dinoCenter = dinoRect.left + dinoRect.width / 2;
  
  activeObstacles.forEach(obs => {
    const obsRect = obs.getBoundingClientRect();
    
    // Ignore inactive/hidden elements or those off-screen
    if (obsRect.width === 0 || obsRect.right < 0 || obsRect.left > window.innerWidth) {
      return;
    }
    
    const obsCenter = obsRect.left + obsRect.width / 2;
    const d = obsCenter - dinoCenter;
    
    if (obs.id === 'obs-footer-flag') {
      // Flag celebration triggers when close
      if (d > -50 && d < 100) {
        isCelebrating = true;
      }
    } else if (obs.id === 'obs-events-bird') {
      // Bird triggers Ducking
      const range = 130;
      if (Math.abs(d) < range) {
        isDucking = true;
        const u = d / range; // Normalised range [-1, 1]
        const effect = 1 - u * u; // Parabolic multiplier [0, 1]
        targetScaleY = 1 - 0.45 * effect; // Compress vertical height to 55%
        targetY = 19 * effect; // Translate down to keep feet on the ground
      }
    } else {
      // Other obstacles trigger Jumps
      const range = 130;
      if (Math.abs(d) < range) {
        isJumping = true;
        const u = d / range; // Normalised range [-1, 1]
        const effect = 1 - u * u; // Parabolic multiplier [0, 1]
        targetY = -120 * effect; // Jump height peak at -120px
      }
    }
  });
  
  // Add manual jump offset
  let finalY = targetY + manualJumpY;
  
  // Apply transforms
  gsap.set(dinoScrollWrapper, {
    y: finalY,
    scaleY: targetScaleY,
    transformOrigin: 'bottom center'
  });
  
  // State Machine manager
  let nextState = 'idle';
  if (isCelebrating) {
    nextState = 'celebrating';
  } else if (isJumping || isManualJumping) {
    nextState = 'jumping';
  } else if (isDucking) {
    nextState = 'ducking';
  } else if (isScrolling) {
    nextState = isScrollingForward ? 'running' : 'running-backward';
  } else {
    nextState = 'idle';
  }
  
  if (nextState !== currentState) {
    dinoCharacter.classList.remove('idle', 'running', 'running-backward', 'jumping', 'ducking', 'celebrating');
    dinoCharacter.classList.add(nextState);
    
    // Manage horizontal flip direction
    if (nextState === 'running-backward' || (isScrolling && !isScrollingForward && nextState !== 'celebrating')) {
      dinoContainer.classList.add('facing-backward');
    } else if (isScrolling && isScrollingForward) {
      dinoContainer.classList.remove('facing-backward');
    }
    
    currentState = nextState;
  }
  
  requestAnimationFrame(updatePhysics);
}

requestAnimationFrame(updatePhysics);

/* ==========================================================================
   5. MANUAL CLICK & KEYBOARD JUMP (Natural Parabolic Arc)
   ========================================================================== */
function triggerManualJump() {
  if (isManualJumping) return;
  isManualJumping = true;
  
  dinoCharacter.classList.remove('celebrating');
  
  gsap.to({ val: 0 }, {
    val: -120,
    duration: 0.35,
    ease: 'power2.out',
    onUpdate: function() {
      manualJumpY = this.targets()[0].val;
    },
    onComplete: () => {
      gsap.to({ val: -120 }, {
        val: 0,
        duration: 0.35,
        ease: 'power2.in',
        onUpdate: function() {
          manualJumpY = this.targets()[0].val;
        },
        onComplete: () => {
          isManualJumping = false;
          manualJumpY = 0;
        }
      });
    }
  });
}

// Click listener
dinoContainer.addEventListener('click', triggerManualJump);

// Keyboard Space/ArrowUp listener
window.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.code === 'ArrowUp') && !isManualJumping) {
    // Focus check: only prevent default scroll if target isn't an input/textarea
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    triggerManualJump();
  }
});

/* ==========================================================================
   6. AMBIENT BACKROOM SYSTEMS (Page-wide Birds, Spline-restricted Meteors & Particles)
   ========================================================================== */
// Birds across the whole site background
function initAmbientBirds() {
  const container = document.getElementById('ambient-birds-container');
  if (!container) return;
  
  const numBirds = 4;
  for (let i = 0; i < numBirds; i++) {
    setTimeout(() => {
      spawnAmbientBird(container);
    }, i * 4000);
  }
}

function spawnAmbientBird(container) {
  const bird = document.createElement('div');
  bird.className = 'ambient-bird';
  
  const img = document.createElement('img');
  img.src = 'bird.png';
  img.alt = 'Ambient Bird';
  bird.appendChild(img);
  container.appendChild(bird);
  
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  const size = gsap.utils.random(22, 34);
  const startY = gsap.utils.random(h * 0.1, h * 0.8);
  const duration = gsap.utils.random(18, 30);
  
  gsap.set(bird, {
    left: w + 20,
    top: startY,
    width: size,
    height: size * (115 / 162),
    scaleX: 1 // Fly from right to left
  });
  
  // Bobbing
  gsap.to(bird, {
    y: '+=8',
    duration: gsap.utils.random(1.2, 2.0),
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
  
  // Lateral flight
  gsap.to(bird, {
    left: -size - 20,
    duration: duration,
    ease: 'none',
    onComplete: () => {
      bird.remove();
      spawnAmbientBird(container);
    }
  });
}

// Meteors: spawn from upper-right, travel diagonally at 40 degrees across page background
let activeMeteors = 0;

function spawnMeteor() {
  const container = document.getElementById('ambient-meteors-container');
  if (!container || activeMeteors >= 2) return;
  
  activeMeteors++;
  
  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  const head = document.createElement('div');
  head.className = 'meteor-head';
  const tail = document.createElement('div');
  tail.className = 'meteor-tail';
  
  meteor.appendChild(head);
  meteor.appendChild(tail);
  container.appendChild(meteor);
  
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  const diameter = gsap.utils.random(4, 7);
  const tailLength = gsap.utils.random(50, 110);
  const speed = gsap.utils.random(2.0, 3.5);
  
  // Spawn randomly from the upper-right area
  const startX = gsap.utils.random(w * 0.4, w * 1.2);
  const startY = -diameter - 10;
  
  // Travel a natural distance diagonally (40 degrees)
  const travelX = gsap.utils.random(w * 0.5, w * 0.9);
  const endX = startX - travelX;
  const travelY = travelX * Math.tan(40 * Math.PI / 180);
  
  gsap.set(meteor, {
    width: diameter,
    height: diameter,
    left: startX,
    top: startY,
    opacity: 0
  });
  
  gsap.set(tail, {
    width: tailLength
  });
  
  const tl = gsap.timeline({
    onComplete: () => {
      meteor.remove();
      activeMeteors = Math.max(0, activeMeteors - 1);
    }
  });
  
  tl.to(meteor, { opacity: gsap.utils.random(0.35, 0.5), duration: 0.3, ease: 'power1.in' })
    .to(meteor, {
      left: endX,
      top: startY + travelY,
      duration: speed,
      ease: 'none'
    }, 0)
    .to(meteor, {
      opacity: 0,
      duration: speed * 0.4,
      ease: 'power2.out'
    }, speed * 0.6);
}

function startMeteorLoop() {
  spawnMeteor();
  setTimeout(startMeteorLoop, gsap.utils.random(8000, 15000));
}

// Ambient Floating Particles: restricted to Spline side (right half of viewport)
function initParticles() {
  const container = document.getElementById('ambient-particles-container');
  if (!container) return;
  
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    spawnParticle(container, true);
  }
}

function spawnParticle(container, initialRandomY = false) {
  const p = document.createElement('div');
  p.className = 'ambient-particle';
  container.appendChild(p);
  
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  // Spawn only on Spline side (right half)
  const startX = gsap.utils.random(w * 0.5, w * 0.98);
  const startY = initialRandomY ? gsap.utils.random(0, h) : h + 10;
  const size = gsap.utils.random(1.5, 3.5);
  const duration = gsap.utils.random(12, 22);
  
  gsap.set(p, {
    left: startX,
    top: startY,
    width: size,
    height: size,
    opacity: gsap.utils.random(0.08, 0.18)
  });
  
  // Drift
  gsap.to(p, {
    x: '+=15',
    duration: gsap.utils.random(2, 4),
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
  
  // Float Up
  gsap.to(p, {
    top: -20,
    duration: initialRandomY ? duration * (startY / h) : duration,
    ease: 'none',
    onComplete: () => {
      p.remove();
      spawnParticle(container, false);
    }
  });
}

/* ==========================================================================
   7. NAV LINK ACTIVE STATE HIGHLIGHTING
   ========================================================================== */
function highlightNav(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

ScrollTrigger.create({
  trigger: '#hero', start: 'top 40%', end: 'bottom 40%',
  onEnter: () => highlightNav('hero'),
  onEnterBack: () => highlightNav('hero'),
});

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section, start: 'top 40%', end: 'bottom 40%',
    onEnter:     () => highlightNav(section.id),
    onEnterBack: () => highlightNav(section.id),
  });
});

/* ==========================================================================
   8. INITIALISE ON LOAD
   ========================================================================== */
window.addEventListener('load', () => {
  startMeteorLoop();
  initAmbientBirds();
  initParticles();
});
