let achQueue = [];
let isAchShowing = false;

function unlockAchievement(id, title, desc, icon) {
    let unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
        
        achQueue.push({ id, title, desc, icon });
        if (!isAchShowing) processAchQueue();

        if (id === 'all_achievements') {
            setTimeout(() => {
                const winModal = document.getElementById('finalWinModal');
                if (winModal) winModal.classList.add('show');
            }, 1500);
        }
    }
}

function updateAchProgress(id, current, max, title, desc, icon) {
    let progress = JSON.parse(localStorage.getItem('achProgress')) || {};
    let unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    if (unlocked.includes(id)) return;

    progress[id] = current;
    localStorage.setItem('achProgress', JSON.stringify(progress));
    if (current >= max) unlockAchievement(id, title, desc, icon);
}

function processAchQueue() {
    if (achQueue.length === 0) {
        isAchShowing = false;
        return;
    }
    isAchShowing = true;
    const ach = achQueue.shift();

    // --- ЗВУК АЧИВКИ ---
    const soundAch = new Audio('sounds/achievement-geometry-dash.mp3');
    soundAch.volume = 0.5;
    soundAch.play().catch(e => {});
    // -------------------

    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    
    const isSecret = ach.id && ach.id.startsWith('sec_');
    const titleText = isSecret ? "Секрет найден!" : "Ачивка открыта!";
    const iconColor = isSecret ? "#ffd700" : "#00d4ff";

    popup.innerHTML = `
        <div class="popup-icon" style="color: ${iconColor};"><i class="fa-solid ${ach.icon}"></i></div>
        <div class="popup-text">
            <h4 style="color: ${iconColor};">${titleText}</h4>
            <p><b>${ach.title}</b> — ${ach.desc}</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 100);
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => { popup.remove(); setTimeout(processAchQueue, 500); }, 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    setTimeout(() => unlockAchievement('welcome', 'Добро пожаловать', 'Зайти на сайт', 'fa-door-open'), 1000);

    const path = window.location.pathname;
    if (path.includes('top.html')) unlockAchievement('visit_top', 'Исследователь', 'Зайти в Топ', 'fa-list');
    if (path.includes('how.html')) unlockAchievement('visit_how', 'Читатель', 'Зайти в Как играть', 'fa-book');
    if (path.includes('privacy.html')) unlockAchievement('visit_privacy', 'Юрист', 'Прочитать политику', 'fa-shield');
    if (path.includes('terms.html')) unlockAchievement('visit_terms', 'Согласен', 'Прочитать условия', 'fa-file-contract');

    // 1. Ретро-геймер (ПК: Konami / Телефон: Свайпы)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let swipeSeq = [];
    let touchStartX = 0, touchStartY = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) { unlockAchievement('sec_konami', 'Ретро-геймер', 'Ввести код Konami', 'fa-gamepad'); konamiIndex = 0; }
        } else { konamiIndex = 0; }
    });

    document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; touchStartY = e.changedTouches[0].screenY; }, false);
    document.addEventListener('touchend', e => {
        let dx = e.changedTouches[0].screenX - touchStartX;
        let dy = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy)) { if (dx > 50) swipeSeq.push('R'); else if (dx < -50) swipeSeq.push('L'); } 
        else { if (dy > 50) swipeSeq.push('D'); else if (dy < -50) swipeSeq.push('U'); }
        if (swipeSeq.length > 4) swipeSeq.shift();
        if (swipeSeq.join('') === 'UUDD') { unlockAchievement('sec_konami', 'Ретро-геймер', 'Свайпы Вверх-Вверх-Вниз-Вниз', 'fa-gamepad'); swipeSeq = []; }
    }, false);

    // 2. Кубик Рубика
    const bgCube = document.querySelector('.bg-icons .fa-cube');
    let cubeClicks = 0;
    if (bgCube) {
        bgCube.style.pointerEvents = 'auto'; 
        bgCube.addEventListener('click', () => {
            cubeClicks++;
            if (cubeClicks >= 3) { unlockAchievement('sec_cube', 'Кубик Рубика', 'Клик по кубику на фоне', 'fa-cube'); cubeClicks = 0; }
        });
    }

    // 3. Ниндзя (5 кликов по заголовку категории)
    if (window.location.pathname.includes('roulette.html')) {
        setTimeout(() => {
            const catTitle = document.getElementById('currentCategoryTitle'); 
            if (catTitle) {
                let titleClicks = 0;
                catTitle.style.cursor = 'pointer'; 
                catTitle.title = "Секрет?"; 
                catTitle.addEventListener('click', () => {
                    titleClicks++;
                    setTimeout(() => titleClicks = 0, 2000); 
                    if (titleClicks >= 5) {
                        unlockAchievement('sec_invisible', 'Ниндзя', 'Секретная кнопка в меню', 'fa-user-ninja');
                        titleClicks = 0;
                    }
                });
            }
        }, 500);
    }

    // 4. Орущий (ПК: Shift+X / Телефон: 5 тапов по заголовку)
    let screamCount = 0;
    document.addEventListener('keydown', (e) => {
        if ((e.key.toLowerCase() === 'х' || e.key.toLowerCase() === 'x') && e.shiftKey) {
            screamCount++; if (screamCount >= 5) { unlockAchievement('sec_scream', 'Орущий', 'Введи КРИК', 'fa-volume-high'); screamCount = 0; }
        }
    });
    const mainScreamTitle = document.querySelector('.tt h1') || document.querySelector('.hero-title');
    if (mainScreamTitle) {
        let taps = 0;
        mainScreamTitle.addEventListener('click', () => {
            taps++; setTimeout(() => taps = 0, 1500);
            if (taps >= 5) { unlockAchievement('sec_scream', 'Орущий', '5 быстрых тапов по заголовку', 'fa-volume-high'); taps = 0; }
        });
    }

    // 5. Турбо-колесо
    const wheel = document.getElementById('wheel');
    let wheelClicks = 0;
    if (wheel) {
        wheel.addEventListener('click', () => {
            wheelClicks++;
            if (wheelClicks >= 5) { unlockAchievement('sec_spin', 'Турбо-колесо', 'Колесо 5 раз', 'fa-gauge-high'); wheelClicks = 0; }
        });
    }

    // 6. Хакер
    console.log("%cСТОП! Введи unlockSecret()", "color: #ff6b6b; font-size: 20px;");
    window.unlockSecret = () => unlockAchievement('sec_console', 'Хакер', 'Ввести unlockSecret() в консоли', 'fa-terminal');

    setTimeout(() => {
        const saveBtn = document.getElementById('saveBtn');
        const progInput = document.getElementById('progressInput');
        if (saveBtn && progInput) {
            saveBtn.addEventListener('click', () => {
                if (progInput.value.trim().toLowerCase() === 'hack') {
                    unlockAchievement('sec_console', 'Хакер', 'Ввести hack в поле', 'fa-terminal');
                    progInput.value = ''; 
                }
            });
        }
    }, 500);

    // 7. Кликер
    const logo = document.querySelector('.img img') || document.querySelector('.mobile-logo img');
    let logoClicks = 0;
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault(); logoClicks++;
            if (logoClicks >= 10) {
                unlockAchievement('sec_logo', 'Кликер', 'Секрет в лого', 'fa-computer-mouse');
                logo.style.transform = 'rotate(360deg)'; setTimeout(() => logo.style.transform = 'rotate(0deg)', 500);
                logoClicks = 0;
            }
        });
    }

    // 8. Спамер
    const tgCard = document.querySelector('.tg-card');
    let tgClicks = 0;
    if (tgCard) {
        tgCard.addEventListener('click', (e) => {
            tgClicks++;
            if (tgClicks >= 3) { e.preventDefault(); unlockAchievement('sec_tg', 'Спамер', 'Что-то в связи', 'fa-paper-plane'); tgClicks = 0; }
        });
    }

    // 9. Копирайтер
    const howTitle = document.querySelector('.hero-subtitle') || document.querySelector('.text_h h3');
    if (howTitle && path.includes('how.html')) {
        howTitle.addEventListener('mouseup', () => {
            if (window.getSelection().toString().toLowerCase().includes('цель') || window.getSelection().toString().toLowerCase().includes('прогресс')) {
                unlockAchievement('sec_highlight', 'Копирайтер', "Выдели 'цель'", 'fa-highlighter');
            }
        });
        let touchTimer;
        howTitle.addEventListener('touchstart', () => { touchTimer = setTimeout(() => unlockAchievement('sec_highlight', 'Копирайтер', 'Долгий тап по тексту', 'fa-highlighter'), 800); });
        howTitle.addEventListener('touchend', () => clearTimeout(touchTimer));
        howTitle.addEventListener('touchmove', () => clearTimeout(touchTimer));
    }

    // 10. Не та игра
    let typedKeys = "";
    document.addEventListener('keydown', (e) => {
        typedKeys += e.key.toLowerCase();
        if (typedKeys.endsWith("roblox")) { unlockAchievement('sec_roblox', 'Не та игра', 'Напечатай ROBLOX', 'fa-gamepad'); typedKeys = ""; }
        if (typedKeys.length > 10) typedKeys = typedKeys.slice(-10);
    });
    const progInput2 = document.getElementById('progressInput');
    if (progInput2) {
        progInput2.addEventListener('input', (e) => {
            if (e.target.value.toLowerCase().includes('roblox')) {
                unlockAchievement('sec_roblox', 'Не та игра', 'Ввести ROBLOX в поле', 'fa-gamepad'); e.target.value = '';
            }
        });
    }

    // 11. Полуночник
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlockAchievement('sec_time', 'Полуночник', 'Зайти ночью', 'fa-clock');

    // 12. Разведчик
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { document.title = "Вернись! 😢"; } 
        else { if (document.title === "Вернись! 😢") { unlockAchievement('sec_title', 'Разведчик', 'Свернуть вкладку', 'fa-window-maximize'); document.title = "ABYSS SPIN"; } }
    });

    // 13. Двойной клик
    const mainTitle = document.querySelector('.tt h1') || document.querySelector('.hero-title');
    if (mainTitle && (path.includes('index.html') || path === '/')) {
        mainTitle.addEventListener('dblclick', () => unlockAchievement('sec_double', 'Двойной клик', 'Двойной клик по ABYSS SPIN', 'fa-hand-pointer'));
        let lastTap = 0;
        mainTitle.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) { unlockAchievement('sec_double', 'Двойной клик', 'Двойной тап по заголовку', 'fa-hand-pointer'); e.preventDefault(); }
            lastTap = currentTime;
        });
    }

    // 14. Перетаскиватель
    if (logo) {
        logo.setAttribute('draggable', 'true');
        logo.addEventListener('dragstart', () => unlockAchievement('sec_drag', 'Перетаскиватель', 'Перетащи логотип', 'fa-arrows-up-down-left-right'));
        let startX = 0;
        logo.addEventListener('touchstart', e => startX = e.touches[0].clientX);
        logo.addEventListener('touchend', e => {
            if (Math.abs(e.changedTouches[0].clientX - startX) > 40) unlockAchievement('sec_drag', 'Перетаскиватель', 'Свайп по логотипу', 'fa-arrows-up-down-left-right');
        });
    }

    // 15. Скроллер
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) hasScrolled = true; 
        if (hasScrolled && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
            unlockAchievement('sec_scroll', 'Скроллер', 'Доскроллить до низа', 'fa-arrow-down');
        }
    });
});