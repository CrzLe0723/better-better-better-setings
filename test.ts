game.consoleOverlay.setVisible(true)
blockSettings.writeNumber("test", 50)
console.log(blockSettings.readNumber("test"))
pause(2000)
let canRun = true
blockSettings.updateSettings(2000)
game.onUpdateInterval(100, function () {
    if (!(canRun)) {
        return
    }
    blockSettings.writeNumber("test", randint(1, 50))
    console.log(blockSettings.readNumber("test"))
})
