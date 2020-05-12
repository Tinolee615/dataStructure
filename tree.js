var Tree = function(){
    var root = null;
    var Node = function(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
    var insertNode = function(node,newNode){
        if(newNode.value>node.value){
            if(node.right == null){
                node.right = newNode
            }else{
                insertNode(node.right,newNode)
            }
        }else if(newNode.value<node.value){
            if(node.left == null){
                node.left = newNode
            }else{
                insertNode(node.left,newNode)
            }
        }
    }
    this.insert = function(value){
        var node = new Node(value)
        if(!root){
            root = node;
        }else{
            insertNode(root,node)
        }
    }
    this.search = function(value){

    }
    var findMinNode = function(node){
        if(node == null) return null;
        while(node && node.left){
            node = node.left
        }
        return node;
    }
    var removeNode = function(node,value){
        if(node == null) return null;
        if(value>node.value){
            node.right = removeNode(node.right,value)
            return node
        }else if(value<node.value){
            node.left = removeNode(node.left,value)
            return node
        }else{
            //执行删除
            //1、没有子节点
            if(node.left == null&&node.right == null){
                node = null;
                return node;
            }
            if(node.left == null && node.right){
                //2、有右子节点,无左子节点
                return node.right;
            }else if(node.left && node.right == null){
                //3、有左子节点,无右子节点
                return node.left;
            }
            // 4、左右子节点都存在，查找右子节点最小节点
            var aux = findMinNode(node.right)
            node.value = aux.value
            node.right = removeNode(node.right,aux.value)
            return node;
        }
    }
    //删除节点---->替换为右侧子树的最小节点
    this.remove = function(value){
        root = removeNode(root,value)
    }
    var traverse = function(node,callback){
        if(node == null){
            return;
        }
        callback(node.value) //8,2,3,9 先序遍历
        traverse(node.left,callback)
        // callback(node.value) //2,3,8,9 中序遍历
        traverse(node.right,callback)
        // callback(node.value) //3,2,9,8 后序遍历
    }
    this.traverse = function(callback){
        traverse(root,callback)
    }
    var min = function(node){
        if(node == null) return null;
        while(node && node.left){
            node = node.left
        }
        return node.value;
    }
    this.min = function(){
        return min(root)
    }
    var max = function(node){
        if(node == null) return null;
        while(node && node.right){
            node = node.right
        }
        return node.value;
    }
    this.max = function(){
        return max(root)
    }
    this.getRoot = function(){
        return root
    }
}

var t = new Tree()

t.insert(8)
t.insert(2)
t.insert(3)
t.insert(10)
t.insert(11)
t.insert(9)

// t.traverse(function(res){
//     console.log('value',res)
// })

t.remove(10)
console.log(t.getRoot())

// var t = new Tree()

// t.insert(11)
// t.insert(8)
// t.insert(6)
// t.insert(9)
// t.insert(12)

// console.log(t.min())
// console.log(t.max())


// console.log(t.getRoot())


//红黑树

//1、红黑树的规则
/**
 * a、树中的每个节点不是红色就是黑色
 * b、根节点总是黑色
 * c、红色节点的子节点必须是黑色
 * d、从根节点到叶子节点或者空子节点的每条路径，必须包含相同数量的黑色节点
*/

