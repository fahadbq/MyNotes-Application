// object destructuring 
const obj = { a: 1, b: 2, c: 3}

//const { a } = obj 
//console.log(a)

// create an alias
const { a: dct } = obj 
console.log(dct)

// without des
// const dct = obj.a 


// rest operator 
const { c, ...rest } = obj 
console.log(c)
console.log(rest)

