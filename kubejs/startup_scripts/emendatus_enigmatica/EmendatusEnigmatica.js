// priority: 198

/**
 * 
 * @param {EEConfig} config
 * @returns
 */
function EmendatusEnigmaticaJS(config) {
    this.name = config.name;
    this.type = config.type;
    this.harvestLevel = config.harvestLevel;
    this.processedTypes = config.processedTypes;
    this.strata = config.strata;
    this.color = config.color;
    this.burnTime = config.burnTime || undefined;
    this.gemTemplate = config.gemTemplate || -1;
    this.drop = config.drop;
};

EmendatusEnigmaticaJS.prototype = {
    registry() {
        let name = this.name;
        let type = this.type;
        let harvestLevel = this.harvestLevel;
        let processedTypes = this.processedTypes;
        let strata = this.strata;
        let color = this.color;
        let burnTime = this.burnTime;
        let gemTemplate = this.gemTemplate;
        let drop = this.drop;

        processedTypes.forEach((ptypes) => {
            switch(ptypes) {
                // case 'ore':
                //     registryOre(name, strata, harvestLevel, color, type, drop);
                //     break;
                case 'raw':
                    registryRaw(name,color);
                    break;
                case 'ingot':
                case 'gem':
                    registryWithBlock(ptypes, name, color, burnTime, gemTemplate, processedTypes);
                    break;
                case 'dust':
                case 'gear':
                case 'nugget':
                case 'plate':
                case 'rod':
                    registryItem(ptypes, name, color, burnTime);
                    break;
                case 'mekanism':
                    registryMek(name, color);
                    break;
                case 'bloodmagic':
                    registryBlood(name, color);
                    break;
                case 'crush':
                    registryCrush(name, color);
                    break;
            }
        })
    }
};


/**
 * Description placeholder
 *
 * @param {String} name
 * @param {String} strata
 * @param {String} harvestLevel
 * @param {String[]} color
 * @param {String} type
 * @param {String} drop
 */
function registryOre(name, strata, harvestLevel, color, type, drop) {
    strata.forEach((strata) => {
        StartupEvents.registry('block', (event) => {
            let ore = event.create(`${global.modid}:${name}_ore_${strata}`)
            .hardness(global.EE_STRATAS[strata].resistance)
            .soundType(SoundType.STONE)
            .requiresTool(true)
            .tagBoth('c:ores')
            .tagBoth(`c:ores/${name}`)
            .tagBoth(`c:ore_rates/singular`)
            .tagBlock(`minecraft:mineable/${global.EE_STRATAS[strata].tool}`)
            .tagBlock(`c:mineable/paxel`)
            .tagBlock(`minecraft:needs_${harvestLevel}_tool`)
            .tagBoth(`c:ores_in_ground/${strata}`)
            .modelGenerator(model => {
                model.parent(`${global.EE_STRATAS[strata].texture}`)
            })
            createLootOre(name, strata, drop);
        })
    })
}

/**
 * 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 */
function registryRaw(name, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`emendatusenigmatica:raw_${name}`)
            .tag('c:raw_materials')
            .tag(`c:raw_materials/${name}`)

            if(color) {
                for (let i = 0; i < color.length; i++) {
                    builder.texture(`layer${i}`, `${global.modid}:item/templates/raw/0${i}`)
                        .color(i, color[i]);
                }
            }
    });
    StartupEvents.registry('block', (event) => {
        let builder = event.create(`${global.modid}:raw_${name}_block`)
            .texture(`${global.modid}:block/overlays/raw_${name}_block`)
            .tagBoth('c:storage_blocks')
            .tagBoth(`c:storage_blocks/raw_${name}`)
            .tagBlock('minecraft:mineable/pickaxe')
            .soundType(SoundType.METAL)
            .requiresTool(true)
            .hardness(3)
            .resistance(3);
    });
};

/**
 * 
 * @param {String} type 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 * @param {Number} burnTime It can be a specific number or undefined 
 * @param {Number} gemTemplate If the type of a material is a gem, 
 * then there must be a value to specify the texture of the material, which is a specific number, from 1 to 10.
 * @param {String} processedTypes All processed types of one material.
 */
function registryWithBlock(type, name, color, burnTime, gemTemplate, processedTypes) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_${type}`)
            .tag(`c:${type}s`)
            .tag(`c:${type}s/${name}`)

            if (burnTime) builder.burnTime(burnTime)
            if (color) {
                switch(type) {
                    case 'ingot':
                        for (let i = 0; i < color.length; i++) {
                            builder.texture(`layer${i}`, `${global.modid}:item/templates/${type}/0${i}`)
                            .color(i, color[i]);
                        };
                        break;
                    case 'gem':
                        if (gemTemplate > -1 && color) {
                        for (let i = 0; i < color.length; i++) {
                            builder.texture(`layer${i}`, `${global.modid}:item/templates/gem/template_${gemTemplate}/0${i}`)
                            .color(i, color[i]);
                            }
                        };
                        break;
                }
            }
        }
    )
    if (processedTypes.includes('storage_block')){
        StartupEvents.registry('block', (event) => {
            let builder = event.create(`${global.modid}:${name}_block`)
                .texture(`${global.modid}:block/overlays/${name}_block`)
                .tagBoth('c:storage_blocks')
                .tagBoth(`c:storage_blocks/${name}`)
                .tagBlock('minecraft:mineable/pickaxe')
                .soundType(SoundType.METAL)
                .requiresTool(true)
                .hardness(3)
                .resistance(3)

                if (burnTime) 
                    builder.item(i => {
                        i.burnTime(burnTime * 10)
                    builder.tagBoth('fuelgoeshere:forced_fuels')
                });
            }
        );
    }
};

/**
 * 
 * @param {String} type 
 * @param {String} name Material's name.
 * @param {String[]} color Color array of materials. It can only have 5 colors, likes this: ['#393e46', '#2e2e2e', '#261e24', '#1f1721', '#1c1c1e']
 * @param {Number} burnTime The combustion value of the material.
 */
function registryItem(type, name, color, burnTime) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_${type}`)
            .tag(`c:${type}s`)
            .tag(`c:${type}s/${name}`);
        
            if (burnTime) {
                builder.burnTime(burnTime)
                builder.tag('fuelgoeshere:forced_fuels')
            };
            if (color) {
                for (let i = 0; i < color.length; i++) {
                    builder.texture(`layer${i}`, `${global.modid}:item/templates/${type}/0${i}`)
                    .color(i, color[i]);
                }
            }
        }
    );
};

function registryMek(name, color) {
    StartupEvents.registry('item', (event) => {
        let crystal = event.create(`${global.modid}:${name}_crystal`).tag('mekanism:crystals').tag(`mekanism:crystals/${name}`)
        let shard = event.create(`${global.modid}:${name}_shard`).tag('mekanism:shards').tag(`mekanism:shards/${name}`)
        let clump = event.create(`${global.modid}:${name}_clump`).tag('mekanism:clumps').tag(`mekanism:clumps/${name}`)
        let dirtyDust = event.create(`${global.modid}:${name}_dirty_dust`).tag('mekanism:dirty_dusts').tag(`mekanism:dirty_dusts/${name}`)

        if(color) {
            for (let i = 0; i < color.length; i++) {
                crystal.texture(`layer${i}`, `${global.modid}:item/templates/crystal/0${i}`)
                .color(i, color[i]);
                shard.texture(`layer${i}`, `${global.modid}:item/templates/shard/0${i}`)
                .color(i, color[i]);
                clump.texture(`layer${i}`, `${global.modid}:item/templates/clump/0${i}`)
                .color(i, color[i]);
                dirtyDust.texture(`layer${i}`, `${global.modid}:item/templates/dirty_dust/0${i}`)
                .color(i, color[i]);
            }
        }
    });
};

function registryBlood(name, color) {
    StartupEvents.registry('item', (event) => {
        let fragment = event.create(`${global.modid}:${name}_fragment`).tag('bloodmagic:fragments').tag(`bloodmagic:fragments/${name}`);
        let gravel = event.create(`${global.modid}:${name}_gravel`).tag('bloodmagic:gravels').tag(`bloodmagic:gravels/${name}`);

        if (color) {
            for (let i = 0; i < color.length; i++) {
                fragment.texture(`layer${i}`, `${global.modid}:item/templates/fragment/0${i}`)
                .color(i, color[i]);
                gravel.texture(`layer${i}`, `${global.modid}:item/templates/gravel/0${i}`)
                .color(i, color[i]);
            }
        }
    })
};

function registryCrush(name, color) {
    StartupEvents.registry('item', (event) => {
        let builder = event.create(`${global.modid}:${name}_crushed_ore`)
            .tag('create:crushed_raw_materials')
            .tag(`create:crushed_raw_materials/${name}`)
        
        if(this.color) {
            for (let i = 0; i < color.length; i++) {
                builder.texture(`layer${i}`, `${global.modid}:item/templates/crushed_ore/0${i}`)
                .color(i, color[i]);
            };
        }
    });
};