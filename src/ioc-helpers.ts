import { fluentProvide } from "inversify-binding-decorators";

// this lets us provide singleton
export class IOCHelpers {
    public static provideSingleton = function(identifier) {
        return fluentProvide(identifier)
                .inSingletonScope()
                .done();
    };
}