import os

filepath = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\app\page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace missing animation classes with standard ones we just defined in tailwind.config.ts
content = content.replace("animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both", "animate-slide-up")
content = content.replace("animate-in fade-in duration-1000 delay-500 fill-mode-both", "animate-fade-in [animation-delay:500ms]")
content = content.replace("animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-both", "animate-slide-up")
content = content.replace("animate-in slide-in-from-left-8 fade-in duration-1000 fill-mode-both", "animate-slide-up")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed animations in page.tsx")
