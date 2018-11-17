import * as fs from 'fs';
import { Container } from 'inversify';
import 'inversify-binding-decorators';
import { buildProviderModule, fluentProvide } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { Main } from './src/main';

let iocContainer = new Container();
iocContainer.load(buildProviderModule());

let main = iocContainer.get(Main);

main.ConvertImages().then(() => console.log('Done'));

