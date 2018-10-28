import { NbPopoverMode, NbPopoverTrigger } from './model';
export declare class NbTriggerHelper {
    private document;
    constructor(document: any);
    /**
     * Creates open and close events streams based on popover {@link NbPopoverMode} mode.
     *
     * @param host {HTMLElement} popover host element.
     * @param getContainer {Function} popover container getter.
     * Getter required because listen can be called when container isn't initialized.
     * @param mode {NbPopoverMode} describes container triggering strategy.
     *
     * @return {NbPopoverTrigger} open and close events streams.
     * */
    createTrigger(host: HTMLElement, getContainer: Function, mode: NbPopoverMode): NbPopoverTrigger;
}
