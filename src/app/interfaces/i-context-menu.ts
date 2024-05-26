export interface IContextMenu {
    data?: any;
    items: IContextMenuItem[];
}

export interface IContextMenuItem {
    label: string;
    action: CallableFunction;
}
