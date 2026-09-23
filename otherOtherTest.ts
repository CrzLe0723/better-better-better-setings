blockSettings.onSettingChanged("score", function () {
    console.log("score changed")
})

blockSettings.onAnySettingChanged(function (name) {
    console.log("changed: " + name)
})

blockSettings.onSettingTypeChanged(blockSettings.SettingType.Number, function (name) {
    console.log("number changed: " + name)
})

blockSettings.onSettingRegistered("score", function () {
    console.log("score registered")
})

blockSettings.registerDefaultNumber("score", 0)

pause(1000)

blockSettings.setRegisteredNumber("score", 10)

pause(1000)

blockSettings.updateRegisteredSetting("score")