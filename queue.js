
var Queue = function(){
    var items = [];

    this.enQueue = function(ele){
        items.push(ele)
    }

    this.deQueue = function(){
        return items.shift()
    }

    this.front = function(){
        return items[0]
    }

    this.isEmpty = function(){
        return items.length === 0
    }

    this.size = function(){
        return items.length
    }
}


//击鼓传花（循环队列）
function passTheFlower(names,number){
    var queue = new Queue();
    for (let i = 0; i < names.length; i++) {
        queue.enQueue(names[i])
    }
    var eliminate
    while(queue.size()>1){
        for (let i = 0; i < number-1; i++) {
            queue.enQueue(queue.deQueue())
        }
        eliminate = queue.deQueue()
        console.log('eliminate ele is '+ eliminate)
    }
    return queue.deQueue()
}

var names = ['a','b','c','d','e','f','g'];

var number = 3;

console.log(passTheFlower(names,number))



//优先队列

var PriorityQueue = function(){
    var items = [];

    var  QueueItem = function(ele,priority){
        this.ele = ele;
        this.priority = priority;
    }

    this.enQueue = function(ele){
        var queueItem = new QueueItem(ele.ele,ele.priority);

        var added
        for(var i = 0;i<items.length;i++){
            if(queueItem.priority>items[i].priority){
                items.splice(i,0,queueItem);
                added = true
                break;
            }
        }
        if(!added){
            items.push(queueItem)
        }
    }

    this.getItems = function(){
        return items
    }
}

var pq = new PriorityQueue();

pq.enQueue({ele:'d',priority:4})
pq.enQueue({ele:'e',priority:5})
pq.enQueue({ele:'a',priority:1})
pq.enQueue({ele:'b',priority:2})
pq.enQueue({ele:'c',priority:3})

console.log(pq.getItems())
