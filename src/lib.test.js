#!/usr/bin/env node

import defaultPackageMeta from './main.js';
import { PackageMeta, getPackageMeta, getPackageMetaSync } from './main.js';
import AVA from 'ava';

//console.log( '%o', AVANS );

AVA( 'FirstTest', async function(t){
	t.log( t.title );
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
		t.log( `test:  ${i}` );
		var pm = new PackageMeta( test_inputs[i] );
		var pmP = getPackageMeta( test_inputs[i] );
		var pmD = await defaultPackageMeta( test_inputs[i] );
		var pmSync = getPackageMetaSync( test_inputs[i] );
		t.log( `${pm}, ${await pmP}, ${pmD}, ${pmSync}` );
	}
	t.pass();
} );
AVA( 'Error:PackageMeta:InvalidArgument', function(t){
	t.log(t.title);
	var input = PackageMeta.bind( undefined, true );
	t.throws( input, { instanceOf: Error, code: 'ERR_INVALID_ARG_TYPE' } );
} );
AVA( 'Error:getPackageMeta:InvalidArgument', function(t){
	t.log(t.title);
	var input = getPackageMeta.bind( undefined, true );
	t.throws( input, { instanceOf: Error } );
} );
AVA( 'Error:getPackageMetaSync:InvalidArgument', function(t){
	t.log(t.title);
	var input = getPackageMeta.bind( undefined, true );
	t.throws( input, { instanceOf: Error } );
} );
