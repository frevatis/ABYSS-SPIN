// ==========================================
// ПЕРЕМЕННЫЕ
// ==========================================
let demons = [];
let currentRotation = 0;
let isSpinning = false;
let selectedCategory = 'all';
let skipsLeft = 5;
let currentTarget = 1;
let personalBest = 0;
let currentDemon = null;
let consecutiveSkips = 0;
let historyVal = null;
let isFrozen = false; 
let isChaosMode = false; 
let previousState = null; 
let undosLeft = 2; 
let isPoisoned = false; 
let isProtected = false; 
let doubleDemon = null;
let waitingForSecond = false;
let effectWeights = {};
let lastSpinCount = 0;
let devilDebt = 0;

// ==========================================
// CHAOS MODE (СПИСОК ЭФФЕКТОВ) - В НАЧАЛЕ
// ==========================================
var chaosModifiers = [
    // 🔊 ЗВУКОВЫЕ
    { text: "ПТИЦА: Скипы заблокированы!", action: () => { isPoisoned = true; playChaosSound('bird'); }, icon: 'fa-dove', color: '#fcc419' },
    { text: "ДОБРОЕ УТРО: -5% к цели!", action: () => { currentTarget = Math.max(1, currentTarget - 5); playChaosSound('morning'); }, icon: 'fa-mug-hot', color: '#51cf66' },
    { text: "FNAF: +10% к цели!", action: () => { currentTarget = Math.min(100, currentTarget + 10); playChaosSound('fnaf'); }, icon: 'fa-robot', color: '#ff0000' },
    { text: "ВЕРИТИ: Твой рекорд сгорел!", action: () => { personalBest = 0; playChaosSound('verity'); }, icon: 'fa-fire', color: '#ff6b6b' },
    { text: "КОЧ БРАТАН: +2 скипа!", action: () => { skipsLeft += 2; playChaosSound('bratan'); }, icon: 'fa-user-astronaut', color: '#00d4ff' },
    { text: "ЛОБОТОМИЯ: -10 скипов!", action: () => { skipsLeft = Math.max(0, skipsLeft - 10); playChaosSound('lobotomy'); }, icon: 'fa-brain', color: '#9b59b6' },
    { text: "МОГУЛ: +10 скипов!", action: () => { skipsLeft += 10; playChaosSound('mogul'); }, icon: 'fa-trash', color: '#ffd700' },
    { text: "ЭЛЕВАТОР: Кнопка 'Сохранить' исчезнет!", action: () => { window.isFakeSave = true; playChaosSound('elevator'); }, icon: 'fa-elevator', color: '#00d4ff' },
    { text: "ГРУСТНЫЙ КОТ: -15% от рекорда!", action: () => { personalBest = Math.max(0, personalBest - 15); currentTarget = personalBest + 1; playChaosSound('cat'); }, icon: 'fa-cat', color: '#ff6b6b' },
    { text: "ВИЗГ СВИНЬИ: +5 скипов, но +10% к цели!", action: () => { skipsLeft += 5; currentTarget = Math.min(100, currentTarget + 10); playChaosSound('pig'); }, icon: 'fa-piggy-bank', color: '#fcc419' },
    
    // Базовые мемы
    { text: "MLG БАМ! Тряска, +2 скипа!", action: () => { skipsLeft += 2; playChaosSound('bam'); document.body.style.animation = 'chaosShake 0.3s'; setTimeout(() => document.body.style.animation = '', 350); }, icon: 'fa-bomb', color: '#ff6b6b' },
    { text: "МАМОНТ: Скипы заблокированы!", action: () => { isPoisoned = true; playChaosSound('motor', 0.6, true); }, icon: 'fa-motorcycle', color: '#fcc419' },
    { text: "КРИК: -5% к цели, рекорд сгорел!", action: () => { currentTarget = Math.max(1, currentTarget - 5); personalBest = 0; playChaosSound('ouuu'); }, icon: 'fa-face-scream', color: '#ff0000' },
    { text: "СМЕХ: Следующий демон скрыт!", action: () => { window.hideDemonName = true; playChaosSound('laugh'); }, icon: 'fa-face-laugh-squint', color: '#9b59b6' },
   { text: "ЦАРЬ ЗВОНИТ: Царь приказывает играть GRIEF!", action: () => { window.isTsarCalling = true; playChaosSound('tsar'); }, icon: 'fa-phone', color: '#ffd700' },
    { text: "БЕГ: +2 скипа!", action: () => { skipsLeft += 2; playChaosSound('running'); }, icon: 'fa-person-running', color: '#51cf66' },
    { text: "NEMESIS: +10% к цели!", action: () => { currentTarget = Math.min(100, currentTarget + 10); playChaosSound('nemesis'); }, icon: 'fa-skull', color: '#ff0000' },

    // 🎲 КАТЕГОРИИ
    { text: "ИЗИ ДЕМОН: Следующий спин из Easy!", action: () => { window.forceCategory = 'easy'; playChaosSound('ach'); }, icon: 'fa-leaf', color: '#51cf66' },
    { text: "МЕДИУМ: Следующий спин из Medium!", action: () => { window.forceCategory = 'medium'; playChaosSound('ach'); }, icon: 'fa-shield-halved', color: '#fcc419' },
    { text: "ХАРД: Следующий спин из Hard!", action: () => { window.forceCategory = 'hard'; playChaosSound('ach'); }, icon: 'fa-fire', color: '#ff922b' },
    { text: "ИНСЕЙН: Следующий спин из Insane!", action: () => { window.forceCategory = 'insane'; playChaosSound('ach'); }, icon: 'fa-brain', color: '#f06595' },
    { text: "ЭКСТРИМ: Следующий спин из Extreme!", action: () => { window.forceCategory = 'extreme'; playChaosSound('ach'); }, icon: 'fa-skull', color: '#ff6b6b' },
    { text: "ТОП 100: Следующий спин из Топ-100!", action: () => { window.forceCategory = 'top100'; playChaosSound('ach'); }, icon: 'fa-crown', color: '#ffd700' },
    { text: "ТОП 10: Следующий спин из Топ-10!", action: () => { window.forceCategory = 'top10'; playChaosSound('ach'); }, icon: 'fa-trophy', color: '#ffd700' },
    { text: "ИМПОСИБЛ: Следующий спин из Impossible!", action: () => { window.forceCategory = 'impossible'; playChaosSound('nemesis'); }, icon: 'fa-triangle-exclamation', color: '#ff0000' },

    // 🎲 МЕХАНИКИ
    { text: "РЕВЕРС: Колесо крутится назад!", action: () => { window.isReverse = true; playChaosSound('running'); }, icon: 'fa-rotate-left', color: '#00d4ff' },
    { text: "СЛЕПОЙ СПИН: Названия исчезли!", action: () => { window.isBlind = true; playChaosSound('laugh'); }, icon: 'fa-eye-slash', color: '#9b59b6' },
    { text: "ДВОЙНОЙ СПИН: 2 демона, проходи обоих!", action: () => { window.isDoubleSpin = true; playChaosSound('laugh'); }, icon: 'fa-clone', color: '#9b59b6' },
    { text: "ФЕЙК: Кнопка 'Сохранить' исчезнет!", action: () => { window.isFakeSave = true; playChaosSound('laugh'); }, icon: 'fa-ghost', color: '#ff6b6b' },
    { text: "КОД: Введи '777' для +2 скипов!", action: () => { window.waitForCode = true; playChaosSound('bam'); }, icon: 'fa-key', color: '#ffd700' },
    { text: "ЗЕРКАЛО: Рекорд и цель поменялись!", action: () => { let t = personalBest; personalBest = currentTarget; currentTarget = t; playChaosSound('nemesis'); }, icon: 'fa-arrows-left-right', color: '#00d4ff' },
    { text: "ОТКАТ: Цель откатилась к 1%!", action: () => { currentTarget = 1; playChaosSound('ouuu'); }, icon: 'fa-clock-rotate-left', color: '#ff6b6b' },
    { text: "БЕСКОНЕЧНОСТЬ: +10% к цели!", action: () => { currentTarget = Math.min(100, currentTarget + 10); playChaosSound('nemesis'); }, icon: 'fa-infinity', color: '#ff0000' },
    { text: "ШТИЛЬ: 3 спина без цели!", action: () => { window.stillCount = 3; playChaosSound('running'); }, icon: 'fa-wind', color: '#00d4ff' },
    { text: "КРАСНАЯ ЗОНА: 1 скип = проигрыш!", action: () => { window.isRedZone = true; window.redZoneLevelsLeft = 3; playChaosSound('fnaf'); }, icon: 'fa-skull-crossbones', color: '#ff0000' },
    { text: "ТОЧНОСТЬ: Нужно ровно 50%!", action: () => { targetExact = 50; currentTarget = 50; if (personalBest > 50) personalBest = 50; playChaosSound('bam'); }, icon: 'fa-bullseye', color: '#fcc419' },
    { text: "АМНЕЗИЯ: Сброс рекорда!", action: () => { personalBest = 0; currentTarget = 1; playChaosSound('ouuu'); }, icon: 'fa-brain', color: '#9b59b6' },
    { text: "ХАКЕР: Взлом цели! 99%!", action: () => { currentTarget = 99; playChaosSound('bam'); }, icon: 'fa-terminal', color: '#51cf66' },

    // 🟢 БАФФЫ
    { text: "АНГЕЛ: Скип бесплатный!", action: () => { isProtected = true; playChaosSound('morning'); }, icon: 'fa-shield-halved', color: '#51cf66' },
    { text: "ЗАМОРОЗКА: Цель не повысится!", action: () => { isFrozen = true; playChaosSound('running'); }, icon: 'fa-snowflake', color: '#00d4ff' },
    { text: "ЩЕДРОСТЬ: +5 скипов!", action: () => { skipsLeft += 5; playChaosSound('mogul'); }, icon: 'fa-gift', color: '#51cf66' },
    { text: "ОБЛЕГЧЕНИЕ: -15% к цели!", action: () => { currentTarget = Math.max(1, currentTarget - 15); personalBest = Math.max(0, personalBest - 15); if (currentTarget <= personalBest) personalBest = currentTarget - 1; playChaosSound('bratan'); }, icon: 'fa-angles-down', color: '#51cf66' },
    { text: "ДЖЕКПОТ: +10 скипов!", action: () => { skipsLeft += 10; playChaosSound('ach'); }, icon: 'fa-coins', color: '#ffd700' },

    // 🔴 ДЕБАФФЫ
    { text: "ЯД: Следующий скип заблокирован!", action: () => { isPoisoned = true; playChaosSound('pig'); }, icon: 'fa-skull-crossbones', color: '#ff0000' },
    { text: "ТЯЖЁЛАЯ ЦЕЛЬ: +20%!", action: () => { currentTarget = Math.min(100, currentTarget + 20); playChaosSound('fnaf'); }, icon: 'fa-arrow-trend-up', color: '#ff0000' },
    { text: "ЧЁРНАЯ ДЫРА: -3 скипа!", action: () => { skipsLeft = Math.max(0, skipsLeft - 3); playChaosSound('ouuu'); }, icon: 'fa-circle', color: '#ff0000' },
    { text: "СБРОС: -15% от рекорда!", action: () => { personalBest = Math.max(0, personalBest - 15); currentTarget = personalBest + 1; playChaosSound('verity'); }, icon: 'fa-fire', color: '#ff0000' },
    { text: "ПУСТОТА: Цель +15%!", action: () => { currentTarget = Math.min(100, currentTarget + 15); playChaosSound('nemesis'); }, icon: 'fa-ghost', color: '#9b59b6' },

    // 🃏 ВЕСЕЛЫЕ
    { text: "УБЕГАЮЩАЯ КНОПКА: Попробуй нажать 'Крутить'!", action: () => { window.runawayBtn = true; playChaosSound('laugh'); }, icon: 'fa-person-running', color: '#9b59b6' },
    { text: "ЗАВИСАНИЕ: Кнопка 'Сохранить' не работает 5 секунд!", action: () => { window.freezeSave = true; playChaosSound('elevator'); }, icon: 'fa-hourglass-half', color: '#00d4ff' },
    { text: "ТРЯСКА: Экран трясется 3 секунды!", action: () => { document.body.style.animation = 'chaosShake 0.1s infinite'; setTimeout(() => document.body.style.animation = '', 3000); playChaosSound('bam'); }, icon: 'fa-bomb', color: '#ff0000' },
    { text: "НЕВИДИМКА: Колесо становится прозрачным!", action: () => { wheel.style.opacity = '0.2'; setTimeout(() => wheel.style.opacity = '1', 5000); playChaosSound('laugh'); }, icon: 'fa-eye-slash', color: '#9b59b6' },
    { text: "ИНВЕРСИЯ: Экран переворачивается на 10 секунд!", action: () => { document.body.style.transform = 'rotate(180deg)'; setTimeout(() => document.body.style.transform = 'none', 10000); playChaosSound('fnaf'); }, icon: 'fa-rotate', color: '#ff6b6b' },
    { text: "ЛАГАЮЩИЙ ИНТЕРНЕТ: Кнопка грузится 5 секунд!", action: () => { window.slowSpin = true; playChaosSound('running'); }, icon: 'fa-wifi', color: '#00d4ff' },
    { text: "СЛУЧАЙНЫЙ ЦВЕТ: Весь сайт радужный!", action: () => { document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`; setTimeout(() => document.body.style.filter = 'none', 5000); playChaosSound('laugh'); }, icon: 'fa-palette', color: '#ffd700' },
];

// ==========================================
// ЗВУКИ
// ==========================================
const soundWheel = new Audio('sounds/wheel-of-fortune.mp3');
const soundWin = new Audio('sounds/kids-saying-yay-sound-effect_3.mp3');
let chaosMusic = null;

const chaosSounds = {
    bam: 'sounds/mlg-airhorn.mp3',
    mamont: 'sounds/smoke_weed_everyday_song.mp3',
    ouuu: 'sounds/ayyy-ayyy-ayyy-scream.mp3',
    laugh: 'sounds/kids-saying-yay-sound-effect_3.mp3',
    motor: 'sounds/litit-shakhed-z-motorchikom_zpq2bjT.mp3',
    running: 'sounds/running.mp3',
    nemesis: 'sounds/tf_nemesis.mp3',
    tsar: 'sounds/vy-pozvonili-tsariu-batiushke.mp3',
    bird: 'sounds/aaaaaaa-bird.mp3',
    morning: 'sounds/dobroe-utro-moia-devochka.mp3',
    fnaf: 'sounds/fnaf2-ambience.mp3',
    verity: 'sounds/hey-its-me-its-verity-song.mp3',
    bratan: 'sounds/koch-bratan-pesnia.mp3',
    lobotomy: 'sounds/lobotomy-sound-effect.mp3',
    mogul: 'sounds/mogul-musor-drop.mp3',
    elevator: 'sounds/musica-elevador-short.mp3',
    cat: 'sounds/sad-meow-song.mp3',
    pig: 'sounds/vizg-svini.mp3',
    ach: 'sounds/achievement-geometry-dash.mp3'
};

function playChaosSound(name, volume = 0.65, loop = false) {
    if (chaosMusic) { chaosMusic.pause(); chaosMusic.currentTime = 0; }
    const path = chaosSounds[name];
    if (!path) return;
    chaosMusic = new Audio(path);
    chaosMusic.volume = volume;
    chaosMusic.loop = loop;
    chaosMusic.play().catch(() => { });
}

function stopChaosSound() {
    if (!chaosMusic) return;
    chaosMusic.pause(); chaosMusic.currentTime = 0; chaosMusic = null;
}

function chaosClampTarget(value) { return Math.max(1, Math.min(100, Math.round(Number(value) || 1))); }
function chaosClampSkips(value) { return Math.max(0, Math.min(99, Math.round(Number(value) || 0))); }

// ==========================================
// ЭЛЕМЕНТЫ
// ==========================================
const undoBtn = document.getElementById('undoBtn');
const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const backToMenuBtn = document.getElementById('backToMenu');
const catBtns = document.querySelectorAll('.cat-btn');
const title = document.getElementById('currentCategoryTitle');
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const resultBlock = document.getElementById('resultBlock');
const resName = document.getElementById('resName');
const resCreator = document.getElementById('resCreator');
const resId = document.getElementById('resId');
const resTier = document.getElementById('resTier');
const saveBtn = document.getElementById('saveBtn');
const progressInput = document.getElementById('progressInput');
const skipBtn = document.getElementById('skipBtn');
const goalLabel = document.getElementById('goalLabel');
const targetText = document.getElementById('targetText');
const bestText = document.getElementById('bestText');
const skipsText = document.getElementById('skipsText');
const historyBlock = document.getElementById('historyBlock');
const historyName = document.getElementById('historyName');
const historyProgress = document.getElementById('historyProgress');
const customModal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalIcon = document.getElementById('modalIcon');
const modalActions = document.getElementById('modalActions');
const modalOkAction = document.getElementById('modalOkAction');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const modalOkBtn = document.getElementById('modalOkBtn');
const winModal = document.getElementById('winModal');
const winOkBtn = document.getElementById('winOkBtn');
const colors = ['#1a1f3d', '#6c63ff', '#11162c', '#00d4ff'];

// ==========================================
// ЗАГРУЗКА
// ==========================================
fetch('demons.json').then(res => res.json()).then(data => {
    demons = data.map(d => {
        let rawTier = d.tier || d.Tier;
        let isImp = (rawTier === 'imposible' || rawTier === 'impossible' || Number(rawTier) === 99);
        let finalTier = isImp ? 99 : Number(rawTier);
        let finalTop = d.top || d.Top || d.Impossible_Top || null;
        return { Name: d.name || d.Name, Creator: d.creator || d.Creator, ID: d.id || d.ID, Tier: finalTier, Top: finalTop, IsImpossible: isImp };
    });
    loadGame();
}).catch(err => console.error(err));

// ==========================================
// ФИЛЬТРАЦИЯ
// ==========================================
function filterDemons(cat) {
    if (!cat || cat === 'all' || cat === 'chaos') return demons;
    if (cat === 'top100') return demons.filter(d => d.Top !== null && d.Top !== undefined && d.Top <= 100 && !d.IsImpossible);
    if (cat === 'top10') return demons.filter(d => d.Top !== null && d.Top !== undefined && d.Top <= 10 && !d.IsImpossible);
    if (cat === 'impossible') return demons.filter(d => d.IsImpossible);
    let filtered = demons.filter(d => {
        const t = Number(d.Tier);
        if (cat === 'easy') return t >= 1 && t <= 5;
        if (cat === 'medium') return t > 5 && t <= 10;
        if (cat === 'hard') return t > 10 && t <= 15;
        if (cat === 'insane') return t > 15 && t <= 20;
        if (cat === 'extreme') return t > 20 && !d.IsImpossible;
        if (cat === 'hardextreme') return t >= 27 && !d.IsImpossible;
        return false;
    });
    return filtered;
}

// ==========================================
// ИНТЕРФЕЙС
// ==========================================
function updateUI() {
    if (skipsText) skipsText.textContent = skipsLeft;
    if (bestText) bestText.textContent = personalBest + '%';
    if (targetText) targetText.textContent = currentTarget + '%';
    const resSkips = document.getElementById('resSkips'); if (resSkips) resSkips.textContent = skipsLeft;
    const resUndos = document.getElementById('resUndos'); if (resUndos) resUndos.textContent = undosLeft;
    updateSkipButton();
    const debtText = document.getElementById('debtText');
    if (debtText) debtText.textContent = devilDebt > 0 ? devilDebt : "Нет";
}

function updateSkipButton() {
    if (!skipBtn) return;
    if (isPoisoned) {
        skipBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; skipBtn.style.color = '#ff6b6b'; skipBtn.style.borderColor = '#ff6b6b'; skipBtn.style.cursor = 'not-allowed';
        skipBtn.innerHTML = 'ЯД <i class="fa-solid fa-skull-crossbones"></i>';
    } else if (isProtected) {
        skipBtn.style.backgroundColor = 'rgba(81, 207, 102, 0.2)'; skipBtn.style.color = '#51cf66'; skipBtn.style.borderColor = '#51cf66'; skipBtn.style.cursor = 'pointer';
        skipBtn.innerHTML = 'Скип (Бесплатно)';
    } else {
        skipBtn.style.backgroundColor = 'transparent'; skipBtn.style.color = '#ff6b6b'; skipBtn.style.borderColor = '#ff6b6b'; skipBtn.style.cursor = 'pointer';
        skipBtn.innerHTML = 'Скип';
    }
}

function showMessage(title, text, iconClass = 'fa-circle-info', iconColor = '#00d4ff') {
    modalTitle.textContent = title; modalText.innerHTML = text; modalIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    modalIcon.style.color = iconColor; modalActions.style.display = 'none'; modalOkAction.style.display = 'flex'; customModal.classList.add('show');
}

function showConfirm(title, text, onConfirm) {
    modalTitle.textContent = title; modalText.innerHTML = text; modalIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    modalIcon.style.color = '#ff6b6b'; modalActions.style.display = 'flex'; modalOkAction.style.display = 'none'; customModal.classList.add('show');
    modalConfirmBtn.onclick = () => { customModal.classList.remove('show'); onConfirm(); };
}

// ==========================================
// СОХРАНЕНИЕ
// ==========================================
function saveGame() {
    if (selectedCategory === 'all' && currentTarget === 1 && !currentDemon) return;
    const gameState = {
        selectedCategory, skipsLeft, undosLeft, currentTarget, personalBest, currentDemon, historyVal,
        historyNameText: historyName ? historyName.textContent : null,
        isFrozen, isChaosMode, isPoisoned, isProtected,
        lastChaosEffect: window.lastChaosEffect || null, lastChaosColor: window.lastChaosColor || null,
        currentChaosEffect: window.currentChaosEffect || null, currentChaosColor: window.currentChaosColor || null,
        chaosFlags: {
            isBlind: window.isBlind || false, isReverse: window.isReverse || false, isDoubleSpin: window.isDoubleSpin || false,
            isOneChance: window.isOneChance || false, isRedZone: window.isRedZone || false, isFakeSave: window.isFakeSave || false,
            stillCount: window.stillCount || 0, forceCategory: window.forceCategory || null, isCopyDisabled: window.isCopyDisabled || false,
            targetExact: targetExact !== null ? targetExact : null, noSkip: window.noSkip || false, waitForCode: window.waitForCode || false,
            redZoneLevelsLeft: window.redZoneLevelsLeft || 0, gameOver: window.gameOver || false, devilDebt: devilDebt
        }
    };
    localStorage.setItem('abyssSpinSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('abyssSpinSave');
    if (!saved) return;
    const gs = JSON.parse(saved);

    selectedCategory = gs.selectedCategory; skipsLeft = gs.skipsLeft; undosLeft = gs.undosLeft !== undefined ? gs.undosLeft : 2;
    currentTarget = gs.currentTarget; personalBest = gs.personalBest; currentDemon = gs.currentDemon; historyVal = gs.historyVal;
    isFrozen = gs.isFrozen || false; isChaosMode = (selectedCategory === 'chaos'); isPoisoned = gs.isPoisoned || false; isProtected = gs.isProtected || false;

    if (gs.chaosFlags) {
        window.isBlind = gs.chaosFlags.isBlind || false; window.isReverse = gs.chaosFlags.isReverse || false;
        window.isDoubleSpin = gs.chaosFlags.isDoubleSpin || false; window.isOneChance = gs.chaosFlags.isOneChance || false;
        window.isRedZone = gs.chaosFlags.isRedZone || false; window.isFakeSave = gs.chaosFlags.isFakeSave || false;
        window.stillCount = gs.chaosFlags.stillCount || 0; window.forceCategory = gs.chaosFlags.forceCategory || null;
        window.isCopyDisabled = gs.chaosFlags.isCopyDisabled || false; targetExact = gs.chaosFlags.targetExact !== null ? gs.chaosFlags.targetExact : null;
        window.noSkip = gs.chaosFlags.noSkip || false; window.waitForCode = gs.chaosFlags.waitForCode || false;
        window.redZoneLevelsLeft = gs.redZoneLevelsLeft || 0; window.gameOver = gs.chaosFlags.gameOver || false;
        devilDebt = gs.chaosFlags.devilDebt || 0;
    }

    window.lastChaosEffect = gs.lastChaosEffect || null; window.lastChaosColor = gs.lastChaosColor || null;
    window.currentChaosEffect = gs.currentChaosEffect || null; window.currentChaosColor = gs.currentChaosColor || null;

    const historyBlock = document.getElementById('chaosHistoryBlock');
    const prevText = document.getElementById('prevEffectText');
    const currText = document.getElementById('currEffectText');
    if (historyBlock && prevText && currText && window.currentChaosEffect) {
        historyBlock.style.display = 'block';
        if (window.lastChaosEffect) { prevText.textContent = window.lastChaosEffect; prevText.style.color = window.lastChaosColor || '#9b59b6'; }
        else { prevText.textContent = "—"; }
        currText.textContent = window.currentChaosEffect; currText.style.color = window.currentChaosColor || '#ffd700';
    }

    updateUI();
    title.textContent = `Категория: ${selectedCategory}`;
    menuScreen.classList.remove('active'); gameScreen.classList.add('active'); backToMenuBtn.style.display = 'block';

    const impRules = document.getElementById('impossibleRules');
    if (impRules) impRules.style.display = (selectedCategory === 'impossible') ? 'block' : 'none';

    if (devilDebt > 0) {
        isSpinning = true; spinBtn.disabled = true;
        const wheelResultBlock = document.getElementById('wheelResultBlock');
        const wheelTempName = document.getElementById('wheelTempName');
        wheelResultBlock.style.display = 'block'; spinBtn.style.marginTop = '160px';
        let count = 0;
        const interval = setInterval(() => {
            wheelTempName.textContent = "ОТРАБОТКА ДОЛГА...";
            wheelTempName.style.color = '#ff0000'; wheelTempName.style.textShadow = '0 0 20px #ff0000';
            count++;
            if (count > 20) {
                clearInterval(interval);
                wheelResultBlock.style.display = 'none'; spinBtn.style.marginTop = '0px'; spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
                isSpinning = false; devilDebt--;
                showMessage('ДОЛГ ОТРАБОТАН!', `Осталось сыграть: ${devilDebt} уровней.`, 'fa-fire', '#ff9900');
                if (devilDebt <= 0) showMessage('ДОЛГ ПОЛНОСТЬЮ ОТРАБОТАН!', 'Дьявол отпустил тебя.', 'fa-shield', '#51cf66');
                saveGame();
            }
        }, 100);
        return;
    }

    const pool = filterDemons(selectedCategory);
    if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));

    if (currentDemon) {
        showResult(currentDemon);
        spinBtn.disabled = true;
        spinBtn.innerHTML = window.gameOver ? 'ИГРА ОКОНЧЕНА' : 'Сначала сохрани прогресс!';
    } else {
        spinBtn.disabled = window.gameOver || false;
        spinBtn.innerHTML = window.gameOver ? 'ИГРА ОКОНЧЕНА' : 'Крутить <i class="fa-solid fa-arrow-right"></i>';
    }

    if (historyVal !== null && gs.historyNameText) {
        historyName.textContent = gs.historyNameText; historyProgress.textContent = historyVal + '%'; historyBlock.style.display = 'block';
    }
}

// ==========================================
// МОДАЛКИ
// ==========================================
modalCancelBtn.addEventListener('click', () => { customModal.classList.remove('show'); });
modalOkBtn.addEventListener('click', () => customModal.classList.remove('show'));
document.addEventListener('click', (e) => {
    if (e.target.closest('#chaosOkBtn')) {
        const chaosModal = document.getElementById('chaosModal');
        if (chaosModal) chaosModal.classList.remove('show');
    }
});

// ==========================================
// КАТЕГОРИИ
// ==========================================
catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        
        if (btn.id === 'ninjaBtn') { e.preventDefault(); e.stopPropagation(); unlockAchievement('sec_invisible', 'Ниндзя', 'Секретная кнопка в меню', 'fa-user-ninja'); btn.style.display = 'none'; return; }

        selectedCategory = btn.dataset.cat;
        isChaosMode = (selectedCategory === 'chaos');

        skipsLeft = 5; undosLeft = 2; currentTarget = 1; personalBest = 0; currentDemon = null; consecutiveSkips = 0; historyVal = null; isPoisoned = false; isProtected = false; isFrozen = false;
        window.gameOver = false; devilDebt = 0;

        window.isBlind = false; window.isReverse = false; window.isDoubleSpin = false; window.isOneChance = false;
        window.isRedZone = false; window.isFakeSave = false; window.stillCount = 0; targetExact = null;

        updateUI();
        title.textContent = `Категория: ${btn.textContent}`;
         menuScreen.classList.remove('active'); gameScreen.classList.add('active'); backToMenuBtn.style.display = 'block';
        
        // СБРОС КНОПКИ
        spinBtn.style.transform = 'none'; 
        spinBtn.style.position = 'relative'; 
        spinBtn.style.marginTop = '0px';
        spinBtn.disabled = false; 
        spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';

        const impRules = document.getElementById('impossibleRules');
        if (impRules) impRules.style.display = (selectedCategory === 'impossible') ? 'block' : 'none';

        menuScreen.classList.remove('active'); gameScreen.classList.add('active'); backToMenuBtn.style.display = 'block';
        resultBlock.classList.remove('show'); historyBlock.style.display = 'none';
        spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';

        const pool = filterDemons(selectedCategory);
        if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));

        stopChaosSound(); saveGame(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

backToMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showConfirm("Выйти?", "Прогресс, скипы и рекорды будут сброшены.", () => {
        stopChaosSound(); gameScreen.classList.remove('active'); menuScreen.classList.add('active'); backToMenuBtn.style.display = 'none';
        personalBest = 0; currentTarget = 1; skipsLeft = 5; undosLeft = 2; currentDemon = null; historyVal = null; consecutiveSkips = 0; isPoisoned = false; isProtected = false; isFrozen = false;
        window.gameOver = false; devilDebt = 0;

        historyBlock.style.display = 'none'; resultBlock.classList.remove('show'); if (undoBtn) undoBtn.style.display = 'none';

        window.lastChaosEffect = null; window.lastChaosColor = null; window.currentChaosEffect = null; window.currentChaosColor = null;
        const chaosHistoryBlock = document.getElementById('chaosHistoryBlock'); if (chaosHistoryBlock) chaosHistoryBlock.style.display = 'none';

        window.isBlind = false; window.isReverse = false; window.isDoubleSpin = false; window.isOneChance = false;
        window.isRedZone = false; window.isFakeSave = false; window.stillCount = 0; window.forceCategory = null;
        window.isCopyDisabled = false; window.noSkip = false; window.waitForCode = false; targetExact = null;

        localStorage.removeItem('abyssSpinSave'); updateUI(); drawWheel([]);
    });
});

// ==========================================
// ОТРИСОВКА
// ==========================================
function drawWheel(list) {
    if (list.length === 0) { wheel.style.background = 'rgba(17, 22, 44, 0.5)'; wheel.querySelectorAll('.wheel-label').forEach(el => el.remove()); return; }
    const sectorAngle = 360 / list.length;
    wheel.style.background = `conic-gradient(${list.map((_, i) => `${colors[i % colors.length]} ${i * sectorAngle}deg ${(i + 1) * sectorAngle}deg`).join(', ')})`;
    wheel.querySelectorAll('.wheel-label').forEach(el => el.remove());
    const isMobile = window.innerWidth <= 768;
    list.forEach((d, i) => {
        const angle = i * sectorAngle + sectorAngle / 2; const rad = (angle - 90) * (Math.PI / 180);
        const radiusPercent = 35; const x = 50 + Math.cos(rad) * radiusPercent; const y = 50 + Math.sin(rad) * radiusPercent;
        const el = document.createElement('div'); el.className = 'wheel-label';
        let shortName = d.Name; const maxLen = isMobile ? 8 : 12; if (shortName.length > maxLen) shortName = shortName.substring(0, maxLen - 2) + '...';
        el.textContent = shortName; el.title = d.Name; el.style.left = `${x}%`; el.style.top = `${y}%`; el.style.position = 'absolute';
        el.style.transform = `translate(-50%, -50%)`; el.style.color = '#fff'; el.style.fontWeight = 'bold'; el.style.textShadow = '0 2px 4px rgba(0,0,0,1)';
        el.style.textAlign = 'center'; el.style.maxWidth = isMobile ? '40px' : '60px'; el.style.whiteSpace = 'normal'; el.style.wordBreak = 'break-word'; el.style.lineHeight = '1.1';
        if (isMobile) { el.style.fontSize = '8px'; } else { el.style.fontSize = '10px'; }
        wheel.appendChild(el);
    });
}

function showResult(demon) {
    // 1. ИМЯ (с учетом скрытия)
    if (window.hideDemonName) { 
        resName.textContent = "???"; 
    } else { 
        resName.textContent = demon.Name; 
    }
    
    // 2. АВТОР И ID
    resCreator.textContent = demon.Creator; 
    resId.textContent = demon.ID;

    // 3. ТИР
    if (window.hideDemonName) {
        resTier.textContent = `Tier: ???`; 
        resTier.style.color = '#9b59b6'; 
        resTier.style.borderColor = '#9b59b6'; 
        resTier.style.boxShadow = '0 0 15px rgba(155, 89, 182, 0.3)';
    } else if (Number(demon.Tier) === 99) {
        resTier.textContent = `Tier: IMPOSSIBLE`; 
        resTier.style.color = '#ff0000'; 
        resTier.style.borderColor = '#ff0000'; 
        resTier.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.3)';
    } else {
        resTier.textContent = `Tier: ${Number(demon.Tier).toFixed(2)}`; 
        resTier.style.color = ''; 
        resTier.style.borderColor = ''; 
        resTier.style.boxShadow = '';
    }

    // 4. ТОП
    const resTop = document.getElementById('resTop'); 
    const demonTop = demon.Top || demon.top;
    
    if (window.hideDemonName) { 
        resTop.style.display = 'inline-block'; 
        resTop.textContent = `Топ #???`; 
        resTop.style.color = '#9b59b6'; 
    } else if (demonTop) { 
        resTop.style.display = 'inline-block'; 
        resTop.textContent = `Топ #${demonTop}`; 
        resTop.style.color = '#ffd700'; 
    } else { 
        resTop.style.display = 'none'; 
    }

    // 5. КНОПКА ОТМЕНЫ
    if (undoBtn) {
        undoBtn.style.display = 'block';
        if (undosLeft <= 0) { 
            undoBtn.style.backgroundColor = 'rgba(255,255,255,0.1)'; 
            undoBtn.style.color = 'rgba(255,255,255,0.3)'; 
            undoBtn.style.borderColor = 'transparent'; 
            undoBtn.style.cursor = 'not-allowed'; 
        } else { 
            undoBtn.style.backgroundColor = 'transparent'; 
            undoBtn.style.color = '#ffa500'; 
            undoBtn.style.borderColor = '#ffa500'; 
            undoBtn.style.cursor = 'pointer'; 
        }
    }

    // 6. ЦЕЛЬ
    progressInput.value = currentTarget; 
    if (goalLabel) goalLabel.textContent = `Пройти минимум: ${currentTarget}%`;
    
    // 7. ВТОРОЙ ДЕМОН (двойной спин)
    if (secondDemon) {
        showSecondDemon(secondDemon);
    } else {
        hideSecondDemon();
    }

    // 8. СБРОС ФЛАГА СКРЫТИЯ (чтобы следующий демон был нормальным)
    window.hideDemonName = false;
    
    // 9. ПОКАЗ БЛОКА
    resultBlock.classList.add('show');
}

// ==========================================
// КОПИРОВАНИЕ
// ==========================================
const copyIdBtn = document.getElementById('copyIdBtn');
if (copyIdBtn && resId) {
    copyIdBtn.addEventListener('click', () => {
        if (window.isCopyDisabled) return showMessage('Буфер сломан!', 'Кнопка деактивирована!', 'fa-bug', '#ff6b6b');
        navigator.clipboard.writeText(resId.textContent).then(() => {
            const originalHTML = copyIdBtn.innerHTML;
            copyIdBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; copyIdBtn.classList.add('copied');
            setTimeout(() => { copyIdBtn.innerHTML = originalHTML; copyIdBtn.classList.remove('copied'); }, 2000);
        }).catch(err => console.error(err));
    });
}

// ==========================================
// СПИН
// ==========================================

    spinBtn.addEventListener('click', () => {
    // ЖЕСТКИЙ ЦЕНТР ДЛЯ ТЕЛЕФОНА
    if (window.innerWidth <= 768) {
        const wheelContainer = document.querySelector('.wheel-container');
        if (wheelContainer) {
            wheelContainer.style.marginLeft = 'auto';
            wheelContainer.style.marginRight = 'auto';
            wheelContainer.style.transform = 'none'; // Убираем сдвиг влево
        }
        
        spinBtn.style.marginTop = '70px'; // Отодвигаем кнопку от колеса
        spinBtn.style.marginBottom = '20px';
        spinBtn.style.transform = 'none'; // Убираем сдвиги кнопки
    }
    // СБРОС УБЕГАЮЩЕЙ КНОПКИ (чтобы она вернулась на место)
   spinBtn.style.transform = 'none'; 
    spinBtn.style.position = 'relative'; 
spinBtn.style.marginTop = window.innerWidth <= 768 ? '40px' : '0px';

  
    // ... дальше твой код (if (window.runawayBtn) ...)
      if (window.runawayBtn > 0) {
        window.runawayBtn--; // Уменьшаем счетчик
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        spinBtn.style.transform = `translate(${x}px, ${y}px)`;
        spinBtn.style.position = 'relative';
        return showMessage('УБЕГАЮЩАЯ КНОПКА!', `Попробуй нажать на неё еще раз! Осталось попыток: <b>${window.runawayBtn}</b>`, 'fa-person-running', '#9b59b6');
    }
    if (window.slowSpin) {
        window.slowSpin = false;
        spinBtn.disabled = true;
        spinBtn.innerHTML = 'Загрузка... <i class="fa-solid fa-spinner fa-spin"></i>';
        setTimeout(() => { spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>'; spinBtn.click(); }, 5000);
        return;
    }
    if (window.gameOver) return showMessage('Игра окончена!', 'Ты проиграл. Выйди в меню и начни заново.', 'fa-skull', '#ff0000');
    if (currentDemon) return showMessage('Стоп!', 'Сохрани результат!', 'fa-hand', '#ff6b6b');
    if (isSpinning || demons.length === 0) return;

    if (window.isRedZone) {
        window.redZoneLevelsLeft--;
        if (window.redZoneLevelsLeft <= 0) {
            window.isRedZone = false; window.redZoneLevelsLeft = 0;
            showMessage('Красная зона пройдена!', 'Ты пережил 3 уровня!', 'fa-shield', '#51cf66');
        } else {
            showMessage('КРАСНАЯ ЗОНА!', `Осталось <b>${window.redZoneLevelsLeft}</b> уровней без скипа!`, 'fa-triangle-exclamation', '#fcc419');
        }
    }

    if (window.stillCount > 0) window.stillCount--;
        // ЖЕСТКИЙ СБРОС СТИЛЕЙ ДЛЯ ТЕЛЕФОНА
    const wheelContainer = document.querySelector('.wheel-container');
    if (wheelContainer) {
        wheelContainer.style.transform = 'none'; // Убираем сдвиг колеса
        wheelContainer.style.position = 'relative';
        wheelContainer.style.left = '0'; // Ставим на место
    }
    
    spinBtn.style.marginTop = '30px'; // Отодвигаем кнопку вниз
    spinBtn.style.marginLeft = '0';   // Убираем сдвиг влево
    spinBtn.style.transform = 'none'; // Убираем все сдвиги
    isSpinning = true; spinBtn.disabled = true;
    resultBlock.classList.remove('show');
    const wheelResultBlock = document.getElementById('wheelResultBlock');
    const wheelTempName = document.getElementById('wheelTempName');
    wheelResultBlock.style.display = 'block'; spinBtn.style.marginTop = '60px';

    let totalSpins = parseInt(localStorage.getItem('totalSpins')) || 0; totalSpins++; localStorage.setItem('totalSpins', totalSpins);
    updateAchProgress('spin_10', totalSpins, 10, 'Азартный', 'Крутить 10 раз', 'fa-dice-d20');

    if (window.isCopyDisabled) {
        window.isCopyDisabled = false;
        if (copyIdBtn) { copyIdBtn.style.opacity = '1'; copyIdBtn.style.cursor = 'pointer'; copyIdBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }
    }

    let currentPoolCategory = selectedCategory;
    if (window.forceCategory) { currentPoolCategory = window.forceCategory; window.forceCategory = null; }
    let pool = filterDemons(currentPoolCategory);

    if (pool.length < 8) {
        isSpinning = false; spinBtn.disabled = false; wheelResultBlock.style.display = 'none';
        return showMessage('Ошибка', `Мало демонов в категории ${currentPoolCategory}!`, 'fa-triangle-exclamation', '#ff6b6b');
    }

     const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
    const randomIndex = Math.floor(Math.random() * 8); currentDemon = picked[randomIndex];

    // ЦАРЬ ЗВОНИТ (Подмена на GRIEF)
    if (window.isTsarCalling) {
        window.isTsarCalling = false; // Сбрасываем флаг
        // Ищем GRIEF в базе демонов
        let griefDemon = demons.find(d => d.Name.toLowerCase() === 'grief');
        if (griefDemon) {
            currentDemon = griefDemon;
            // Добавляем GRIEF в picked, чтобы колесо его показало
            picked[randomIndex] = griefDemon;
        } else {
            // Если GRIEF нет в базе, берем самого сложного из списка
            currentDemon = picked.sort((a, b) => b.Tier - a.Tier)[0];
            picked[randomIndex] = currentDemon;
        }
        showMessage('ЦАРЬ ЗВОНИТ!', 'Царь-батюшка приказал играть <b>GRIEF</b>!', 'fa-phone', '#ffd700');
    }

    if (window.isDoubleSpin) {
        window.isDoubleSpin = false;
        secondDemon = picked[(randomIndex + 1) % 8];
    }

    currentRotation = 0; wheel.style.transition = 'none'; wheel.style.transform = 'rotate(0deg)'; drawWheel(picked);

    if (window.isBlind) { wheel.querySelectorAll('.wheel-label').forEach(el => el.style.opacity = '0'); window.isBlind = false; }

    soundWheel.currentTime = 0; soundWheel.volume = 0.4; soundWheel.play().catch(e => { });

    let flickerInterval = setInterval(() => {
        if (isChaosMode) {
            const chaosTexts = ["ХАОС...", "ТЬМА...", "ПРОКЛЯТИЕ...", "БОГИ ГНЕВ...", "СМЕРТЬ...", "УЖАС..."];
            wheelTempName.textContent = chaosTexts[Math.floor(Math.random() * chaosTexts.length)];
            wheelTempName.style.color = '#9b59b6'; wheelTempName.style.textShadow = '0 0 20px #9b59b6';
        } else {
            let randomDemon = picked[Math.floor(Math.random() * picked.length)]; wheelTempName.textContent = randomDemon.Name;
        }
    }, 100);

    const sectorAngle = 360 / 8; const sectorCenter = randomIndex * sectorAngle + (sectorAngle / 2);
    let targetDegrees = 1800 + (360 - sectorCenter);
    if (window.isReverse) { targetDegrees = -targetDegrees; window.isReverse = false; }
    if (targetDegrees < 1800 && targetDegrees > 0) targetDegrees += 360;
    currentRotation = targetDegrees;

    setTimeout(() => { wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'; wheel.style.transform = `rotate(${targetDegrees}deg)`; }, 50);

    setTimeout(() => {
        clearInterval(flickerInterval);
        wheelTempName.textContent = currentDemon.Name; wheelTempName.style.color = '#ffd700'; wheelTempName.style.textShadow = '0 0 20px #ffd700';
        if (isChaosMode) applyChaosModifier();

        saveGame();

        setTimeout(() => {
            spinBtn.style.marginTop = '0px'; wheelResultBlock.style.display = 'none';
            wheelTempName.style.color = '#00d4ff'; wheelTempName.style.textShadow = '0 0 15px rgba(0, 212, 255, 0.5)';
            showResult(currentDemon); isSpinning = false; spinBtn.innerHTML = 'Сначала сохрани прогресс!';
        }, 2000);
    }, 4200);
});


saveBtn.addEventListener('click', () => {
    // 1. ФЕЙК
    if (window.isFakeSave) {
        window.isFakeSave = false;
        return showMessage('ОБМАНКА!', 'Кнопка исчезла! Попробуй еще раз.', 'fa-ghost', '#9b59b6');
    }

    // 2. ЗАВИСАНИЕ (5 секунд)
    if (window.freezeSave) {
        window.freezeSave = false;
        saveBtn.disabled = true;
        saveBtn.innerHTML = 'Зависло...';
        setTimeout(() => { saveBtn.disabled = false; saveBtn.innerHTML = 'Сохранить'; }, 5000);
        return showMessage('ЗАВИСАНИЕ!', 'Кнопка не работает 5 секунд...', 'fa-hourglass-half', '#00d4ff');
    }

    previousState = { demon: currentDemon, target: currentTarget, best: personalBest, historyVal: historyVal };
    const val = parseInt(progressInput.value);

    if (val === 777) { progressInput.value = ''; return showMessage("СЕКРЕТ ОТКРЫТ!", "Мексиканский картель выехал!", 'fa-unlock-keyhole', '#ffd700'); }

    if (isNaN(val) || val < 0 || val > 100) return showMessage('Ошибка ввода', 'Введи процент от 0 до 100!', 'fa-circle-exclamation', '#ff6b6b');

    if (targetExact !== null && val !== targetExact) return showMessage('ТОЧНОСТЬ!', `Нужно пройти ровно ${targetExact}%!`, 'fa-bullseye', '#fcc419');
    else targetExact = null;

    if (window.isRedZone && val < currentTarget) {
        window.isRedZone = false; window.redZoneLevelsLeft = 0; window.gameOver = true;
        skipsLeft = 5; currentTarget = 1; personalBest = 0; currentDemon = null; historyVal = null; isPoisoned = false; isProtected = false; isFrozen = false;
        spinBtn.disabled = true; spinBtn.innerHTML = 'ИГРА ОКОНЧЕНА';
        updateUI(); resultBlock.classList.remove('show'); drawWheel([]); localStorage.removeItem('abyssSpinSave');
        return showMessage('ВЫ ПРОИГРАЛИ!', 'Красная зона активирована!', 'fa-skull', '#ff0000');
    } else if (window.isRedZone) window.isRedZone = false;

    if (window.isOneChance && val < currentTarget) {
        window.isOneChance = false; window.gameOver = true;
        skipsLeft = 0; spinBtn.disabled = true; spinBtn.innerHTML = 'ИГРА ОКОНЧЕНА';
        resultBlock.classList.remove('show'); updateUI(); localStorage.removeItem('abyssSpinSave');
        return showMessage('ВЫ ПРОИГРАЛИ!', 'Один шанс использован.', 'fa-heart-crack', '#ff0000');
    } else if (window.isOneChance) window.isOneChance = false;

    if (targetExact === null && val < currentTarget) {
        return showMessage('Цель не достигнута', `Нужно минимум <b>${currentTarget}%</b>.`, 'fa-heart-crack', '#ff6b6b');
    }

    if (secondDemon && !secondDemonSaved) {
        firstDemonSaved = true;
        showMessage('ПЕРВЫЙ ПРОЙДЕН!', 'Теперь пройди второго демона!', 'fa-clone', '#9b59b6');
        return;
    }

    if (val >= currentTarget + 10 && targetExact === null && !window.isRedZone && !window.isOneChance) {
        modalTitle.textContent = "Ошибся с процентами?";
        modalText.innerHTML = `Ты ввел <b>${val}%</b>, но цель была <b>${currentTarget}%</b>.<br>Хочешь отменить?`;
        modalIcon.innerHTML = '<i class="fa-solid fa-rotate-left"></i>'; modalIcon.style.color = '#ffa500';
        modalActions.style.display = 'flex'; modalOkAction.style.display = 'none';
        modalCancelBtn.textContent = "Нет, все верно"; modalConfirmBtn.textContent = "Да, отменить";
        customModal.classList.add('show');

        modalConfirmBtn.onclick = () => {
            customModal.classList.remove('show');
            if (undosLeft > 0) {
                undosLeft--; currentTarget = previousState.target; personalBest = previousState.best; historyVal = previousState.historyVal; currentDemon = previousState.demon;
                updateUI(); saveGame(); showMessage('Отменено!', 'Прогресс откачен.', 'fa-rotate-left', '#ffa500');
            } else showMessage('Нет отмен!', 'Ты потратил все отмены.', 'fa-ban', '#ff6b6b');
        };
        modalCancelBtn.onclick = () => { customModal.classList.remove('show'); saveActualProgress(val); };
        return;
    }

    saveActualProgress(val);
});
function saveActualProgress(val) {
    const demonName = currentDemon.Name; historyVal = val; currentDemon = null; consecutiveSkips = 0; isPoisoned = false; updateSkipButton();
    if (devilDebt > 0) {
        devilDebt--;
        if (devilDebt === 0) {
            showMessage('ДОЛГ ОТРАБОТАН!', 'Ты расплатился с дьяволом! Скипы снова доступны.', 'fa-shield', '#51cf66');
        } else {
            showMessage('ДОЛГ УМЕНЬШИЛСЯ!', `Осталось сыграть <b>${devilDebt}</b> уровней.`, 'fa-fire', '#ff9900');
        }
    }
    if (val > personalBest) personalBest = val;
    if (window.stillCount > 0) { window.stillCount--; }
    else if (isFrozen) { isFrozen = false; }
    else { currentTarget = personalBest + 1; if (currentTarget > 100) currentTarget = 100; }

    updateUI();
    if (historyName) historyName.textContent = demonName; if (historyProgress) historyProgress.textContent = val + '%'; if (historyBlock) historyBlock.style.display = 'block';
    resultBlock.classList.remove('show'); if (undoBtn) undoBtn.style.display = 'none'; stopChaosSound(); saveGame();

    if (val >= 100) {
        soundWin.play().catch(e => { }); let wins = parseInt(localStorage.getItem('totalWins')) || 0; wins++; localStorage.setItem('totalWins', wins);
        unlockAchievement('win_100', 'Победитель', 'Пройти на 100%', 'fa-trophy');
        winModal.classList.add('show'); localStorage.removeItem('abyssSpinSave');
        return;
    }
    spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// СКИП
// ==========================================
skipBtn.addEventListener('click', () => {
    if (!currentDemon) return showMessage('Сначала крути!', 'Скип доступен после спина.', 'fa-circle-info', '#00d4ff');

    if (isPoisoned) {
        return showMessage('ЯД!', 'Скип заблокирован. Сначала сыграй уровень!', 'fa-skull-crossbones', '#ff0000');
    }
    if (devilDebt > 0) {
        return showMessage('ДОЛГ ДЬЯВОЛУ!', `Ты должен сыграть <b>${devilDebt}</b> уровней, чтобы скипать снова! Скип заблокирован!`, 'fa-fire', '#ff0000');
    }

    if (window.isRedZone) {
        let canSkip = (skipsLeft > 0) || isProtected;
        if (canSkip) {
            window.isRedZone = false; window.redZoneLevelsLeft = 0; window.gameOver = true;
            skipsLeft = 5; currentTarget = 1; personalBest = 0; currentDemon = null; historyVal = null; isPoisoned = false; isProtected = false; isFrozen = false;
            spinBtn.disabled = true; spinBtn.innerHTML = 'ИГРА ОКОНЧЕНА';
            updateUI(); resultBlock.classList.remove('show'); drawWheel([]); localStorage.removeItem('abyssSpinSave');
            return showMessage('ВЫ ПРОИГРАЛИ!', 'Ты нарушил Красную зону и скипнул уровень!', 'fa-skull', '#ff0000');
        } else {
            return showMessage('НЕТ СКИПОВ!', 'У тебя 0 скипов. Красная зона не сработала, но скипнуть не получится.', 'fa-ban', '#6c63ff');
        }
    }

    if (window.noSkip) return showMessage('МАМОНТ!', 'Скипы заблокированы!', 'fa-ban', '#ff0000');
    if (window.stillCount > 0) { window.stillCount--; skipsLeft = Math.max(0, skipsLeft - 1); updateUI(); saveGame(); return showMessage('ШТИЛЬ', 'Цель не повысилась, скип потрачен.', 'fa-water', '#00d4ff'); }

    let isFreeSkip = false;
    if (isProtected) { isProtected = false; isFreeSkip = true; updateSkipButton(); }
    if (skipsLeft <= 0 && !isFreeSkip) return showMessage('Скипы закончились!', 'Придется играть!', 'fa-ban', '#6c63ff');

    if (!isFreeSkip) skipsLeft--; consecutiveSkips++;
    if (!isFrozen) currentTarget = Math.min(100, currentTarget + 1); else isFrozen = false;

    let totalSkips = parseInt(localStorage.getItem('totalSkips')) || 0; totalSkips++; localStorage.setItem('totalSkips', totalSkips);
    updateUI(); resultBlock.classList.remove('show'); currentDemon = null; historyVal = null; stopChaosSound(); saveGame();

    spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// ОТМЕНА
// ==========================================
if (undoBtn) {
    undoBtn.addEventListener('click', () => {
        if (undosLeft <= 0 || !previousState) return;
        undosLeft--; currentTarget = previousState.target; personalBest = previousState.best; historyVal = previousState.historyVal; currentDemon = previousState.demon;
        undoBtn.style.display = 'none'; resultBlock.classList.remove('show'); spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
        updateUI(); window.scrollTo({ top: 0, behavior: 'smooth' }); saveGame();
    });
}

// ==========================================
// ПОБЕДА
// ==========================================
winOkBtn.addEventListener('click', () => {
    winModal.classList.remove('show'); gameScreen.classList.remove('active'); menuScreen.classList.add('active'); backToMenuBtn.style.display = 'none';
    personalBest = 0; currentTarget = 1; skipsLeft = 5; currentDemon = null; historyVal = null; historyBlock.style.display = 'none';
    localStorage.removeItem('abyssSpinSave'); spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
});

document.addEventListener('DOMContentLoaded', () => {
    const statSpins = document.getElementById('statSpins'); const statWins = document.getElementById('statWins'); const statSkips = document.getElementById('statSkips');
    if (statSpins) statSpins.textContent = parseInt(localStorage.getItem('totalSpins')) || 0;
    if (statWins) statWins.textContent = parseInt(localStorage.getItem('totalWins')) || 0;
    if (statSkips) statSkips.textContent = parseInt(localStorage.getItem('totalSkips')) || 0;
});

// ==========================================
// ВЫБОР ЭФФЕКТА
// ==========================================
function applyChaosModifier() {
    const chaosModal = document.getElementById('chaosModal');
    const chaosText = document.getElementById('chaosText');
    const chaosIcon = document.getElementById('chaosIcon');

    stopChaosSound();

    lastSpinCount++;
    let availableMods = [];
    
    if (currentTarget >= 100) {
        availableMods = chaosModifiers.filter(mod => !mod.text.includes('ТОЧНОСТЬ'));
    } else {
        availableMods = chaosModifiers;
    }

    let weightedMods = [];
    availableMods.forEach(mod => {
        let weight = 1;
        if (effectWeights[mod.text]) {
            let spinsSinceUsed = lastSpinCount - effectWeights[mod.text];
            if (spinsSinceUsed < 10) weight = Math.max(0.1, spinsSinceUsed / 10);
        }
        let count = Math.ceil(weight * 10);
        for (let i = 0; i < count; i++) weightedMods.push(mod);
    });

    const randomMod = weightedMods[Math.floor(Math.random() * weightedMods.length)];
    effectWeights[randomMod.text] = lastSpinCount;
    randomMod.action();

    if (window.isCopyDisabled && copyIdBtn) {
        copyIdBtn.style.opacity = '0.3'; copyIdBtn.style.cursor = 'not-allowed'; copyIdBtn.innerHTML = '<i class="fa-solid fa-bug"></i>';
    }

    currentTarget = chaosClampTarget(currentTarget);
    personalBest = Math.max(0, Math.min(100, personalBest));
    skipsLeft = chaosClampSkips(skipsLeft);
    updateUI();

    if (chaosModal && chaosText && chaosIcon) {
        chaosText.textContent = randomMod.text;
        chaosText.style.color = randomMod.color;
        chaosIcon.innerHTML = `<i class="fa-solid ${randomMod.icon}"></i>`;
        chaosIcon.style.color = randomMod.color;
        chaosIcon.style.filter = `drop-shadow(0 0 20px ${randomMod.color})`;
        chaosModal.classList.add('show');
    }

    if (goalLabel) goalLabel.textContent = `Пройти минимум: ${currentTarget}%`;
    if (progressInput && currentDemon) progressInput.value = currentTarget;

    const historyBlock = document.getElementById('chaosHistoryBlock');
    const prevText = document.getElementById('prevEffectText');
    const currText = document.getElementById('currEffectText');

    if (historyBlock && prevText && currText) {
        historyBlock.style.display = 'block';
        if (window.currentChaosEffect) {
            prevText.textContent = window.currentChaosEffect;
            prevText.style.color = window.currentChaosColor || '#9b59b6';
            window.lastChaosEffect = window.currentChaosEffect;
            window.lastChaosColor = window.currentChaosColor;
        } else {
            prevText.textContent = "—";
        }
        currText.textContent = randomMod.text;
        currText.style.color = randomMod.color;
        window.currentChaosEffect = randomMod.text;
        window.currentChaosColor = randomMod.color;
    }
}

function showDevilDeal(type) {
    modalTitle.textContent = "СДЕЛКА С ДЬЯВОЛОМ!";
    modalIcon.innerHTML = '<i class="fa-solid fa-fire-flame-curved"></i>'; modalIcon.style.color = '#ff0000';
    modalActions.style.display = 'flex'; modalOkAction.style.display = 'none';
    modalCancelBtn.textContent = "Отказаться"; modalConfirmBtn.style.background = 'linear-gradient(90deg, #ff0000, #ff6b6b)';

    let acceptAction = null; let offerText = "";

    if (type === 1) {
        offerText = "Дьявол предлагает <b>+3 скипа</b>, но заберет <b>+10% к цели</b>. Согласен?";
        modalConfirmBtn.textContent = "Взять скипы";
        acceptAction = () => { skipsLeft += 3; currentTarget = Math.min(100, currentTarget + 10); };
    } else if (type === 2) {
        offerText = "Дьявол предлагает <b>+5% к рекорду</b>, но заберет <b>-2 скипа</b>. Согласен?";
        modalConfirmBtn.textContent = "Взять рекорд";
        acceptAction = () => { personalBest = Math.min(100, personalBest + 5); currentTarget = Math.min(100, personalBest + 1); skipsLeft = Math.max(0, skipsLeft - 2); };
    } else if (type === 3) {
        offerText = "Дьявол снизит тебе цель на <b>-5%</b>, но заберет <b>-1 скип</b>. Согласен?";
        modalConfirmBtn.textContent = "Взять облегчение";
        acceptAction = () => { currentTarget = Math.max(1, currentTarget - 5); personalBest = Math.max(0, personalBest - 5); skipsLeft = Math.max(0, skipsLeft - 1); };
    } else if (type === 4) {
        offerText = "Дьявол даст <b>+2 скипа и +5% к цели</b>, но сбросит рекорд. Согласен?";
        modalConfirmBtn.textContent = "Взять риск";
        acceptAction = () => { skipsLeft += 2; currentTarget = Math.min(100, currentTarget + 5); personalBest = 0; };
    } else if (type === 5) {
        offerText = "Играть <b>ТОЛЬКО ИМПОСИБЛОВ</b>, но цель -20%? (Долг: 3 уровня нельзя скипать!)";
        modalConfirmBtn.textContent = "Принять Импосибл";
        acceptAction = () => { window.forceCategory = 'impossible'; currentTarget = Math.max(1, currentTarget - 20); personalBest = Math.max(0, personalBest - 20); skipsLeft += 3; devilDebt = 3; };
    } else if (type === 6) {
        offerText = "Играть <b>ТОЛЬКО ИЗИ</b>, но цель +15%? (Долг: 2 уровня нельзя скипать!)";
        modalConfirmBtn.textContent = "Взять Изи";
        acceptAction = () => { window.forceCategory = 'easy'; currentTarget = Math.min(100, currentTarget + 15); skipsLeft += 2; devilDebt = 2; };
    } else if (type === 7) {
        offerText = "Играть <b>ТОП-10</b>, но +10 скипов? (Долг: 5 уровней нельзя скипать!)";
        modalConfirmBtn.textContent = "Взять Топ-10";
        acceptAction = () => { window.forceCategory = 'top10'; skipsLeft += 10; devilDebt = 5; };
    } else if (type === 8) {
        offerText = "Играть <b>ЭКСТРИМ</b>, но дать Ангела? (Долг: 2 уровня нельзя скипать!)";
        modalConfirmBtn.textContent = "Взять Экстрим";
        acceptAction = () => { window.forceCategory = 'extreme'; isProtected = true; devilDebt = 2; };
    } else if (type === 9) {
        offerText = "Играть <b>ХАРД</b>, но -2 скипа? (Долг: 1 уровень нельзя скипать!)";
        modalConfirmBtn.textContent = "Взять Хард";
        acceptAction = () => { window.forceCategory = 'hard'; skipsLeft = Math.max(0, skipsLeft - 2); devilDebt = 1; };
    }

    modalText.innerHTML = offerText; customModal.classList.add('show');

    modalConfirmBtn.onclick = () => {
        customModal.classList.remove('show'); if (acceptAction) acceptAction();
        updateUI(); saveGame(); showMessage('Сделка заключена!', 'Ты принял предложение дьявола.', 'fa-fire', '#ff0000');
    };

    modalCancelBtn.onclick = () => { customModal.classList.remove('show'); showMessage('Ты отказался!', 'Дьявол ушел ни с чем.', 'fa-shield', '#51cf66'); };
}

// CSS для тряски
if (!document.getElementById('chaosAnimationStyle')) {
    const style = document.createElement('style'); style.id = 'chaosAnimationStyle';
    style.textContent = `@keyframes chaosShake { 0% { transform: translate(0, 0); } 20% { transform: translate(-5px, 3px); } 40% { transform: translate(5px, -3px); } 60% { transform: translate(-3px, -5px); } 80% { transform: translate(3px, 5px); } 100% { transform: translate(0, 0); } }`;
    document.head.appendChild(style);
}

// ==========================================
// ЛОГИКА ДВОЙНОГО СПИНА
// ==========================================
let secondDemon = null;
let firstDemonSaved = false;
let secondDemonSaved = false;

function showSecondDemon(demon) {
    const block = document.getElementById('secondDemonBlock');
    if (!block) return;
    document.getElementById('resName2').textContent = demon.Name;
    document.getElementById('resCreator2').textContent = demon.Creator;
    document.getElementById('resId2').textContent = demon.ID;
    document.getElementById('goalLabel2').textContent = currentTarget;
    const tier = document.getElementById('resTier2');
    if (Number(demon.Tier) === 99) { tier.textContent = 'Tier: IMPOSSIBLE'; tier.style.color = '#ff0000'; tier.style.borderColor = '#ff0000'; }
    else { tier.textContent = `Tier: ${Number(demon.Tier).toFixed(2)}`; tier.style.color = '#9b59b6'; tier.style.borderColor = '#9b59b6'; }
    block.style.display = 'block';
}

function hideSecondDemon() {
    const block = document.getElementById('secondDemonBlock');
    if (block) block.style.display = 'none';
    secondDemon = null;
    firstDemonSaved = false;
    secondDemonSaved = false;
}

const saveSecondBtn = document.getElementById('saveSecondBtn');
if (saveSecondBtn) {
    saveSecondBtn.addEventListener('click', () => {
        const val = parseInt(document.getElementById('progressInput2').value);
        if (isNaN(val) || val < 0 || val > 100) return showMessage('Ошибка', 'Введи процент от 0 до 100!', 'fa-circle-exclamation', '#ff6b6b');
        if (val < currentTarget) return showMessage('Цель не достигнута', `Нужно минимум <b>${currentTarget}%</b>.`, 'fa-heart-crack', '#ff6b6b');

        secondDemonSaved = true;
        if (firstDemonSaved) {
            hideSecondDemon();
            saveActualProgress(val);
            showMessage('ДВОЙНОЙ СПИН ЗАВЕРШЕН!', 'Ты прошел обоих демонов!', 'fa-trophy', '#ffd700');
        } else {
            document.getElementById('secondDemonBlock').style.display = 'none';
            showMessage('ВТОРОЙ ПРОЙДЕН!', 'Теперь пройди первого демона!', 'fa-clone', '#9b59b6');
        }
    });
}
