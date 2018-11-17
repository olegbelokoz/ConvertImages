import { Config } from "./configuration";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import * as fs from 'fs';

@provide(DirectoryReader)
export class DirectoryReader {
    private config: Config;
    constructor(
        @inject(Config) config: Config
    ) {
        this.config = config;
    }
    public exists(path: fs.PathLike): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.exists(path, (exists) => {
                if(exists) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
                reject();
            })
        })
    }

    public create(path: fs.PathLike): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, (err) => {
                if(!err) {
                    resolve(path.toString());
                }
                else {
                    reject(err);
                }
            })
        })
    }

    public list(path: fs.PathLike): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if(!err) {
                    resolve(files);
                } else {
                    reject(err);
                }
            })
        })
    }
}