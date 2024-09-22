let blockResourceLang = [
    [`${global.packid}.solar_panel`, "太阳能发电机", "Solar Panel"],
    [`${global.packid}.dust`, "尘土", "Dust"],
];
let itemResourceLang = [
    [`${global.packid}.wooden_hammer`, "木 锤", "Wooden Hammer"],
    [`${global.packid}.cobblestone_hammer`, "石 锤", "Cobblestone Hammer"],
    [`${global.packid}.iron_hammer`, "铁 锤", "Iron Hammer"],
    [`${global.packid}.diamond_hammer`, "钻石 锤", "Diamond Hammer"],
    [`${global.packid}.netherite_hammer`, "下界合金 锤", "Netherite Hammer"],
    [`${global.packid}.infinity_upgrade_smithing_template`, "锻造模板", "Upgrade Smithing Template"],
    [`${global.packid}.love_story`, "Love Story", "Love Story"],
    // [`${global.packid}`]
];
let discResourceLang = [
    [`${global.packid}.love_story`, "Love Story - Taylor Swift", "Love Story - Taylor Swift"],
]

blockResourceLang.forEach(([key, zh_cn, en_us]) => {
    ClientEvents.lang('zh_cn', (event) => {
        event.add('block.' + key, zh_cn);
    });
    ClientEvents.lang('en_us', (event) => {
        event.add('block.' + key, en_us);
    })
});
itemResourceLang.forEach(([key, zh_cn, en_us]) => {
    ClientEvents.lang('zh_cn', (event) => {
        event.add('item.' + key, zh_cn);
    });
    ClientEvents.lang('en_us', (event) => {
        event.add('item.' + key, en_us);
    })
});
discResourceLang.forEach(([key, zh_cn, en_us]) => {
    ClientEvents.lang('zh_cn', (event) => {
        event.add('jukebox_song.' + key, zh_cn);
    });
    ClientEvents.lang('en_us', (event) => {
        event.add('jukebox_song.' + key, en_us);
    })
})