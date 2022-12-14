export namespace Dolphin {
    interface LibraryInfo {
        libraryPath: string;
        libraryName?: string;
    }

    interface StartupInfo {
        organizationDomain?: string;
        organizationName?: string;
        applicationName?: string;
        applicationVersion?: string;
        applicationDisplayName?: string;
        userDirectoryPath?: string;
    }

    function loadLibrary(info: LibraryInfo): void;
    function startup(info: StartupInfo, preconfigure?: () => void): void;
    function shutdown(): void;
    function processOne(): void;
    function enableFrameHandler(enabled: boolean): void;
    function handleFrame(callback?: () => void): boolean;
}

export namespace Gui {
    namespace Application {
        function hasExited(): boolean;
    }

    namespace MainWindow {
        function setIcon(filename: string): void;
        function show(): void;
        function startGame(path: string): void;
        function setResetCallback(callback: () => void): void;
        function setEmulationStateChangedCallback(callback: (state: Core.State) => void): void;
        function close(): void;
        function asWidget(): Q.Widget;
        function getMenuBar(): Q.MenuBar;
        function findMenu(title: string): Q.Menu | undefined;
    }

    namespace Settings {
        // UI
        function setThemeName(theme_name: string): void;
        function setCurrentUserStyle(stylesheet_name: string): void;
        function getCurrentUserStyle(): string;
        function setUserStylesEnabled(enabled: boolean): void;
        function areUserStylesEnabled(): boolean;
        function isLogVisible(): boolean;
        function setLogVisible(visible: boolean): void;
        function isLogConfigVisible(): boolean;
        function setLogConfigVisible(visible: boolean): void;
        function setToolBarVisible(visible: boolean): void;
        function isToolBarVisible(): boolean;
        function setWidgetsLocked(locked: boolean): void;
        function areWidgetsLocked(): boolean;
        function refreshWidgetVisibility(): void;
        // GameList
        function getPaths(): string[];
        function addPath(path: string): void;
        function removePath(path: string): void;
        function getPreferredView(): boolean;
        function setPreferredView(list: boolean): void;
        function getDefaultGame(): string;
        function setDefaultGame(path: string): void;
        function refreshGameList(): void;
        function refreshMetadata(): void;
        function reloadTitleDB(): void;
        function isAutoRefreshEnabled(): boolean;
        function setAutoRefreshEnabled(enabled: boolean): void;
        // Emulation
        function getStateSlot(): number;
        function setStateSlot(slot: number): void;
        function isBatchModeEnabled(): boolean;
        function setBatchModeEnabled(batch: boolean): void;
        function isSDCardInserted(): boolean;
        function setSDCardInserted(inserted: boolean): void;
        function isUSBKeyboardConnected(): boolean;
        function setUSBKeyboardConnected(connected: boolean): void;
        // Graphics
        function setCursorVisibility(hideCursor: Enums.Config.ShowCursor): void;
        function getCursorVisibility(): Enums.Config.ShowCursor;
        function setLockCursor(lock_cursor: boolean): void;
        function getLockCursor(): boolean;
        function setKeepWindowOnTop(top: boolean): void;
        function isKeepWindowOnTopEnabled(): boolean;
        function getGraphicModsEnabled(): boolean;
        function setGraphicModsEnabled(enabled: boolean): void;
        // Audio
        function getVolume(): number;
        function setVolume(volume: number): void;
        function increaseVolume(volume: number): void;
        function decreaseVolume(volume: number): void;
        // Cheats
        function getCheatsEnabled(): boolean;
        function setCheatsEnabled(enabled: boolean): void;
        // Debug
        function setDebugModeEnabled(enabled: boolean): void;
        function isDebugModeEnabled(): boolean;
        function setRegistersVisible(enabled: boolean): void;
        function isRegistersVisible(): boolean;
        function setThreadsVisible(enabled: boolean): void;
        function isThreadsVisible(): boolean;
        function setWatchVisible(enabled: boolean): void;
        function isWatchVisible(): boolean;
        function setBreakpointsVisible(enabled: boolean): void;
        function isBreakpointsVisible(): boolean;
        function setCodeVisible(enabled: boolean): void;
        function isCodeVisible(): boolean;
        function setMemoryVisible(enabled: boolean): void;
        function isMemoryVisible(): boolean;
        function setNetworkVisible(enabled: boolean): void;
        function isNetworkVisible(): boolean;
        function setJITVisible(enabled: boolean): void;
        function isJITVisible(): boolean;
        // Fallback Region
        function getFallbackRegion(): Enums.DiscIO.Region;
        function setFallbackRegion(region: Enums.DiscIO.Region): void;
    }

    namespace Q {
        interface Widget {
        }

        namespace CommonDialogs {
            const enum StandardButtons {
                NoButton = 0x00000000,
                Ok = 0x00000400,
                Save = 0x00000800,
                SaveAll = 0x00001000,
                Open = 0x00002000,
                Yes = 0x00004000,
                YesToAll = 0x00008000,
                No = 0x00010000,
                NoToAll = 0x00020000,
                Abort = 0x00040000,
                Retry = 0x00080000,
                Ignore = 0x00100000,
                Close = 0x00200000,
                Cancel = 0x00400000,
                Discard = 0x00800000,
                Help = 0x01000000,
                Apply = 0x02000000,
                Reset = 0x04000000,
                RestoreDefaults = 0x08000000
            }

            function about(parent: Widget | undefined, title: string, text: string): void;
            function critical(parent: Widget | undefined, title: string, text: string, buttons?: StandardButtons,
                              defaultButton?: StandardButtons): StandardButtons;
            function information(parent: Widget | undefined, title: string, text: string, buttons?: StandardButtons,
                                 defaultButton?: StandardButtons): StandardButtons;
            function question(parent: Widget | undefined, title: string, text: string, buttons?: StandardButtons,
                              defaultButton?: StandardButtons): StandardButtons;
            function warning(parent: Widget | undefined, title: string, text: string, buttons?: StandardButtons,
                             defaultButton?: StandardButtons): StandardButtons;

            const enum ColorDialogOptions {
                ShowAlphaChannel = 0x00000001,
                NoButtons = 0x00000002
            }

            interface Color {
                r: number;
                g: number;
                b: number;
                a: number;
            }

            function getColor(parent?: Widget, title?: string, initial?: Color, options?: ColorDialogOptions): Color;

            const enum LineEditEchoMode {
                Normal,
                NoEcho,
                Password,
                PasswordEchoOnEdit
            }

            function getDouble(parent: Widget | undefined, title: string, label: string, value?: number,
                               minValue?: number, maxValue?: number, decimals?: number,
                               step?: number): [number, boolean];
            function getInt(parent: Widget | undefined, title: string, label: string, value?: number, minValue?: number,
                            maxValue?: number, step?: number): [number, boolean];
            function getItem(parent: Widget | undefined, title: string, label: string, items: string[],
                             current?: number, editable?: boolean): string;
            function getMultiLineText(parent: Widget | undefined, title: string, label: string, text?: string): string;
            function getText(parent: Widget | undefined, title: string, label: string, mode?: LineEditEchoMode,
                             text?: string): string;

            const enum FileDialogOptions {
                ShowDirsOnly = 0x00000001,
                DontResolveSymlinks = 0x00000002,
                DontConfirmOverwrite = 0x00000004,
                ReadOnly = 0x00000010,
                HideNameFilterDetails = 0x00000020
            }

            function getExistingDirectory(parent?: Widget, caption?: string, dir?: string,
                                          options?: FileDialogOptions): string;
            function getOpenFileName(parent?: Widget, caption?: string, dir?: string, filter?: string,
                                     options?: FileDialogOptions): [string, string];
            function getOpenFileNames(parent?: Widget, caption?: string, dir?: string, filter?: string,
                                      options?: FileDialogOptions): [string[], string];
            function getSaveFileName(parent?: Widget, caption?: string, dir?: string, filter?: string,
                                     options?: FileDialogOptions): [string, string];
        }

        interface MenuBar {
            addMenu(title: string): Menu;
        }

        interface Menu {
            addSeparator(): Action;
            addMenu(title: string): Menu;
            addMenu(iconFileName: string, title: string): Menu;
            addAction(text: string): Action;
            addAction(iconFileName: string, text: string): Action;
            enabled: boolean;
            visible: boolean;
            setIcon(iconFileName: string): void;
            setTitle(title: string): void;
        }

        interface Action {
            setToggledCallback(callback: (checked: boolean) => void): void;
            setTriggeredCallback(callback: (checked: boolean) => void): void;
            enabled: boolean;
            visible: boolean;
            checkable: boolean;
            checked: boolean;
            setIcon(iconFileName: string): void;
            setText(text: string): void;
            setShortcut(shortcut: string): void;
        }
    }
}

export namespace AddressSpace {
    const enum Type {
        Effective,
        Auxiliary,
        Physical,
        Mem1,
        Mem2,
        Fake
    }

    function isValidAddress(address_space: Type, address: number): boolean;
    function get(address_space: Type): ArrayBuffer;
    function slice(address_space: Type, start: number, length?: number): ArrayBuffer;
    function search(address_space: Type, haystack_offset: number, needle: Uint8Array,
                    forward?: boolean): number | undefined;
}

export namespace Config {
    function getInt(prop: string, ...args: any[]): number;
    function getBool(prop: string, ...args: any[]): boolean;
    function getString(prop: string, ...args: any[]): string;
    function getFloat(prop: string, ...args: any[]): number;
    function getUint16(prop: string, ...args: any[]): number;
    function getUint32(prop: string, ...args: any[]): number;
    function setInt(prop: string, ...args: any[]): void;
    function setBool(prop: string, ...args: any[]): void;
    function setString(prop: string, ...args: any[]): void;
    function setFloat(prop: string, ...args: any[]): void;
    function setUint16(prop: string, ...args: any[]): void;
    function setUint32(prop: string, ...args: any[]): void;
}

export namespace Core {
    const enum State {
        Uninitialized,
        Paused,
        Running,
        Stopping,
        Starting
    }

    function getActualEmulationSpeed(): number;
    function isRunning(): boolean;
    function isRunningAndStarted(): boolean;
    function getState(): State;
    function setState(state: State): void;
    function saveScreenshot(name?: string): void;
    function saveScreenshotAs(filename: string): void;
    function displayMessage(message: string, time_in_ms: number): void;
    function doFrameStep(): void;
}

export namespace JitInterface {
    function clearCache(): void;
    function invalidateICache(address: number, size: number): void;
    function invalidateICacheLines(address: number, count: number): void;
}

export namespace Memory {
    function memset(address: number, value: number, size: number): void;
    function readU8(address: number): number;
    function readU16LE(address: number): number;
    function readU32LE(address: number): number;
    function readU64LE(address: number): bigint;
    function readF32LE(address: number): number;
    function readF64LE(address: number): number;
    function readU16BE(address: number): number;
    function readU32BE(address: number): number;
    function readU64BE(address: number): bigint;
    function readF32BE(address: number): number;
    function readF64BE(address: number): number;
    function readS8(address: number): number;
    function readS16LE(address: number): number;
    function readS32LE(address: number): number;
    function readS64LE(address: number): bigint;
    function readS16BE(address: number): number;
    function readS32BE(address: number): number;
    function readS64BE(address: number): bigint;
    function readBufferU8(address: number, size: number): Uint8Array;
    function readBitU8(address: number, bit_offset: number): boolean;
    function readBitsU8(address: number): Uint8Array;
    function readBitsBufferU8(address: number, size: number): Uint8Array;
    function writeU8(address: number, value: number): void;
    function writeU16LE(address: number, value: number): void;
    function writeU32LE(address: number, value: number): void;
    function writeU64LE(address: number, value: number | bigint): void;
    function writeF32LE(address: number, value: number): void;
    function writeF64LE(address: number, value: number): void;
    function writeU16BE(address: number, value: number): void;
    function writeU32BE(address: number, value: number): void;
    function writeU64BE(address: number, value: number | bigint): void;
    function writeF32BE(address: number, value: number): void;
    function writeF64BE(address: number, value: number): void;
    function writeBufferU8(address: number, data: Uint8Array): void;
    function writeBitU8(address: number, bit_offset: number, set: number | boolean): void;
    function writeBitsU8(address: number, data: Uint8Array): void;
    function writeBitsBufferU8(address: number, data: Uint8Array): void;
    function readPtrU8(address: number, offset: number): number;
    function readPtrU16LE(address: number, offset: number): number;
    function readPtrU32LE(address: number, offset: number): number;
    function readPtrU64LE(address: number, offset: number): bigint;
    function readPtrF32LE(address: number, offset: number): number;
    function readPtrF64LE(address: number, offset: number): number;
    function readPtrU16BE(address: number, offset: number): number;
    function readPtrU32BE(address: number, offset: number): number;
    function readPtrU64BE(address: number, offset: number): bigint;
    function readPtrF32BE(address: number, offset: number): number;
    function readPtrF64BE(address: number, offset: number): number;
    function readPtrS8(address: number, offset: number): number;
    function readPtrS16LE(address: number, offset: number): number;
    function readPtrS32LE(address: number, offset: number): number;
    function readPtrS64LE(address: number, offset: number): bigint;
    function readPtrS16BE(address: number, offset: number): number;
    function readPtrS32BE(address: number, offset: number): number;
    function readPtrS64BE(address: number, offset: number): bigint;
    function readPtrBufferU8(address: number, offset: number, size: number): Uint8Array;
    function readPtrBitU8(address: number, offset: number, bit_offset: number): boolean;
    function readPtrBitsU8(address: number, offset: number): Uint8Array;
    function readPtrBitsBufferU8(address: number, offset: number, size: number): Uint8Array;
    function writePtrU8(address: number, offset: number, value: number): void;
    function writePtrU16LE(address: number, offset: number, value: number): void;
    function writePtrU32LE(address: number, offset: number, value: number): void;
    function writePtrU64LE(address: number, offset: number, value: number | bigint): void;
    function writePtrF32LE(address: number, offset: number, value: number): void;
    function writePtrF64LE(address: number, offset: number, value: number): void;
    function writePtrU16BE(address: number, offset: number, value: number): void;
    function writePtrU32BE(address: number, offset: number, value: number): void;
    function writePtrU64BE(address: number, offset: number, value: number | bigint): void;
    function writePtrF32BE(address: number, offset: number, value: number): void;
    function writePtrF64BE(address: number, offset: number, value: number): void;
    function writePtrBufferU8(address: number, offset: number, data: Uint8Array): void;
    function writePtrBitU8(address: number, offset: number, bit_offset: number, set: number | boolean): void;
    function writePtrBitsU8(address: number, offset: number, data: Uint8Array): void;
    function writePtrBitsBufferU8(address: number, offset: number, data: Uint8Array): void;
    function readCStr(address: number, size?: number): string;
    function readPtrCStr(address: number, offset: number, size?: number): string;
}

export namespace Pad {
    namespace GC {
        const enum Buttons {
            Left = 0x0001,
            Right = 0x0002,
            Down = 0x0004,
            Up = 0x0008,
            Trigger_Z = 0x0010,
            Trigger_R = 0x0020,
            Trigger_L = 0x0040,
            A = 0x0100,
            B = 0x0200,
            X = 0x0400,
            Y = 0x0800,
            Start = 0x1000
        }

        interface Status {
            readonly button: Buttons;
            readonly stickX: number;
            readonly stickY: number;
            readonly substickX: number;
            readonly substickY: number;
            readonly triggerLeft: number;
            readonly triggerRight: number;
            readonly analogA: number;
            readonly analogB: number;
            readonly isConnected: number;
        }

        function getStatus(pad_num: number): Status;
        function rumble(pad_num: number, strength: number): void;
        function resetRumble(pad_num: number): void;
    }
}

export namespace State {
    function save(slot: number): void;
    function load(slot: number): void;
    function saveAs(filename: string): void;
    function loadAs(filename: string): void;
    function saveToBuffer(): Uint8Array;
    function loadFromBuffer(buffer: Uint8Array): void;
}

export namespace UICommon {
    interface GameBanner {
        readonly buffer: Uint8Array;
        readonly width: number;
        readonly height: number;
    }

    interface GameFile {
        readonly isValid: boolean;
        readonly filePath: string;
        readonly name: string;
        readonly maker: string;
        readonly description: string;
        readonly languages: Enums.DiscIO.Language;
        readonly internalName: string;
        readonly gameID: string;
        readonly gameTDBID: string;
        readonly titleID: bigint;
        readonly makerID: string;
        readonly revision: number;
        readonly discNumber: number;
        readonly syncHash: Uint8Array;
        readonly wiiFSPath: string;
        readonly region: Enums.DiscIO.Region;
        readonly country: Enums.DiscIO.Country;
        readonly platform: Enums.DiscIO.Platform;
        readonly blobType: Enums.DiscIO.BlobType;
        readonly blockSize: bigint;
        readonly compressionMethod: string;
        readonly fileFormatName: string;
        readonly apploaderDate: string;
        readonly fileSize: bigint;
        readonly volumeSize: bigint;
        readonly volumeSizeType: Enums.DiscIO.DataSizeType;
        readonly isDatelDisc: boolean;
        readonly isNKit: boolean;
        readonly isModDescriptor: boolean;
        readonly bannerImage: GameBanner;
        readonly localIniPath: string;
    }

    var GameFile: {
        new(path: string): GameFile;
    };

    function createDirectories(userDirectoryPath: string): void;
    function formatSize(bytes: number | bigint, decimals: number): string;
}

export namespace Util {
    function enablePatch(game: UICommon.GameFile, name: string): boolean;
    function enableARCode(game: UICommon.GameFile, name: string): boolean;
    function enableGeckoCode(game: UICommon.GameFile, name: string): boolean;

    interface VerifyResult {
        readonly sha1: Uint8Array;
        readonly goodDump: boolean;
    }

    function verifyDisc(game: UICommon.GameFile): [boolean, VerifyResult];
    function extractDisc(game: UICommon.GameFile, path: string): boolean;
}

export namespace Enums {
    const enum AspectMode {
        Auto,
        AnalogWide,
        Analog,
        Stretch
    }

    namespace AudioCommon {
        const enum DPL2Quality {
            Lowest,
            Low,
            High,
            Highest
        }
    }

    namespace Config {
        const enum ShowCursor {
            Never,
            Constantly,
            OnMovement
        }
    }

    namespace DiscIO {
        const enum BlobType {
            PLAIN,
            DRIVE,
            DIRECTORY,
            GCZ,
            CISO,
            WBFS,
            TGC,
            WIA,
            RVZ,
            MOD_DESCRIPTOR,
            NFS
        }

        const enum Country {
            Europe,
            Japan,
            USA,
            Australia,
            France,
            Germany,
            Italy,
            Korea,
            Netherlands,
            Russia,
            Spain,
            Taiwan,
            World,
            Unknown
        }

        const enum DataSizeType {
            Accurate,
            LowerBound,
            UpperBound
        }

        const enum Language {
            Japanese,
            English,
            German,
            French,
            Spanish,
            Italian,
            Dutch,
            SimplifiedChinese,
            TraditionalChinese,
            Korean,
            Unknown
        }

        const enum Platform {
            GameCubeDisc,
            WiiDisc,
            WiiWAD,
            ELFOrDOL
        }

        const enum Region {
            NTSC_J,
            NTSC_U,
            PAL,
            Unknown,
            NTSC_K
        }
    }

    namespace ExpansionInterface {
        const enum EXIDeviceType {
            Dummy,
            MemoryCard,
            MaskROM,
            AD16,
            Microphone,
            Ethernet,
            AMBaseboard,
            Gecko,
            MemoryCardFolder,
            AGP,
            EthernetXLink,
            EthernetTapServer,
            EthernetBuiltIn,
            None = 0xff
        }

        const enum Slot {
            A,
            B,
            SP1
        }
    }

    namespace FreeLook {
        const enum ControlType {
            SixAxis,
            FPS,
            Orbital
        }
    }

    namespace HSP {
        const enum HSPDeviceType {
            None,
            ARAMExpansion
        }
    }

    namespace PowerPC {
        const enum CPUCore {
            Interpreter,
            JIT64,
            JITARM64 = 4,
            CachedInterpreter
        }
    }

    namespace SerialInterface {
        const enum SIDevices {
            None,
            N64Mic,
            N64Keyboard,
            N64Mouse,
            N64Controller,
            GC_GBA,
            GCController,
            GCKeyboard,
            GCSteering,
            DanceMat,
            GCTaruKonga,
            AMBaseboard,
            WiiUAdapter,
            GC_GBA_Emulated
        }
    }

    const enum ShaderCompilationMode {
        Synchronous,
        SynchronousUberShaders,
        AsynchronousUberShaders,
        AsynchronousSkipRendering
    }

    const enum StereoMode {
        Off,
        SBS,
        TAB,
        Anaglyph,
        QuadBuffer,
        Passive
    }

    const enum TriState {
        Off,
        On,
        Auto
    }

    const enum WiimoteSource {
        None,
        Emulated,
        Real
    }
}
