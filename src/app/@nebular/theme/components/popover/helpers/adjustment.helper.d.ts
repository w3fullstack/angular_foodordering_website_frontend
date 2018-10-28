import { NbPositioningHelper } from './positioning.helper';
import { NbPopoverAdjustment, NbPopoverPlacement, NbPopoverPosition } from './model';
export declare class NbAdjustmentHelper {
    private positioningHelper;
    private window;
    constructor(positioningHelper: NbPositioningHelper, window: any);
    /**
     * Calculated {@link NbPopoverPosition} based on placed element, host element,
     * placed element placement and adjustment strategy.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param host {ClientRect} host element.
     * @param placement {NbPopoverPlacement} placed element placement relatively host.
     * @param adjustment {NbPopoverAdjustment} adjustment strategy.
     *
     * @return {NbPopoverPosition} calculated position.
     * */
    adjust(placed: ClientRect, host: ClientRect, placement: NbPopoverPlacement, adjustment: NbPopoverAdjustment): NbPopoverPosition;
    /**
     * Searches first adjustment which doesn't go beyond the viewport.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param possible {NbPopoverPosition[]} possible positions list ordered according to adjustment strategy.
     *
     * @return {NbPopoverPosition} calculated position.
     * */
    private chooseBest(placed, possible);
    /**
     * Finds out is adjustment doesn't go beyond of the view port.
     *
     * @param placed {ClientRect} placed element relatively host.
     * @param position {NbPopoverPosition} position of the placed element.
     *
     * @return {boolean} true if placed element completely viewport.
     * */
    private inViewPort(placed, position);
    /**
     * Reorder placements list to make placement start point and fit {@link NbPopoverAdjustment}
     *
     * @param placement {NbPopoverPlacement} active placement
     * @param placements {NbPopoverPlacement[]} placements list according to the active adjustment strategy.
     *
     * @return {NbPopoverPlacement[]} correctly ordered placements list.
     *
     * @example order placements for {@link NbPopoverPlacement#RIGHT} and {@link NbPopoverAdjustment#CLOCKWISE}
     * ```
     * const placements = NB_ORDERED_PLACEMENTS[NbPopoverAdjustment.CLOCKWISE];
     * const ordered = orderPlacement(NbPopoverPlacement.RIGHT, placements);
     *
     * expect(ordered).toEqual([
     *  NbPopoverPlacement.RIGHT,
     *  NbPopoverPlacement.BOTTOM,
     *  NbPopoverPlacement.LEFT,
     *  NbPopoverPlacement.TOP,
     * ]);
     * ```
     * */
    private orderPlacements(placement, placements);
}
