const stack = require('./stack');

const langExp = new Set(["id", "+", "*", "-", "/", "(", ")", "$", "4", "5", "6", "7"]);

const parseChart = [
    { "id": "S5", "(":"S4", "E":"1", "T":"2", "F":"3"},
    {"+": "S6", "$":"accept"},
    {"+": "R2", "*": "S7", ")":"R2", "$":"R2"},
    {"+": "R4", "*": "R4", ")":"R4", "$":"R4"},
    {"id": "S5", "(": "S4", "E":"8", "T":"2", "F":"3"},
    {"+": "R6", "*": "R6", ")":"R6", "$":"R6"},
    {"id": "S5", "(": "S4", "T":"9", "F":"3"},
    {"id": "S5", "(": "S4", "F":"10"},
    {"+": "S6", ")":"S11"},
    {"+": "R1", "*": "S7", ")":"R1", "$":"R1"},
    {"+": "R3", "*": "R3", ")":"R3", "$":"R3"},
    {"+": "R5", "*": "R5", ")":"R5", "$":"R5"}
];

function LR_Parse(exp){

    let action = "";
    let stk = new stack.Stack();
    stk.push("0");
    let bfs = new BufferStream(exp);

    let countItr = 1;

    while(action !== "accept"){
        let tmpToken = bfs.peekNextToken();
        let state = stk.peek();
        let tmpVal = parseChart[Number.parseInt(state)][tmpToken];
        if(tmpVal === undefined){
            action = "reject";
            return action;
        }
        console.log(`${countItr}) stack: ${stk.getStack()} , input: ${bfs.getExp()} , action: ${tmpVal}\n`);
        if(tmpVal[0] === "S"){
            stk.push(bfs.getNextToken());
            stk.push(tmpVal.replace(/\D/g, ''));
        //    console.log(`${countItr}) stack: ${stk.getStack()} , input: ${bfs.getExp()} , action: ${tmpVal}\n`);
        }
        else if(tmpVal[0] === "R"){
            let tmpGrammar = tmpVal.replace(/\D/g, '');
            
            let grammerNum = Number.parseInt(tmpGrammar);
            let tmpStkElem = "";
            switch(grammerNum){
                case 1:
                    stk.pop("T");
                    stk.pop("E");
                    tmpStkElem = "E";
                    break;
                case 2:
                    stk.pop("T");
                    tmpStkElem = "E";
                    break;
                case 3:
                    stk.pop("F");
                    stk.pop("T");
                    tmpStkElem = "T";
                    break;
                case 4:
                    stk.pop("F");
                    tmpStkElem = "T";
                    break;
                case 5: 
                    stk.pop("(");
                    tmpStkElem = "F";
                    break;
                case 6:
                    stk.pop("id");
                    tmpStkElem = "F";
                    break;
                default:
          //          console.error("Something went wrong with the grammer num calculations...");
            }
            
            let tmp_tmpVal = stk.peek();
            
            stk.push(tmpStkElem);
            
            stk.push(parseChart[tmp_tmpVal][tmpStkElem]);
            
        }

        action = tmpVal;
        countItr++;
    }

    // use x[0] as an accessor for the map key value
    //let y = x.replace(/\D/g, ''); // transforms value to string

    return action;
}


function BufferStream(exp){

    this._exp = exp;

    this.getExp = () => {
        return this._exp;
    };

    this.peekNextToken = () => {
        let tmpStr = "";
        let count = 0;
        while(!langExp.has(tmpStr)){
            if(tmpStr.length > 2){
                throw new Error("The expression given is not valid for the given language...");
            }
            else if(this._exp[count] === undefined){
                return undefined;
            }
            tmpStr += this._exp[count];
            count++;
        }
        return tmpStr;
    }

    this.getNextToken = () =>{
        let tmpStr = "";
        let count = 0;
        while(!langExp.has(tmpStr)){
            if(tmpStr.length > 2){
                throw new Error("The expression given is not valid for the given language...");
            }
            else if(this._exp[count] === undefined){
                return undefined;
            }
            tmpStr += this._exp[count];
            count++;
        }
        this._exp = this._exp.slice(count, this._exp.length);
        return tmpStr;
    };

    this.isEmpty = () => {
        if(this._exp.length === 0) return true;
        else return false;
    };

}


module.exports = {
    BufferStream,
    LR_Parse
};