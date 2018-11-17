import * as conf from '../../config.json' ;
import { IOCHelpers } from '../ioc-helpers';

@IOCHelpers.provideSingleton(Config)
export class Config {
    public picuresFolder: string;
    public videosFolder: string;
    public wwwFolder: string;
    public thumbWidth: number;
    constructor () {
        this.picuresFolder = conf.picturesFolder;
        this.videosFolder = conf.videosFolder;
        this.wwwFolder = conf.wwwFolder;
        this.thumbWidth = conf.thumbWidth;
    }
}