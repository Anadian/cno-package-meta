#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var Path = require('path');
;
function PackageMeta(options) {
    if (!(this instanceof PackageMeta)) {
        return (new PackageMeta(options));
    }
    var url = new globalThis.URL('/some/path');
    console.log(url);
    //if( options instanceof globalThis.URL ){
    return this;
}
exports["default"] = PackageMeta;
