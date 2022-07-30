let myLib = require('./dependencies');

let stk = new myLib.stack.Stack();

//let test1 = "id-(id*id)$";
let test = "id+(id*id)$";

try{
    console.log(`test string: ${test}\n`)
    //console.log(myLib.parse_L_R.LR_Parse(test1));
    console.log(myLib.parse_L_R.LR_Parse(test));
}
catch(e){
    console.error(e);
}
