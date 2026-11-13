let allDemons = [];
let currentCategory = 'extreme'; // По умолчанию Экстримы

// Загрузка
fetch('demons.json')
    .then(res => res.json())
    .then(data => {
        allDemons = data.map(d => {
            let rawTier = d.tier || d.Tier;
            let finalTier = (rawTier === 'imposible' || rawTier === 'impossible') ? 99 : Number(rawTier);
            let finalTop = d.top || d.Top || d.Impossible_Top || null;

            return {
                Name: d.name || d.Name,
                Creator: d.creator || d.Creator,
                ID: d.id || d.ID,
                Tier: finalTier,
                Top: finalTop
            };
        });
        
        // ВОТ ТУТ ДЕЛАЕМ КНОПКУ АКТИВНОЙ ПРИ ЗАГРУЗКЕ
        document.querySelectorAll('.filter-cat-btn').forEach(b => b.classList.remove('active'));
        const defaultBtn = document.querySelector(`.filter-cat-btn[data-filter="extreme"]`);
        if (defaultBtn) defaultBtn.classList.add('active');

        renderList();
    });

// Переключение категорий
document.querySelectorAll('.filter-cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.filter;
        renderList();
    });
});

function renderList() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchType = document.getElementById('searchType').value;
    
    // 1. Фильтр по категории
    let filtered = [];
    if (currentCategory === 'top') {
        filtered = allDemons.filter(d => d.Top !== null && d.Top <= 100).sort((a,b) => a.Top - b.Top);
    } else if (currentCategory === 'extreme') {
        filtered = allDemons.filter(d => d.Tier > 20 && d.Tier < 99).sort((a,b) => b.Tier - a.Tier);
    } else if (currentCategory === 'impossible') {
        filtered = allDemons.filter(d => d.Tier === 99);
    }

    // 2. Поиск
    if (query !== '') {
        filtered = filtered.filter(d => {
            if (searchType === 'name') return d.Name.toLowerCase().includes(query);
            if (searchType === 'creator') return d.Creator.toLowerCase().includes(query);
            if (searchType === 'id') return String(d.ID).includes(query);
            if (searchType === 'tier') return String(d.Tier).includes(query);
            if (searchType === 'top') return String(d.Top).includes(query);
            // all
            return d.Name.toLowerCase().includes(query) || d.Creator.toLowerCase().includes(query) || String(d.ID).includes(query);
        });
    }

    // 3. Отрисовка
    const container = document.getElementById('topList');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; width: 100%; padding: 20px;">Ничего не найдено :(</p>';
        return;
    }

    filtered.forEach((demon) => {
        const item = document.createElement('div');
        item.className = 'top-item';
        
        const isImp = demon.Tier === 99;
        const tierText = isImp ? 'IMPOSSIBLE' : demon.Tier.toFixed(1);
        const tierColor = isImp ? '#ff0000' : '#00d4ff';
        
        // Если топа нет, ставим прочерк, иначе #номер
        const place = demon.Top ? `#${demon.Top}` : '-';

        // ВОТ ТУТ МАГИЯ: Топ (#1) теперь стоит ВНУТРИ h3 перед названием!
        item.innerHTML = `
            <div class="top-main-content">
                <div class="top-info">
                    <h3><span class="top-rank-text">${place}</span> ${demon.Name}</h3>
                    <p>Автор: ${demon.Creator} | ID: ${demon.ID}</p>
                </div>
                <div class="top-stats">
                    <span class="top-tier" style="color: ${tierColor}; border-color: ${tierColor};">${tierText}</span>
                </div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Поиск
document.getElementById('searchInput').addEventListener('input', renderList);
document.getElementById('searchType').addEventListener('change', renderList);
