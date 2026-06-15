import re

filepath = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\app\page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Change 70+ to 100+
content = content.replace("70+", "100+")

# Add new icons to imports
content = content.replace("PlaySquare", "PlaySquare,\n  Globe2,\n  Palette")

# Add new categories to the categories array
new_cats = """    {
      title: 'Power Dev Tools',
      description: 'Minifiers, formatters, Base64, UUIDs and more.',
      icon: <Code2 className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-400',
      shadow: 'shadow-emerald-500/20',
      href: '/tools#utility',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Network Intelligence',
      description: 'Instant DNS Lookups and Domain Age checks.',
      icon: <Globe2 className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      shadow: 'shadow-indigo-500/20',
      href: '/tools#network',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Design Makers',
      description: 'Generate Logos, Icons, Banners, Posters and Resumes.',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-400',
      shadow: 'shadow-pink-500/20',
      href: '/tools#design',
      colSpan: 'md:col-span-1',
    }"""

# Replace the Power Dev Tools to fit in the grid differently and add the new ones
old_power_dev = """    {
      title: 'Power Dev Tools',
      description: 'Minifiers, formatters, Base64, UUIDs and more.',
      icon: <Code2 className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-400',
      shadow: 'shadow-emerald-500/20',
      href: '/tools#utility',
      colSpan: 'md:col-span-3',
    }"""

content = content.replace(old_power_dev, new_cats)

# Resize the WASM engine image
content = content.replace('w-[500px] h-[500px]', 'w-[300px] h-[300px]')
content = content.replace('w-[350px] h-[350px]', 'w-[200px] h-[200px]')
content = content.replace('w-64 h-64 bg-gray-800', 'w-40 h-40 bg-gray-800')
content = content.replace('className="w-16 h-16 text-primary-400 animate-bounce"', 'className="w-10 h-10 text-primary-400 animate-bounce"')
content = content.replace('text-sm tracking-widest text-primary-300 uppercase', 'text-[10px] tracking-widest text-primary-300 uppercase')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated page.tsx")
