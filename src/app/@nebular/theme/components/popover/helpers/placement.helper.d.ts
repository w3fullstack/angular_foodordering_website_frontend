import { NbLayoutDirectionService } from '../../../services/direction.service';
import { NbPopoverPlacement, NbPopoverLogicalPlacement } from './model';
export declare class NbPlacementHelper {
    private layoutDirectionService;
    constructor(layoutDirectionService: NbLayoutDirectionService);
    toPhysicalPlacement(placement: NbPopoverPlacement | NbPopoverLogicalPlacement): NbPopoverPlacement;
}
