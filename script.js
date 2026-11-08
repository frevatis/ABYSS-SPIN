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

// --- ЗВУКИ ---
const soundWheel = new Audio('sounds/wheel-of-fortune.mp3');
const soundWin = new Audio('sounds/kids-saying-yay-sound-effect_3.mp3');
// -------------

function saveGame() {
    if (selectedCategory === 'all' && currentTarget === 1 && !currentDemon) return; 
    const gameState = { selectedCategory, skipsLeft, currentTarget, personalBest, currentDemon, historyVal, historyNameText: historyName ? historyName.textContent : null };
    localStorage.setItem('abyssSpinSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('abyssSpinSave');
    if (!saved) return; 
    const gs = JSON.parse(saved);
    selectedCategory = gs.selectedCategory; skipsLeft = gs.skipsLeft; currentTarget = gs.currentTarget; personalBest = gs.personalBest; currentDemon = gs.currentDemon; historyVal = gs.historyVal;

    updateUI(); title.textContent = `Категория: ${selectedCategory}`;
    menuScreen.classList.remove('active'); gameScreen.classList.add('active'); backToMenuBtn.style.display = 'block';

    const pool = filterDemons(selectedCategory);
    if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));
    
    if (currentDemon) { showResult(currentDemon); spinBtn.disabled = true; spinBtn.innerHTML = 'Сначала сохрани прогресс!'; }
    if (historyVal !== null && gs.historyNameText) { historyName.textContent = gs.historyNameText; historyProgress.textContent = historyVal + '%'; historyBlock.style.display = 'block'; }
}

// Элементы
const menuScreen = document.getElementById('menuScreen'); const gameScreen = document.getElementById('gameScreen');
const backToMenuBtn = document.getElementById('backToMenu'); const catBtns = document.querySelectorAll('.cat-btn');
const title = document.getElementById('currentCategoryTitle'); const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn'); const resultBlock = document.getElementById('resultBlock');
const resName = document.getElementById('resName'); const resCreator = document.getElementById('resCreator');
const resId = document.getElementById('resId'); const resTier = document.getElementById('resTier');
const saveBtn = document.getElementById('saveBtn'); const progressInput = document.getElementById('progressInput');
const skipBtn = document.getElementById('skipBtn'); const goalLabel = document.getElementById('goalLabel');
const targetText = document.getElementById('targetText'); const bestText = document.getElementById('bestText');
const skipsText = document.getElementById('skipsText'); const historyBlock = document.getElementById('historyBlock');
const historyName = document.getElementById('historyName'); const historyProgress = document.getElementById('historyProgress');
const customModal = document.getElementById('customModal'); const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText'); const modalIcon = document.getElementById('modalIcon');
const modalActions = document.getElementById('modalActions'); const modalOkAction = document.getElementById('modalOkAction');
const modalCancelBtn = document.getElementById('modalCancelBtn'); const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const modalOkBtn = document.getElementById('modalOkBtn'); const winModal = document.getElementById('winModal');
const winOkBtn = document.getElementById('winOkBtn'); const colors = ['#1a1f3d', '#6c63ff', '#11162c', '#00d4ff'];

fetch('demons.json').then(res => res.json()).then(data => { demons = data; loadGame(); }).catch(err => console.error(err));

function filterDemons(cat) {
    if (cat === 'all') return demons;
    return demons.filter(d => {
        const t = Number(d.Tier);
        if (cat === 'easy') return t >= 1 && t <= 5;
        if (cat === 'medium') return t > 5 && t <= 10;
        if (cat === 'hard') return t > 10 && t <= 15;
        if (cat === 'insane') return t > 15 && t <= 20;
        if (cat === 'extreme') return t > 20;
        if (cat === 'hardextreme') return t >= 27; 
    });
}

function updateUI() {
    if (skipsText) skipsText.textContent = skipsLeft;
    if (bestText) bestText.textContent = personalBest + '%';
    if (targetText) targetText.textContent = currentTarget + '%';
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

modalCancelBtn.addEventListener('click', () => { 
    customModal.classList.remove('show'); 
    unlockAchievement('exit_1', 'Я передумал', 'Отменить выход', 'fa-arrow-left');
    let exitCount = parseInt(localStorage.getItem('exitCount')) || 0; exitCount++; localStorage.setItem('exitCount', exitCount);
    updateAchProgress('exit_5', exitCount, 5, 'Трус', 'Отменить выход 5 раз', 'fa-person-running');
});
modalOkBtn.addEventListener('click', () => customModal.classList.remove('show'));

catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.id === 'ninjaBtn') {
            e.preventDefault(); e.stopPropagation();
            unlockAchievement('sec_invisible', 'Ниндзя', 'Секретная кнопка в меню', 'fa-user-ninja');
            btn.style.display = 'none'; return; 
        }

        selectedCategory = btn.dataset.cat; title.textContent = `Категория: ${btn.textContent}`;
        skipsLeft = 5; currentTarget = 1; personalBest = 0; currentDemon = null; consecutiveSkips = 0; historyVal = null; updateUI();

        if (selectedCategory === 'easy') unlockAchievement('easy_start', 'Новичок', 'Выбрать Easy', 'fa-leaf');
        if (selectedCategory === 'medium') unlockAchievement('med_start', 'Середняк', 'Выбрать Medium', 'fa-shield-halved');
        if (selectedCategory === 'hard') unlockAchievement('hard_start', 'Крепкий орешек', 'Выбрать Hard', 'fa-fire');
        if (selectedCategory === 'insane') unlockAchievement('insane_start', 'Безумец', 'Выбрать Insane', 'fa-brain');
        if (selectedCategory === 'extreme') unlockAchievement('extreme_start', 'Экстремал', 'Выбрать Extreme', 'fa-skull');
        if (selectedCategory === 'hardextreme') unlockAchievement('hardextreme_start', 'Врата Ада', 'Выбрать Сложные', 'fa-fire-flame-curved');

        menuScreen.classList.remove('active'); gameScreen.classList.add('active'); backToMenuBtn.style.display = 'block';
        resultBlock.classList.remove('show'); historyBlock.style.display = 'none'; 
        spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
        
        const pool = filterDemons(selectedCategory);
        if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));
        saveGame(); 
    });
});

backToMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showConfirm("Выйти?", "Прогресс будет сброшен.", () => {
        gameScreen.classList.remove('active'); menuScreen.classList.add('active'); backToMenuBtn.style.display = 'none';
        historyBlock.style.display = 'none'; personalBest = 0; currentTarget = 1; skipsLeft = 5; currentDemon = null; historyVal = null;
        localStorage.removeItem('abyssSpinSave');
    });
});


function drawWheel(list) {
    if (list.length === 0) { 
        wheel.style.background = 'rgba(17, 22, 44, 0.5)'; 
        wheel.querySelectorAll('.wheel-label').forEach(el => el.remove()); 
        return; 
    }
    
    const sectorAngle = 360 / list.length;
    wheel.style.background = `conic-gradient(${list.map((_, i) => `${colors[i % colors.length]} ${i * sectorAngle}deg ${(i + 1) * sectorAngle}deg`).join(', ')})`;
    
    wheel.querySelectorAll('.wheel-label').forEach(el => el.remove());

    const isMobile = window.innerWidth <= 768;

    list.forEach((d, i) => {
        const angle = i * sectorAngle + sectorAngle / 2;
        const rad = (angle - 90) * (Math.PI / 180); 
        
        // Отодвигаем текст от центра
        const radiusPercent = 35; 
        const x = 50 + Math.cos(rad) * radiusPercent;
        const y = 50 + Math.sin(rad) * radiusPercent;

        const el = document.createElement('div');
        el.className = 'wheel-label'; 
        
        // Обрезаем длинные названия
        let shortName = d.Name;
        const maxLen = isMobile ? 8 : 12;
        if (shortName.length > maxLen) shortName = shortName.substring(0, maxLen - 2) + '...';

        el.textContent = shortName; 
        el.title = d.Name;
        
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        
        // ЖЕСТКО ЗАДАЕМ СТИЛИ, ЧТОБЫ ТЕКСТ НЕ ВЫЛЕЗАЛ
        el.style.position = 'absolute';
        el.style.transform = `translate(-50%, -50%)`; // Ровно по центру точки
        el.style.color = '#fff';
        el.style.fontWeight = 'bold';
        el.style.textShadow = '0 2px 4px rgba(0,0,0,1)';
        el.style.textAlign = 'center';
        
        // Ограничиваем ширину, чтобы текст физически не мог вылезти на соседний сектор
        el.style.maxWidth = isMobile ? '40px' : '60px'; 
        el.style.whiteSpace = 'normal'; // Разрешаем перенос на новую строку, если не влезает
        el.style.wordBreak = 'break-word';
        el.style.lineHeight = '1.1';
        
        if (isMobile) { el.style.fontSize = '8px'; } else { el.style.fontSize = '10px'; }
        
        wheel.appendChild(el);
    });
}

function showResult(demon) {
    resName.textContent = demon.Name; resCreator.textContent = demon.Creator; resId.textContent = demon.ID;
    resTier.textContent = `Tier: ${Number(demon.Tier).toFixed(2)}`; progressInput.value = currentTarget;
    if (goalLabel) goalLabel.textContent = `Пройти минимум: ${currentTarget}%`;
    resultBlock.classList.add('show');
}

spinBtn.addEventListener('click', () => {
    if (currentDemon) return showMessage('Стоп!', 'Сохрани результат прошлого демона!', 'fa-hand', '#ff6b6b');
    if (isSpinning || demons.length === 0) return;
    isSpinning = true; spinBtn.disabled = true; resultBlock.classList.remove('show'); 

    // Счетчики
    let totalSpins = parseInt(localStorage.getItem('totalSpins')) || 0; totalSpins++; localStorage.setItem('totalSpins', totalSpins);
    if (totalSpins >= 1) unlockAchievement('total_spins_1', 'Первый спин', 'Крутить колесо', 'fa-dice');
    updateAchProgress('spin_10', totalSpins, 10, 'Азартный', 'Крутить 10 раз', 'fa-dice-d20');
    updateAchProgress('spin_30', totalSpins, 30, 'Затянуло', 'Крутить 30 раз', 'fa-dice-d6');
    updateAchProgress('spin_50', totalSpins, 50, 'Лудоман', 'Крутить 50 раз', 'fa-dice-five');
    updateAchProgress('spin_100', totalSpins, 100, 'Колесо Сансары', 'Крутить 100 раз', 'fa-circle-notch');

    const pool = filterDemons(selectedCategory);
    if (pool.length < 8) { isSpinning = false; spinBtn.disabled = false; return showMessage('Ошибка', 'Мало демонов!', 'fa-triangle-exclamation', '#ff6b6b'); }
    
    const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
    const randomIndex = Math.floor(Math.random() * 8); 
    currentDemon = picked[randomIndex];

    // Рисуем колесо (сбрасываем в 0)
    currentRotation = 0; 
    wheel.style.transition = 'none'; 
    wheel.style.transform = 'rotate(0deg)'; 
    drawWheel(picked);

    // Звук
    soundWheel.currentTime = 0; 
    soundWheel.volume = 0.4;
    soundWheel.play().catch(e => {}); 

    // --- ВОТ ИСПРАВЛЕННАЯ МАТЕМАТИКА ---
    const sectorAngle = 360 / 8;
    // Центр нужного сектора в системе conic-gradient (0 градусов = справа)
    const sectorCenter = randomIndex * sectorAngle + (sectorAngle / 2);
    
    // Стрелка у нас на 12 часах (сверху). В системе conic-gradient это 270 градусов.
    // Нам нужно повернуть колесо так, чтобы центр сектора встал на 270 градусов.
    // Прибавляем 5 полных оборотов (1800), чтобы было красиво.
   // Теперь математика идеальная: так как колесо начинается сверху, 
// нам нужно просто крутить на 360 минус угол сектора.
let targetDegrees = 1800 + (360 - sectorCenter);
    
    // Если вдруг получилось меньше 1800, добавляем 360, чтобы крутить по часовой
    if (targetDegrees < 1800) targetDegrees += 360;

    currentRotation = targetDegrees;

    // Запускаем плавную крутку (БЕЗ телепорта в конце!)
    setTimeout(() => {
        wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        wheel.style.transform = `rotate(${targetDegrees}deg)`;
    }, 50);

    // Показываем карточку (без изменения колеса)
    setTimeout(() => {
        let t = Math.floor(Number(currentDemon.Tier));
        if (t === 7) unlockAchievement('lucky_7', 'Счастливчик', 'Выбить Tier 7', 'fa-clover');
        if (t >= 10) unlockAchievement('tier_10', 'Десятка', 'Выбить Tier 10', 'fa-hashtag');
        if (t >= 20) unlockAchievement('tier_20', 'Двадцатка', 'Выбить Tier 20', 'fa-hashtag');
        if (t >= 30) unlockAchievement('tier_30', 'Тридцатка', 'Выбить Tier 30', 'fa-hashtag');
        if (t >= 40) unlockAchievement('tier_40', 'Сороковка', 'Выбить Tier 40', 'fa-hashtag');
        
        showResult(currentDemon); 
        saveGame(); 
        isSpinning = false; 
        spinBtn.innerHTML = 'Сначала сохрани прогресс!';
    }, 4200);
});

saveBtn.addEventListener('click', () => {
    const val = parseInt(progressInput.value);
    
    if (val === 777) { progressInput.value = ''; unlockAchievement('easter_777', 'Секретный код', 'Ввести код 777', 'fa-key'); return showMessage("СЕКРЕТНЫЙ УРОВЕНЬ ОТКРЫТ!", "Ты нашел пасхалку! 🏆", 'fa-unlock-keyhole', '#ffd700'); }
    if (isNaN(val) || val < 0 || val > 100) { unlockAchievement('error_input', 'Ошибка', 'Ввести неправильный %', 'fa-triangle-exclamation'); return showMessage('Ошибка ввода', 'Введи процент от 0 до 100!', 'fa-circle-exclamation', '#ff6b6b'); }
    if (val < currentTarget) { unlockAchievement('goal_fail', 'Не дотянул', 'Сохранить ниже цели', 'fa-face-sad-tear'); return showMessage('Цель не достигнута', `Нужно минимум <b>${currentTarget}%</b>.`, 'fa-heart-crack', '#ff6b6b'); }

    if (val === currentTarget) unlockAchievement('perfect_goal', 'Идеально', 'Пройти ровно по цели', 'fa-bullseye');
    if (val >= currentTarget + 10) unlockAchievement('overkill', 'Оверкилл', 'Пройти на 10% больше', 'fa-explosion');

    if ((selectedCategory === 'extreme' || selectedCategory === 'hardextreme') && currentTarget >= 50) unlockAchievement('hardcore_50', 'Хардкорщик', 'Цель 50% на Extreme', 'fa-skull');

    let saveCount = parseInt(localStorage.getItem('saveCount')) || 0; saveCount++; localStorage.setItem('saveCount', saveCount);
    unlockAchievement('first_save', 'Сохранил!', 'Сохранить прогресс', 'fa-floppy-disk');
    updateAchProgress('save_10', saveCount, 10, 'Трудяга', 'Сохранить 10 раз', 'fa-briefcase');
    updateAchProgress('save_30', saveCount, 30, 'Архивариус', 'Сохранить 30 раз', 'fa-box-archive');
    updateAchProgress('save_50', saveCount, 50, 'Писарь', 'Сохранить 50 раз', 'fa-pen-nib');
    updateAchProgress('save_100', saveCount, 100, 'Машина', 'Сохранить 100 раз', 'fa-robot');

    if (val >= 10) unlockAchievement('prog_10', '10 процентов', 'Пройти на 10%', 'fa-chart-line');
    if (val >= 15) unlockAchievement('prog_15', '15 процентов', 'Пройти на 15%', 'fa-chart-simple');
    if (val >= 25) unlockAchievement('prog_25', 'Четверть пути', 'Пройти на 25%', 'fa-chart-pie');
    if (val >= 33) unlockAchievement('prog_33', 'Треть', 'Пройти на 33%', 'fa-chart-simple');
    if (val >= 50) unlockAchievement('prog_50', 'Половина', 'Пройти на 50%', 'fa-chart-bar');
    if (val >= 66) unlockAchievement('prog_66', 'Две трети', 'Пройти на 66%', 'fa-chart-column');
    if (val >= 75) unlockAchievement('prog_75', 'На финишной', 'Пройти на 75%', 'fa-flag-checkered');
    if (val >= 90) unlockAchievement('prog_90', 'Девяносто', 'Пройти на 90%', 'fa-flag');
    if (val === 99) unlockAchievement('prog_99', 'Так близко', 'Пройти на 99%', 'fa-heart-crack');

    if (val > personalBest) personalBest = val;
    currentTarget = personalBest + 1; if (currentTarget > 100) currentTarget = 100;

    if (currentTarget >= 15) unlockAchievement('goal_15', 'Терпение', 'Достичь цели 15%', 'fa-hourglass-half');
    if (currentTarget >= 50) unlockAchievement('goal_50', 'Половина пути', 'Достичь цели 50%', 'fa-mountain');
    if (currentTarget >= 90) unlockAchievement('goal_90', 'Почти у цели', 'Достичь цели 90%', 'fa-flag');
    if (currentTarget >= 100) unlockAchievement('goal_100', 'Финальный рывок', 'Достичь цели 100%', 'fa-medal');

    updateUI(); historyVal = val; historyName.textContent = currentDemon.Name; historyProgress.textContent = val + '%'; historyBlock.style.display = 'block';
    resultBlock.classList.remove('show'); drawWheel([]); wheel.style.transition = 'none'; currentRotation = 0; wheel.style.transform = 'rotate(0deg)';

    if (val >= 100) {
        soundWin.currentTime = 0; soundWin.volume = 0.6; soundWin.play().catch(e => {}); 
        unlockAchievement('win_100', 'Победитель', 'Пройти на 100%', 'fa-trophy');
        if (selectedCategory === 'easy') unlockAchievement('win_easy', 'Легкая победа', 'Пройти 100% на Easy', 'fa-check');
        if (selectedCategory === 'medium') unlockAchievement('win_medium', 'Средняя победа', 'Пройти 100% на Medium', 'fa-shield');
        if (selectedCategory === 'hard') unlockAchievement('win_hard', 'Тяжелая победа', 'Пройти 100% на Hard', 'fa-medal');
        if (selectedCategory === 'insane') unlockAchievement('win_insane', 'Безумная победа', 'Пройти 100% на Insane', 'fa-trophy');
        if (selectedCategory === 'hardextreme') unlockAchievement('win_hardextreme', 'Убийца Богов', 'Пройти 100% на Сложных', 'fa-crown');
        if (selectedCategory === 'extreme') unlockAchievement('win_extreme', 'Экстрим-победитель', 'Пройти 100% на Extreme', 'fa-crown');
        if (selectedCategory === 'extreme' || selectedCategory === 'hardextreme') unlockAchievement('hardcore_100', 'Бессмертный', 'Пройти 100% на Extreme', 'fa-dragon');
        winModal.classList.add('show'); localStorage.removeItem('abyssSpinSave'); return;
    }
    
    currentDemon = null; consecutiveSkips = 0; saveGame(); 
    const pool = filterDemons(selectedCategory);
    if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));
    spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>'; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

skipBtn.addEventListener('click', () => {
    if (skipsLeft <= 0) return showMessage('Скипы закончились!', 'Придется играть!', 'fa-ban', '#6c63ff');
    skipsLeft--; consecutiveSkips++;
    
    let totalSkips = parseInt(localStorage.getItem('totalSkips')) || 0; totalSkips++; localStorage.setItem('totalSkips', totalSkips);
    updateAchProgress('skip_5', totalSkips, 5, 'Первый пропуск', 'Использовать 5 скипов', 'fa-forward');
    updateAchProgress('skip_15', totalSkips, 15, 'Не хочу', 'Использовать 15 скипов', 'fa-forward-step');
    updateAchProgress('skip_30', totalSkips, 30, 'Скип-машина', 'Использовать 30 скипов', 'fa-person-running');
    updateAchProgress('skip_50', totalSkips, 50, 'Скип-мастер', 'Использовать 50 скипов', 'fa-person-running');
    updateAchProgress('skip_100', totalSkips, 100, 'Сдохни, колесо', 'Использовать 100 скипов', 'fa-skull');

    if (skipsLeft === 0) unlockAchievement('no_skips', 'Без скипов', 'Потратить все 5 скипов', 'fa-ban');
    if (consecutiveSkips >= 3) unlockAchievement('three_skips_row', 'Рука сама тянется', 'Скипнуть 3 раза подряд', 'fa-hand');
    if (currentTarget >= 50) unlockAchievement('skip_50', 'Феррари', 'Скипнуть цель 50%+', 'fa-car');
    if (currentTarget >= 90) unlockAchievement('skip_90', 'Почти дошел', 'Скипнуть цель 90%+', 'fa-person-falling');

    updateUI(); resultBlock.classList.remove('show'); currentDemon = null; historyVal = null; saveGame(); drawWheel([]);
    wheel.style.transition = 'none'; currentRotation = 0; wheel.style.transform = 'rotate(0deg)';
    
    const pool = filterDemons(selectedCategory);
    if (pool.length >= 8) drawWheel([...pool].sort(() => Math.random() - 0.5).slice(0, 8));
    spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
});

winOkBtn.addEventListener('click', () => {
    winModal.classList.remove('show'); gameScreen.classList.remove('active'); menuScreen.classList.add('active'); backToMenuBtn.style.display = 'none';
    personalBest = 0; currentTarget = 1; skipsLeft = 5; currentDemon = null; historyVal = null; historyBlock.style.display = 'none';
    localStorage.removeItem('abyssSpinSave');
    spinBtn.disabled = false; spinBtn.innerHTML = 'Крутить <i class="fa-solid fa-arrow-right"></i>';
});
