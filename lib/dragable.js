;
export default class Dragable {
    constructor(selector, config = {}) {
        this.selector = selector;
        this.config = config;
        this.dragListener = (e) => {
            this.draging = true;
            const rect = this.target.getBoundingClientRect();
            const disX = e.pageX - rect.left;
            const disY = e.pageY - rect.top;
            const move = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.draging) {
                    const rect = this.getContainerRect();
                    const clientHeight = rect.height;
                    const clientWidth = rect.width;
                    let top = e.pageY - disY;
                    let left = e.pageX - disX;
                    if (this.container !== window) {
                        const rect = this.container.getBoundingClientRect();
                        top -= rect.top;
                        left -= rect.left;
                    }
                    if (top < 0) {
                        top = 0;
                    }
                    else if (clientHeight - top < this.target.offsetHeight) {
                        top = clientHeight - this.target.offsetHeight;
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    else if (clientWidth - left < this.target.offsetWidth) {
                        left = clientWidth - this.target.offsetWidth;
                    }
                    this.target.style.cssText += `top: ${top}px; left: ${left}px; right: auto; bottom: auto; margin: 0;`;
                    // this.target.style.top = top + 'px';
                    // this.target.style.left = left + 'px';
                    // this.target.style.right = 'auto';
                    // this.target.style.bottom = 'auto';
                    // this.target.style.margin = '0px';
                }
            };
            const stop = () => {
                this.draging = false;
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', stop);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop);
        };
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
        }
        else if (typeof config.dragArea === 'string') {
            this.dragArea = this.target.querySelectorAll(config.dragArea);
            if (!this.dragArea) {
                throw new Error(`Not Found: this 'dragArea' elements can't be found in the 'selector' element`);
            }
        }
        else {
            throw new Error('Wrong Type: the dragArea param must be a String');
        }
        // step 3. init container
        if (config.container === window || config.container === document || !config.container) {
            this.container = window;
        }
        else if (typeof config.container === 'string') {
            this.container = document.querySelector(config.container);
            if (!this.container.contains(this.target)) {
                throw new Error(`Not Found: the 'selector' element can't be found in the 'container' element`);
            }
        }
        else {
            throw new Error('Wrong Type: the container param must be a String or Window / Document object!');
        }
        // step 3. init optional params
        if (!config.zIndex) {
            this.config.zIndex = 999;
        }
        // step 4. init event
        this.init();
    }
    getContainerRect() {
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
    init() {
        if (this.container === window) {
            this.target.style.cssText += `position: fixed; z-index: ${this.config.zIndex}`;
        }
        else {
            this.target.style.cssText += `position: absolute; z-index: ${this.config.zIndex}`;
        }
        this.draging = false;
        Array.prototype.slice.call(this.dragArea).forEach((el) => {
            el.addEventListener('mousedown', this.dragListener, false);
        });
    }
    destroy() {
        this.draging = false;
        this.target.style.cssText = '';
        Array.prototype.slice.call(this.dragArea).forEach((el) => {
            el.removeEventListener('mousedown', this.dragListener, false);
        });
    }
}
;
//# sourceMappingURL=dragable.js.map