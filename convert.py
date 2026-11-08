import csv
import json

demons = []

with open('GDDL.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row.get('Level Name', '').strip()
        creator = row.get('Creator', '').strip()
        level_id = row.get('ID', '').strip()
        tier = row.get('Tier', '').strip()

        if not name or not level_id or not tier:
            continue

        try:
            demons.append({
                'Name': name,
                'Creator': creator,
                'ID': int(float(level_id)),
                'Tier': float(tier),
            })
        except ValueError:
            continue

with open('demons.json', 'w', encoding='utf-8') as f:
    json.dump(demons, f, ensure_ascii=False, indent=2)

print(f'Готово: {len(demons)} демонов записано в demons.json')