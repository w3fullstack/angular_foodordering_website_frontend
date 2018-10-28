import { Injectable } from '@angular/core';
import { NbLayoutDirectionService } from '../../../services/direction.service';
import { NbPopoverPlacement, NbPopoverLogicalPlacement } from './model';
var NbPlacementHelper = /** @class */ (function () {
    function NbPlacementHelper(layoutDirectionService) {
        this.layoutDirectionService = layoutDirectionService;
    }
    /*
     * Maps logical position to physical according to current layout direction.
     * */
    /*
       * Maps logical position to physical according to current layout direction.
       * */
    NbPlacementHelper.prototype.toPhysicalPlacement = /*
       * Maps logical position to physical according to current layout direction.
       * */
    function (placement) {
        var isLtr = this.layoutDirectionService.isLtr();
        if (placement === NbPopoverLogicalPlacement.START) {
            return isLtr ? NbPopoverPlacement.LEFT : NbPopoverPlacement.RIGHT;
        }
        if (placement === NbPopoverLogicalPlacement.END) {
            return isLtr ? NbPopoverPlacement.RIGHT : NbPopoverPlacement.LEFT;
        }
        return placement;
    };
    NbPlacementHelper.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbPlacementHelper.ctorParameters = function () { return [
        { type: NbLayoutDirectionService, },
    ]; };
    return NbPlacementHelper;
}());
export { NbPlacementHelper };
//# sourceMappingURL=placement.helper.js.map