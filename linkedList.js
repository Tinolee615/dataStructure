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

// var ll = new LinkedList();

// ll.append(1)
// ll.append(2)
// ll.append(3)
// ll.append(4)

// ll.insert(2,10)
// var del = ll.removeAt(3)
// console.log(del)
// console.log(ll.indexOf(4))
// console.log(ll.remove(4))
// console.log(ll.getHead())



//双向链表

var DoubleLinkedList = function(){

    var Node = function(ele){
        this.ele = ele;
        this.next = null;
        this.prev = null;
    }

    var head = null;
    var length = 0;
    //尾引用
    var tail = null;

    this.append = function(ele){
        var node = new Node(ele)
        var current
        if(head === null){
            head = node;
            tail = node;
        }else{
            current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
            node.prev = current;
            tail = node;
        }
        length++;
    }

    this.insert = function(position,ele){
        if(position>-1&&position<length){
            var node = new Node(ele)
            var current = head,
                previous,
                index = 0;
            if(position === 0){
                if(head === null){
                    head = node;
                    tail = node;
                }else{
                    current.prev = node;
                }
                node.next = current;
                head = node;
            }else if(position === length){
                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                current.prev = node;
                previous.next = node;
                node.prev = previous;
                node.next = current;
            }
            length++;
            return true;
        }
        return false;
    }

    this.removeAt = function(position){
        if(position>-1&&position<length){
            var current = head,
                previous,
                index = 0;
            if(position === 0){
                head = current.next;
                if(length === 1){
                    tail = null;
                }else{
                    head.prev = null;
                }
            }else if(position === length-1){
                current = tail;
                tail = current.prev;
                tail.next = null;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                //此时current是需要删除的项
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.ele;
        }
        return null
    }
    this.indexOf = function(ele){
        var current = head,
            index = 0;
        while(index<length){
            if(current.ele === ele){
                return index;
            }
            current = current.next;
            index++;
        }
        return -1
    }

    this.remove = function(ele){
        return this.removeAt(this.indexOf(ele))
    }
    this.isEmpty = function(){
        return length === 0
    }
    this.size = function(){
        return length;
    }
    this.getHead = function(){
        return head
    }
}

// var dll = new DoubleLinkedList();

// dll.append(1)
// dll.append(2)
// dll.append(3)
// dll.append(4)
// dll.append(5)

// dll.insert(2,20)
// console.log(dll.removeAt(2))

// console.log(dll.indexOf(4))

// console.log(dll.getHead())


//单项循环链表
var CircularLinkedList = function(){
    var Node = function(ele){
        this.ele = ele;
        this.next = null;
    }

    var length = 0;
    var head = null;

    this.append = function(ele){
        var node = new Node(ele);
        if(head === null){
            head = node;
            node.next = head;
        }else{
            current = head;
            while(current.next!==head){
                current = current.next;
            }
            current.next = node;
            node.next = head;
        }
        length++;
    }

    this.insert = function(position,ele){
        if(position>-1&&position<length){
            var node = new Node(ele),
                index = 0,
                current = head,
                previous;
            if(position===0){
                node.next = head;
                head = node;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
            return true;
        }
        return false;
    }

    this.removeAt = function(position){
        if(position>-1&&position<length){
            var current = head,
                previous,
                index = 0;
            if(position === 0){
                head = current.next;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = current.next;
            }
            length--;
            return current.ele;
        }
        return null;
    }
    this.indexOf = function(ele){
        var current = head,
            index = 0;
        while(current&&index<length){
            if(current.ele == ele){
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    this.remove = function(ele){
        return this.removeAt(this.indexOf(ele))
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

// var cll = new CircularLinkedList();

// cll.append(1)
// cll.append(2)
// cll.append(3)
// cll.append(4)
// cll.append(5)

// cll.insert(1,10)

// // console.log(cll.indexOf(4))

// console.log(cll.remove(10))
// console.log(cll.getHead())


//双向循环链表
var DoubleCircularLinkedList = function(){
    var Node = function(ele){
        this.ele = ele;
        this.prev = null;
        this.next = null;
    }

    var length = 0,
        head = null;
        tail = null;
    
    this.append = function(ele){
        var node = new Node(ele);
        var current = head,
            previous;
        if(head === null){
            head = node;
            tail = node;
            head.prev = tail;
            tail.next = head;
        }else{
            current = head;
            while(current.next!==head){
                current = current.next;
            }
            current.next = node;
            node.prev = current;
            node.next = head;
        }
        length++;
    }

    this.insert = function(position,ele){
        if(position>-1&&position<length){
            var node = new Node(ele)
            var current = head,
                previous,
                index = 0;
            if(position === 0){
                if(head === null){
                    node.prev = node;
                    node.next = node;
                    head = node;
                    tail = node;
                }else{
                    current.prev = node;
                    node.next = current;
                    node.prev = tail;
                    head = node;
                }
            }else if(position === length){
                current = tail;
                current.next = node;
                node.prev = current;
                node.next = head;
                tail = node;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++
                }
                node.prev = previous;
                node.next = current;
                current.prev = node;
                previous.next = node;
            }
            length++;
            return true;
        }
        return false;
    }
    this.removeAt = function(position){
        if(position>-1&&position<length){
            var current = head,
                index = 0,
                previous;
            if(position === 0){
                current.next.prev = tail;
                head.next = current.next;
            }else if(position === length-1){
                current = tail;
                current.prev.next = head;
                head.prev = current.prev;
                tail = current.prev;
            }else{
                while(index<position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            length--;
            return current.ele;
        }
    }

    this.indexOf = function(ele){
        var current = head,
            index = 0;
        while(index<length){
            if(current.ele === ele){
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    this.remove = function(ele){
        return this.removeAt(this.indexOf(ele))
    }
    this.isEmpty = function(){
        return length === 0
    }
    this.size = function(){
        return length;
    }
    this.getHead = function(){
        return head
    }
}

// var dcll = new DoubleCircularLinkedList();

// dcll.append(1)
// dcll.append(2)
// dcll.append(3)
// dcll.append(4)

// dcll.insert(1,9)
// console.log(dcll.indexOf(9))
// console.log(dcll.remove(9))
// console.log(dcll.getHead())

