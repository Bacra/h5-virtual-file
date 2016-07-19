# h5-virtual-file

  Virtual file for browser test.

## Installation

    $ npm install h5-virtual-file

## Example

```js

var vfile = new VirtualFile(new Blob(['file block content']), 'filename', 20*1024*1024);


var reader = new FileReader;
reader.onload = function(e)
{
	console.log(e.target.result);
}

reader.readAsText(vfile.slice(start, end));

```

