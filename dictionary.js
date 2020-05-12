//字典--键值对、可覆盖
var Dictionary = function(){
    var items = {}

    this.has = function(key){
        return items.hasOwnProperty(key)
    }

    this.set = function(key,value){
        items[key] = value;
    }
    this.delete = function(key){
        if(this.has(key)){
            delete items[key]
            return true;
        }
        return false;
    }
    this.get = function(key){
        if(this.has(key)){
            return items[key]
        }
        return false
    }
    this.keys = function(){
        return Object.keys(items)
    }
}
