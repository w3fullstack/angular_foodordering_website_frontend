/**
 * Describes placement of the UI element on the screen.
 * */
var /**
 * Describes placement of the UI element on the screen.
 * */
NbPopoverPosition = /** @class */ (function () {
    function NbPopoverPosition() {
    }
    return NbPopoverPosition;
}());
/**
 * Describes placement of the UI element on the screen.
 * */
export { NbPopoverPosition };
/**
 * Adjustment strategies.
 * */
/**
 * Adjustment strategies.
 * */
export var NbPopoverAdjustment;
/**
 * Adjustment strategies.
 * */
(function (NbPopoverAdjustment) {
    NbPopoverAdjustment["CLOCKWISE"] = "clockwise";
    NbPopoverAdjustment["COUNTERCLOCKWISE"] = "counterclockwise";
})(NbPopoverAdjustment || (NbPopoverAdjustment = {}));
/**
 * Arrangement of one element relative to another.
 * */
/**
 * Arrangement of one element relative to another.
 * */
export var NbPopoverPlacement;
/**
 * Arrangement of one element relative to another.
 * */
(function (NbPopoverPlacement) {
    NbPopoverPlacement["TOP"] = "top";
    NbPopoverPlacement["BOTTOM"] = "bottom";
    NbPopoverPlacement["LEFT"] = "left";
    NbPopoverPlacement["RIGHT"] = "right";
})(NbPopoverPlacement || (NbPopoverPlacement = {}));
export var NbPopoverLogicalPlacement;
(function (NbPopoverLogicalPlacement) {
    NbPopoverLogicalPlacement["START"] = "start";
    NbPopoverLogicalPlacement["END"] = "end";
})(NbPopoverLogicalPlacement || (NbPopoverLogicalPlacement = {}));
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export var NbPopoverMode;
/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
(function (NbPopoverMode) {
    NbPopoverMode["CLICK"] = "click";
    NbPopoverMode["HOVER"] = "hover";
    NbPopoverMode["HINT"] = "hint";
})(NbPopoverMode || (NbPopoverMode = {}));
/**
 * Popover uses different triggers for different {@link NbPopoverMode}.
 * see {@link NbTriggerHelper}
 * */
var /**
 * Popover uses different triggers for different {@link NbPopoverMode}.
 * see {@link NbTriggerHelper}
 * */
NbPopoverTrigger = /** @class */ (function () {
    function NbPopoverTrigger() {
    }
    return NbPopoverTrigger;
}());
/**
 * Popover uses different triggers for different {@link NbPopoverMode}.
 * see {@link NbTriggerHelper}
 * */
export { NbPopoverTrigger };
//# sourceMappingURL=model.js.map