export interface Iconfig {
    dragArea?: string;
    zIndex?: number;
    container?: Window | Document | string | null | undefined;
}
export default class Dragable {
    selector: string;
    config: Iconfig;
    constructor(selector: string, config?: Iconfig);
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
}
