# Lake Shore Gold Corp.

## Bell Creek Ore Processing Plant

[Animated Flowsheet](http://www.lsgold.com/bell-creek-ore-processing-plant)
[![Build Status](https://travis-ci.org/jonesrussell/bell-creek-ore-processing-plant.svg?branch=master)](https://travis-ci.org/jonesrussell/bell-creek-ore-processing-plant)

An animation of svg's with the lightweight [svg.js](https://github.com/wout/svg.js) library

### Install dependencies

```bash
npm install
```

### Build

```bash
npm build
```

### Serve

```bash
npm serve
```

## Gruntfile.js

### Globbing

For performance reasons we're only matching one level down:

```javascript
'test/spec/{,*/}*.js'
```

If you want to recursively match all subfolders, use:

```javascript
'test/spec/**/*.js'
```
