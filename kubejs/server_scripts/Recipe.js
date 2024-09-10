ServerEvents.recipes((event) => {
    const patterns = {
        full: [
            "AAA",
            "AAA",
            "AAA"
        ],
        gear: [
            " A ",
            "ABA",
            " A "
        ],
        plate: [
            "AA"
        ]
    } 

    function shaped(result, patternType, input) {
        let pattern = patterns[patternType];
        let x = { A: input };
        if(!pattern) {
            console.log(`Invalid pattern type: ${patternType}`);
            return;
        }
        event.recipes.kubejs.shaped(
            result,
            pattern,
            x
        )
    }

    // Remove recipe
    const recipetype = [
        "minecraft:stonecutting",
        "minecraft:campfire_cooking",
        "minecraft:smoking",
        "occultism:crushing",
        "occultism:miner",
        "occultism:ritual",
        "occultism:spirit_fire",
        "occultism:spirir_trade"
    ]

    recipetype.forEach(types => {
        event.remove({
            type: types
        })
    })
    event.remove({
        id: "pipez:ultimate_upgrade"
    })

    // Hammer recipe
    const hammer = [
        ["wooden", "#minecraft:planks", null, null],
        ["cobblestone", "#c:cobblestones", null, null],
        ["iron", "#c:ingots/iron", null, null],
        ["diamond", "#c:gems/diamond", null, null],
        ["netherite", "#c:ingots/netherite", "minecraft:netherite_upgrade_smithing_template", "#kubejs:hammer/diamond"]
    ]

    hammer.forEach(([
        name,
        material,
        template,
        base
    ]) => {
        if (template != null && base != null) {
            event.smithing(
                "kubejs:" + name + "_hammer", // 输出物品
                template, // 锻造模板
                base, // 被升级的物品
                material // 升级材料
            )
        } else {
            event.recipes.kubejs.shaped(
                Item.of("kubejs:" + name + "_hammer", 1),
                [
                    " AB",
                    " BA",
                    "B  "
                ],
                {
                    A: material,
                    B: "#c:rods/wooden"
                }
            )
        }
    })

    event.smithing(
        'pipez:ultimate_upgrade',
        'minecraft:netherite_upgrade_smithing_template',
        'pipez:advanced_upgrade',
        'minecraft:netherite_ingot'
    );
    event.smithing(
        'pipez:infinity_upgrade',
        'kubejs:infinity_upgrade_smithing_template',
        'pipez:ultimate_upgrade',
        'minecraft:nether_star'
    )
})