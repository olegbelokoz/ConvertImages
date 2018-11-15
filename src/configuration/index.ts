import * as conf from '../../config.json' ;

export class Config {
    constructor () {
        for(let p in conf) {
            console.log(p);
        }
    }
}