import csv
file = r'C:\nodejs\cadviewer-conversion-server-nextgen\content\custom\se.com\updated_code_smell\2026-09-29\open_findings_on_overall_code.csv'
with open(file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['Impact SECURITY'] or row['Sonar Security Category']:
            if 'callapiconversion' not in row['File Name']:
                print(f"{row['File Name']} - {row['Rule Name']} - Line {row['File Line']}")
