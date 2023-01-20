import {IMenuStyle} from './menu';
import {Event} from './vs/base/common/event';
import {MenubarOptions} from './types/menubar-options';

export declare class Menubar {
    private container;
    private options?;
    private menuItems;
    private focusedMenu;
    private focusToReturn;
    private openedViaKeyboard?;
    private awaitingAltRelease?;
    private ignoreNextMouseUp?;
    private mnemonics;
    private menuStyle?;
    private closeSubMenu;
    private registerListeners;
    private onClick;
    private updateLabels;
    private registerMnemonic;
    private hideMenubar;
    private showMenubar;
    private setUnfocusedState;
    private focusPrevious;
    private focusNext;
    private updateMnemonicVisibility;
    private onMenuTriggered;
    private onModifierKeyToggled;
    private isCurrentMenu;
    private cleanupMenu;
    private showMenu;

    constructor(container: HTMLElement, options?: MenubarOptions | undefined, closeSubMenu?: () => void);

    private _onVisibilityChange;

    get onVisibilityChange(): Event<boolean>;

    private _onFocusStateChange;

    get onFocusStateChange(): Event<boolean>;

    private _mnemonicsInUse?;

    private get mnemonicsInUse();

    private set mnemonicsInUse(value);

    private _focusState;

    private get focusState();

    private set focusState(value);

    private get isVisible();

    private get isFocused();

    private get isOpen();

    setupMenubar(): void;

    dispose(): void;

    blur(): void;

    setStyles(style: IMenuStyle): void;
}

export declare function escape(html: string): string;
