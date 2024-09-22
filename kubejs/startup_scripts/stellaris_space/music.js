StartupEvents.registry('sound_event', (event) => {
    event.create('stellaris_space:love_story')
});
StartupEvents.registry('item', (event) => {
    event.create(`stellaris_space:love_story`)
         .jukeboxPlayable(`stellaris_space:love_story`, true)
})