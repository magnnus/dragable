export interface Iconfig {
  dragArea?: string;
  zIndex?: number;
  benchWidth?: number;
  container?: Window | Document | string | null | undefined;
};

export default class Dragable {
  constructor (public selector: string, public config: Iconfig = {}) {
    // step 1. init target
    if (typeof selector !== 'string') {
      throw new Error('Wrong Type: the selector param must be a String!');
    }
    this.target = document.querySelector(selector);
    if (!this.target) {
      throw new Error(`Not Found: the element can't be found with the 'selector' param`);
    }

    // step 2. init dragArea
    if (!config.dragArea) {
      this.dragArea = [this.target];
    } else if (typeof config.dragArea === 'string') {
      this.dragArea = this.target.querySelectorAll(config.dragArea);
      if (!this.dragArea) {
        throw new Error(`Not Found: this 'dragArea' elements can't be found in the 'selector' element`);
      }
    } else {
      throw new Error('Wrong Type: the dragArea param must be a String');
    }

    // step 3. init container
    if (config.container === window || config.container === document || !config.container) {
      this.container = window;
    } else if (typeof config.container === 'string') {
      this.container = document.querySelector<HTMLElement>(config.container);
      if (!this.container.contains(this.target)) {
        throw new Error(`Not Found: the 'selector' element can't be found in the 'container' element`);
      }
    } else {
      throw new Error('Wrong Type: the container param must be a String or Window / Document object!');
    }

    // step 3. init optional params
    if (!config.zIndex) {
      this.config.zIndex = 999;
    }

    if (!config.benchWidth) {
      this.config.benchWidth = 1200;
    }

    // step 4. init event
    this.init();
  }

  public target: HTMLElement;

  public dragArea: ArrayLike<HTMLElement>;

  public container: Window | HTMLElement;

  protected getContainerRect (): {width: number; height: number} {
    if (this.container === window) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    if (this.container instanceof HTMLElement) {
      return {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      };
    }
  }

  public dragListener = (e: MouseEvent): void => {
    this.draging = true;
    const rect = this.target.getBoundingClientRect();
    const disX = e.pageX - rect.left;
    const disY = e.pageY - rect.top;

    const move = (e: MouseEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      if (this.draging) {
        const rect = this.getContainerRect();
        const clientHeight = rect.height;
        const clientWidth = rect.width;
        let top = e.pageY - disY;
        let left = e.pageX - disX;
        if (this.container !== window) {
          const rect = (this.container as HTMLElement).getBoundingClientRect();
          top -= rect.top;
          left -= rect.left;
        }
        if (top < 0) {
          top = 0;
        } else if (clientHeight - top < this.target.offsetHeight) {
          top = clientHeight - this.target.offsetHeight;
        }
        if (left < 0) {
          left = 0;
        } else if (clientWidth - left < this.target.offsetWidth) {
          left = clientWidth - this.target.offsetWidth;
        }
        this.target.style.top = top + 'px';
        this.target.style.left = left + 'px';
        this.target.style.right = 'auto';
      }
    };

    const stop = (): void => {
      this.draging = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  }

  public draging: boolean;

  public init (): void {
    if (this.container === window) {
      this.target.style.cssText = `position: fixed; z-index: ${this.config.zIndex}`;
    } else {
      this.target.style.cssText = `position: absolute; z-index: ${this.config.zIndex}`;
    }
    this.draging = false;
    Array.prototype.slice.call(this.dragArea).forEach((el: HTMLElement) => {
      el.addEventListener('mousedown', this.dragListener, false);
    });
    if (this.container === window) {
      window.addEventListener('resize', this.resizeListener);
    }
  }

  public destroy (): void {
    this.draging = false;
    Array.prototype.slice.call(this.dragArea).forEach((el: HTMLElement) => {
      el.removeEventListener('mousedown', this.dragListener, false);
    });
  }

  public resetPos = (): void => {
    if (this.container !== window) {
      return;
    }
    const targetWidth = this.target.offsetWidth;
    const clientWidth = this.getContainerRect().width;
    const benchContainerWidth = 1200;
    if (clientWidth - benchContainerWidth < targetWidth * 2) {
      this.target.style.marginLeft = '0px';
      this.target.style.left = `${clientWidth - targetWidth}px`;
    } else {
      this.target.style.marginLeft = '0px';
      this.target.style.left = `left: ${clientWidth / 2 + benchContainerWidth / 2 + 10}px`;
    }
  }

  private timer: number;

  private resizeListener = (): void => {
    this.timer && window.clearTimeout(this.timer);
    this.timer = window.setTimeout(this.resetPos, 300);
  }
};
