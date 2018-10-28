import { ControlValueAccessor } from '@angular/forms';
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
export declare class NbCheckboxComponent implements ControlValueAccessor {
    status: string;
    /**
     * Checkbox value
     * @type {boolean}
     * @private
     */
    _value: boolean;
    disabled: boolean;
    setDisabled: boolean;
    /**
     * Checkbox status (success, warning, danger)
     * @param {string} val
     */
    setStatus: string;
    readonly success: boolean;
    readonly warning: boolean;
    readonly danger: boolean;
    onChange: any;
    onTouched: any;
    value: boolean;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(val: any): void;
}
