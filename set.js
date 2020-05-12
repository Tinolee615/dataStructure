var Set = function(){
    var items = {};
    var length = 0;
    this.has = function(value){
        return items.hasOwnProperty(value)
    }

    this.add = function(value){
        if(this.has(value)) return false;
        items[value] = value;
        length++;
        return true;
    }

    this.remove = function(value){
        if(this.has(value)){
            delete items[value];
            length--;
            return true
        }
        return false;
    }
    this.clear = function(){
        items = {}
        length = 0;
    }
    this.size = function(){
        return length;
    }
    this.values = function(){
        var values = []
        for(var key in items){
            if(items.hasOwnProperty(key)){
                values.push(items[key])
            }
        }
        return values
    }
    //并集
    this.union = function(otherSet){
        var resultSet = new Set();

        var arr = this.values();
        for(var i = 0;i<arr.length;i++){
            resultSet.add(arr[i])
        }
        arr = otherSet.values();
        for(var i = 0;i<arr.length;i++){
            resultSet.add(arr[i])
        }
        return resultSet
    }
    //交集
    this.intersection = function(otherSet){
        var resultSet = new Set();

        var arr = this.values();

        for(var i = 0;i<arr.length;i++){
            if(otherSet.has(arr[i])){
                resultSet.add(arr[i])
            }
        }
        return resultSet
    }
    //差集
    this.diffrence = function(otherSet){
        var resultSet = new Set();

        var arr = this.values();

        for(var i = 0;i<arr.length;i++){
            if(!otherSet.has(arr[i])){
                resultSet.add(arr[i])
            }
        }
        return resultSet
    }
    this.getItems = function(){
        return items
    }
}

var set1 = new Set();
set1.add(1)
set1.add(2)
set1.add(3)
set1.add(5)
var set2 = new Set();
set2.add(1)
set2.add(2)
set2.add(3)
set2.add(4)

let mySet1 = set1.union(set2)
let mySet2 = set1.intersection(set2)
let mySet3 = set1.diffrence(set2)

console.log(mySet1.getItems())
console.log(mySet2.getItems())
console.log(mySet3.getItems())

//Set强引用
// add
// clear
// delete
// entire
// forEach
// has
// size
// values

//WeakSet 只能添加一个object类型的数据，弱引用
// add
// delete
// has
