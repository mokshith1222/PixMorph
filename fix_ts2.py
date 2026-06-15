import os
import re

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\components\conversion"

for filename in os.listdir(base_dir):
    if filename.endswith(".tsx"):
        filepath = os.path.join(base_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = re.sub(r'new Blob\(\[([a-zA-Z0-9_]+)\],', r'new Blob([\1 as any],', content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                print(f"Fixed {filename}")

print("Done")
