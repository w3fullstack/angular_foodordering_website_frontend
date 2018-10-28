/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ComponentFactoryResolver, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NbPositioningHelper } from './helpers/positioning.helper';
import { NbPopoverContent } from './popover.component';
import { NbThemeService } from '../../services/theme.service';
import { NbAdjustmentHelper } from './helpers/adjustment.helper';
import { NbTriggerHelper } from './helpers/trigger.helper';
import { NbPopoverAdjustment, NbPopoverMode, NbPopoverPlacement, NbPopoverLogicalPlacement } from './helpers/model';
import { NbPlacementHelper } from './helpers/placement.helper';
/**
 * Powerful popover directive, which provides the best UX for your users.
 *
 * ![image](assets/images/components/popover.gif)
 *
 * @example Popover can accept different content such as:
 * TemplateRef
 *
 * ```
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 *
 * @example Custom components
 *
 * ```
 * <button [nbPopover]="NbCardComponent"></button>
 * ```
 *
 * @example Primitive types
 *
 * ```
 * <button nbPopover="Hello, Popover!"></button>
 * ```
 *
 * @example Popover has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```
 * <button nbPopover="Hello, Popover!" nbPopoverPlacement="left"></button>
 * ```
 *
 * @example By default popover will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change placement of the popover container.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjust]="false"></button>
 * ```
 *
 * */
export declare class NbPopoverDirective implements OnInit, OnDestroy {
    private hostRef;
    private themeService;
    private componentFactoryResolver;
    private positioningHelper;
    private adjustmentHelper;
    private triggerHelper;
    private platformId;
    private placementHelper;
    /**
     * Popover content which will be rendered in NbPopoverComponent.
     * Available content: template ref, component and any primitive.
     * */
    content: NbPopoverContent;
    /**
     * Container content context. Will be applied to the rendered component.
     * */
    context: Object;
    /**
     * Position will be calculated relatively host element based on the placement.
     * Can be top, right, bottom, left, start or end.
     * */
    placement: NbPopoverPlacement | NbPopoverLogicalPlacement;
    /**
     * Container placement will be changes automatically based on this strategy if container can't fit view port.
     * Set this property to any falsy value if you want to disable automatically adjustment.
     * Available values: clockwise, counterclockwise.
     * */
    adjustment: NbPopoverAdjustment;
    /**
     * Describes when the container will be shown.
     * Available options: click, hover and hint
     * */
    mode: NbPopoverMode;
    /**
     * Returns true if popover already shown.
     * @return boolean
     * */
    readonly isShown: boolean;
    /**
     * Returns true if popover hidden.
     * @return boolean
     * */
    readonly isHidden: boolean;
    private alive;
    private containerRef;
    private readonly container;
    private readonly containerElement;
    private readonly hostElement;
    constructor(hostRef: ElementRef, themeService: NbThemeService, componentFactoryResolver: ComponentFactoryResolver, positioningHelper: NbPositioningHelper, adjustmentHelper: NbAdjustmentHelper, triggerHelper: NbTriggerHelper, platformId: any, placementHelper: NbPlacementHelper);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Show popover.
     * */
    show(): void;
    /**
     * Hide popover.
     * */
    hide(): void;
    /**
     * Toggle popover state.
     * */
    toggle(): void;
    onResize(): void;
    private registerTriggers();
    private renderPopover();
    private destroyPopover();
    private place();
    private patchPopover(content, context);
    private patchPopoverPlacement(placement);
    private patchPopoverPosition({top, left});
    private adjust(containerRect, hostRect);
    private performAdjustment(placed, host);
    private calcAdjustment(placed, host);
    private calcPosition(placed, host);
}
