import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbLayoutComponent, NbLayoutColumnComponent, NbLayoutFooterComponent, NbLayoutHeaderComponent, } from './layout.component';
var NB_LAYOUT_COMPONENTS = [
    NbLayoutComponent,
    NbLayoutColumnComponent,
    NbLayoutFooterComponent,
    NbLayoutHeaderComponent,
];
var NbLayoutModule = /** @class */ (function () {
    function NbLayoutModule() {
    }
    NbLayoutModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    declarations: NB_LAYOUT_COMPONENTS.slice(),
                    exports: NB_LAYOUT_COMPONENTS.slice(),
                },] },
    ];
    return NbLayoutModule;
}());
export { NbLayoutModule };
//# sourceMappingURL=layout.module.js.map