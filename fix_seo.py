import os
import re

workspace_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"
app_tools_dir = os.path.join(workspace_dir, "app", "(tools)")

def fix_h1_tags():
    pass # Already fixed and committed? No, git checkout only restored app/. components are still modified. That's fine.

def extract_title_desc(content):
    title_match = re.search(r"title:\s*['\"](.*?)['\"]", content)
    desc_match = re.search(r"description:\s*(['\"])(.*?)\1", content, re.DOTALL)
    
    title = title_match.group(1) if title_match else ""
    title = title.split(" - ")[0]
    
    desc = desc_match.group(2).replace('\n', ' ').strip() if desc_match else ""
    return title, desc

def update_metadata():
    all_tools = []
    
    for root, dirs, files in os.walk(app_tools_dir):
        if 'page.tsx' in files:
            filepath = os.path.join(root, 'page.tsx')
            tool_name = os.path.basename(root)
            if tool_name == '(tools)':
                continue
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            title, original_desc = extract_title_desc(content)
            all_tools.append({
                'name': title,
                'href': f'/{tool_name}',
                'desc': original_desc[:60] + "..." if len(original_desc) > 60 else original_desc
            })
            
            # Find description
            desc_match = re.search(r"(description:\s*['\"])(.*?)(['\"])(,?)", content, re.DOTALL)
            if desc_match:
                prefix = desc_match.group(1)
                desc = desc_match.group(2).replace('\n', ' ').strip()
                suffix = desc_match.group(3)
                
                if len(desc) < 150:
                    desc += " All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today."
                    if len(desc) > 160:
                        desc = desc[:156] + "..."
                
                if 'alternates:' not in content:
                    # Append alternates right after description
                    replacement = f"{prefix}{desc}{suffix},\n  alternates: {{ canonical: '/{tool_name}' }}"
                    content = content[:desc_match.start()] + replacement + content[desc_match.end():]
                else:
                    replacement = f"{prefix}{desc}{suffix}{desc_match.group(4)}"
                    content = content[:desc_match.start()] + replacement + content[desc_match.end():]
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

    return all_tools

def fix_standard_pages():
    pages = [
        ("app/page.tsx", "/"),
        ("app/contact/page.tsx", "/contact"),
        ("app/privacy/page.tsx", "/privacy"),
        ("app/terms/page.tsx", "/terms"),
        ("app/tools/page.tsx", "/tools"),
    ]
    for page_path, canonical in pages:
        filepath = os.path.join(workspace_dir, page_path)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'export const metadata' in content and 'alternates:' not in content:
                content = re.sub(r"(description:\s*['\"].*?['\"],?)", r"\1\n  alternates: { canonical: '" + canonical + r"' },", content, count=1, flags=re.DOTALL)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Added canonical to {page_path}")

print("Starting SEO fixes...")
all_tools = update_metadata()
print(f"Updated metadata for {len(all_tools)} tools.")
fix_standard_pages()
print("Finished.")
