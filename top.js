let allDemons = [];
let currentCategory = 'extreme'; // По умолчанию Все Экстримы

// Загрузка
fetch('/demons.json')
    .then(res => res.json())
    .then(data => {
        // Убираем дубликаты
        const uniqueData = [];
        const seenIds = new Set();
        data.forEach(d => {
            const levelId = String(d.id || d.ID || 0);
            if (!seenIds.has(levelId)) {
                seenIds.add(levelId);
                uniqueData.push(d);
            }
        });

        allDemons = uniqueData.map(d => {
            let rawTier = d.tier || d.Tier;
            let isImp = (rawTier === 'imposible' || rawTier === 'impossible' || Number(rawTier) === 99);
            let finalTier = isImp ? 99 : Number(rawTier);
            let finalTop = d.top || d.Top || d.Impossible_Top || null;

            return {
                Name: String(d.name || d.Name || "Unknown"),
                Creator: String(d.creator || d.Creator || "Unknown"),
                ID: String(d.id || d.ID || 0),
                Tier: finalTier,
                Top: finalTop
            };
        });
        
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
    const input = document.getElementById('searchInput');
    const typeInput = document.getElementById('searchType');
    
    const query = input ? input.value.toLowerCase().trim() : '';
    const searchType = typeInput ? typeInput.value : 'all';
    
    // 1. Фильтр
    let filtered = [];
    if (currentCategory === 'extreme') {
        filtered = allDemons.filter(d => {
            const t = Number(d.Tier);
            return t > 20 && t < 99; // Все экстримы
        }).sort((a,b) => b.Tier - a.Tier); // Сортируем по тиру (сложности)
    } else if (currentCategory === 'impossible') {
        filtered = allDemons.filter(d => d.Tier === 99);
    }

    // 2. Поиск
    if (query !== '') {
        filtered = filtered.filter(d => {
            const name = d.Name.toLowerCase();
            const creator = d.Creator.toLowerCase();
            const id = d.ID.toLowerCase();
            const tier = String(d.Tier).toLowerCase();

            if (searchType === 'name') return name.includes(query);
            if (searchType === 'creator') return creator.includes(query);
            if (searchType === 'id') return id.includes(query);
            if (searchType === 'tier') return tier.includes(query);
            return name.includes(query) || creator.includes(query) || id.includes(query);
        });
    }

    // 3. Отрисовка
    const container = document.getElementById('topList');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; width: 100%; padding: 20px;">Ничего не найдено :(</p>';
        return;
    }

    filtered.forEach((demon, index) => {
        const item = document.createElement('div');
        item.className = 'top-item';
        
        const isImp = demon.Tier === 99;
        
        // Тир
        let tierText = isImp ? 'IMPOSSIBLE' : Number(demon.Tier).toFixed(1);
        const tierColor = isImp ? '#ff0000' : '#00d4ff';
        
        // НОМЕР ТОПА: Берем из JSON, а если его нет — ставим индекс в списке
        const place = demon.Top ? `#${demon.Top}` : `#${index + 1}`;

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
