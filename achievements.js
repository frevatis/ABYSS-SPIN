const achievementsData = [
    // ==========================================
    // ЛЕГКИЕ (Всё, что делается в 1 клик)
    // ==========================================
    { cat: "Легкие", class: "cat-easy", id: 'welcome', title: "Добро пожаловать", desc: "Зайти на сайт", icon: "fa-door-open" },
    { cat: "Легкие", class: "cat-easy", id: 'visit_top', title: "Исследователь", desc: "Зайти в Топ", icon: "fa-list" },
    { cat: "Легкие", class: "cat-easy", id: 'visit_how', title: "Читатель", desc: "Зайти в Как играть", icon: "fa-book" },
    { cat: "Легкие", class: "cat-easy", id: 'visit_privacy', title: "Юрист", desc: "Прочитать политику", icon: "fa-shield" },
    { cat: "Легкие", class: "cat-easy", id: 'visit_terms', title: "Согласен", desc: "Прочитать условия", icon: "fa-file-contract" },
    { cat: "Легкие", class: "cat-easy", id: 'easy_start', title: "Новичок", desc: "Выбрать Easy", icon: "fa-leaf" },
    { cat: "Легкие", class: "cat-easy", id: 'med_start', title: "Середняк", desc: "Выбрать Medium", icon: "fa-shield-halved" },
    { cat: "Легкие", class: "cat-easy", id: 'hard_start', title: "Крепкий орешек", desc: "Выбрать Hard", icon: "fa-fire" },
    { cat: "Легкие", class: "cat-easy", id: 'insane_start', title: "Безумец", desc: "Выбрать Insane", icon: "fa-brain" },
    { cat: "Легкие", class: "cat-easy", id: 'extreme_start', title: "Экстремал", desc: "Выбрать Extreme", icon: "fa-skull" },
    { cat: "Легкие", class: "cat-easy", id: 'hardextreme_start', title: "Врата Ада", desc: "Выбрать Сложные Экстримы", icon: "fa-fire-flame-curved" },
    { cat: "Легкие", class: "cat-easy", id: 'total_spins_1', title: "Первый спин", desc: "Крутить колесо", icon: "fa-dice" },
    { cat: "Легкие", class: "cat-easy", id: 'first_save', title: "Сохранил!", desc: "Сохранить прогресс", icon: "fa-floppy-disk" },
    { cat: "Легкие", class: "cat-easy", id: 'error_input', title: "Ошибка", desc: "Ввести неправильный %", icon: "fa-triangle-exclamation" },
    { cat: "Легкие", class: "cat-easy", id: 'exit_1', title: "Я передумал", desc: "Отменить выход", icon: "fa-arrow-left" },
    { cat: "Легкие", class: "cat-easy", id: 'easter_777', title: "Секретный код", desc: "Ввести 777", icon: "fa-key" },
    { cat: "Легкие", class: "cat-easy", id: 'goal_fail', title: "Не дотянул", desc: "Сохранить ниже цели", icon: "fa-face-sad-tear" },
    { cat: "Легкие", class: "cat-easy", id: 'lucky_7', title: "Счастливчик", desc: "Выбить Tier 7", icon: "fa-clover" },

    // ==========================================
    // СРЕДНИЕ (Небольшой гринд, до 30 раз)
    // ==========================================
    { cat: "Средние", class: "cat-medium", id: 'spin_10', title: "Азартный", desc: "Крутить 10 раз", icon: "fa-dice-d20" },
    { cat: "Средние", class: "cat-medium", id: 'spin_30', title: "Затянуло", desc: "Крутить 30 раз", icon: "fa-dice-d6" },
    { cat: "Средние", class: "cat-medium", id: 'save_10', title: "Трудяга", desc: "Сохранить 10 раз", icon: "fa-briefcase" },
    { cat: "Средние", class: "cat-medium", id: 'save_30', title: "Архивариус", desc: "Сохранить 30 раз", icon: "fa-box-archive" },
    { cat: "Средние", class: "cat-medium", id: 'skip_5', title: "Первый пропуск", desc: "Использовать 5 скипов", icon: "fa-forward" },
    { cat: "Средние", class: "cat-medium", id: 'prog_10', title: "10 процентов", desc: "Пройти на 10% (любая)", icon: "fa-chart-line" },
    { cat: "Средние", class: "cat-medium", id: 'prog_15', title: "15 процентов", desc: "Пройти на 15% (любая)", icon: "fa-chart-simple" },
    { cat: "Средние", class: "cat-medium", id: 'goal_15', title: "Терпение", desc: "Достичь цели 15%", icon: "fa-hourglass-half" },
    { cat: "Средние", class: "cat-medium", id: 'tier_10', title: "Десятка", desc: "Выбить Tier 10", icon: "fa-hashtag" },
    { cat: "Средние", class: "cat-medium", id: 'win_easy', title: "Легкая победа", desc: "Пройти 100% на Easy", icon: "fa-check" },

    // ==========================================
    // ТЯЖЕЛЫЕ (Гринд и средние проценты)
    // ==========================================
    { cat: "Тяжелые", class: "cat-hard", id: 'spin_50', title: "Лудоман", desc: "Крутить 50 раз", icon: "fa-dice-five" },
    { cat: "Тяжелые", class: "cat-hard", id: 'save_50', title: "Писарь", desc: "Сохранить 50 раз", icon: "fa-pen-nib" },
    { cat: "Тяжелые", class: "cat-hard", id: 'skip_15', title: "Не хочу", desc: "Использовать 15 скипов", icon: "fa-forward-step" },
    { cat: "Тяжелые", class: "cat-hard", id: 'prog_25', title: "Четверть пути", desc: "Пройти на 25% (любая)", icon: "fa-chart-pie" },
    { cat: "Тяжелые", class: "cat-hard", id: 'prog_33', title: "Треть", desc: "Пройти на 33% (любая)", icon: "fa-chart-simple" },
    { cat: "Тяжелые", class: "cat-hard", id: 'prog_50', title: "Половина", desc: "Пройти на 50% (любая)", icon: "fa-chart-bar" },
    { cat: "Тяжелые", class: "cat-hard", id: 'goal_50', title: "Половина пути", desc: "Достичь цели 50%", icon: "fa-mountain" },
    { cat: "Тяжелые", class: "cat-hard", id: 'tier_20', title: "Двадцатка", desc: "Выбить Tier 20", icon: "fa-hashtag" },
    { cat: "Тяжелые", class: "cat-hard", id: 'tier_30', title: "Тридцатка", desc: "Выбить Tier 30", icon: "fa-hashtag" },
    { cat: "Тяжелые", class: "cat-hard", id: 'no_skips', title: "Без скипов", desc: "Потратить все скипы", icon: "fa-ban" },
    { cat: "Тяжелые", class: "cat-hard", id: 'skip_50', title: "Феррари", desc: "Скипнуть цель 50%+", icon: "fa-car" },
    { cat: "Тяжелые", class: "cat-hard", id: 'win_medium', title: "Средняя победа", desc: "Пройти 100% на Medium", icon: "fa-shield" },
    { cat: "Тяжелые", class: "cat-hard", id: 'prog_66', title: "Две трети", desc: "Пройти на 66% (любая)", icon: "fa-chart-column" },
    { cat: "Тяжелые", class: "cat-hard", id: 'prog_75', title: "На финишной", desc: "Пройти на 75% (любая)", icon: "fa-flag-checkered" },
    // ==========================================
    // ОЧЕНЬ СЛОЖНЫЕ (Высокие проценты и почти финал)
    // ==========================================
    { cat: "Очень сложные", class: "cat-veryhard", id: 'spin_100', title: "Колесо Сансары", desc: "Крутить 100 раз", icon: "fa-circle-notch" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'save_100', title: "Машина", desc: "Сохранить 100 раз", icon: "fa-robot" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'skip_30', title: "Скип-машина", desc: "Использовать 30 скипов", icon: "fa-person-running" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'skip_50', title: "Скип-мастер", desc: "Использовать 50 скипов", icon: "fa-person-running" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'exit_5', title: "Трус", desc: "Отменить выход 100 раз", icon: "fa-person-running" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'win_100', title: "Победитель", desc: "Пройти на 100% (любая)", icon: "fa-trophy" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'win_hard', title: "Тяжелая победа", desc: "Пройти 100% на Hard", icon: "fa-medal" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'prog_90', title: "Девяносто", desc: "Пройти на 90% (любая)", icon: "fa-flag" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'prog_99', title: "Так близко", desc: "Пройти на 99% (любая)", icon: "fa-heart-crack" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'goal_90', title: "Почти у цели", desc: "Достичь цели 90%", icon: "fa-flag" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'goal_100', title: "Финальный рывок", desc: "Достичь цели 100%", icon: "fa-medal" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'tier_40', title: "Сороковка", desc: "Выбить Tier 40", icon: "fa-hashtag" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'skip_90', title: "Почти дошел", desc: "Скипнуть цель 90%+", icon: "fa-person-falling" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'perfect_goal', title: "Идеально", desc: "Пройти ровно по цели", icon: "fa-bullseye" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'overkill', title: "Оверкилл", desc: "Пройти на 10% больше", icon: "fa-explosion" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'win_insane', title: "Безумная победа", desc: "Пройти 100% на Insane", icon: "fa-trophy" },
    { cat: "Очень сложные", class: "cat-veryhard", id: 'win_hardextreme', title: "Убийца Богов", desc: "Пройти 100% на Сложных", icon: "fa-crown" },

    // ==========================================
    // IMPOSSIBLE (Хардкор и СЕКРЕТНАЯ ЗОЛОТАЯ)
    // ==========================================
    { cat: "Impossible", class: "cat-impossible", id: 'skip_100', title: "Сдохни, колесо", desc: "Использовать 100 скипов", icon: "fa-skull" },

    { cat: "Impossible", class: "cat-impossible", id: 'hardcore_50', title: "Хардкорщик", desc: "Цель 50% на Экстриме", icon: "fa-skull" },
    { cat: "Impossible", class: "cat-impossible", id: 'hardcore_100', title: "Бессмертный", desc: "Пройти 100% на Extreme", icon: "fa-dragon" },
    
          // --- СЕКРЕТЫ (15 ПАСХАЛОК) ---
    { cat: "Секреты", class: "cat-secret", id: 'sec_konami', title: "Ретро-геймер", desc: "Вверх, вверх... а дальше как в 90-х", icon: "fa-gamepad", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_cube', title: "Кубик Рубика", desc: "Грань, которую скрывает фон", icon: "fa-cube", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_invisible', title: "Ниндзя", desc: "Невидимка прячется у края", icon: "fa-user-ninja", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_scream', title: "Орущий", desc: "Громко и с Shift", icon: "fa-volume-high", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_spin', title: "Турбо-колесо", desc: "Крути так, будто от этого зависит жизнь", icon: "fa-gauge-high", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_console', title: "Хакер", desc: "Там, где обитают разработчики", icon: "fa-terminal", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_logo', title: "Кликер", desc: "Десять раз по главному символу", icon: "fa-computer-mouse", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_tg', title: "Спамер", desc: "Напиши трижды тому, кто ждет", icon: "fa-paper-plane", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_highlight', title: "Копирайтер", desc: "Найди слово, которое двигает прогресс", icon: "fa-highlighter", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_roblox', title: "Не та игра", desc: "Набери то, во что играют в 2010-х", icon: "fa-gamepad", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_time', title: "Полуночник", desc: "Когда мир спит, а ты играешь", icon: "fa-clock", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_title', title: "Разведчик", desc: "Сбеги, но вернись", icon: "fa-window-maximize", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_double', title: "Двойной клик", desc: "Дважды по имени нашему", icon: "fa-hand-pointer", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_drag', title: "Перетаскиватель", desc: "Сдвинь то, что не должно двигаться", icon: "fa-arrows-up-down-left-right", isSecret: true },
    { cat: "Секреты", class: "cat-secret", id: 'sec_scroll', title: "Скроллер", desc: "Дойди до самого дна бездны", icon: "fa-arrow-down", isSecret: true },
    
    // СЕКРЕТНАЯ ЗОЛОТАЯ АЧИВКА
    { cat: "Финальная", class: "cat-gold", id: 'all_achievements', title: "Завершение", desc: "Выполнить ВСЕ задания", icon: "fa-star" },
];



// --- ЛОГИКА ОТРИСОВКИ И ПРОВЕРКИ ---
const listContainer = document.getElementById('achievementsList');
const countEl = document.getElementById('achCount');

let unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
let progressData = JSON.parse(localStorage.getItem('achProgress')) || {};


// ПРОВЕРКА НА ЗОЛОТУЮ АЧИВКУ
const totalRegularAchievements = achievementsData.filter(a => a.id !== 'all_achievements').length;

if (unlocked.length >= totalRegularAchievements && !unlocked.includes('all_achievements')) {
    unlocked.push('all_achievements');
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
    
    // Показ всплывашки (если есть очередь)
    if (typeof processAchQueue !== 'undefined') {
        achQueue.push({ title: "Завершение", desc: "Выполнить ВСЕ задания", icon: "fa-star" });
        if (!isAchShowing) processAchQueue();
    }

    // ПРИНУДИТЕЛЬНЫЙ ПОКАЗ ОКНА
    setTimeout(() => {
        const winModal = document.getElementById('finalWinModal');
        if (winModal) {
            winModal.classList.add('show');
        }
    }, 1500); // Ждем 1.5 сек, чтобы выехала первая плашка
}

if (listContainer) {
    let changed = false;
    for (const id in progressData) {
        const ach = achievementsData.find(a => a.id === id);
        if (ach) {
            let max = 0;
            const match = ach.desc.match(/\d+/);
            const isWinAch = ach.desc.includes("100% на") || ach.id.includes('win_') || ach.id.includes('hardcore_100');
            
            if (match && !isWinAch) {
                if (ach.desc.includes("Крутить") || ach.desc.includes("Сохранить") || ach.desc.includes("Пройти") || ach.desc.includes("Достичь цели") || ach.desc.includes("Использовать") || ach.desc.includes("Отменить")) {
                    max = parseInt(match[0]);
                }
            }
            if (max > 0 && progressData[id] >= max && !unlocked.includes(id)) {
                unlocked.push(id);
                delete progressData[id];
                changed = true;
            }
        }
    }

    if (changed) {
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
        localStorage.setItem('achProgress', JSON.stringify(progressData));
    }

    if (countEl) countEl.textContent = unlocked.length;

  const categories = ["Легкие", "Средние", "Тяжелые", "Очень сложные", "Impossible", "Секреты","Финальная"];

    categories.forEach(catName => {
        const catAchs = achievementsData.filter(a => a.cat === catName);
        if (catAchs.length === 0) return;

        // Для золотой категории делаем особый стиль
        const catClass = catName === "Impossible" ? "cat-impossible" : catAchs[0].class;

         const title = document.createElement('h2');
        title.className = `ach-category-title ${catClass}`;
        title.textContent = catName === "gold" ? "Особое достижение" : catName;
        listContainer.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'ach-category-grid';

        catAchs.forEach(ach => {
            let isAchUnlocked = unlocked.includes(ach.id);
            let currentProgress = progressData[ach.id] || 0;
            let maxProgress = 0;
            
            const numberMatch = ach.desc.match(/\d+/);
            const isWinAch = ach.desc.includes("100% на") || ach.id.includes('win_') || ach.id.includes('hardcore_100');

            if (numberMatch && !isWinAch) {
                if (ach.desc.includes("Крутить") || ach.desc.includes("Сохранить") || ach.desc.includes("Пройти") || ach.desc.includes("Достичь цели") || ach.desc.includes("Использовать") || ach.desc.includes("Отменить")) {
                    maxProgress = parseInt(numberMatch[0]);
                }
            }

            if (!isAchUnlocked && maxProgress > 0 && currentProgress >= maxProgress) {
                isAchUnlocked = true;
            }

            let progressBar = '';
            if (!isAchUnlocked && maxProgress > 0) {
                let percent = Math.min((currentProgress / maxProgress) * 100, 100);
                progressBar = `
                    <div class="ach-progress-bar">
                        <div class="ach-progress-fill" style="width: ${percent}%;"></div>
                    </div>
                    <small style="color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 4px; display: block;">${currentProgress} / ${maxProgress}</small>
                `;
            }

            const card = document.createElement('div');
            // Если это золотая ачивка, добавляем класс
            const isGold = ach.id === 'all_achievements';
            card.className = `ach-card ${isAchUnlocked ? 'unlocked' : 'locked'} ${isGold ? 'ach-gold' : catClass}`;

            card.innerHTML = `
                <div class="ach-icon">
                    <i class="fa-solid ${ach.icon}"></i>
                </div>
                <div class="ach-info" style="width: 100%;">
                    <h3>${ach.title}</h3>
                    <p>${ach.desc}</p>
                    ${progressBar}
                </div>
            `;
            grid.appendChild(card);
        });

        listContainer.appendChild(grid);
    });
}
// ЛОГИКА ОКНА СБРОСА
const openResetBtn = document.getElementById('openResetModal');
const resetConfirmModal = document.getElementById('resetConfirmModal');
const cancelResetBtn = document.getElementById('cancelResetBtn');
const confirmResetBtn = document.getElementById('confirmResetBtn');

if (openResetBtn && resetConfirmModal) {
    // Открываем окно при клике на "Сбросить"
    openResetBtn.addEventListener('click', () => {
        resetConfirmModal.classList.add('show');
    });

    // Закрываем при клике на "Отмена"
    cancelResetBtn.addEventListener('click', () => {
        resetConfirmModal.classList.remove('show');
    });

    // Очищаем всё при клике на "Да, сбросить"
    confirmResetBtn.addEventListener('click', () => {
        localStorage.removeItem('unlockedAchievements');
        localStorage.removeItem('achProgress');
        localStorage.removeItem('totalSpins');
        localStorage.removeItem('saveCount');
        localStorage.removeItem('totalSkips');
        localStorage.removeItem('exitCount');
        localStorage.removeItem('abyssSpinSave');
        location.reload(); // Перезагружаем страницу
    });
}
// ==========================================
// ЛОГИКА СОРТИРОВКИ И ФИЛЬТРАЦИИ
// ==========================================

let currentSort = 'default';
let difficultyAsc = false;
let currentType = 'all'; // Выбранный тип ачивок

// Обработка кнопок сортировки
document.querySelectorAll('.sort-btn[data-sort]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const clickedSort = e.target.dataset.sort;
        
        if (clickedSort === 'difficulty' && currentSort === 'difficulty') {
            difficultyAsc = !difficultyAsc;
        } else if (clickedSort === 'difficulty') {
            difficultyAsc = false;
        }

        document.querySelectorAll('.sort-btn[data-sort]').forEach(b => {
            b.classList.remove('active');
            b.innerHTML = b.innerHTML.replace(/ ↓| ↑/g, '');
        });
        e.target.classList.add('active');
        currentSort = clickedSort;

        if (currentSort === 'difficulty') {
            e.target.innerHTML = `По сложности ${difficultyAsc ? '↑' : '↓'}`;
        }

        redraw();
    });
});

// Открытие/закрытие выпадающего списка "По типу"
const typeFilterBtn = document.getElementById('typeFilterBtn');
const typeDropdown = document.getElementById('typeDropdown');

typeFilterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    typeDropdown.classList.toggle('show');
    document.querySelectorAll('.sort-btn[data-sort]').forEach(b => b.classList.remove('active'));
    typeFilterBtn.classList.add('active');
});

// Выбор типа в выпадающем списке
document.querySelectorAll('.type-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
        document.querySelectorAll('.type-option').forEach(o => o.classList.remove('active'));
        e.target.classList.add('active');
        
        currentType = e.target.dataset.type;
        currentSort = 'type'; // Переключаем режим на "по типу"
        
        typeDropdown.classList.remove('show');
        typeFilterBtn.innerHTML = `${e.target.textContent} <i class="fa-solid fa-chevron-down"></i>`;
        
        redraw();
    });
});

// Закрываем список при клике мимо
document.addEventListener('click', () => {
    typeDropdown.classList.remove('show');
});

// ФУНКЦИЯ ПРОВЕРКИ ТИПА АЧИВКИ
function getAchievementType(ach) {
    if (ach.isSecret || ach.id.includes('sec_') || ach.id.includes('easter')) return 'secret';
    if (ach.id.includes('easy_start') || ach.id.includes('med_start') || ach.id.includes('hard_start') || ach.id.includes('insane_start') || ach.id.includes('extreme_start')) return 'category';
    
    if (ach.desc.includes('Крутить')) return 'spin';
    if (ach.desc.includes('Сохранить')) return 'save';
    if (ach.desc.includes('Скип') || ach.desc.includes('пропуск')) return 'skip';
    
    if (ach.desc.includes('Пройти') || ach.desc.includes('%')) return 'percent';
    
    return 'site';
}

function redraw() {
    document.getElementById('achievementsList').innerHTML = '';
    drawAchievements();
}

function drawAchievements() {
    const listContainer = document.getElementById('achievementsList');
    let displayData = [...achievementsData]; 

    // 1. ФИЛЬТРАЦИЯ ПО ТИПУ
    if (currentType !== 'all') {
        displayData = displayData.filter(ach => getAchievementType(ach) === currentType);
    }

    // 2. СОРТИРОВКА
    if (currentSort === 'difficulty') {
        const diffs = ["Легкие", "Средние", "Тяжелые", "Очень сложные", "Impossible", "Секреты", "gold"];
        displayData.sort((a, b) => {
            const indexA = diffs.indexOf(a.cat);
            const indexB = diffs.indexOf(b.cat);
            if (difficultyAsc) return indexA - indexB;
            else return indexB - indexA;
        });
    } 
    else if (currentSort === 'status') {
        displayData.sort((a, b) => {
            const aOpen = unlocked.includes(a.id) ? 0 : 1;
            const bOpen = unlocked.includes(b.id) ? 0 : 1;
            return aOpen - bOpen;
        });
    }

    // Если ничего не найдено после фильтра
    if (displayData.length === 0) {
        listContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 30px;">Нет ачивок такого типа :(</p>';
        return;
    }

    // РИСУЕМ
    const categories = [...new Set(displayData.map(a => a.cat))]; 

    categories.forEach(catName => {
        const catAchs = displayData.filter(a => a.cat === catName);
        const catClass = catAchs[0].class;
        
        const title = document.createElement('h2');
        title.className = `ach-category-title ${catClass}`;
        title.textContent = catName === "gold" ? "Особое достижение" : catName;
        listContainer.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'ach-category-grid';

        catAchs.forEach(ach => {
            // ... (твой код отрисовки карточки из прошлого сообщения, он не меняется)
            let isAchUnlocked = unlocked.includes(ach.id);
            let currentProgress = progressData[ach.id] || 0;
            let maxProgress = 0;
            
            const numberMatch = ach.desc.match(/\d+/);
            const isWinAch = ach.desc.includes("100% на") || ach.id.includes('win_') || ach.id.includes('hardcore_100');

            if (numberMatch && !isWinAch) {
                if (ach.desc.includes("Крутить") || ach.desc.includes("Сохранить") || ach.desc.includes("Пройти") || ach.desc.includes("Достичь цели") || ach.desc.includes("Использовать") || ach.desc.includes("Отменить")) {
                    maxProgress = parseInt(numberMatch[0]);
                }
            }

            if (!isAchUnlocked && maxProgress > 0 && currentProgress >= maxProgress) {
                isAchUnlocked = true;
            }

            let progressBar = '';
            if (!isAchUnlocked && maxProgress > 0) {
                let percent = Math.min((currentProgress / maxProgress) * 100, 100);
                progressBar = `
                    <div class="ach-progress-bar">
                        <div class="ach-progress-fill" style="width: ${percent}%;"></div>
                    </div>
                    <small style="color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 4px; display: block;">${currentProgress} / ${maxProgress}</small>
                `;
            }

            const card = document.createElement('div');
            card.className = `ach-card ${isAchUnlocked ? 'unlocked' : 'locked'} ${catClass}`;
            
            const displayTitle = ach.isSecret && !isAchUnlocked ? "??? (Секрет)" : ach.title;
            const displayDesc = ach.isSecret && !isAchUnlocked ? "Подсказка: " + ach.desc : ach.desc;
            const displayIcon = ach.isSecret && !isAchUnlocked ? "fa-question" : ach.icon;

            card.innerHTML = `
                <div class="ach-icon">
                    <i class="fa-solid ${displayIcon}"></i>
                </div>
                <div class="ach-info" style="width: 100%;">
                    <h3>${displayTitle}</h3>
                    <p>${displayDesc}</p>
                    ${progressBar}
                </div>
            `;
            grid.appendChild(card);
        });

        listContainer.appendChild(grid);
    });
}