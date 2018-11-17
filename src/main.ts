import { inject } from "inversify";
import { DirectoryReader } from "./directory-reader";
import { provide } from "inversify-binding-decorators";
import { Config } from "./configuration";
import * as path from 'path';

@provide(Main)
export class Main {
    private directoryReader: DirectoryReader;
    private config: Config;
    constructor (
        @inject(DirectoryReader) directoryReader: DirectoryReader,
        @inject(Config) config: Config
    ) {
        this.directoryReader = directoryReader;
        this.config = config;
    }

    public async ConvertImages(): Promise<void> {
        // Check If folders needed exist
        if (! await this.directoryReader.exists(this.config.picuresFolder)) {
            console.log(`Folder ${this.config.picuresFolder} not found`);
            return;
        }
        if (! await this.directoryReader.exists(this.config.wwwFolder)) {
            console.log(`Folder ${this.config.wwwFolder} not found`);
            return;
        }

        const wwwPictures = path.join(this.config.wwwFolder, "Pictures");
        const wwwVideos = path.join(this.config.wwwFolder, "Videos");

        if (! await this.directoryReader.exists(wwwPictures)) {
            console.log(`Creating folder ${wwwPictures}`);
            await this.directoryReader.create(wwwPictures);
        }
        if (! await this.directoryReader.exists(wwwVideos)) {
            console.log(`Creating folder ${wwwVideos}`);
            await this.directoryReader.create(wwwVideos);
        }

        // get all the years from home picture
        let years = await this.directoryReader.list(
            this.config.picuresFolder
        );

        // list the ones that don't exist on www
        let yearsExists = await Promise.all(
            years.map((folder: string) => {
                return this.directoryReader.exists(
                    path.join(wwwPictures, folder)
                )   
            })
        );
        
        // create years folders that don't exist
        let yearsDontExist = years.map((folder: string, index: number) => (
            {folder: folder, exists: yearsExists[index]}))
        .filter((f : {folder: string, exists: boolean}) => !f.exists)
        .map((f : {folder: string, exists: boolean}) => {
            this.directoryReader.create(
                path.join(wwwPictures, f.folder)
            )
            .then(() => {
                console.log(`Created folder ${path.join(wwwPictures, f.folder)}`);
            })
        })
        
        await Promise.all(yearsDontExist);

        

    }
}