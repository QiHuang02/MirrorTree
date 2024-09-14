BlockEvents.blockEntityTick('stellaris_space:solar_panel', (event) => {
    if(event.level.day && event.block.canSeeSky) {
        event.block.entity.attachments.energy.addEnergy(500 * 20, false)
    }
})