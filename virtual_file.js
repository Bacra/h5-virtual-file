function VirtualFile(blob, name, size)
{
	this.blob = blob;
	this.name = name;
	this.size = size;
	this.lastModifiedDate = new Date;
	this.lastModified = +this.lastModifiedDate;
	this.type = blob.type;
}

VirtualFile.prototype.__virtual = true;
VirtualFile.prototype.slice = function(start, end, contentType)
{
	if (!start) start = 0;

	if (!end)
		end = this.size;
	else if (end < 0)
		end = this.size - end;
	else if (end > this.size)
		end = this.size;

	if (!contentType) contentType = this.type;

	if (end < start) throw new Error('offset Error');
	if (end == start) return new Blob([], contentType);

	var blob = this.blob;
	var length = blob.size;
	var blobStart = start%length;
	var blobEnd = end%length;
	var num = Math.ceil((end - start + blobStart) / length);

	// console.log('blob len:%d, blob start:%d, end:%d, num:%d', length, blobStart, blobEnd, num);

	if (num == 1)
	{
		return blob.slice(blobStart, blobEnd || length, contentType);
	}
	else
	{
		var data = [blob.slice(blobStart)];
		num -= 2;
		while(num-- > 0)
		{
			data.push(blob.slice(0));
		}
		data.push(blob.slice(0, blobEnd || length));
		return new Blob(data, {type: contentType});
	}
}

if (typeof module != 'undefined' && exports != 'undefined' && module.exports === exports)
{
	module.exports = VirtualFile;
}
