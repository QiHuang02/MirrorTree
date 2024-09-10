// priority: 200

global.modid = 'emendatusenigmatica';

const assetspath = `./kubejs/assets/${global.modid}`;
const datapath = `./kubejs/data/${global.modid}`;

const paths = {
    models: {
        block: `${assetspath}/models/block/`,
    },
    textures: {
        block: `${assetspath}/textures/blocks/templates`,
        item: `${assetspath}/textures/items/templates`
    },
    loots: {
        block: `${datapath}/loot_table/blocks/`,
    },
    recipes: {
        recipe: `${datapath}/recipe/`
    }
};

const OreModelJson = (base, overlay) => ({
    loader: 'neoforge:composite',
    parent: 'block/block',
    ambientocclusion: false,
    textures: {
        particle: base
    },
    children: {
        solid: {
            parent: 'block/cube_all',
            render_type: 'minecraft:solid',
            textures: {
                all: base,
            },
        },
        translucent: {
            parent: 'block/cube_all',
            render_type: 'minecraft:translucent',
            textures: {
                all: overlay,
            },
        },
    },
});

const OreLootJson = (block, item, sequence, min, max) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "bonus_rolls": 0.0,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "predicates": {
                                            "minecraft:enchantments": [
                                                {
                                                    "enchantments": "minecraft:silk_touch",
                                                    "levels": {
                                                        "min": 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ],
                            "name": block
                        },
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "add": false,
                                    "count": {
                                        "type": "minecraft:uniform",
                                        "max": max,
                                        "min": min
                                    },
                                    "function": "minecraft:set_count"
                                },
                                {
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:ore_drops",
                                    "function": "minecraft:apply_bonus"
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ],
                            "name": item
                        }
                    ]
                }
            ],
            "rolls": 1.0
        }
      ],
    "random_sequence": sequence
});

Platform.setModName(`${global.modid}`, 'Emendatus Enigmatica');