# metalsmith-subresource-integrity

A [Metalsmith](http://www.metalsmith.io/) plugin that adds a `subresouce`
object to `_metadata`. This allows the user to look up the hash from within
templates.

## Usage

Example of setting up subresource integrity in code:

```javascript
var metalsmith = require('metalsmith'),
  subresourceIntegrity = require('metalsmith-subresource-integrity');

metalsmith(__dirname)
.use(subresourceIntegrity({
  algorithm: 'sha512',
  pattern: '*.{css,js}',
  minimatchOptions: {
    matchBase: true
  }
})
.build();
```

Example of setting up subresource integrity in config:

```json
{
  "source": "src",
  "destination": "build",
  "plugins": {
    "metalsmith-subresource-integrity": {
      "algorithm": "sha512",
      "pattern": "*.{css,js}",
      "minimatchOptions": {
        "matchBase": true
      }
    }
  }
}
```

In the template, a hash can be found like so (the example uses underscore
templates):

```html
<link
  href="/css/main.css"
  integrity="<%= subresource['css/main.css'] %>"
/>

<script
  src="/js/main.js"
  integrity="<%= subresource['js/main.js'] %>"
></script>
```

Keep in mind that you will want to use this plugin after any file generation
takes place (es6, coffeescript, sass) so the correct file names are found in
the files list.

## Options

#### algorithm

`algorithm` defaults to `sha512`.  Can be either:

- `sha256`
- `sha384`
- `sha512`

This is the hashing algorithm used.

#### pattern

`pattern` defaults to `*.{css,js}`. This is a
[minimatch](https://github.com/isaacs/minimatch) pattern to determine the
files to create subresource hashes for.

#### minimatchOptions

`minimatchOptions` defaults to `{matchBase: true}`. This is an `Object` of
options for [minimatch](https://github.com/isaacs/minimatch) to tweak how
`pattern` is applied.
