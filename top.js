let top100Demons = [];

fetch('demons.json')
    .then(res => res.json())
    .then(data => {
        const normalized = data.map(d => ({
            Name: d.name || d.Name,
            Creator: d.creator || d.Creator,
            ID: d.id || d.ID,
            Tier: d.tier || d.Tier,
            Top: d.top || null
        }));

        top100Demons = normalized.filter(d => d.Top !== null);
        top100Demons.sort((a, b) => a.Top - b.Top);
        renderList(top100Demons);
    })
    .catch(err => console.error('Ошибка загрузки:', err));

function renderList(demonsToRender) {
    const container = document.getElementById('topList');
    container.innerHTML = '';

    if (demonsToRender.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center; width: 100%; padding: 20px;">Ничего не найдено :(</p>';
        return;
    }

    demonsToRender.forEach((demon) => {
        const item = document.createElement('div');
        item.className = 'top-item';
        
        const place = demon.Top;
        const tier = Number(demon.Tier).toFixed(1);

        item.innerHTML = `
            <div class="top-info">
                <h3>#${place} ${demon.Name}</h3>
                <p>Автор: ${demon.Creator} | ID: ${demon.ID}</p>
            </div>
            <div class="top-stats">
                <span class="top-rank">#${place}</span>
                <span class="top-tier">${tier}</span>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// ==========================================
// ЛОГИКА ПОИСКА С ВЫБОРОМ ТИПА
// ==========================================
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const type = searchType.value;

    if (query === '') {
        renderList(top100Demons);
        return;
    }

    const filtered = top100Demons.filter(d => {
        if (type === 'all') {
            return d.Name.toLowerCase().includes(query) || 
                   d.Creator.toLowerCase().includes(query) || 
                   String(d.ID).includes(query) ||
                   String(d.Tier).includes(query) ||
                   String(d.Top) === query;
        }
        if (type === 'name') return d.Name.toLowerCase().includes(query);
        if (type === 'creator') return d.Creator.toLowerCase().includes(query);
        if (type === 'id') return String(d.ID).includes(query);
        if (type === 'tier') return String(d.Tier).includes(query);
        if (type === 'top') return String(d.Top) === query;
        return false;
    });

    renderList(filtered);
}

// Слушаем ввод текста и изменение выпадающего списка
searchInput.addEventListener('input', performSearch);
searchType.addEventListener('change', performSearch);
// ==========================================
// КНОПКА "НАВЕРХ"
// ==========================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        // Если прокрутили вниз больше 300px - показываем кнопку
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // При клике плавно скроллим наверх
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}