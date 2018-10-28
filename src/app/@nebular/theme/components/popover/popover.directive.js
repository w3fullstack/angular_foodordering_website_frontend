/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, PLATFORM_ID, Inject, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeWhile } from 'rxjs/operators';
import { NbPositioningHelper } from './helpers/positioning.helper';
import { NbPopoverComponent } from './popover.component';
import { NbThemeService } from '../../services/theme.service';
import { NbAdjustmentHelper } from './helpers/adjustment.helper';
import { NbTriggerHelper } from './helpers/trigger.helper';
import { NbPopoverAdjustment, NbPopoverMode, NbPopoverPlacement, } from './helpers/model';
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
/*
*
* TODO
* Rendering strategy have to be refactored.
* For now directive creates and deletes popover container each time.
* I think we can handle this slightly smarter and show/hide in any situations.
*/
var NbPopoverDirective = /** @class */ (function () {
    function NbPopoverDirective(hostRef, themeService, componentFactoryResolver, positioningHelper, adjustmentHelper, triggerHelper, platformId, placementHelper) {
        this.hostRef = hostRef;
        this.themeService = themeService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.positioningHelper = positioningHelper;
        this.adjustmentHelper = adjustmentHelper;
        this.triggerHelper = triggerHelper;
        this.platformId = platformId;
        this.placementHelper = placementHelper;
        /**
           * Position will be calculated relatively host element based on the placement.
           * Can be top, right, bottom, left, start or end.
           * */
        this.placement = NbPopoverPlacement.TOP;
        /**
           * Container placement will be changes automatically based on this strategy if container can't fit view port.
           * Set this property to any falsy value if you want to disable automatically adjustment.
           * Available values: clockwise, counterclockwise.
           * */
        this.adjustment = NbPopoverAdjustment.CLOCKWISE;
        /**
           * Describes when the container will be shown.
           * Available options: click, hover and hint
           * */
        this.mode = NbPopoverMode.CLICK;
        /*
           * Is used for unsubscribe all subscriptions after component destructuring.
           * */
        this.alive = true;
    }
    Object.defineProperty(NbPopoverDirective.prototype, "isShown", {
        /**
         * Returns true if popover already shown.
         * @return boolean
         * */
        get: /**
           * Returns true if popover already shown.
           * @return boolean
           * */
        function () {
            return !!this.containerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "isHidden", {
        /**
         * Returns true if popover hidden.
         * @return boolean
         * */
        get: /**
           * Returns true if popover hidden.
           * @return boolean
           * */
        function () {
            return !this.containerRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "container", {
        get: function () {
            return this.containerRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "containerElement", {
        get: function () {
            return this.containerRef.location.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverDirective.prototype, "hostElement", {
        get: function () {
            return this.hostRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    NbPopoverDirective.prototype.ngOnInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.registerTriggers();
        }
    };
    NbPopoverDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    /**
     * Show popover.
     * */
    /**
       * Show popover.
       * */
    NbPopoverDirective.prototype.show = /**
       * Show popover.
       * */
    function () {
        if (this.isHidden) {
            this.renderPopover();
        }
    };
    /**
     * Hide popover.
     * */
    /**
       * Hide popover.
       * */
    NbPopoverDirective.prototype.hide = /**
       * Hide popover.
       * */
    function () {
        if (this.isShown) {
            this.destroyPopover();
        }
    };
    /**
     * Toggle popover state.
     * */
    /**
       * Toggle popover state.
       * */
    NbPopoverDirective.prototype.toggle = /**
       * Toggle popover state.
       * */
    function () {
        if (this.isShown) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /*
       * Adjust popover position on window resize.
       * Window resize may change host element position, so popover relocation required.
       *
       * TODO
       * Fix tslint to add capability make HostListener private.
       * */
    NbPopoverDirective.prototype.onResize = /*
       * Adjust popover position on window resize.
       * Window resize may change host element position, so popover relocation required.
       *
       * TODO
       * Fix tslint to add capability make HostListener private.
       * */
    function () {
        if (this.isShown) {
            this.place();
        }
    };
    /*
     * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
     * see {@link NbTriggerHelper}
     * */
    /*
       * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
       * see {@link NbTriggerHelper}
       * */
    NbPopoverDirective.prototype.registerTriggers = /*
       * Subscribe to the popover triggers created from the {@link NbPopoverDirective#mode}.
       * see {@link NbTriggerHelper}
       * */
    function () {
        var _this = this;
        var _a = this.triggerHelper
            .createTrigger(this.hostElement, function () { return _this.containerRef; }, this.mode), open = _a.open, close = _a.close, toggle = _a.toggle;
        open.pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.show(); });
        close.pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.hide(); });
        toggle.pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.toggle(); });
    };
    /*
     * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
     * and positioning container based on {@link NbPopoverDirective#placement}
     * and {@link NbPopoverDirective#adjustment}.
     * */
    /*
       * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
       * and positioning container based on {@link NbPopoverDirective#placement}
       * and {@link NbPopoverDirective#adjustment}.
       * */
    NbPopoverDirective.prototype.renderPopover = /*
       * Renders popover putting {@link NbPopoverComponent} in the top of {@link NbLayoutComponent}
       * and positioning container based on {@link NbPopoverDirective#placement}
       * and {@link NbPopoverDirective#adjustment}.
       * */
    function () {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(NbPopoverComponent);
        this.themeService.appendToLayoutTop(factory)
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (containerRef) {
            _this.containerRef = containerRef;
            _this.patchPopover(_this.content, _this.context);
            /*
                     * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
                     * and haven't got calculated size.
                     * But we should have size on this step to calculate popover position correctly.
                     *
                     * TODO
                     * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
                     * Investigate, maybe we can create method in the {@link NbThemeService}
                     * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
                     * instead of performing this call by service client.
                     * */
            /*
             * Have to call detectChanges because on this phase {@link NbPopoverComponent} isn't inserted in the DOM
             * and haven't got calculated size.
             * But we should have size on this step to calculate popover position correctly.
             *
             * TODO
             * I don't think we have to call detectChanges each time we're using {@link NbThemeService#appendToLayoutTop}.
             * Investigate, maybe we can create method in the {@link NbThemeService}
             * which will call {@link NbThemeService#appendToLayoutTop} and 'do' detectChanges,
             * instead of performing this call by service client.
             * */
            _this.containerRef.changeDetectorRef.markForCheck();
            _this.containerRef.changeDetectorRef.detectChanges();
            _this.place();
        });
    };
    /*
     * Destroys the {@link NbPopoverComponent} and nullify its reference;
     * */
    /*
       * Destroys the {@link NbPopoverComponent} and nullify its reference;
       * */
    NbPopoverDirective.prototype.destroyPopover = /*
       * Destroys the {@link NbPopoverComponent} and nullify its reference;
       * */
    function () {
        this.containerRef.destroy();
        this.containerRef = null;
    };
    /*
     * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
     * */
    /*
       * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
       * */
    NbPopoverDirective.prototype.place = /*
       * Moves {@link NbPopoverComponent} relatively host component based on the {@link NbPopoverDirective#placement}.
       * */
    function () {
        var hostRect = this.hostElement.getBoundingClientRect();
        var containerRect = this.containerElement.getBoundingClientRect();
        this.adjust(containerRect, hostRect);
    };
    /*
     * Set container content and context.
     * */
    /*
       * Set container content and context.
       * */
    NbPopoverDirective.prototype.patchPopover = /*
       * Set container content and context.
       * */
    function (content, context) {
        this.container.content = content;
        this.container.context = context;
    };
    /*
     * Set container placement.
     * */
    /*
       * Set container placement.
       * */
    NbPopoverDirective.prototype.patchPopoverPlacement = /*
       * Set container placement.
       * */
    function (placement) {
        this.container.placement = placement;
    };
    /*
     * Set container position.
     * */
    /*
       * Set container position.
       * */
    NbPopoverDirective.prototype.patchPopoverPosition = /*
       * Set container position.
       * */
    function (_a) {
        var top = _a.top, left = _a.left;
        this.container.positionTop = top;
        this.container.positionLeft = left;
    };
    /*
     * Calculates container adjustment and sets container position and placement.
     * */
    /*
       * Calculates container adjustment and sets container position and placement.
       * */
    NbPopoverDirective.prototype.adjust = /*
       * Calculates container adjustment and sets container position and placement.
       * */
    function (containerRect, hostRect) {
        var _a = this.performAdjustment(containerRect, hostRect), placement = _a.placement, position = _a.position;
        this.patchPopoverPlacement(placement);
        this.patchPopoverPosition(position);
    };
    /*
     * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
     * If not, just calculates element position.
     * */
    /*
       * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
       * If not, just calculates element position.
       * */
    NbPopoverDirective.prototype.performAdjustment = /*
       * Checks if {@link NbPopoverDirective#adjustment} can be performed and runs it.
       * If not, just calculates element position.
       * */
    function (placed, host) {
        if (this.adjustment) {
            return this.calcAdjustment(placed, host);
        }
        return this.calcPosition(placed, host);
    };
    /*
     * Calculate adjustment.
     * see {@link NbAdjustmentHelper}.
     * */
    /*
       * Calculate adjustment.
       * see {@link NbAdjustmentHelper}.
       * */
    NbPopoverDirective.prototype.calcAdjustment = /*
       * Calculate adjustment.
       * see {@link NbAdjustmentHelper}.
       * */
    function (placed, host) {
        var placement = this.placementHelper.toPhysicalPlacement(this.placement);
        return this.adjustmentHelper.adjust(placed, host, placement, this.adjustment);
    };
    /*
     * Calculate position.
     * see {@link NbPositioningHelper}
     * */
    /*
       * Calculate position.
       * see {@link NbPositioningHelper}
       * */
    NbPopoverDirective.prototype.calcPosition = /*
       * Calculate position.
       * see {@link NbPositioningHelper}
       * */
    function (placed, host) {
        var placement = this.placementHelper.toPhysicalPlacement(this.placement);
        return {
            position: this.positioningHelper.calcPosition(placed, host, placement),
            placement: placement,
        };
    };
    NbPopoverDirective.decorators = [
        { type: Directive, args: [{ selector: '[nbPopover]' },] },
    ];
    /** @nocollapse */
    NbPopoverDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NbThemeService, },
        { type: ComponentFactoryResolver, },
        { type: NbPositioningHelper, },
        { type: NbAdjustmentHelper, },
        { type: NbTriggerHelper, },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: NbPlacementHelper, },
    ]; };
    NbPopoverDirective.propDecorators = {
        "content": [{ type: Input, args: ['nbPopover',] },],
        "context": [{ type: Input, args: ['nbPopoverContext',] },],
        "placement": [{ type: Input, args: ['nbPopoverPlacement',] },],
        "adjustment": [{ type: Input, args: ['nbPopoverAdjustment',] },],
        "mode": [{ type: Input, args: ['nbPopoverMode',] },],
        "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
    };
    return NbPopoverDirective;
}());
export { NbPopoverDirective };
//# sourceMappingURL=popover.directive.js.map