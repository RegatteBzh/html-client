import { forEach } from 'lodash';

export function AutoUnsubscribe( blackList = [] ) {
    return function ( constructor ) {
        const original = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function () {

            forEach(this, (property: any, prop: string) => {
                if ( blackList.indexOf(prop) === -1 ) {
                    if ( property && ( typeof property.unsubscribe === 'function' ) ) {
                        property.unsubscribe();
                    }
                }
            });
            return original && typeof original === 'function' && original.apply(this, arguments);
        };
    };
}
