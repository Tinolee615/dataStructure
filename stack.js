var Stack = function(){
    var items = [];
    //入栈
    this.push = function(ele){
        items.push(ele)
    }
    // 出栈
    this.pop = function(){
        return items.pop()
    }
    //查看栈顶
    this.peek = function(){
        return items[items.length-1]
    }
    this.isEmpty = function(){
        return items.length === 0
    }
    this.clear = function(){
        items = [];
    }
    this.size = function(){
        return items.length;
    }
}

function _10to2(number){
    var stack = new Stack();
    var remainder;
    let str = ''
    while(number>0){
        remainder = number % 2;
        stack.push(remainder)
        number = Math.floor(number/2)
    }
    while(!stack.isEmpty()){
        str += stack.pop()
    }
    return str
}

console.log(_10to2(11))
