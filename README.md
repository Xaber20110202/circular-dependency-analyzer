# circular-dependency-analyzer

Detect modules with circular dependencies in files.

## Installation
```
npm install circular-dependency-analyzer

// or

yarn install circular-dependency-analyzer
```

## APIs
### getFileRequiresStack
|Parameters|Type|Description|
|--|--|--
|dir|string|`dir` is a directory based on `process.cwd()`|
|alias|object| `alias` object's value is a directory or file based on `process.cwd()` too|

|Result|Type|Description|
|--|--|--
|stack|object|It's an object with key(`filepath`). value(required `filepath` array), `filepath` is based on `process.cwd()`, besides, its `/index` and extname will be removed|

### getCircularReferences
|Parameters|Type|Description|
|--|--|--
|dir|string|`dir` is a directory based on `process.cwd()`|
|alias|object| `alias` object's value is a directory or file based on `process.cwd()` too|

|Result|Type|Description|
|--|--|--
|circularDependencies|2 d array|It's a two-dimensional array, each item array represents a circular dependency|

## Examples
```typescript
import { getFileRequiresStack, getCircularReferences } from 'circular-dependency-analyzer'

getFileRequiresStack('src')
getCircularReferences('src')

getFileRequiresStack('src', {
  fs: 'src/fs',
})
getCircularReferences('src', {
  fs: 'src/fs',
})
```

More examples you can find in `tests` dir.

## Inspired or cp from

* [js-code-structure](https://github.com/timqian/js-code-structure)
* [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin)