/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectorRef, TemplateRef, Type } from '@angular/core';
import { NbPopoverPlacement } from './helpers/model';
/**
 * Popover can be one of the following types:
 * template, component or plain js string.
 * So NbPopoverContent provides types alias for this purposes.
 * */
export declare type NbPopoverContent = string | TemplateRef<any> | Type<any>;
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
export declare class NbPopoverComponent {
    private changeDetectorRef;
    /**
     * Content which will be rendered.
     * */
    content: NbPopoverContent;
    /**
     * Context which will be passed to rendered component instance.
     * */
    context: Object;
    /**
     * Popover placement relatively host element.
     * */
    placement: NbPopoverPlacement;
    positionTop: number;
    positionLeft: number;
    /**
     * If content type is TemplateRef we're passing context as template outlet param.
     * But if we have custom component content we're just assigning passed context to the component instance.
     * */
    componentOutlet: any;
    /**
     * Check that content is a TemplateRef.
     *
     * @return boolean
     * */
    readonly isTemplate: boolean;
    /**
     * Check that content is an angular component.
     *
     * @return boolean
     * */
    readonly isComponent: boolean;
    /**
     * Check that if content is not a TemplateRef or an angular component it means a primitive.
     * */
    readonly isPrimitive: boolean;
    constructor(changeDetectorRef: ChangeDetectorRef);
}
