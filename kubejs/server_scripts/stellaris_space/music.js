ServerEvents.registry('jukebox_song', (event) => {
    event.create(`${global.packid}:cureforme`).song(`${global.packid}:cureforme`, 201)
})