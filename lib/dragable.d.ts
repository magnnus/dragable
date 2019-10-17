export interface Iconfig {
    selector: string;
    dragArea: string;
    zIndex?: number;
    benchWidth?: number;
    container?: Window | Document | string | null | undefined;
}
export default class Dragable {
    config: Iconfig;
    constructor(config: Iconfig);
    target: HTMLElement;
    dragArea: ArrayLike<HTMLElement>;
    container: Window | HTMLElement;
    protected getContainerRect(): {
        width: number;
        height: number;
    };
    dragListener: (e: MouseEvent) => void;
    draging: boolean;
    init(): void;
    destroy(): void;
    resetPos: () => void;
    private timer;
    private resizeListener;
}
