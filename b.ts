namespace blockSettings {

    export enum SettingType {
        //% block="unknown"
        Unknown,

        //% block="number"
        Number,

        //% block="string"
        String,

        //% block="boolean"
        Boolean,

        //% block="image"
        Image,

        //% block="string array"
        StringArray,

        //% block="number array"
        NumberArray,

        //% block="boolean array"
        BooleanArray,

        //% block="image array"
        ImageArray
    }

    interface SettingEntry {
        name: string
        type: SettingType

        defaultNumber: number
        defaultString: string
        defaultBoolean: boolean
        defaultImage: Image

        defaultStringArray: string[]
        defaultNumberArray: number[]
        defaultBooleanArray: boolean[]
        defaultImageArray: Image[]

        lastNumber: number
        lastString: string
        lastBoolean: boolean
        lastImage: Image

        lastStringArray: string[]
        lastNumberArray: number[]
        lastBooleanArray: boolean[]
        lastImageArray: Image[]
    }

    interface SettingChangeHandler {
        name: string
        handler: () => void
    }

    interface AnySettingChangeHandler {
        handler: (name: string) => void
    }

    interface SettingTypeChangeHandler {
        type: SettingType
        handler: (name: string) => void
    }

    interface SettingRegisteredHandler {
        name: string
        handler: () => void
    }

    interface SettingUnregisteredHandler {
        name: string
        handler: () => void
    }

    interface AnySettingRegisteredHandler {
        handler: (name: string) => void
    }

    interface AnySettingUnregisteredHandler {
        handler: (name: string) => void
    }

    let settingUnregisteredHandlers: SettingUnregisteredHandler[] = []
    let settingChangeHandlers: SettingChangeHandler[] = []
    let anySettingChangeHandlers: AnySettingChangeHandler[] = []
    let settingTypeChangeHandlers: SettingTypeChangeHandler[] = []
    let settingRegisteredHandlers: SettingRegisteredHandler[] = []
    let anySettingRegisteredHandlers: AnySettingRegisteredHandler[] = []
    let anySettingUnregisteredHandlers: AnySettingUnregisteredHandler[] = []

    let registeredSettings: SettingEntry[] = []

    let updateInterval = 0
    let updaterRunning = false

    /**
     * Registers a number setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default number value
    */
    //% blockId=block_settings_register_default_number
    //% block="register setting $name with default number $value"
    //% weight=100 blockGap=8 group="Defaults"
    export function registerDefaultNumber(name: string, value: number): void {
        registerNumberSettingDefault(name, value)
    }

    /**
     * Registers a string setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default string value
     */
    //% blockId=block_settings_register_default_string
    //% block="register setting $name with default string $value"
    //% weight=90 blockGap=8 group="Defaults"
    export function registerDefaultString(name: string, value: string): void {
        registerStringSettingDefault(name, value)
    }

    /**
     * Registers a boolean setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default boolean value
     */
    //% blockId=block_settings_register_default_boolean
    //% block="register setting $name with default boolean $value"
    //% weight=80 blockGap=8 group="Defaults"
    export function registerDefaultBoolean(name: string, value: boolean): void {
        registerBooleanSettingDefault(name, value)
    }

    /**
     * Registers an image setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default image value
     */
    //% blockId=block_settings_register_default_image
    //% block="register setting $name with default image $value"
    //% value.shadow="screen_image_picker"
    //% weight=70 blockGap=8 group="Defaults"
    export function registerDefaultImage(name: string, value: Image): void {
        registerImageSettingDefault(name, value)
    }

    /**
     * Registers a number array setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default number array
     */
    //% blockId=block_settings_register_default_number_array
    //% block="register setting $name with default number array $value"
    //% weight=60 blockGap=8 group="Defaults"
    export function registerDefaultNumberArray(name: string, value: number[]): void {
        registerNumberArraySettingDefault(name, value)
    }

    /**
     * Registers a string array setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default string array
     */
    //% blockId=block_settings_register_default_string_array
    //% block="register setting $name with default string array $value"
    //% weight=50 blockGap=8 group="Defaults"
    export function registerDefaultStringArray(name: string, value: string[]): void {
        registerStringArraySettingDefault(name, value)
    }

    /**
     * Registers a boolean array setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default boolean array
     */
    //% blockId=block_settings_register_default_boolean_array
    //% block="register setting $name with default boolean array $value"
    //% weight=40 blockGap=8 group="Defaults"
    export function registerDefaultBooleanArray(name: string, value: boolean[]): void {
        registerBooleanArraySettingDefault(name, value)
    }

    /**
     * Registers an image array setting with a default value.
     * Existing saved values are preserved.
     *
     * @param name The name of the setting
     * @param value The default image array
     */
    //% blockId=block_settings_register_default_image_array
    //% block="register setting $name with default image array $value"
    //% value.shadow="lists_create_with" value.defl="screen_image_picker"
    //% weight=30 blockGap=8 group="Defaults"
    export function registerDefaultImageArray(name: string, value: Image[]): void {
        registerImageArraySettingDefault(name, value)
    }


    /**
     * Registers a setting as a number and saves its value.
     * The setting can then be updated by the automatic settings updater.
     *
     * @param name The name of the setting
     * @param value The number value to save
     */
    //% blockId=block_settings_register_number
    //% block="register setting $name to number $value"
    //% weight=100 blockGap=8 group="Numbers"
    export function writeNumberRegister(name: string, value: number) {
        if (!registerNumberSetting(name, value)) return

        settings.writeNumber(name, value)
    }

    /**
     * Registers a setting as a string and saves its value.
     * The setting can then be updated by the automatic settings updater.
     *
     * @param name The name of the setting
     * @param value The string value to save
     */
    //% blockId=block_settings_register_string
    //% block="register setting $name to string $value"
    //% weight=80 blockGap=8 group="Strings"
    export function writeStringRegister(name: string, value: string) {
        if (!registerStringSetting(name, value)) return

        settings.writeString(name, value)
    }

    /**
     * Write a boolean value (T/F) to settings and saves its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The boolean value to save
     */
    //% blockId=block_settings_register_boolean
    //% block="register setting $name to boolean $value"
    //% weight=100 blockGap=8 group="Booleans"
    export function writeBooleanRegister(name: string, value: boolean): void {
        if (!registerBooleanSetting(name, value)) return

        settings.writeNumber(name, value == true ? 1 : 0)

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    /**
     * Write an image object to settings and saves its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The image value to save
     */
    //% blockId=block_settings_register_image
    //% block="register setting $name to image $value"
    //% value.shadow="screen_image_picker"
    //% weight=100 blockGap=8 group="Images"
    export function writeImageRegister(name: string, value: Image): void {
        if (!registerImageSetting(name, value))
            return

        let width = value.width
        let height = value.height

        settings.writeNumberArray(
            name,
            [width, height].concat(imageToArray(value))
        )
    }

    /**
     * Register named settings to a given array of numbers and saves its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The number array value to save
    */
    //% blockId=block_settings_register_number_array
    //% block="register setting $name to number array $value"
    //% weight=60 blockGap=8 group="Arrays"
    export function writeNumberArrayRegister(name: string, value: number[]) {
        if (!registerNumberArraySetting(name, value)) return

        settings.writeNumberArray(name, cloneNumberArray(value))
    }

    /**
     * Register named settings to a given array of strings and saves its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The string array value to save
     */
    //% blockId=block_settings_register_string_array
    //% block="register setting $name to string array $value"
    //% weight=40 blockGap=8 group="Arrays"
    export function writeStringArrayRegister(name: string, value: Array<string>) {
        if (!registerStringArraySetting(name, value)) return

        let result = stringToNumberArray(value);
        settings.writeNumberArray(name, result);
    }

    /**
     * Write a boolean array to settings and saves its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The boolean array to save
     */
    //% blockId=block_settings_register_boolean_array
    //% block="register setting $name to boolean array $value"
    //% weight=20 blockGap=8 group="Arrays"
    export function writeBooleanArrayRegister(name: string, value: Array<boolean>): void {
        if (!registerBooleanArraySetting(name, value)) return

        let result: number[] = []

        for (let i = 0; i < value.length; i++) {
            result.push(value[i] == true ? 1 : 0)
        }
        settings.writeNumberArray(name, result);
    }


    /**
     * Write an image array to settings and save its value.
     * The setting can then be updated by the automatic settings updater.
     * 
     * @param name The name of the setting to set
     * @param value The image array to save
     */
    //% blockId=block_settings_register_image_array
    //% block="register setting $name to image array $value"
    //% value.shadow="lists_create_with" value.defl="screen_image_picker"
    //% weight=9 blockGap=8 group="Arrays"
    export function writeImageArrayRegister(name: string, value: Array<Image>): void {
        if (!registerImageArraySetting(name, value)) return

        let result = imageArrayToNumberArray(value);
        settings.writeNumberArray(name, result);
    }

    /**
     * Update the settings continuously on a fixed interval.
     * Calling this again while the updater is running changes the interval.
     *
     * @param interval The interval between updates in milliseconds
    */
    //% block="update settings every $interval ms"
    //% interval.shadow="timePicker" interval.defl=1000
    //% group="Update"
    export function updateSettings(interval: number): void {
        updateInterval = Math.max(1, interval)

        if (updaterRunning)
            return

        updaterRunning = true

        control.runInBackground(function () {
            while (updaterRunning) {
                applyAllSettings()
                pause(updateInterval)
            }
        })
    }

    /**
     * Stop updating the settings
     */
    //% block="stop updating settings"
    //% group="Update"
    export function stopUpdatingSettings(): void {
        updaterRunning = false
    }

    /**
    * Get setting names beginning with a prefix
    * @param prefix the prefix to search for
    */
    //% block="list settings with prefix $prefix"
    //% prefix.defl="player/"
    //% group="Operations"
    export function listSettingsWithPrefix(prefix: string): string[] {
        return settings.list(prefix)
    }

    /**
     * Checks if the setting is registered
     * 
     * @param name The name of the setting
     */
    //% blockId=block_settings_is_registered
    //% block="setting $name is registered"
    //% group="Registry"
    //% weight=100
    export function isSettingRegistered(name: string): boolean {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name)
                return true
        }

        return false
    }

    /**
     * Checks if the specified setting is equal to whatever type 
     * 
     * @param name The name of the setting 
     * @param type The type to check
     */
    //% blockId=block_settings_has_type
    //% block="setting $name has type $type"
    //% type.shadow="blockSettingsSettingType"
    //% group="Validation"
    //% weight=80
    export function settingHasType(name: string, type: SettingType): boolean {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name)
                return registeredSettings[i].type === type
        }

        return false
    }

    /**
     * Get the number of settings registered with the updater.
     */
    //% block="number of registered settings"
    //% group="Registry"
    //% weight=100
    export function registeredSettingCount(): number {
        return registeredSettings.length
    }

    /**
     * Get the name of a registered setting at an index.
     * @param index The index of the registered setting
     */
    //% block="registered setting at index $index"
    //% index.defl=0
    //% group="Registry"
    //% weight=90
    export function registeredSettingAt(index: number): string {
        if (index < 0 || index >= registeredSettings.length) {
            return ""
        }

        return registeredSettings[index].name
    }

    /**
     * Get the type of a registered setting at an index.
     * @param index The index of the registered setting
     */
    //% block="type of registered setting at index $index"
    //% index.defl=0
    //% group="Registry"
    //% weight=80
    export function registeredSettingType(index: number): SettingType {
        if (index < 0 || index >= registeredSettings.length) {
            return SettingType.Unknown
        }

        return registeredSettings[index].type
    }

    /**
     * Get the type of a reigstered setting with its name.
     * @param name The name of the registered setting
     */
    //% block="type of registered setting $name"
    //% group="Registry"
    //% weight=75
    export function registeredSettingTypeByName(name: string): SettingType {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                return registeredSettings[i].type
            }
        }

        return SettingType.Unknown
    }

    /**
     * Update all registered settings
     */
    //% block="update all registered settings"
    //% group="Update"
    //% weight=100
    export function updateAllRegisteredSettings(): void {
        applyAllSettings()
    }

    /**
     * Stop tracking a setting with the automatic updater.
     * @param name The name of the setting to unregister
     */
    //% block="unregister setting $name"
    //% group="Update"
    //% weight=80
    export function unregisterSetting(name: string): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                let setting = registeredSettings[i]

                registeredSettings.removeAt(i)

                fireSettingUnregisteredEvents(setting)

                return
            }
        }
    }

    /**
     * Update one registered setting.
     * @param name The name of the registered setting
     */
    //% block="update registered setting $name"
    //% group="Update"
    //% weight=90
    export function updateRegisteredSetting(name: string): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                let setting = registeredSettings[i]

                applySetting(setting)

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Unregister all settings (does not delete them)
    */
    //% block="unregister all settings"
    //% group="Registry"
    export function unregisterAllSettings(): void {
        while (registeredSettings.length > 0) {
            let setting = registeredSettings[0]

            registeredSettings.removeAt(0)

            fireSettingUnregisteredEvents(setting)
        }
    }

    /**
     * Reset a registered setting to its default value.
     * @param name The name of the registered setting
    */
    //% block="reset registered setting $name"
    //% group="Registry"
    //% weight=70
    export function resetRegisteredSetting(name: string): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                switch (setting.type) {
                    case SettingType.Number:
                        writeNumber(
                            setting.name,
                            setting.defaultNumber
                        )
                        break

                    case SettingType.String:
                        writeString(
                            setting.name,
                            setting.defaultString
                        )
                        break

                    case SettingType.Boolean:
                        writeBoolean(
                            setting.name,
                            setting.defaultBoolean
                        )
                        break

                    case SettingType.Image:
                        writeImage(
                            setting.name,
                            cloneImage(setting.defaultImage)
                        )
                        break

                    case SettingType.StringArray:
                        writeStringArray(
                            setting.name,
                            cloneStringArray(setting.defaultStringArray)
                        )
                        break

                    case SettingType.NumberArray:
                        writeNumberArray(
                            setting.name,
                            cloneNumberArray(setting.defaultNumberArray)
                        )
                        break

                    case SettingType.BooleanArray:
                        writeBooleanArray(
                            setting.name,
                            cloneBooleanArray(setting.defaultBooleanArray)
                        )
                        break

                    case SettingType.ImageArray:
                        writeImageArray(
                            setting.name,
                            cloneImageArray(setting.defaultImageArray)
                        )
                        break

                    case SettingType.Unknown:
                        return
                }

                return
            }
        }
    }

    /**
     * Reset all registered settings to their default values.
     */
    //% block="reset all registered settings"
    //% group="Registry"
    //% weight=60
    export function resetAllRegisteredSettings(): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            resetRegisteredSetting(registeredSettings[i].name)
        }
    }

    /**
     * Returns true if the setting updater is running; false otherwise 
     * 
     * @returns true if the setting updater is running; false otherwise
     */
    //% block="settings updater is running"
    //% group="Update"
    export function isUpdaterRunning(): boolean {
        return updaterRunning
    }

    /**
     * Get the update interval
     */
    //% block="settings update interval"
    //% group="Update"
    export function getUpdateInterval(): number {
        return updateInterval
    }

    //% blockId=block_settings_is_default
    //% block="setting $name is using its default"
    //% group="Validation"
    //% weight=70
    export function isSettingUsingDefault(name: string): boolean {
        if (!settings.exists(name)) return false;


        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name !== name)
                continue

            switch (setting.type) {
                case SettingType.Number:
                    return readNumber(name) === setting.defaultNumber

                case SettingType.String:
                    return readString(name) === setting.defaultString

                case SettingType.Boolean:
                    return readBoolean(name) === setting.defaultBoolean

                case SettingType.Image:
                    return imagesEqual(
                        readImage(name),
                        setting.defaultImage
                    )

                case SettingType.StringArray:
                    return stringArraysEqual(
                        readStringArray(name),
                        setting.defaultStringArray
                    )

                case SettingType.NumberArray:
                    return numberArraysEqual(
                        readNumberArray(name),
                        setting.defaultNumberArray
                    )

                case SettingType.BooleanArray:
                    return booleanArraysEqual(
                        readBooleanArray(name),
                        setting.defaultBooleanArray
                    )

                case SettingType.ImageArray:
                    return imageArraysEqual(
                        readImageArray(name),
                        setting.defaultImageArray
                    )

                case SettingType.Unknown:
                    return false
            }
        }

        return false
    }


    function applySetting(setting: SettingEntry): void {
        if (!settings.exists(setting.name)) {
            resetRegisteredSetting(setting.name)
            return
        }

        switch (setting.type) {
            case SettingType.Number:
                writeNumber(
                    setting.name,
                    readNumber(setting.name)
                )
                break

            case SettingType.String:
                writeString(
                    setting.name,
                    readString(setting.name)
                )
                break

            case SettingType.Boolean:
                writeBoolean(
                    setting.name,
                    readBoolean(setting.name)
                )
                break

            case SettingType.Image:
                writeImage(
                    setting.name,
                    readImage(setting.name)
                )
                break

            case SettingType.StringArray:
                writeStringArray(
                    setting.name,
                    readStringArray(setting.name)
                )
                break

            case SettingType.NumberArray:
                writeNumberArray(
                    setting.name,
                    readNumberArray(setting.name)
                )
                break

            case SettingType.BooleanArray:
                writeBooleanArray(
                    setting.name,
                    readBooleanArray(setting.name)
                )
                break

            case SettingType.ImageArray:
                writeImageArray(
                    setting.name,
                    readImageArray(setting.name)
                )
                break

            case SettingType.Unknown:
                return

            default:
                throw "SETTING ERROR: UNKNOWN SETTING TYPE"
        }
    }

    /**
     * Get the current number value of a registered number setting.
     * Returns 0 if the setting is not registered as a number.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_number
    //% block="get registered number setting $name"
    //% group="Getters"
    //% weight=100
    export function getRegisteredNumber(name: string): number {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Number)
                    return 0

                return readNumber(name)
            }
        }

        return 0
    }

    /**
     * Get the current string value of a registered string setting.
     * Returns an empty string if the setting is not registered as a string.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_string
    //% block="get registered string setting $name"
    //% group="Getters"
    //% weight=90
    export function getRegisteredString(name: string): string {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.String)
                    return ""

                return readString(name)
            }
        }

        return ""
    }

    /**
     * Get the current boolean value of a registered boolean setting.
     * Returns false if the setting is not registered as a boolean.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_boolean
    //% block="get registered boolean setting $name"
    //% group="Getters"
    //% weight=80
    export function getRegisteredBoolean(name: string): boolean {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Boolean)
                    return false

                return readBoolean(name)
            }
        }

        return false
    }

    /**
     * Get the current image value of a registered image setting.
     * Returns a 1x1 image if the setting is not registered as an image.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_image
    //% block="get registered image setting $name"
    //% group="Getters"
    //% weight=70
    export function getRegisteredImage(name: string): Image {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Image)
                    return image.create(1, 1)

                return readImage(name)
            }
        }

        return image.create(1, 1)
    }

    /**
     * Get the current number array value of a registered number array setting.
     * Returns an empty array if the setting is not registered as a number array.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_number_array
    //% block="get registered number array setting $name"
    //% group="Getters"
    //% weight=60
    export function getRegisteredNumberArray(name: string): number[] {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.NumberArray)
                    return []

                return readNumberArray(name)
            }
        }

        return []
    }

    /**
     * Get the current string array value of a registered string array setting.
     * Returns an empty array if the setting is not registered as a string array.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_string_array
    //% block="get registered string array setting $name"
    //% group="Getters"
    //% weight=50
    export function getRegisteredStringArray(name: string): string[] {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.StringArray)
                    return []

                return readStringArray(name)
            }
        }

        return []
    }

    /**
     * Get the current boolean array value of a registered boolean array setting.
     * Returns an empty array if the setting is not registered as a boolean array.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_boolean_array
    //% block="get registered boolean array setting $name"
    //% group="Getters"
    //% weight=40
    export function getRegisteredBooleanArray(name: string): boolean[] {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.BooleanArray)
                    return []

                return readBooleanArray(name)
            }
        }

        return []
    }

    /**
     * Get the current image array value of a registered image array setting.
     * Returns an empty array if the setting is not registered as an image array.
     *
     * @param name The name of the registered setting
     */
    //% blockId=block_settings_get_registered_image_array
    //% block="get registered image array setting $name"
    //% group="Getters"
    //% weight=30
    export function getRegisteredImageArray(name: string): Image[] {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.ImageArray)
                    return []

                return readImageArray(name)
            }
        }

        return []
    }

    /**
     * Set the value of a registered number setting.
     * Does nothing if the setting is not registered as a number.
     *
     * @param name The name of the registered setting
     * @param value The new number value
     */
    //% blockId=block_settings_set_registered_number
    //% block="set registered number setting $name to $value"
    //% group="Setters"
    //% weight=100
    export function setRegisteredNumber(name: string, value: number): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Number)
                    return

                settings.writeNumber(name, value)

                fireSettingChangeEvents(setting)

                return
            }
            
        }
    }

    /**
     * Set the value of a registered string setting.
     * Does nothing if the setting is not registered as a string.
     *
     * @param name The name of the registered setting
     * @param value The new string value
     */
    //% blockId=block_settings_set_registered_string
    //% block="set registered string setting $name to $value"
    //% group="Setters"
    //% weight=90
    export function setRegisteredString(name: string, value: string): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.String)
                    return

                settings.writeString(name, value)

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered boolean setting.
     * Does nothing if the setting is not registered as a boolean.
     *
     * @param name The name of the registered setting
     * @param value The new boolean value
     */
    //% blockId=block_settings_set_registered_boolean
    //% block="set registered boolean setting $name to $value"
    //% group="Setters"
    //% weight=80
    export function setRegisteredBoolean(name: string, value: boolean): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Boolean)
                    return

                settings.writeNumber(name, value == true ? 1 : 0)

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered image setting.
     * Does nothing if the setting is not registered as an image.
     *
     * @param name The name of the registered setting
     * @param value The new image value
     */
    //% blockId=block_settings_set_registered_image
    //% block="set registered image setting $name to $value"
    //% value.shadow="screen_image_picker"
    //% group="Setters"
    //% weight=70
    export function setRegisteredImage(name: string, value: Image): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.Image)
                    return

                writeImage(name, value)

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered number array setting.
     * Does nothing if the setting is not registered as a number array.
     *
     * @param name The name of the registered setting
     * @param value The new number array
     */
    //% blockId=block_settings_set_registered_number_array
    //% block="set registered number array setting $name to $value"
    //% group="Setters"
    //% weight=60
    export function setRegisteredNumberArray(name: string, value: number[]): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.NumberArray)
                    return

                settings.writeNumberArray(name, cloneNumberArray(value))

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered string array setting.
     * Does nothing if the setting is not registered as a string array.
     *
     * @param name The name of the registered setting
     * @param value The new string array
     */
    //% blockId=block_settings_set_registered_string_array
    //% block="set registered string array setting $name to $value"
    //% group="Setters"
    //% weight=50
    export function setRegisteredStringArray(name: string, value: string[]): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.StringArray)
                    return

                settings.writeNumberArray(
                    name,
                    stringToNumberArray(value)
                )

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered boolean array setting.
     * Does nothing if the setting is not registered as a boolean array.
     *
     * @param name The name of the registered setting
     * @param value The new boolean array
     */
    //% blockId=block_settings_set_registered_boolean_array
    //% block="set registered boolean array setting $name to $value"
    //% group="Setters"
    //% weight=40
    export function setRegisteredBooleanArray(name: string, value: boolean[]): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.BooleanArray)
                    return

                let result: number[] = []

                for (let j = 0; j < value.length; j++) {
                    result.push(value[j] == true ? 1 : 0)
                }

                settings.writeNumberArray(name, result)

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Set the value of a registered image array setting.
     * Does nothing if the setting is not registered as an image array.
     *
     * @param name The name of the registered setting
     * @param value The new image array
     */
    //% blockId=block_settings_set_registered_image_array
    //% block="set registered image array setting $name to $value"
    //% value.shadow="lists_create_with" value.defl="screen_image_picker"
    //% group="Setters"
    //% weight=30
    export function setRegisteredImageArray(name: string, value: Image[]): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            if (setting.name === name) {
                if (setting.type !== SettingType.ImageArray)
                    return

                settings.writeNumberArray(
                    name,
                    imageArrayToNumberArray(value)
                )

                fireSettingChangeEvents(setting)

                return
            }
        }
    }

    /**
     * Calls the event when the specified setting's value changes 
     * 
     * @param name The name of the setting 
     * @param handler The body; The code to run
     */
    //% blockId=block_settings_on_changed
    //% block="on setting $name changed"
    //% group="Events"
    //% weight=100
    export function onSettingChanged(
        name: string,
        handler: () => void
    ): void {
        settingChangeHandlers.push({
            name: name,
            handler: handler
        })
    }

    /**
     * Calls the event whenever any registered setting's value changes.
     *
     * @param handler The body; The code to run
     */
    //% blockId=block_settings_on_any_changed
    //% block="on any setting changed"
    //% group="Events"
    //% weight=90
    export function onAnySettingChanged(
        handler: (name: string) => void
    ): void {
        anySettingChangeHandlers.push({
            handler: handler
        })
    }

    /**
     * Calls the event whenever a registered setting of the specified type changes.
     *
     * @param type The type of setting to watch
     * @param handler The body; The code to run
     */
    //% blockId=block_betterbettersettings_on_type_changed
    //% block="on setting of type $type changed"
    //% group="Events"
    //% weight=80
    export function onSettingTypeChanged(
        type: SettingType,
        handler: (name: string) => void
    ): void {
        settingTypeChangeHandlers.push({
            type: type,
            handler: handler
        })
    }

    /**
     * Calls the event whenever the specified setting is registered.
     *
     * @param name The name of the setting
     * @param handler The body; The code to run
     */
    //% blockId=block_betterbettersettings_on_registered
    //% block="on setting $name registered"
    //% group="Events"
    //% weight=70
    export function onSettingRegistered(
        name: string,
        handler: () => void
    ): void {
        settingRegisteredHandlers.push({
            name: name,
            handler: handler
        })
    }

    /**
     * Calls the event whenever any setting is unregistered.
     *
     * @param handler The body; The code to run
     */
    //% blockId=block_betterbettersettings_on_any_unregistered
    //% block="on any setting unregistered"
    //% group="Events"
    //% weight=55
    export function onAnySettingUnregistered(
        handler: (name: string) => void
    ): void {
        anySettingUnregisteredHandlers.push({
            handler: handler
        })
    }

    /**
     * Calls the event whenever the specified setting is unregistered.
     *
     * @param name The name of the setting
     * @param handler The body; The code to run
     */
    //% blockId=block_betterbettersettings_on_unregistered
    //% block="on setting $name unregistered"
    //% group="Events"
    //% weight=60
    export function onSettingUnregistered(
        name: string,
        handler: () => void
    ): void {
        settingUnregisteredHandlers.push({
            name: name,
            handler: handler
        })
    }

    /**
     * Calls the event whenever any setting is registered.
     *
     * @param handler The body; The code to run
     */
    //% blockId=block_betterbettersettings_on_any_registered
    //% block="on any setting registered"
    //% group="Events"
    //% weight=65
    export function onAnySettingRegistered(
        handler: (name: string) => void
    ): void {
        anySettingRegisteredHandlers.push({
            handler: handler
        })
    }

    function applyAllSettings(): void {
        for (let i = 0; i < registeredSettings.length; i++) {
            let setting = registeredSettings[i]

            applySetting(setting)

            fireSettingChangeEvents(setting)
        }
    }

    function canRegisterSetting(name: string, type: SettingType): boolean {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                return registeredSettings[i].type === type
            }
        }

        return true
    }


    function registerNumberSetting(name: string, value: number): boolean {
        if (!canRegisterSetting(name, SettingType.Number)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultNumber = value
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.Number,

            defaultNumber: value,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: [],

            lastNumber: value,
            lastString: "",
            lastBoolean: false,
            lastImage: image.create(1, 1),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerStringSetting(name: string, value: string): boolean {
        if (!canRegisterSetting(name, SettingType.String))
            return false

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultString = value
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.String,

            defaultNumber: 0,
            defaultString: value,
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: [],

            lastNumber: 0,
            lastString: value,
            lastBoolean: false,
            lastImage: image.create(1, 1),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerBooleanSetting(name: string, value: boolean): boolean {
        if (!canRegisterSetting(name, SettingType.Boolean)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultBoolean = value
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.Boolean,

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: value,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: [],

            lastNumber: 0,
            lastString: "",
            lastBoolean: value,
            lastImage: image.create(1, 1),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: []
        })
        
        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerImageSetting(name: string, value: Image): boolean {
        if (!canRegisterSetting(name, SettingType.Image)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultImage = cloneImage(value)
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.Image,

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: cloneImage(value),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: [],

            lastNumber: 0,
            lastString: "",
            lastBoolean: false,
            lastImage: cloneImage(value),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerNumberArraySetting(name: string, value: number[]): boolean {
        if (!canRegisterSetting(name, SettingType.NumberArray)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultNumberArray = cloneNumberArray(value)
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.NumberArray,

            lastNumber: 0,
            lastString: "",
            lastBoolean: false,
            lastImage: image.create(1, 1),

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: cloneNumberArray(value),
            defaultBooleanArray: [],
            defaultImageArray: [],
            
            lastStringArray: [],
            lastNumberArray: cloneNumberArray(value),
            lastBooleanArray: [],
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerStringArraySetting(name: string, value: string[]): boolean {
        if (!canRegisterSetting(name, SettingType.StringArray)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultStringArray = cloneStringArray(value)
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.StringArray,

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: cloneStringArray(value),
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: [],

            lastNumber: 0,
            lastString: "",
            lastBoolean: false,
            lastImage: image.create(1, 1),

            lastStringArray: cloneStringArray(value),
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerBooleanArraySetting(name: string, value: boolean[]): boolean {
        if (!canRegisterSetting(name, SettingType.BooleanArray)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultBooleanArray = cloneBooleanArray(value)
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.BooleanArray,

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: cloneBooleanArray(value),
            defaultImageArray: [],

            lastNumber: 0,
            lastString: "",
            lastBoolean: false,
            lastImage: image.create(1, 1),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: cloneBooleanArray(value),
            lastImageArray: []
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function registerImageArraySetting(name: string, value: Image[]): boolean {
        if (!canRegisterSetting(name, SettingType.ImageArray)) return false;

        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name) {
                registeredSettings[i].defaultImageArray = cloneImageArray(value)
                return true
            }
        }

        registeredSettings.push({
            name: name,
            type: SettingType.ImageArray,

            defaultNumber: 0,
            defaultString: "",
            defaultBoolean: false,
            defaultImage: image.create(1, 1),

            defaultStringArray: [],
            defaultNumberArray: [],
            defaultBooleanArray: [],
            defaultImageArray: cloneImageArray(value),

            lastNumber: 0,
            lastString: "",
            lastBoolean: false,
            lastImage: image.create(1, 1),

            lastStringArray: [],
            lastNumberArray: [],
            lastBooleanArray: [],
            lastImageArray: cloneImageArray(value)
        })

        fireSettingRegisteredEvents(
            registeredSettings[registeredSettings.length - 1]
        )

        return true
    }

    function updateLastValue(setting: SettingEntry): void {
        switch (setting.type) {
            case SettingType.Number:
                setting.lastNumber = readNumber(setting.name)
                break

            case SettingType.String:
                setting.lastString = readString(setting.name)
                break

            case SettingType.Boolean:
                setting.lastBoolean = readBoolean(setting.name)
                break

            case SettingType.Image:
                setting.lastImage = cloneImage(readImage(setting.name))
                break

            case SettingType.StringArray:
                setting.lastStringArray = cloneStringArray(
                    readStringArray(setting.name)
                )
                break

            case SettingType.NumberArray:
                setting.lastNumberArray = cloneNumberArray(
                    readNumberArray(setting.name)
                )
                break

            case SettingType.BooleanArray:
                setting.lastBooleanArray = cloneBooleanArray(
                    readBooleanArray(setting.name)
                )
                break

            case SettingType.ImageArray:
                setting.lastImageArray = cloneImageArray(
                    readImageArray(setting.name)
                )
                break

            case SettingType.Unknown:
                return
        }
    }

    function settingChanged(setting: SettingEntry): boolean {
        switch (setting.type) {
            case SettingType.Number:
                return numberSettingChanged(setting)

            case SettingType.String:
                return stringSettingChanged(setting)

            case SettingType.Boolean:
                return booleanSettingChanged(setting)

            case SettingType.Image:
                return imageSettingChanged(setting)

            case SettingType.StringArray:
                return stringArraySettingChanged(setting)

            case SettingType.NumberArray:
                return numberArraySettingChanged(setting)

            case SettingType.BooleanArray:
                return booleanArraySettingChanged(setting)

            case SettingType.ImageArray:
                return imageArraySettingChanged(setting)

            case SettingType.Unknown:
                return false
        }

        return false
    }

    function numberSettingChanged(setting: SettingEntry): boolean {
        let value = readNumber(setting.name)

        if (value !== setting.lastNumber) {
            setting.lastNumber = value
            return true
        }

        return false
    }

    function stringSettingChanged(setting: SettingEntry): boolean {
        let value = readString(setting.name)

        if (value !== setting.lastString) {
            setting.lastString = value
            return true
        }

        return false
    }

    function booleanSettingChanged(setting: SettingEntry): boolean {
        let value = readBoolean(setting.name)

        if (value !== setting.lastBoolean) {
            setting.lastBoolean = value
            return true
        }

        return false
    }

    function imageSettingChanged(setting: SettingEntry): boolean {
        let value = readImage(setting.name)

        if (!imagesEqual(value, setting.lastImage)) {
            setting.lastImage = cloneImage(value)
            return true
        }

        return false
    }

    function numberArraySettingChanged(setting: SettingEntry): boolean {
        let value = readNumberArray(setting.name)

        if (!numberArraysEqual(value, setting.lastNumberArray)) {
            setting.lastNumberArray = cloneNumberArray(value)
            return true
        }

        return false
    }

    function stringArraySettingChanged(setting: SettingEntry): boolean {
        let value = readStringArray(setting.name)

        if (!stringArraysEqual(value, setting.lastStringArray)) {
            setting.lastStringArray = cloneStringArray(value)
            return true
        }

        return false
    }

    function booleanArraySettingChanged(setting: SettingEntry): boolean {
        let value = readBooleanArray(setting.name)

        if (!booleanArraysEqual(value, setting.lastBooleanArray)) {
            setting.lastBooleanArray = cloneBooleanArray(value)
            return true
        }

        return false
    }

    function imageArraySettingChanged(setting: SettingEntry): boolean {
        let value = readImageArray(setting.name)

        if (!imageArraysEqual(value, setting.lastImageArray)) {
            setting.lastImageArray = cloneImageArray(value)
            return true
        }

        return false
    }

    function cloneStringArray(value: string[]): string[] {
        let result: string[] = []

        for (let i = 0; i < value.length; i++) {
            result.push(value[i])
        }

        return result
    }

    function cloneNumberArray(value: number[]): number[] {
        let result: number[] = []

        for (let i = 0; i < value.length; i++) {
            result.push(value[i])
        }

        return result
    }

    function cloneBooleanArray(value: boolean[]): boolean[] {
        let result: boolean[] = []

        for (let i = 0; i < value.length; i++) {
            result.push(value[i])
        }

        return result
    }

    function cloneImage(value: Image): Image {
        return value.clone()
    }

    function cloneImageArray(value: Image[]): Image[] {
        let result: Image[] = []

        for (let i = 0; i < value.length; i++) {
            result.push(value[i].clone())
        }

        return result
    }

    function getRegisteredSetting(name: string): SettingEntry {
        for (let i = 0; i < registeredSettings.length; i++) {
            if (registeredSettings[i].name === name)
                return registeredSettings[i]
        }

        return null
    }

    // Register a number setting without overwriting an existing value.
    function registerNumberSettingDefault(name: string, value: number): void {
        if (!registerNumberSetting(name, value))
            return

        if (!settings.exists(name)) {
            settings.writeNumber(name, value)
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerStringSettingDefault(name: string, value: string): void {
        if (!registerStringSetting(name, value))
            return

        if (!settings.exists(name)) {
            settings.writeString(name, value)
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerBooleanSettingDefault(name: string, value: boolean): void {
        if (!registerBooleanSetting(name, value))
            return

        if (!settings.exists(name)) {
            settings.writeNumber(name, value == true ? 1 : 0)
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerImageSettingDefault(name: string, value: Image): void {
        if (!registerImageSetting(name, value))
            return

        if (!settings.exists(name)) {
            let width = value.width
            let height = value.height

            settings.writeNumberArray(
                name,
                [width, height].concat(imageToArray(value))
            )
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerNumberArraySettingDefault(name: string, value: number[]): void {
        if (!registerNumberArraySetting(name, value)) return

 

        if (!settings.exists(name)) {
            settings.writeNumberArray(
                name,
                cloneNumberArray(value)
            )
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerStringArraySettingDefault(name: string, value: string[]): void {
        if (!registerStringArraySetting(name, value)) return

        if (!settings.exists(name)) {
            settings.writeNumberArray(
                name,
                stringToNumberArray(value)
            )
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerBooleanArraySettingDefault(name: string, value: boolean[]): void {
        if (!registerBooleanArraySetting(name, value)) return

        if (!settings.exists(name)) {
            let result: number[] = []

            for (let i = 0; i < value.length; i++) {
                result.push(value[i] == true ? 1 : 0)
            }

            settings.writeNumberArray(name, result)
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function registerImageArraySettingDefault(name: string, value: Image[]): void {
        if (!registerImageArraySetting(name, value)) return

        if (!settings.exists(name)) {
            settings.writeNumberArray(
                name,
                imageArrayToNumberArray(value)
            )
        }

        let setting = getRegisteredSetting(name)

        if (setting)
            updateLastValue(setting)
    }

    function imagesEqual(a: Image, b: Image): boolean {
        if (a.width !== b.width || a.height !== b.height)
            return false

        for (let y = 0; y < a.height; y++) {
            for (let x = 0; x < a.width; x++) {
                if (a.getPixel(x, y) !== b.getPixel(x, y))
                    return false
            }
        }

        return true
    }

    function stringArraysEqual(a: string[], b: string[]): boolean {
        if (a.length !== b.length)
            return false

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false
        }

        return true
    }

    function numberArraysEqual(a: number[], b: number[]): boolean {
        if (a.length !== b.length)
            return false

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false
        }

        return true
    }

    function booleanArraysEqual(a: boolean[], b: boolean[]): boolean {
        if (a.length !== b.length)
            return false

        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false
        }

        return true
    }

    function imageArraysEqual(a: Image[], b: Image[]): boolean {
        if (a.length !== b.length)
            return false

        for (let i = 0; i < a.length; i++) {
            if (!imagesEqual(a[i], b[i]))
                return false
        }

        return true
    }

    function fireSettingChangedHandlers(setting: SettingEntry): void {
        for (let i = 0; i < settingChangeHandlers.length; i++) {
            if (settingChangeHandlers[i].name === setting.name) {
                settingChangeHandlers[i].handler()
            }
        }
    }

    function fireSettingTypeChangedHandlers(setting: SettingEntry): void {
        for (let i = 0; i < settingTypeChangeHandlers.length; i++) {
            if (settingTypeChangeHandlers[i].type === setting.type) {
                settingTypeChangeHandlers[i].handler(setting.name)
            }
        }
    }

    function fireAnySettingChangedHandlers(setting: SettingEntry): void {
        for (let i = 0; i < anySettingChangeHandlers.length; i++) {
            anySettingChangeHandlers[i].handler(setting.name)
        }
    }

    function fireSettingRegisteredHandlers(setting: SettingEntry): void {
        for (let i = 0; i < settingRegisteredHandlers.length; i++) {
            if (settingRegisteredHandlers[i].name === setting.name) {
                settingRegisteredHandlers[i].handler()
            }
        }
    }

    function fireAnySettingRegisteredHandlers(setting: SettingEntry): void {
        for (let i = 0; i < anySettingRegisteredHandlers.length; i++) {
            anySettingRegisteredHandlers[i].handler(setting.name)
        }
    }

    function fireSettingRegisteredEvents(setting: SettingEntry): void {
        fireSettingRegisteredHandlers(setting)
        fireAnySettingRegisteredHandlers(setting)
    }

    function fireSettingChangeEvents(setting: SettingEntry): void {
        if (!settingChanged(setting))
            return

        fireSettingChangedHandlers(setting)
        fireAnySettingChangedHandlers(setting)
        fireSettingTypeChangedHandlers(setting)
    }

    function fireSettingUnregisteredHandlers(
        setting: SettingEntry
    ): void {
        for (let i = 0; i < settingUnregisteredHandlers.length; i++) {
            if (settingUnregisteredHandlers[i].name === setting.name) {
                settingUnregisteredHandlers[i].handler()
            }
        }
    }

    function fireAnySettingUnregisteredHandlers(
        setting: SettingEntry
    ): void {
        for (let i = 0; i < anySettingUnregisteredHandlers.length; i++) {
            anySettingUnregisteredHandlers[i].handler(setting.name)
        }
    }

    function fireSettingUnregisteredEvents(
        setting: SettingEntry
    ): void {
        fireSettingUnregisteredHandlers(setting)
        fireAnySettingUnregisteredHandlers(setting)
    }




}