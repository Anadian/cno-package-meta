#!/usr/bin/env node
import FileSystem from 'node:fs';
import Path from 'node:path';
import URLNS from 'node:url';
import { pkgUp as PkgUp } from 'pkg-up';
import EnvPaths from 'env-paths';
import ParseJSON from 'parse-json';
;
export default function PackageMeta(options = {}) {
    /*if( !( this instanceof PackageMeta ) ){
        return ( new PackageMeta( options ) );
    }*/
    var return_error = null;
    var _return = {
        name: '',
        version: '',
        packageJSON: {},
        url: '',
        filename: '',
        paths: {
            packageDirectory: '',
            data: '',
            config: '',
            cache: '',
            log: '',
            temp: ''
        }
    };
    var packageMetaPromise = null;
    var dirName;
    if (typeof (options) === 'string') {
        if (options.match(/(?<href>(?<protocol>[A-Za-z+]{3,11}):\/\/(?:(?<auth>(?<username>[A-Za-z0-9_-]+)(?::(?<password>[A-Za-z0-9_-]+))?)@)?(?<host>(?<hostname>[A-Za-z0-9._-]+)(?::(?<port>\d+))?)?(?<path>(?<pathname>\/[A-Za-z0-9%:+\/._-]*)?(?<search>\?(?<query>[!\"$-~]+))?)?(?<hash>#(?<section>[A-Za-z0-9_-]+))?)/)) {
            //URL String
            _return.url = options;
            _return.filename = URLNS.fileURLToPath(_return.url);
        }
        else { //Path
            _return.filename = Path.normalize(options);
            _return.url = URLNS.pathToFileURL(_return.filename).href;
        }
    }
    else if (options instanceof URLNS.URL) {
        _return.url = options.href;
        _return.filename = URLNS.fileURLToPath(_return.url);
    }
    else if (options.url != null) {
        if (options.url instanceof URLNS.URL) {
            _return.url = options.url.href;
        }
        else { //Assumed to be a URL string.
            _return.url = options.url;
        }
        _return.filename = URLNS.fileURLToPath(_return.url);
    }
    try {
        dirName = Path.dirname(_return.filename);
        packageMetaPromise = PkgUp({ cwd: dirName }).then(value => {
            var readPromise = FileSystem.promises.readFile(value, 'utf8');
            _return.paths.packageDirectory = Path.dirname(value);
            return readPromise;
        }, error => {
            return_error = new Error(`PkgUp threw an error: ${error}`);
            throw return_error;
        }).then(value => {
            try {
                _return.packageJSON = ParseJSON(value);
                _return.name = _return.packageJSON?.name;
                _return.version = _return.packageJSON?.version;
                _return.paths = {
                    ..._return.paths,
                    ...EnvPaths(_return.name)
                };
            }
            catch (error) {
                return_error = new Error(`ParseJSON threw an error: ${error}`);
                throw return_error;
            }
            return _return;
        }, error => {
            return_error = new Error(`FileSystem.promises.readFile threw an error: ${error}`);
            throw return_error;
        });
        /*try{
            prospectiveFilepath = await PkgUp( dirName );
            try{
                packageJSONString = await FileSystem.promises.readFile( prospectiveFilepath, 'utf8' );
                try{
                    this.packageJSON = ParseJSON( packageJSONString );
                    this.name = this.packageJSON.name;
                    this.version = this.packageJSON.version;
                } catch( error ){
                    return_error = new Error( `ParseJSON threw an error: ${error}` );
                    throw return_error;
                }
            } catch( error ){
                return_error = new Error( `FileSystem.readFileSync threw an error: ${error}` );
                throw return_error;
            }
        } catch(error){
            return_error = new Error(`await PkgUp threw an error: ${error}`);
            throw return_error;
        }*/
    }
    catch (error) {
        return_error = new Error(`Path.dirname threw an error: ${error}`);
        throw return_error;
    }
    return packageMetaPromise;
}
var import_meta = {
    url: 'file:///home/cameron/dev/package-meta/source/main.ts'
};
PackageMeta(import_meta);
