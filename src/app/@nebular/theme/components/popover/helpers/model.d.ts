import { Observable } from 'rxjs';
/**
 * Describes placement of the UI element on the screen.
 * */
export declare class NbPopoverPosition {
    placement: NbPopoverPlacement;
    position: {
        top: number;
        left: number;
    };
}
/**
 * Adjustment strategies.
 * */
export declare enum NbPopoverAdjustment {
    CLOCKWISE = "clockwise",
    COUNTERCLOCKWISE = "counterclockwise",
}
/**
 * Arrangement of one element relative to another.
 * */
export declare enum NbPopoverPlacement {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
}
export declare enum NbPopoverLogicalPlacement {
    START = "start",
    END = "end",
}
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export declare enum NbPopoverMode {
    CLICK = "click",
    HOVER = "hover",
    HINT = "hint",
}
/**
 * Popover uses different triggers for different {@link NbPopoverMode}.
 * see {@link NbTriggerHelper}
 * */
export declare class NbPopoverTrigger {
    toggle: Observable<Event>;
    open: Observable<Event>;
    close: Observable<Event>;
}
