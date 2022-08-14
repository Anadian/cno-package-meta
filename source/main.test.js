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
		'file.js',
		'/home/cameron/dev/package-meta/file.js',
		{
			url: import.meta.url
		},
		new globalThis.URL( import.meta.url )
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
