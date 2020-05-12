//散列表（哈希表）

var HashTable = function(){
    var items = [];

    //散列函数loselose
    var loseloseHashCode = function(key){
        var hash  =0;
        for(var i = 0;i<key.length;i++){
            hash += key[i].charCodeAt();
        }
        return hash % 37;
    }
    //散列函数djb2
    var djb2HashCode = function(key){
        var hash = 5381;
        for(var i = 0;i<key.length;i++){
            hash = hash * 33 + key[i].charCodeAt()
        }
        return hash % 1013
    }

    this.put = function(key,value){
        var position = djb2HashCode(key);
        items[position] = value
    }

    this.delete = function(key){
        items[djb2HashCode(key)] = undefined;
    }

    this.getItems = function(){
        return items
    }
}

var ht = new HashTable();
ht.put('Jobs','78987')
ht.put('Jbso','6789876')
ht.put('Josb','567898765')
console.log(ht.getItems())

//哈希表冲突解决方案
// 1、分离链接法
var LinkedList = function(){
    var head = null;
    var length = 0;

    var Node = function(ele){
        this.ele = ele;
        this.next = null;
    }

    this.append = function(ele){
        var node = new Node(ele);

        if(head === null){
            head = node;
        }else{
            var current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        length++;
    }

    this.insert = function(position,ele){
        var node = new Node(ele);
        if(position>-1&&position<length){
            if(position===0){
                var current = head;
                head = node;
                node.next = current;
            }else{
                var index = 0;
                var current = head;
                var previous = null;
                while(index<position){
                    previous = current
                    current = current.next;
                    index++;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
        }
    }
    this.removeAt = function(position){
        if(position>-1&&position<length){
            var current = head;
            if(position===0){
                head = current.next;
            }else{
                var previous = null;
                var index = 0;
                while(index<position){
                    previous = current
                    current = current.next;
                    index++;
                }
                previous.next = current.next;
            }
            length--;
            return current.ele
        }
        return null
    }
    this.indexOf = function(ele){
        var index = 0;
        var current = head;
        while(current){
            if(ele === current.ele){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1
    }
    this.remove = function(ele){
        var index = this.indexOf(ele)
        return this.removeAt(index)
    }
    this.isEmpty = function(){
        return length === 0
    }
    this.size = function(){
        return length;
    }
    this.getHead = function(){
        return head;
    }
}

var HashTable_L = function(){
    var table = [];
    //散列函数
    var loseloseHashCode = function(key){
        var hash  =0;
        for(var i = 0;i<key.length;i++){
            hash += key[i].charCodeAt();
        }
        return hash % 37;
    }
    var Node = function(key,value){
        this.key = key;
        this.value = value
    }
    this.put = function(key,value){
        var position = loseloseHashCode(key)
        if(!table[position]){
            var ll = new LinkedList()
            table[position] = ll;
        }
        table[position].append(new Node(key,value))
    }
    this.get = function(key){
        var position = loseloseHashCode(key)
        if(table[position]){
            var current = table[position.getHead()]
            while(current){
                if(current.ele.key == key){
                    return current.ele.value
                }
                current = current.next;
            }
        }else{
            return undefined;
        }
    }
    this.remove = function(key){
        var position = loseloseHashCode(key)
        if(table[position]){
            var current = table[position].getHead();
            while(current){
                if(current.ele.key == key){
                    table[position].remove(current.ele)
                    if(table[position].isEmpty()){
                        table[position] = undefined
                    }
                    return true;
                }
                current = current.next;
            }
        }
    }
    this.getTable = function(){
        return table;
    }
}

var htl = new HashTable_L();
htl.put('Ana','jksajdkas')
htl.put('Donnie','aaaaaa')
console.log(htl.remove('Ana'))
console.log(htl.getTable()[13].getHead())

// 2、线性探查法

var HashTable_X = function(){
    var table = [];
    //散列函数
    var loseloseHashCode = function(key){
        var hash  =0;
        for(var i = 0;i<key.length;i++){
            hash += key[i].charCodeAt();
        }
        return hash % 37;
    }
    var Node = function(key,value){
        this.key = key;
        this.value = value
    }
    this.put = function(key,value){
        var position = loseloseHashCode(key)
        if(table[position] === undefined){
            table[position] = new Node(key,value)
        }else{
            //向下查找空位
            var index = position+1;
            while(table[index]!==undefined){
                index++
            }
            table[index] = new Node(key,value)
        }
    }
    this.get = function(key){
        var position = loseloseHashCode(key)
        if(!table[position]){
            return undefined
        }
        var index = position;
        while(table[index]!==undefined){
            if(table[index].key === key){
                return table[index].value
            }
            index++;
        }
    }
    this.remove = function(key){
        var position = loseloseHashCode(key)
        if(!table[position]){
            return false
        }
        var index = position;
        while(table[index]!==undefined){
            if(table[index].key === key){
                delete table[index]
                return true
            }
            index++;
        }
    }
    this.getTable = function(){
        return table;
    }
}

var htx = new HashTable_X();
htx.put('Ana','jksajdkas')
htx.put('Donnie','aaaaaa')
console.log(htx.remove('Donnie'))
console.log(htx.getTable())

