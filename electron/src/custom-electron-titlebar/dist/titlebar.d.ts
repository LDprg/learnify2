import {Menu} from 'electron';
import {Color} from './vs/base/common/color';
import {Menubar} from './menubar';
import {TitlebarOptions} from './types/titlebar-options';

export default class Titlebar {
    _titlebar: HTMLElement;
    _dragRegion: HTMLElement;
    _windowIcon: HTMLImageElement;
    _title: HTMLElement;
    _menubarContainer: HTMLElement;
    _windowControls: HTMLElement;
    _container: HTMLElement;
    _isInactive?: boolean;
    _menubar?: Menubar;
    _options: TitlebarOptions;
    _windowControlIcons: {
        minimize: HTMLElement;
        maximize: HTMLElement;
        close: HTMLElement;
    };
    _resizer: {
        top: HTMLElement;
        left: HTMLElement;
    };
    _defaultOptions: TitlebarOptions;
    _platformIcons: {
        [key: string]: string;
    };
    _closeMenu: () => void;

    constructor(titlebarOptions?: TitlebarOptions);

    _loadIcons(): void;

    _loadBackgroundColor(): void;

    _setupTitlebar(): void;

    _setupContainer(): void;

    _loadEvents(): void;

    _setupIcon(): void;

    _setupMenubar(): void;

    _setupTitle(): void;

    _setIconSize(size?: number): void;

    _createControl(control: HTMLElement, enabled: boolean | undefined, title: string, icon: string, className: string): void;

    _createControls(): void;

    _onBlur(): void;

    _onFocus(): void;

    _onMenubarVisibilityChanged(visible: boolean): void;

    _onMenubarFocusChanged(focused: boolean): void;

    _onDidChangeMaximized(isMaximized: Boolean): void;

    _updateStyles(): void;

    /**
     * Update title bar styles based on focus state.
     * @param hasFocus focus state of the window
     */
    onWindowFocus(focus: boolean): void;

    /**
     * Update the full screen state and hide or show the title bar.
     * @param fullscreen Fullscreen state of the window
     */
    onWindowFullScreen(fullscreen: boolean): void;

    /**
     * Update the background color of the title bar
     * @param backgroundColor The color for the background
     */
    updateBackground(backgroundColor: Color): Titlebar;

    /**
     * Update the item background color of the menubar
     * @param itemBGColor The color for the item background
     */
    updateItemBGColor(itemBGColor: Color): Titlebar;

    /**
     * Update the title of the title bar.
     * You can use this method if change the content of `<title>` tag on your html.
     * @param title The title of the title bar and document.
     */
    updateTitle(title: string): void;

    /**
     * It method set new icon to title-bar-icon of title-bar.
     * @param path path to icon
     */
    updateIcon(path?: string): void;

    /**
     * Update the default menu or set a new menu.
     * @param menu The menu.
     */
    updateMenu(menu: Menu): Titlebar;

    /**
     * Update the menu from Menu.getApplicationMenu()
     */
    refreshMenu(): Promise<void>;

    /**
     * Update the position of menubar.
     * @param menuPosition The position of the menu `left` or `bottom`.
     */
    updateMenuPosition(menuPosition: "left" | "bottom"): Titlebar;

    /**
     * Horizontal alignment of the title.
     * @param side `left`, `center` or `right`.
     */
    updateTitleAlignment(side: "left" | "center" | "right"): Titlebar;

    /**
     * Remove the titlebar, menubar and all methods.
     */
    dispose(): void;
}
