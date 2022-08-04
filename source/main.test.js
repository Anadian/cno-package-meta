#!/usr/bin/env node

import defaultPackageMeta from './main.js';
import { PackageMeta, getPackageMeta, getPackageMetaSync } from './main.js';
import AVA from 'ava';

//console.log( '%o', AVANS );

AVA( 'FirstTest', async function(t){
	const test_name = 'FirstTest';
	var test_inputs = [
		import.meta,
		import.meta.url,
		'file.js',
		'/home/cameron/dev/package-meta/file.js',
		{
			url: import.meta.url
		},
		new globalThis.URL( import.meta.url )
	];
	for( var i = 0; i < test_inputs.length; i++ ){
		console.log( 'test: %d', i );
		var pm = new PackageMeta( test_inputs[i] );
		var pmP = getPackageMeta( test_inputs[i] );
		var pmD = await defaultPackageMeta( test_inputs[i] );
		var pmSync = getPackageMetaSync( test_inputs[i] );
		console.log( '%o %o %o %o', pm, await pmP, pmD, pmSync );
	}
	t.pass();
} );
