/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectorRef, Component, HostBinding, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { NbPopoverPlacement } from './helpers/model';
import { NgComponentOutlet } from '@angular/common';
/**
 * Popover container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
var NbPopoverComponent = /** @class */ (function () {
    function NbPopoverComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        /**
           * Popover placement relatively host element.
           * */
        this.placement = NbPopoverPlacement.TOP;
        this.positionTop = 0;
        this.positionLeft = 0;
    }
    Object.defineProperty(NbPopoverComponent.prototype, "componentOutlet", {
        set: /**
           * If content type is TemplateRef we're passing context as template outlet param.
           * But if we have custom component content we're just assigning passed context to the component instance.
           * */
        function (el) {
            if (this.isComponent) {
                Object.assign(el._componentRef.instance, this.context);
                /**
                       * Change detection have to performed here, because another way applied context
                       * will be rendered on the next change detection loop and
                       * we'll have incorrect positioning. Because rendered component may change its size
                       * based on the context.
                       * */
                this.changeDetectorRef.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isTemplate", {
        /**
         * Check that content is a TemplateRef.
         *
         * @return boolean
         * */
        get: /**
           * Check that content is a TemplateRef.
           *
           * @return boolean
           * */
        function () {
            return this.content instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isComponent", {
        /**
         * Check that content is an angular component.
         *
         * @return boolean
         * */
        get: /**
           * Check that content is an angular component.
           *
           * @return boolean
           * */
        function () {
            return this.content instanceof Type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPopoverComponent.prototype, "isPrimitive", {
        /**
         * Check that if content is not a TemplateRef or an angular component it means a primitive.
         * */
        get: /**
           * Check that if content is not a TemplateRef or an angular component it means a primitive.
           * */
        function () {
            return !this.isTemplate && !this.isComponent;
        },
        enumerable: true,
        configurable: true
    });
    NbPopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-popover',
                    styles: [":host{position:absolute;z-index:10000;border-radius:5px;top:200px}:host .primitive-popover{padding:0.75rem 1rem}:host .arrow{position:absolute;width:0;height:0}:host .arrow{border-left:11px solid transparent;border-right:11px solid transparent}:host .arrow::after{position:absolute;content:' ';width:0;height:0;top:3px;left:calc(50% - 9px);border-left:9px solid transparent;border-right:9px solid transparent}:host.bottom .arrow{top:-11px;left:calc(50% - 11px)}:host.left .arrow{right:-17px;top:calc(50% - 5.5px);transform:rotate(90deg)}:host.top .arrow{bottom:-11px;left:calc(50% - 11px);transform:rotate(180deg)}:host.right .arrow{left:-17px;top:calc(50% - 5.5px);transform:rotate(270deg)} "],
                    template: "\n    <span class=\"arrow\"></span>\n\n    <ng-container *ngIf=\"isTemplate\">\n      <ng-container *ngTemplateOutlet=\"content; context: context\"></ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"isComponent\" [ngComponentOutlet]=\"content\"></ng-container>\n    <ng-container *ngIf=\"isPrimitive\">\n      <div class=\"primitive-popover\">{{content}}</div>\n    </ng-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    NbPopoverComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    NbPopoverComponent.propDecorators = {
        "content": [{ type: Input },],
        "context": [{ type: Input },],
        "placement": [{ type: Input }, { type: HostBinding, args: ['class',] },],
        "positionTop": [{ type: Input }, { type: HostBinding, args: ['style.top.px',] },],
        "positionLeft": [{ type: Input }, { type: HostBinding, args: ['style.left.px',] },],
        "componentOutlet": [{ type: ViewChild, args: [NgComponentOutlet,] },],
    };
    return NbPopoverComponent;
}());
export { NbPopoverComponent };
//# sourceMappingURL=popover.component.js.map