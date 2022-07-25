#!/usr/bin/env node

import defaultPackageMeta from './main.js';
import { PackageMeta, getPackageMeta, getPackageMetaSync } from './main.js';

var pm = new PackageMeta( import.meta );
var pmP = getPackageMeta( import.meta );
var pmD = await defaultPackageMeta( import.meta );
var pmSync = getPackageMetaSync( import.meta );

console.log( '%o %o %o %o', pm, await pmP, pmD, pmSync );
