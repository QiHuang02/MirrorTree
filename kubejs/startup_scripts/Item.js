StartupEvents.registry("item", (event) => {
    const hammer = [
        ["wooden", "wood", "wood", "common"],
        ["cobblestone", "stone", "cobblestone", "common"],
        ["iron", "iron", "iron",  "uncommon"],
        ["diamond", "diamond", "diamond", "rare"],
        ["netherite", "netherite", "netherite",  "epic"]
    ];

    hammer.forEach(([
        name,
        tier,
        tag,
        rarity
    ]) => {
        event.create(name + "_hammer", "pickaxe")
        .tier(tier)
        .tag("c:enchantables")
        .tag("c:tools")
        .tag("c:tools/hammer")
        .tag("kubejs:hammer")
        .tag("kubejs:hammer/" + tag)
        .rarity(rarity)
        .unstackable()
        .translationKey("item.kubejs." + name + "_hammer")
    });

    event.create('infinity_upgrade_smithing_template');
})