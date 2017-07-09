var array = [1,2,3,4,5];

var result = array.reduce(function(obj,current){obj[current]=current; return obj},{});

console.log(result);