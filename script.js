/* =====================================================
   👤 EDIT BIRTHDAY NAME HERE
=====================================================

   Example:

   const BIRTHDAY_NAME = "  Mugil";

*/

const BIRTHDAY_NAME = "Aashu 💖";



/* =====================================================
   ✍️ EDIT YOUR NAME HERE
=====================================================

   This appears at the bottom of the letter.

   Example:

   const YOUR_NAME = "Mugil ❤️";

*/

const YOUR_NAME = "Mugi ❤️";



/* =====================================================
   LIGHTWEIGHT DECORATIVE BACKGROUND (OFFLINE)
===================================================== */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stars = document.getElementById('stars');
if (stars) {
  const count = window.matchMedia('(max-width: 600px)').matches ? 52 : 88;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2.5}s`;
    fragment.appendChild(star);
  }
  stars.appendChild(fragment);
}

// Slow, warm Diwali-style lanterns. They are CSS-only and work offline.
(function createSkyLanterns() {
  const field = document.getElementById('skyLanterns');
  if (!field) return;
  const count = window.matchMedia('(max-width: 600px)').matches ? 6 : 10;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const lantern = document.createElement('span');
    lantern.className = 'sky-lantern';
    lantern.setAttribute('aria-hidden', 'true');
    lantern.style.left = `${5 + Math.random() * 90}%`;
    lantern.style.setProperty('--lantern-duration', `${22 + Math.random() * 13}s`);
    lantern.style.setProperty('--lantern-delay', `${-Math.random() * 18}s`);
    lantern.style.setProperty('--lantern-drift', `${Math.round((Math.random() - 0.5) * 90)}px`);
    lantern.style.setProperty('--lantern-scale', `${0.72 + Math.random() * 0.46}`);
    fragment.appendChild(lantern);
  }
  field.appendChild(fragment);
})();

/* =====================================================
   🕯️ CREATE 3 CANDLES
===================================================== */

const candles =
    document.getElementById("candles");

let blown = 0;


for(let i = 0; i < 3; i++){

    let c =
        document.createElement("div");

    c.className =
        "candle";

    c.innerHTML =
        '<div class="flame"></div>';

    c.onclick =
        () => blow(c);

    candles.appendChild(c);

}



/* =====================================================
   💨 BLOW CANDLE
===================================================== */

function blow(c){

    if(
        c.classList.contains("off")
    ){
        return;
    }


    c.classList.add("off");


    let smoke =
        document.createElement("div");

    smoke.className =
        "smoke";


    c.appendChild(smoke);


    blown++;


    document
        .getElementById("counter")
        .textContent =
        blown +
        " / 3 candles blown";


    if(blown === 3){

        setTimeout(
            nextScene,
            700
        );

    }

}





/* =====================================================
   Decorative berry bears: smooth autonomous walking only
===================================================== */
(function initCandleBears() {
  const play = document.getElementById('candleBearPlay');
  const strawberry = document.getElementById('strawberryBearPlay');
  const blueberry = document.getElementById('blueberryBearPlay');
  const candleScreen = document.getElementById('candleScreen');
  if (!play || !strawberry || !blueberry || !candleScreen) return;

  const bears = [
    { el: strawberry, x: 0, y: 7, startX: 0, direction: 1, speed: 20, phase: 0.2 },
    { el: blueberry, x: 0, y: 7, startX: 0, direction: -1, speed: 17, phase: 2.4 }
  ];
  let previousTime = 0;
  let animationFrame = 0;

  function resetBearPositions() {
    const width = play.clientWidth;
    bears[0].x = Math.max(0, width * 0.08);
    bears[1].x = Math.max(0, width * 0.72);
    bears.forEach((bear) => { bear.startX = bear.x; });
  }

  function tick(now) {
    if (document.hidden || candleScreen.classList.contains('hidden')) {
      previousTime = 0;
      animationFrame = 0;
      return;
    }
    animationFrame = window.requestAnimationFrame(tick);
    if (!previousTime) previousTime = now;
    const dt = Math.min(0.035, Math.max(0, (now - previousTime) / 1000));
    previousTime = now;
    const maxX = Math.max(0, play.clientWidth - 116);
    const time = now / 1000;

    bears.forEach((bear, i) => {
      // Walk back and forth independently; never target or interact with the other bear.
      bear.x += bear.direction * bear.speed * dt;
      if (bear.x >= maxX) { bear.x = maxX; bear.direction = -1; }
      if (bear.x <= 0) { bear.x = 0; bear.direction = 1; }
      bear.el.style.left = `${bear.x}px`;
      bear.el.style.top = `${7 + Math.sin(time * 2.2 + bear.phase) * 2}px`;
      bear.el.classList.toggle('walk-left', bear.direction < 0);
    });
  }

  resetBearPositions();
  window.addEventListener('resize', resetBearPositions, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !candleScreen.classList.contains('hidden') && !animationFrame) {
      previousTime = 0;
      animationFrame = window.requestAnimationFrame(tick);
    }
  });
  animationFrame = window.requestAnimationFrame(tick);
  window.addEventListener('pagehide', () => window.cancelAnimationFrame(animationFrame), { once: true });
})();

/* =====================================================
   🎂 SHOW BIRTHDAY PAGE
===================================================== */

function nextScene(){

    document
        .getElementById(
            "candleScreen"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "birthdayScreen"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "birthdayTitle"
        )
        .innerHTML =
        "Happy Birthday, " +
        "<span class='name'>" +
        escapeHTML(
            BIRTHDAY_NAME
        ) +
        "</span> ✨";


    document
        .getElementById(
            "letterName"
        )
        .textContent =
        BIRTHDAY_NAME;


    document
        .getElementById(
            "signatureName"
        )
        .textContent =
        YOUR_NAME;


    createBalloons();

    createConfetti();
    schedulePlayGameGlow();

}




/* =====================================================
   🍓🫐 MOBILE-FIRST OFFLINE BERRY BASKET GAME
===================================================== */
const TARGET_BERRIES = 10;
const BERRY_SPAWN_CHANCE = 0.80; // 80% chance at each spawn tick, as requested.
const BERRY_SPAWN_INTERVAL_MS = 760;
let miniGameScore = 0;
let berrySpawnTimer = null;
let berryFrame = null;
let gameRunning = false;
let basketPointerActive = false;
let lastBerryFrame = 0;
let letterTransitionBusy = false;
let letterTransitionTimer = null;
let playGlowTimer = null;

function schedulePlayGameGlow() {
  if (playGlowTimer) window.clearTimeout(playGlowTimer);
  const button = document.querySelector('.mini-game-launch');
  if (!button) return;
  button.classList.remove('is-glowing');
  playGlowTimer = window.setTimeout(() => {
    playGlowTimer = null;
    if (!document.getElementById('birthdayScreen')?.classList.contains('hidden')) {
      button.classList.add('is-glowing');
    }
  }, 4000);
}

function clearPlayGameGlow() {
  if (playGlowTimer) window.clearTimeout(playGlowTimer);
  playGlowTimer = null;
  document.querySelector('.mini-game-launch')?.classList.remove('is-glowing');
}

function openMiniGame() {
  clearPlayGameGlow();
  document.getElementById('birthdayScreen').classList.add('hidden');
  document.getElementById('miniGameScreen').classList.remove('hidden');
  resetMiniGame();
}
function closeMiniGame() {
  stopBerryGame();
  document.getElementById('miniGameScreen').classList.add('hidden');
  document.getElementById('birthdayScreen').classList.remove('hidden');
  schedulePlayGameGlow();
}
function stopBerryGame() {
  gameRunning = false;
  if (berrySpawnTimer) window.clearInterval(berrySpawnTimer);
  berrySpawnTimer = null;
  if (berryFrame) window.cancelAnimationFrame(berryFrame);
  berryFrame = null;
  lastBerryFrame = 0;
}
function resetMiniGame() {
  stopBerryGame();
  miniGameScore = 0;
  letterTransitionBusy = false;
  if (letterTransitionTimer) window.clearTimeout(letterTransitionTimer);
  letterTransitionTimer = null;
  const score = document.getElementById('miniGameCount');
  const message = document.getElementById('miniGameMessage');
  const reveal = document.getElementById('envelopeReveal');
  const arena = document.getElementById('miniGameArena');
  const basket = document.getElementById('fruitBasket');
  if (!score || !message || !reveal || !arena || !basket) return;
  score.textContent = '0';
  message.textContent = 'Move your basket with your finger and catch 10 berries! 💗';
  reveal.classList.add('hidden');
  reveal.classList.remove('envelope-fly-away');
  const envelope = document.getElementById('floatingEnvelope');
  if (envelope) envelope.disabled = false;
  arena.querySelectorAll('.falling-berry').forEach((el) => el.remove());
  basket.style.left = '50%';
  basket.style.transform = 'translateX(-50%)';
  basket.classList.remove('basket-happy');
  gameRunning = true;
  spawnBerry(true); // Start immediately so the game feels responsive.
  berrySpawnTimer = window.setInterval(() => spawnBerry(false), BERRY_SPAWN_INTERVAL_MS);
  berryFrame = window.requestAnimationFrame(updateBerries);
}
function spawnBerry(force = false) {
  if (!gameRunning) return;
  if (!force && Math.random() > BERRY_SPAWN_CHANCE) return;
  const arena = document.getElementById('miniGameArena');
  if (!arena || arena.querySelectorAll('.falling-berry').length >= 7) return;
  const berry = document.createElement('button');
  berry.type = 'button';
  berry.className = 'falling-berry';
  berry.textContent = Math.random() < 0.5 ? '🍓' : '🫐';
  berry.setAttribute('aria-label', 'Catch this berry for one point');
  berry.style.left = `${5 + Math.random() * 82}%`;
  berry.style.top = '-42px';
  berry.dataset.y = '-42';
  berry.dataset.speed = String(1.7 + Math.random() * 1.4);
  berry.addEventListener('click', () => collectBerry(berry));
  arena.appendChild(berry);
}
function updateBerries(timestamp) {
  if (!gameRunning) return;
  if (!lastBerryFrame) lastBerryFrame = timestamp;
  const dt = Math.min(48, Math.max(0, timestamp - lastBerryFrame)) / 32;
  lastBerryFrame = timestamp;
  const arena = document.getElementById('miniGameArena');
  const basket = document.getElementById('fruitBasket');
  if (!arena || !basket) { stopBerryGame(); return; }
  const arenaRect = arena.getBoundingClientRect();
  const basketRect = basket.getBoundingClientRect();
  arena.querySelectorAll('.falling-berry').forEach((berry) => {
    if (berry.dataset.caught === 'true') return;
    const y = Number(berry.dataset.y || -42) + Number(berry.dataset.speed || 2) * dt;
    berry.dataset.y = String(y);
    berry.style.top = `${y}px`;
    const x = berry.offsetLeft;
    const w = berry.offsetWidth || 42;
    const h = berry.offsetHeight || 42;
    const berryTop = arenaRect.top + y;
    const berryLeft = arenaRect.left + x;
    const hit = berryTop + h >= basketRect.top + 8 && berryTop <= basketRect.bottom && berryLeft + w >= basketRect.left + 7 && berryLeft <= basketRect.right - 7;
    if (hit) collectBerry(berry);
    else if (y > arena.clientHeight + 12) berry.remove();
  });
  if (gameRunning) berryFrame = window.requestAnimationFrame(updateBerries);
}
function collectBerry(berry) {
  if (!gameRunning || !berry || !berry.isConnected || berry.dataset.caught === 'true') return;
  berry.dataset.caught = 'true'; // Prevent multiple points while the catch animation is running.
  berry.disabled = true;
  berry.classList.add('berry-caught');
  window.setTimeout(() => berry.remove(), 110);
  miniGameScore += 1;
  document.getElementById('miniGameCount').textContent = String(miniGameScore);
  const messages = ['Sweet catch! 🍓 +1', 'Berry lovely! 🫐 +1', 'You’re doing berry well! ✨ +1', 'One more sweet point! 💖 +1'];
  document.getElementById('miniGameMessage').textContent = messages[Math.floor(Math.random() * messages.length)];
  if (miniGameScore >= TARGET_BERRIES) finishBerryGame();
}
function finishBerryGame() {
  if (!gameRunning) return;
  stopBerryGame();
  document.getElementById('miniGameMessage').textContent = '10 sweet catches! Your surprise letter is here 💌';
  document.getElementById('fruitBasket').classList.add('basket-happy');
  document.getElementById('envelopeReveal').classList.remove('hidden');
  document.getElementById('floatingEnvelope')?.focus({ preventScroll: true });
}
function moveBasket(clientX) {
  if (!gameRunning) return;
  const arena = document.getElementById('miniGameArena');
  const basket = document.getElementById('fruitBasket');
  if (!arena || !basket) return;
  const rect = arena.getBoundingClientRect();
  const half = basket.offsetWidth / 2;
  const x = Math.max(half + 3, Math.min(rect.width - half - 3, clientX - rect.left));
  basket.style.left = `${x}px`;
  basket.style.transform = 'translateX(-50%)';
}
(function setupBasketControls() {
  const arena = document.getElementById('miniGameArena');
  const basket = document.getElementById('fruitBasket');
  if (!arena || !basket) return;
  arena.addEventListener('pointerdown', (event) => {
    if (!gameRunning || event.target.closest('.falling-berry')) return;
    basketPointerActive = true;
    moveBasket(event.clientX);
    try { arena.setPointerCapture(event.pointerId); } catch (_) { /* optional on older browsers */ }
    event.preventDefault();
  });
  arena.addEventListener('pointermove', (event) => {
    if (basketPointerActive) moveBasket(event.clientX);
  });
  const stopMoving = () => { basketPointerActive = false; };
  window.addEventListener('pointerup', stopMoving, { passive: true });
  window.addEventListener('pointercancel', stopMoving, { passive: true });
  basket.addEventListener('keydown', (event) => {
    if (!gameRunning || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const rect = arena.getBoundingClientRect();
    const current = basket.getBoundingClientRect().left + basket.offsetWidth / 2;
    if (event.key === 'Home') moveBasket(rect.left + basket.offsetWidth / 2);
    else if (event.key === 'End') moveBasket(rect.right - basket.offsetWidth / 2);
    else moveBasket(current + (event.key === 'ArrowLeft' ? -28 : 28));
  });
})();
function openGameLetter() {
  if (letterTransitionBusy) return;
  letterTransitionBusy = true;
  stopBerryGame();
  const envelope = document.getElementById('floatingEnvelope');
  const letterScreen = document.getElementById('letterScreen');
  const gameScreen = document.getElementById('miniGameScreen');
  const reveal = document.getElementById('envelopeReveal');
  if (!letterScreen || !gameScreen) return;

  // Use a lightweight, compositor-friendly reveal instead of scaling the entire
  // detailed letter from envelope-size (which can stutter on lower-end phones).
  letterScreen.style.setProperty('--letter-origin-x', '50%');
  letterScreen.style.setProperty('--letter-origin-y', '50%');
  letterScreen.classList.remove('hidden', 'letter-emerging', 'is-ready');
  letterScreen.classList.add('letter-emerging');
  letterScreen.setAttribute('aria-hidden', 'false');
  letterScreen.scrollTop = 0;
  if (envelope) {
    envelope.disabled = true;
    window.setTimeout(() => envelope.classList.add('envelope-fly-away'), reducedMotion ? 0 : 180);
  }

  const finish = () => {
    if (!letterTransitionBusy) return;
    letterTransitionBusy = false;
    if (letterTransitionTimer) window.clearTimeout(letterTransitionTimer);
    letterTransitionTimer = null;
    gameScreen.classList.add('hidden');
    reveal?.classList.add('hidden');
    letterScreen.classList.remove('letter-emerging');
    letterScreen.classList.add('is-ready');
    letterScreen.style.removeProperty('--letter-origin-x');
    letterScreen.style.removeProperty('--letter-origin-y');
    letterScreen.scrollTop = 0;
    if (envelope) envelope.classList.remove('envelope-fly-away');
    document.getElementById('letterTitle')?.focus({ preventScroll: true });
  };
  if (reducedMotion) {
    finish();
  } else {
    letterTransitionTimer = window.setTimeout(finish, 900);
  }
}

/* =====================================================
   💌 OPEN FULL-SCREEN LETTER
===================================================== */

function showWish(){

    document.getElementById("birthdayScreen").classList.add("hidden");
    document.getElementById("blueberryScreen").classList.remove("hidden");

    // Reset the little challenge if the scene is opened again.
    blueberryTaps = 0;
    document.getElementById("blueberryCount").textContent = "0";
    document.getElementById("blueberryMessage").textContent = "A little surprise is hiding here 💙";
    document.getElementById("blueberryTap").disabled = false;
    document.getElementById("blueberryTap").classList.remove("unlocked");
    document.querySelectorAll(".blueberry-dots i").forEach(dot => dot.classList.remove("lit"));
}


/* =====================================================
   🫐 FIVE TAPS TO UNLOCK THE EXISTING LETTER
===================================================== */
let blueberryTaps = 0;
const blueberryMessages = [
    "A little surprise is hiding here 💙",
    "One tiny tap… ✨",
    "The magic is waking up 💫",
    "Almost halfway there! 🫐",
    "Your letter is waiting… 💌",
    "Secret unlocked! Opening your letter… 💙"
];

function tapBlueberry(){
    if (blueberryTaps >= 5) return;

    blueberryTaps++;
    const fruitButton = document.getElementById("blueberryTap");
    const count = document.getElementById("blueberryCount");
    const message = document.getElementById("blueberryMessage");

    count.textContent = String(blueberryTaps);
    message.textContent = blueberryMessages[blueberryTaps];
    fruitButton.classList.remove("tap-pop");
    // Restart the CSS tap animation on every press.
    void fruitButton.offsetWidth;
    fruitButton.classList.add("tap-pop");
    document.querySelectorAll(".blueberry-dots i").forEach((dot, index) => {
        if (index < blueberryTaps) dot.classList.add("lit");
    });

    if (blueberryTaps === 5){
        fruitButton.classList.add("unlocked");
        fruitButton.disabled = true;
        setTimeout(() => {
            document.getElementById("blueberryScreen").classList.add("hidden");
            openLetter();
        }, 850);
    }
}


/* =====================================================
   💌 OPEN THE EXISTING FULL-SCREEN LETTER
===================================================== */
function openLetter(){

    document.getElementById("letterScreen").classList.remove("hidden");

    document.getElementById("letterName").textContent = BIRTHDAY_NAME;
    document.getElementById("signatureName").textContent = YOUR_NAME;

    createBalloons();
    createConfetti();
}



/* =====================================================
   🎈 STRAWBERRY + BLUEBERRY BALLOONS
===================================================== */

function createBalloons(){

    const balloonTypes = [

        "🎈",
        "🎈",
        "🍓",
        "🫐",
        "💗",
        "💙",
        "🍓",
        "🫐"

    ];


    const mobile = window.matchMedia('(max-width: 600px)').matches;
    const balloonCount = mobile ? 10 : 20;
    for(
        let i = 0;
        i < balloonCount;
        i++
    ){

        let b =
            document.createElement("div");


        b.className =
            "balloon";


        b.textContent =
            balloonTypes[
                Math.floor(
                    Math.random() *
                    balloonTypes.length
                )
            ];


        b.style.left =
            Math.random() * 100 +
            "%";


        b.style.animationDelay =
            Math.random() * 3 +
            "s";


        b.style.animationDuration =
            6 +
            Math.random() * 5 +
            "s";


        document.body.appendChild(b);


        setTimeout(
            () => b.remove(),
            12000
        );

    }

}



/* =====================================================
   🎉 CONFETTI
===================================================== */

function createConfetti(){

    const mobile = window.matchMedia('(max-width: 600px)').matches;
    const confettiCount = mobile ? 34 : 68;
    for(
        let i = 0;
        i < confettiCount;
        i++
    ){

        let p =
            document.createElement("div");


        p.className =
            "confetti";


        p.style.left =
            Math.random() * 100 +
            "%";


        p.style.animationDelay =
            Math.random() * 1.8 +
            "s";


        p.style.background =
            [

                "#ff3f8f",
                "#ff7aaa",
                "#6c63ff",
                "#8994ff",
                "#ffffff",
                "#ffd166"

            ][
                Math.floor(
                    Math.random() * 6
                )
            ];


        document.body.appendChild(p);


        setTimeout(
            () => p.remove(),
            6000
        );

    }

}



/* Separate music page navigation. Keep the shared audio element running across pages. */
function openMusicPage() {
  const letter = document.getElementById('letterScreen');
  const music = document.getElementById('musicPage');
  if (!letter || !music) return;
  letter.classList.add('hidden');
  music.classList.remove('hidden');
  music.setAttribute('aria-hidden', 'false');
  window.scrollTo({ top: 0, behavior: 'auto' });
}
function closeMusicPage() {
  const letter = document.getElementById('letterScreen');
  const music = document.getElementById('musicPage');
  if (!letter || !music) return;
  music.classList.add('hidden');
  music.setAttribute('aria-hidden', 'true');
  letter.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/* =====================================================
   ← BACK TO BIRTHDAY
===================================================== */

function backToBirthday() {
  if (letterTransitionTimer) window.clearTimeout(letterTransitionTimer);
  letterTransitionTimer = null;
  letterTransitionBusy = false;
  const letterScreen = document.getElementById('letterScreen');
  document.getElementById('musicPage')?.classList.add('hidden');
  document.getElementById('musicPage')?.setAttribute('aria-hidden', 'true');
  letterScreen.classList.add('hidden');
  letterScreen.classList.remove('letter-emerging', 'is-ready');
  letterScreen.style.removeProperty('--letter-origin-x');
  letterScreen.style.removeProperty('--letter-origin-y');
  letterScreen.setAttribute('aria-hidden', 'true');
  document.getElementById('miniGameScreen').classList.add('hidden');
  document.getElementById('envelopeReveal').classList.add('hidden');
  document.getElementById('birthdayScreen').classList.remove('hidden');
  schedulePlayGameGlow();
}


/* =====================================================
   🔒 ESCAPE HTML
===================================================== */

function escapeHTML(v){

    return String(v).replace(
        /[&<>'"]/g,

        c => ({

            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            "'":"&#39;",
            '"':"&quot;"

        }[c])
    );

}


/* First tap opens the surprise and attempts audio playback in the user gesture. */
(() => {
  const overlay = document.getElementById('surpriseStartOverlay');
  const openButton = document.getElementById('openSurpriseButton');
  const audio = document.getElementById('backgroundMusic');
  if (!overlay || !openButton) return;
  openButton.addEventListener('click', async () => {
    if (audio) {
      try { await audio.play(); } catch (err) { /* The visitor can use the Music button if playback is unavailable. */ }
    }
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }, { once: true });
})();

/* Background music: attempt autoplay, then start on the first user interaction if the browser blocks it. */
(() => {
  const audio = document.getElementById('backgroundMusic');
  const button = document.getElementById('musicToggle');
  if (!audio || !button) return;
  audio.volume = 0.32;

  const setState = (playing) => {
    button.classList.toggle('is-playing', playing);
    button.textContent = playing ? '♫ Music: On' : '♫ Music: Off';
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  };

  const startMusic = async () => {
    try {
      await audio.play();
      setState(true);
      return true;
    } catch (err) {
      setState(false);
      return false;
    }
  };

  // Try immediately. Browsers may block sound until the visitor interacts.
  startMusic();

  // If autoplay was blocked, start on the first tap/click anywhere on the page.
  document.addEventListener('click', (event) => {
    if (event.target && event.target.closest && event.target.closest('#musicToggle')) return;
    if (audio.paused) startMusic();
  }, { once: true });

  button.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      setState(false);
      return;
    }
    const started = await startMusic();
    if (!started) {
      button.textContent = '♫ Add song.mp3';
      button.setAttribute('aria-label', 'Add assets/song.mp3 to enable music');
      console.warn('Background music could not start. Ensure assets/song.mp3 exists and is a supported audio file.');
    }
  });

  audio.addEventListener('play', () => setState(true));
  audio.addEventListener('pause', () => setState(false));
  audio.addEventListener('error', () => {
    setState(false);
    button.title = 'Put your MP3 file at assets/song.mp3';
  });
})();

/* PERSONAL PLAYLIST — shares the background audio element so opening the player never restarts track 1. */
(() => {
  const audio = document.getElementById('backgroundMusic');
  const list = document.getElementById('playlistList');
  if (!audio || !list) return;

  const tracks = [
    { title: 'November Angel (Short Version)', subtitle: 'A song just for you 💗', src: 'assets/November-Angel-Short.mp3', cover: 'assets/covers/November-Angel-Short.jpg' },
    { title: 'November Angel', subtitle: 'A little more magic ✨', src: 'assets/songs/November-Angel.mp3', cover: 'assets/covers/November-Angel.jpg' },
    { title: 'Birthday Bujji', subtitle: 'Made for your special day 🎂', src: 'assets/songs/Birthday-Bujji.mp3', cover: 'assets/covers/Birthday-Bujji.jpg' }
  ];
  let currentTrack = 0;
  const $ = (id) => document.getElementById(id);
  const title = $('playlistNowTitle');
  const nowCover = $('playlistNowCover');
  const subtitle = $('playlistNowSubtitle');
  const timeline = $('playlistTimeline');
  const currentTime = $('playlistCurrentTime');
  const duration = $('playlistDuration');
  const playPause = $('playlistPlayPause');
  const download = $('playlistDownload');
  const volume = $('playlistVolume');
  const recipient = $('musicRecipientName');
  const format = (n) => Number.isFinite(n) && n >= 0 ? `${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}` : '0:00';

  // Reuse the same birthday name already configured for the letter and birthday screen.
  if (recipient && typeof BIRTHDAY_NAME !== 'undefined') recipient.textContent = BIRTHDAY_NAME;

  function paint() {
    const d = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (title) title.textContent = tracks[currentTrack].title;
    if (subtitle) subtitle.textContent = tracks[currentTrack].subtitle;
    if (nowCover) nowCover.src = tracks[currentTrack].cover;
    if (currentTime) currentTime.textContent = format(audio.currentTime);
    if (duration) duration.textContent = format(d);
    if (timeline && !timeline.matches(':active')) timeline.value = d ? String(Math.round(audio.currentTime / d * 1000)) : '0';
    if (playPause) { playPause.textContent = audio.paused ? '▶' : 'Ⅱ'; playPause.setAttribute('aria-label', audio.paused ? 'Play song' : 'Pause song'); }
    if (download) download.href = tracks[currentTrack].src;
    [...list.querySelectorAll('[data-track]')].forEach((button, i) => {
      button.classList.toggle('is-active', i === currentTrack);
      button.setAttribute('aria-current', i === currentTrack ? 'true' : 'false');
    });
  }

  async function selectTrack(index, shouldPlay = true) {
    const next = (index + tracks.length) % tracks.length;
    const sameTrack = next === currentTrack && audio.getAttribute('src') === tracks[next].src;
    currentTrack = next;
    if (!sameTrack) {
      audio.pause();
      audio.src = tracks[currentTrack].src;
      audio.load();
    }
    paint();
    if (shouldPlay) {
      try { await audio.play(); } catch (err) { if (subtitle) subtitle.textContent = 'Tap Play to start this song 🎵'; }
    }
    paint();
  }

  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-track]');
    if (button) selectTrack(Number(button.dataset.track));
  });
  $('playlistPrev')?.addEventListener('click', () => selectTrack(currentTrack - 1));
  $('playlistNext')?.addEventListener('click', () => selectTrack(currentTrack + 1));
  playPause?.addEventListener('click', async () => {
    if (audio.paused) { try { await audio.play(); } catch (err) { if (subtitle) subtitle.textContent = 'Add the MP3 file, then tap play 🎵'; } }
    else audio.pause();
    paint();
  });
  timeline?.addEventListener('input', () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Number(timeline.value) / 1000 * audio.duration;
      if (currentTime) currentTime.textContent = format(audio.currentTime);
    }
  });
  volume?.addEventListener('input', () => { audio.volume = Number(volume.value); });
  audio.addEventListener('ended', () => selectTrack(currentTrack + 1));
  ['loadedmetadata','durationchange','timeupdate','play','pause','seeked','emptied','error'].forEach((name) => audio.addEventListener(name, paint));
  paint();
})();
