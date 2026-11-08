fetch('demons.json')
    .then(res => res.json())
    .then(data => {
        // Сортируем по убыванию тира (от 40 до 1)
        const sortedDemons = data.sort((a, b) => Number(b.Tier) - Number(a.Tier));
        
        // Берём первые 100 (или убери .slice(0, 100), чтобы показать ВСЕ 8500+)
        const topDemons = sortedDemons.slice(0, 100);
        
        const container = document.getElementById('topList');
        
        topDemons.forEach((demon, index) => {
            const item = document.createElement('div');
            item.className = 'top-item';
            
            // Форматируем номер места (1, 2, 3...)
            const place = index + 1;
            
            item.innerHTML = `
                <div class="top-info">
                    <h3>#${place} ${demon.Name}</h3>
                    <p>Автор: ${demon.Creator} | ID: ${demon.ID}</p>
                </div>
                <div class="top-tier">
                    ${Number(demon.Tier).toFixed(1)}
                </div>
            `;
            
            container.appendChild(item);
        });
    })
    .catch(err => console.error('Ошибка загрузки:', err));