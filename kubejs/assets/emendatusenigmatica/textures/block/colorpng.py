import os
import re
from PIL import Image
from matplotlib import colors

# 文件路径
metal_template_folder = r'D:\Minecraft\.minecraft_1\versions\ModPackage-1.21.1-v0.02\kubejs\assets\emendatusenigmatica\textures\block\templates\ore\metal'
gem_template_folder = r'D:\Minecraft\.minecraft_1\versions\ModPackage-1.21.1-v0.02\kubejs\assets\emendatusenigmatica\textures\block\templates\ore\gem'
script_path = r'D:\Minecraft\.minecraft_1\versions\ModPackage-1.21.1-v0.02\kubejs\startup_scripts\emendatus_enigmatica\4_material_def.js'
output_folder = r'D:\Minecraft\.minecraft_1\versions\ModPackage-1.21.1-v0.02\kubejs\assets\emendatusenigmatica\textures\block\overlays\ore'

# 确保输出文件夹存在
os.makedirs(output_folder, exist_ok=True)

# 解析JS文件，提取name、type、color和processedTypes信息
materials = []
with open(script_path, 'r', encoding='utf-8') as file:
    content = file.read()

# 使用正则表达式提取name、type、color和processedTypes信息
pattern = re.compile(r"{\s*name:\s*'(\w+)',\s*type:\s*'(\w+)',.*?processedTypes:\s*\[(.*?)\].*?color:\s*\[(.*?)\]", re.DOTALL)
matches = pattern.findall(content)

for match in matches:
    name = match[0]
    mat_type = match[1]  # 材料类型
    processed_types = [ptype.strip().strip("'") for ptype in match[2].split(',')]  # 处理类型
    color_list = [color.strip().strip("'") for color in match[3].split(',')]  # 提取颜色数组
    materials.append({'name': name, 'type': mat_type, 'processedTypes': processed_types, 'color': color_list})

# 处理每个材料
for material in materials:
    name = material['name']
    mat_type = material['type']
    processed_types = material['processedTypes']
    color_list = material['color']

    # 检查processedTypes中是否包含'ore'
    if 'ore' not in processed_types:
        print(f"Skipping material {name} because 'ore' is not in processedTypes.")
        continue

    # 检查颜色列表长度是否正确
    if len(color_list) != 5:
        print(f"Skipping material {name} due to incorrect color array length.")
        continue

    # 根据type选择不同的模板路径
    if mat_type == 'metal':
        template_folder = metal_template_folder
    elif mat_type == 'gem':
        template_folder = gem_template_folder
    else:
        print(f"Skipping material {name} with unknown type {mat_type}.")
        continue

    images = []

    # 遍历颜色列表和模板文件夹中的图片
    for index, color_hex in enumerate(color_list):
        file_name = f'{index:02d}.png'
        file_path = os.path.join(template_folder, file_name)

        if os.path.exists(file_path):
            image = Image.open(file_path).convert("RGBA")
            pixels = image.load()

            # 将颜色hex值转换为RGB值
            r, g, b = [int(c * 255) for c in colors.to_rgb(color_hex)]

            # 遍历图片的每个像素，修改颜色
            for y in range(image.size[1]):
                for x in range(image.size[0]):
                    _, _, _, a = pixels[x, y]
                    if a != 0:  # 如果不是透明像素
                        pixels[x, y] = (r, g, b, a)

            # 将修改后的图片添加到列表中
            images.append(image)
        else:
            print(f"File {file_name} not found in {template_folder}.")

    # 合成图片（重叠）
    if images:
        img_width, img_height = images[0].size
        combined_image = Image.new('RGBA', (img_width, img_height), (0, 0, 0, 0))  # 全透明背景

        # 叠加图片
        for img in images:
            combined_image.paste(img, (0, 0), img)

        # 保存合成后的图片
        output_path = os.path.join(output_folder, f'{name}.png')
        combined_image.save(output_path)
        print(f"Combined image saved as {output_path}.")
