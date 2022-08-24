# simple-package-meta
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/github/license/Anadian/simple-package-meta)](https://github.com/Anadian/simple-package-meta/blob/main/LICENSE)
[![ci](https://github.com/Anadian/simple-package-meta/actions/workflows/ci.yml/badge.svg)](https://github.com/Anadian/simple-package-meta/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Anadian/simple-package-meta/badge.svg?branch=main)](https://coveralls.io/github/Anadian/simple-package-meta?branch=main)
[![npm](https://img.shields.io/npm/v/simple-package-meta)](https://www.npmjs.com/package/simple-package-meta)

> Easy access to information about the running package.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
A simple sort of convenience, sort of learning ECMAscript module package which takes a URL or an object like from `import.meta` and returns an object with information about the file like its name, version, directories and the nearest `package.json`.
# Install
Using [pnpm](https://pnpm.io/cli/add):
```sh
pnpm add --save simple-package-meta
```
It can, of course, also be installed by [NPM](https://docs.npmjs.com/cli/v8/commands/npm-install) or [Yarn](https://yarnpkg.com/getting-started/usage) using the normal methods.
# Usage
```js
import getPackageMeta from 'simple-package-meta'; //The default is just the getPackageMeta function
import * as PackageMetaNS from 'simple-package-meta'; //The whole namespace

var meta_info = getPackageMeta( import.meta ); //Same as PackageMetaNS.getPackageMeta
```
# API
The package comprises a single constructor and two functions.
```js
new PackageMeta( object ); //Can take either a URL string, a URL object or an `import.meta`-like object
```
This creates a new PackageMeta object albeit lacking some information which requires blocking operations; this is made available by importing the entire module namespace with the name `PackageMetaNS.PackageMeta()` and is intended mainly just for debugging or extending the object as generally you're better off using one of the following helper functions.
```js
getPackageMeta( object )
```
The default export, this asynchronously returns a complete PackageMeta object of the structure:
```js
{
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
}
```
```js
PackageMetaNS.getPackageMetaSync( object )
```
Same as above except synchronous.
# Contributing
Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
# License
MIT ©2022 Anadian

SEE LICENSE IN [LICENSE](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)This project's documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
