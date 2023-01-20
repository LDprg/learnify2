import {MenuItem} from "electron";
import {EventLike} from "./vs/base/common/dom";
import {IMenuOptions, IMenuStyle} from "./menu";
import {KeyCode} from "./vs/base/common/keyCodes";
import {Disposable} from "./vs/base/common/lifecycle";
import {MenubarOptions} from "./types/menubar-options";

export interface IMenuItem {
    render(element: HTMLElement): void;

    isEnabled(): boolean;

    isSeparator(): boolean;

    focus(): void;

    blur(): void;

    dispose(): void;
}

export declare class CETMenuItem extends Disposable implements IMenuItem {
    protected menubarOptions?: MenubarOptions;
    protected options: IMenuOptions;
    protected menuStyle?: IMenuStyle;
    protected container?: HTMLElement;
    protected itemElement?: HTMLElement;
    protected closeSubMenu: () => void;
    protected menuContainer?: IMenuItem[];
    private item;
    private radioGroup?;
    private labelElement?;
    private iconElement?;
    private mnemonic?;
    private menuIcons;

    constructor(item: MenuItem, options?: IMenuOptions, menubarOptions?: MenubarOptions, closeSubMenu?: () => void, menuContainer?: IMenuItem[]);

    getContainer(): HTMLElement | undefined;

    getItem(): MenuItem;

    isEnabled(): boolean;

    isSeparator(): boolean;

    render(container: HTMLElement): void;

    onClick(event: EventLike): void;

    focus(): void;

    blur(): void;

    setAccelerator(): void;

    updateLabel(): void;

    updateIcon(): void;

    updateTooltip(): void;

    updateEnabled(): void;

    updateVisibility(): void;

    updateChecked(): void;

    updateRadioGroup(): void;

    /** radioGroup index's starts with (previous separator +1 OR menuContainer[0]) and ends with (next separator OR menuContainer[length]) */
    getRadioGroup(): {
        start: number;
        end: number;
    };

    dispose(): void;

    getMnemonic(): KeyCode | undefined;

    style(style: IMenuStyle | undefined): void;

    protected applyStyle(): void;
}
