import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\components\conversion"

for filename in os.listdir(base_dir):
    if filename.endswith(".tsx"):
        filepath = os.path.join(base_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "new Blob([data as Uint8Array" in content:
            new_content = content.replace("new Blob([data as Uint8Array", "new Blob([data as any")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                print(f"Fixed {filename}")

print("Done")
