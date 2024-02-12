#!/usr/bin/env node
/**
# [lib.test.js](source/lib.test.js)
> Tests for cno-package-meta.

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
	import defaultPackageMeta from './lib.js';
	import { PackageMeta, getPackageMeta, getPackageMetaSync } from './lib.js';
	//## Standard
	import Test from 'node:test';
	import { strict as Assert } from 'node:assert';
	//## External
//# Constants
const FILENAME = 'lib.test.js';
//## Errors

//# Global Variables
/**## Functions*/
function errorExpected( expected, received ){
	if( received instanceof expected.instanceOf ){
		if( expected.code != undefined ){
			if( received.code === expected.code ){
				return true;
			}
		} else{
			return true;
		}
	}
	return Assert.fail(`received: ${received}\nexpected:${expected}\n`);
}

Test( 'FirstTest', async function(t){
	t.diagnostic( t.name );
	var test_inputs = [
		import.meta,
		import.meta.url,
		{
			url: import.meta.url
		},
		'./main.js',
		new globalThis.URL( import.meta.url ),
		{
			url: new globalThis.URL( import.meta.url )
		}
	];
	for( var i = 0; i < test_inputs.length; i++ ){
		t.diagnostic( `test:  ${i}` );
		var pm = new PackageMeta( test_inputs[i] );
		var pmP = getPackageMeta( test_inputs[i] );
		var pmD = await defaultPackageMeta( test_inputs[i] );
		var pmSync = getPackageMetaSync( test_inputs[i] );
		t.diagnostic( `${pm}, ${await pmP}, ${pmD}, ${pmSync}` );
	}
	Assert( true );
} );
Test( 'Error:PackageMeta:InvalidArgument', function(t){
	t.diagnostic(t.name);
	const expected = {
		instanceOf: Error,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = PackageMeta.bind( undefined, true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'Error:getPackageMeta:InvalidArgument', function(t){
	t.diagnostic(t.name);
	const expected = {
		instanceOf: Error,
	};
	const input_function = getPackageMeta.bind( undefined, true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'Error:getPackageMetaSync:InvalidArgument', function(t){
	t.diagnostic(t.name);
	const expected = {
		instanceOf: Error,
	};
	const input_function = getPackageMeta.bind( undefined, true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
