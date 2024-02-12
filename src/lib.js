#!/usr/bin/env node
/**
# [lib.js](source/lib.js)
> A micropackage (formerly simple-package-meta) which offers easy access to information about the running package. 

Author: Anadian

Code license: MIT
```
	Copyright 2022 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

*/

//# Dependencies
	//## Internal
	//## Standard
	import FileSystem from 'node:fs';
	import Path from 'node:path';
	import URLNS from 'node:url';
	//## External
	import * as PkgUpNS from 'pkg-up';
	import EnvPaths from 'env-paths';
	import ParseJSON from 'parse-json';
//# Constants
const FILENAME = 'lib.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
### PackageMeta
> A micropackage (formerly simple-package-meta) which offers easy access to information about the running package. 
#### Parametres
| name | type | description |
| --- | --- | --- |
| options | object? | Additional options to pass to the smart constructor. |

##### Options Properties
| name | type | description |
| --- | --- | --- |
| packageMeta | PackageMeta? | An instance of [simple-package-meta](https://github.com/Anadian/simple-package-meta) to be used by this instance and any subclasses initialised along with it. |
| logger | object? | The logger to be used by this instance. |
| config | ConfigManager? | The [cno-config-manager] instance to be used by the created instance. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if `options` is neither an object nor `null` |

#### History
| version | change |
| --- | --- |
| 0.0.0 | Introduced |
*/
function PackageMeta( options = {} ){
	if( !( this instanceof PackageMeta ) ){
		return new PackageMeta( options );
	}
	const FUNCTION_NAME = 'PackageMeta';
	var return_error = null;
	var _return = {
		name: '',
		version: '',
		packageJSON: {},
		url: '',
		filename: '',
		dirname: '',
		paths: {
			packageDirectory: '',
			data: '',
			config: '',
			cache: '',
			log: '',
			temp: ''
		}
	};
	if( typeof(options) === 'string' ){
		if( options.match( /(?<href>(?<protocol>[A-Za-z+]{3,11}):\/\/(?:(?<auth>(?<username>[A-Za-z0-9_-]+)(?::(?<password>[A-Za-z0-9_-]+))?)@)?(?<host>(?<hostname>[A-Za-z0-9._-]+)(?::(?<port>\d+))?)?(?<path>(?<pathname>\/[A-Za-z0-9%:+\/._-]*)?(?<search>\?(?<query>[!\"$-~]+))?)?(?<hash>#(?<section>[A-Za-z0-9_-]+))?)/ ) ){
			//URL String
			_return.url = options;
			_return.filename = URLNS.fileURLToPath(_return.url);
		} else{ //Path
			try{
				_return.filename = Path.normalize( options );
			} catch(error) /* c8 ignore start */{
				return_error = new Error(`Path.normalize threw an error: ${error}`);
				throw return_error;
			} /* c8 ignore stop */
			try{
				_return.url = URLNS.pathToFileURL( _return.filename ).href;
			} catch(error) /* c8 ignore start */{
				return_error = new Error(`URLNS.pathToFileURL threw an error: ${error}`);
				throw return_error;
			} /* c8 ignore stop */
		}
	} else if( options instanceof URLNS.URL ){
		_return.url = options.href;
		_return.filename = URLNS.fileURLToPath(_return.url);
	} else if( options.url != null ){
		if( options.url instanceof URLNS.URL ){
			_return.url = options.url.href;
		} else{ //Assumed to be a URL string.
			_return.url = options.url;
		}
		_return.filename = URLNS.fileURLToPath( _return.url );
	} else{
		return_error = new Error( `Error: 'options' is neither a string, URL, or a valid object.` );
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	try{
		_return.dirname = Path.dirname( _return.filename );
	} catch( error )/* c8 ignore start */{
		return_error = new Error( `Path.dirname threw an error: ${error}` );
		throw return_error;
	} /* c8 ignore stop */
	return _return;
	return this;
}

export default function getPackageMeta( options = {} ){
	var return_error = null;
	var _return = null;
	try{
		_return = new PackageMeta( options );
	} catch(error){
		return_error = new Error(`new PackageMeta threw an error: ${error}`);
		throw return_error;
	}
	var packageMetaPromise = PkgUpNS.pkgUp( { cwd: _return.dirname } ).then( value => {
		if( value != undefined ){
			var readPromise = FileSystem.promises.readFile( value, 'utf8' );
			_return.paths.packageDirectory = Path.dirname( value );
			return readPromise;
		} else /* c8 ignore start */{
			return Promise.resolve( undefined );
		} /* c8 ignore stop */
	}, error => /* c8 ignore start */{
		return_error = new Error(`PkgUp threw an error: ${error}`);
		throw return_error;
	} ).then( value => { /* c8 ignore stop */
		if( value != undefined ){
			try{
				_return.packageJSON = ParseJSON(value);
				_return.name = _return.packageJSON.name;
				_return.version = _return.packageJSON.version;
				_return.paths = {
					..._return.paths,
					...EnvPaths( _return.name )
				};
			} catch(error) /* c8 ignore start */{
				return_error = new Error(`ParseJSON threw an error: ${error}`);
				throw return_error;
			} /* c8 ignore stop */
		} else /* c8 ignore start */{
			//warn package.json not found.
		} /* c8 ignore stop */
		return _return;
	}, error => /* c8 ignore start */{
			return_error = new Error(`FileSystem.promises.readFile threw an error: ${error} ${JSON.stringify(_return)}`);
			throw return_error;
	} ); /* c8 ignore stop */
	return packageMetaPromise;
}
function getPackageMetaSync( options = {} ){
	var return_error = null;
	var _return = new PackageMeta( options );
	var packagePath = '';
	var packageData = '';
	try{
		packagePath = PkgUpNS.pkgUpSync( { cwd: _return.dirname } );
		if( packagePath != undefined ){
			try{
				_return.paths.packageDirectory = Path.dirname( packagePath );
				try{
					packageData = FileSystem.readFileSync( packagePath, 'utf8' );
					try{
						_return.packageJSON = ParseJSON( packageData );
						_return.name = _return.packageJSON.name;
						_return.version = _return.packageJSON.version;
						_return.paths = {
							..._return.paths,
							...EnvPaths( _return.name )
						};
					} catch(error) /* c8 ignore start */{
						return_error = new Error(`ParseJSON threw an error: ${error}`);
						throw return_error;
					} /* c8 ignore stop */
				} catch(error) /* c8 ignore start */{
					return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
					throw return_error;
				} /* c8 ignore stop */
			} catch(error) /* c8 ignore start */{
				return_error = new Error(`Path.dirname threw an error: ${error}`);
				throw return_error;
			} /* c8 ignore stop */
		} else{ /* c8 ignore start */
			//warn package.json couldn't be found.
		} /* c8 ignore stop */
	} catch(error) /* c8 ignore start */{
		return_error = new Error(`PkgUpNS.pkgUpSync threw an error: ${error}`);
		throw return_error;
	} /* c8 ignore stop */
	return _return;
}

export { PackageMeta, getPackageMeta, getPackageMetaSync };
