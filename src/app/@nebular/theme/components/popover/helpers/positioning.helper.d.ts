import { NbPopoverPlacement } from './model';
export declare class NbPositioningHelper {
    private window;
    constructor(window: any);
    /**
     * Describes height of the popover arrow.
     * */
    private static ARROW_SIZE;
    /**
     * Contains position calculators for all {@link NbPopoverPlacement}
     * */
    private static positionCalculator;
    /**
     * Calculates position of the element relatively to the host element based on the placement.
     * */
    calcPosition(positioned: ClientRect, host: ClientRect, placement: NbPopoverPlacement): {
        top: number;
        left: number;
    };
}
