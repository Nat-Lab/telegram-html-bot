Array.prototype.equals = function (element) {
	if (this === element) return true;
	if (element == null || this == null) return false;
	if (element.length != this.length) return false;
	for (var i = 0; i < element.length; ++i) {
		if (element[i] !== this[i]) return false;
	}
	return true;
}

Array.prototype.ifArrayInArray = function(element) { 
	for(var i=0; i < this.length; i++) { 
		if(this[i].equals(element)) return true;
	}
	return false;
};

Array.prototype.pushArrayIfNotExist = function(element) { 
	if (!this.ifArrayInArray (element)) {
		this.push(element);
	}
};
