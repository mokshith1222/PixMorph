import os
import re

base_path = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\app\(tools)"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    desc_pattern = re.compile(r"description:\s*(['\"])(.*?)\1", re.DOTALL)
    match = desc_pattern.search(content)
    if not match:
        return

    quote_char = match.group(1)
    desc = match.group(2).replace('\n', ' ').strip()
    original_desc = desc
    
    if len(desc) < 140:
        desc += " Fast, free, and secure browser-based tool. Your files never leave your device."
    
    if len(desc) > 160:
        truncated = desc[:156]
        last_space = truncated.rfind(' ')
        if last_space != -1:
            desc = truncated[:last_space] + "..."
        else:
            desc = truncated + "..."
            
    if len(desc) < 140:
        desc += " Enhance your productivity effortlessly."

    if desc != original_desc:
        new_content = content[:match.start(2)] + desc + content[match.end(2):]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath} (len: {len(desc)})")

for root, dirs, files in os.walk(base_path):
    for file in files:
        if file == 'page.tsx':
            process_file(os.path.join(root, file))
