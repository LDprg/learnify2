import {MenuItem} from "electron";
import {Color} from "./vs/base/common/color";
import {IMenuItem} from "./menuitem";
import {Disposable} from "./vs/base/common/lifecycle";
import {Event} from "./vs/base/common/event";
import {MenubarOptions} from "./types/menubar-options";

export declare const MENU_MNEMONIC_REGEX: RegExp;
export declare const MENU_ESCAPED_MNEMONIC_REGEX: RegExp;

export interface IMenuOptions {
    ariaLabel?: string;
    enableMnemonics?: boolean;
}

export interface IMenuStyle {
    foregroundColor?: Color;
    backgroundColor?: Color;
    selectionForegroundColor?: Color;
    selectionBackgroundColor?: Color;
    separatorColor?: Color;
}

interface ISubMenuData {
    parent: CETMenu;
    submenu?: CETMenu;
}

export declare class CETMenu extends Disposable {
    items: IMenuItem[];
    parentData: ISubMenuData;
    private focusedItem?;
    private menuContainer;
    private mnemonics;
    private menubarOptions?;
    private options;
    private closeSubMenu;
    private triggerKeys;
    private isTriggerKeyEvent;
    private updateFocusedItem;
    private focusNext;
    private focusPrevious;
    private updateFocus;
    private doTrigger;
    private cancel;
    private focusItemByElement;
    private setFocusedItem;

    constructor(container: HTMLElement, menubarOptions?: MenubarOptions, options?: IMenuOptions, closeSubMenu?: () => void);

    private _onDidCancel;

    get onDidCancel(): Event<void>;

    setAriaLabel(label: string): void;

    getContainer(): HTMLElement;

    createMenu(items: MenuItem[] | undefined): void;

    focus(index?: number): void;

    focus(selectFirst?: boolean): void;

    dispose(): void;

    style(style: IMenuStyle | undefined): void;
}

export declare function cleanMnemonic(label: string): string;

export {};
