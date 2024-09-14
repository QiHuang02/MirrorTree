StartupEvents.registry('block', (event) => {
    event.create('stellaris_space:solar_panel')
    .parentModel('stellaris_space:block/solar_panel')
    .translationKey('block.stellaris_space.solar_panel')
    .hardness(2)
    .resistance(100)
    .fullBlock(false)
    .requiresTool(false)
    .renderType('cutout')
    .box(0.1, 0, 0.1, 0.9, 0.5, 0.9, false)
    .suffocating(false)
    .viewBlocking(true)
    .blockEntity((entityInfo) => {
        entityInfo.energyStorage('energy', ['up'], 2147483647, 0, 10000, 1000)
        entityInfo.serverTicking()
        entityInfo.tickFrequency(20)
    })
})

// PowerfulEvents.registerCapabilities((event) => {
//     event.registerBlockEntity('powerfuljs:fixed_storage_fe', {
//         capacity: 2147483647
//     }, 'stellaris_space:solar_panel')
// })