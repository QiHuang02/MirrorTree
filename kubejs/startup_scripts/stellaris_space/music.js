StartupEvents.registry('sound_event', (event) => {
    event.create(`${global.packid}:cureforme`)
});
StartupEvents.registry('item', (event) => {
    event.create(`${global.packid}:cureforme`)
    .jukeboxPlayable(`${global.packid}:cureforme`, true)
})