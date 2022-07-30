function Stack() {

    this._items = [];

    this.push = (data) => {
        this._items.push(data);
    };
    this.pop = (data) => {

        if(data === undefined){
            console.log("data undefined");
            if(this._items.length !== 0) return this._items.pop();
            return undefined;
        }

        let instances = 0;

        for(let i of this._items){
            if(i === data) instances++;
        }

        if(instances === 0){
            //console.error(`${data} is not in the stack.`);
            return undefined;
        }
        
        else{
            while(true){
                let tmp = this._items.pop();
                if(tmp === data) break;
            }
        }


        return data;

    };

    this.peek = () => {
        if(this._items.length !== 0) return this._items[this._items.length - 1];
        return undefined;
    };

    this.empty = () => {
       if(this._items.length !== 0) this._items = [];
        else{
            return undefined;
        }
    };

    this.isEmpty = () => {
        if(this._items.length !== 0) return false;
        return true;
    };


    // method getStack for testing purposes
    this.getStack = () => {
        return this._items;
    }

}


module.exports = {
    Stack
};