/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertToBoolProperty } from '../helpers';
/**
 * Styled checkbox component
 *
 * @example Basic example
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled">Enabled?</nb-checkbox>
 * ```
 *
 * @example Example with status
 *
 * ```
 *  <nb-checkbox [(ngModel)]="enabled" status="danger">Enabled?</nb-checkbox>
 * ```
 *
 * @styles
 *
 * checkbox-bg:
 * checkbox-size:
 * checkbox-border-size:
 * checkbox-border-color:
 * checkbox-checkmark:
 * checkbox-checked-bg:
 * checkbox-checked-size:
 * checkbox-checked-border-size:
 * checkbox-checked-border-color:
 * checkbox-checked-checkmark:
 * checkbox-disabled-bg:
 * checkbox-disabled-size:
 * checkbox-disabled-border-size:
 * checkbox-disabled-border-color:
 * checkbox-disabled-checkmark:
 */
var NbCheckboxComponent = /** @class */ (function () {
    function NbCheckboxComponent() {
        /**
           * Checkbox value
           * @type {boolean}
           * @private
           */
        this._value = false;
        this.disabled = false;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    Object.defineProperty(NbCheckboxComponent.prototype, "setDisabled", {
        set: function (val) {
            this.disabled = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "setStatus", {
        set: /**
           * Checkbox status (success, warning, danger)
           * @param {string} val
           */
        function (val) {
            this.status = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.onChange(val);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    NbCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbCheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbCheckboxComponent.prototype.writeValue = function (val) {
        this.value = val;
    };
    NbCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nb-checkbox',
                    template: "\n    <label class=\"customised-control customised-checkbox\">\n      <input type=\"checkbox\" class=\"customised-control-input\"\n             [disabled]=\"disabled\"\n             [checked]=\"value\"\n             (change)=\"value = !value\">\n      <span class=\"customised-control-indicator\"></span>\n      <span class=\"customised-control-description\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NbCheckboxComponent; }),
                            multi: true,
                        }],
                },] },
    ];
    /** @nocollapse */
    NbCheckboxComponent.propDecorators = {
        "_value": [{ type: Input, args: ['value',] },],
        "setDisabled": [{ type: Input, args: ['disabled',] },],
        "setStatus": [{ type: Input, args: ['status',] },],
        "success": [{ type: HostBinding, args: ['class.success',] },],
        "warning": [{ type: HostBinding, args: ['class.warning',] },],
        "danger": [{ type: HostBinding, args: ['class.danger',] },],
    };
    return NbCheckboxComponent;
}());
export { NbCheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map