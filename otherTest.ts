blockSettings.registerDefaultNumber("volume", 50)

blockSettings.onSettingChanged("volume", function () {
    console.log("VOLUME CHANGED")
})

blockSettings.updateSettings(100)

pause(500)

blockSettings.setRegisteredNumber("volume", 75)

pause(500)

blockSettings.setRegisteredNumber("volume", 90)

pause(500)

blockSettings.registerDefaultNumber("volume", 50)

blockSettings.onAnySettingChanged(function (name) {
    console.logValue("Changed", name)
})

blockSettings.updateSettings(1000)

pause(1000)

blockSettings.setRegisteredNumber("volume", 75)

blockSettings.registerDefaultNumber("volume", 50)

blockSettings.onSettingTypeChanged(
    blockSettings.SettingType.Number,
    function (name) {
        game.splash("Number changed: " + name)
    }
)

blockSettings.updateSettings(1000)

pause(1000)
blockSettings.setRegisteredNumber("volume", 75)