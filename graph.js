//有向图
//无向图

//邻接矩阵 （0,1）
// 缺点:
// 1、浪费计算机内存
// 2、添加和删除点很麻烦


//邻接表
// 1、添加顶点
// 2、添加顶点之间的边

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
//无向图(邻接表形式)
var Graph = function(){
    //顶点
    var vertices = [];
    //边
    var adjList = {}

    //添加顶点
    this.addVertex = function(v){
        vertices.push(v)
        adjList[v] = [];
    }

    //添加边
    this.addEdge = function(a,b){
        adjList[a].push(b)
        adjList[b].push(a)
    }

    this.print = function(){
        var s = '\n'
        for(var i = 0;i<vertices.length;i++){
            var topPoint = vertices[i];
            s += topPoint + ' ---> '
            var edge = adjList[topPoint]
            for(var j = 0;j<edge.length;j++){
                s += edge[j]
            }
            s += '\n'
        }
        console.log(s)
    }
    // white 未发现
    // gray 已发现为探索
    // black 已探索
    var initColor = function(){
        var color = {};
        for(var i = 0;i<vertices.length;i++){
            color[vertices[i]] = 'white'
        }
        return color
    }
    //广度优先遍历
    this.bfs = function(v,callback){
        var color = initColor()

        var queue = new Queue();
        queue.enQueue(v)

        var d = {}
        var pred = {}

        for(var i = 0;i<vertices.length;i++){
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }

        while(!queue.isEmpty()){
            var now = queue.deQueue()
            var edge = adjList[now]
            for(var i = 0;i<edge.length;i++){
                var w = edge[i];
                if(color[w] === 'white'){
                    color[w] = 'gray'

                    //设置回溯点
                    pred[w] = now;
                    d[w] = d[now] + 1;

                    queue.enQueue(w)
                }
            }
            color[now] = 'black'
            if(callback){
                callback(now)
            }
        }
        return {pred,d}
    }
    //深度优先遍历
    var dfsVisite = function(v,color,callback){
        color[v] = 'gray';
        var n = adjList[v]
        for(var i = 0;i<n.length;i++){
            var w = n[i]
            if(color[w] == 'white'){
                dfsVisite(w,color,callback)
            }
        }
        color[v] = 'black'
        if(callback){
            callback(v)
        }
    }
    this.dfs = function(v,callback){
        var color = initColor()
        dfsVisite(v,color,callback)
    }
}


var g = new Graph();
console.log(g)

g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')
g.addVertex('F')

g.addEdge('A','B')
g.addEdge('A','C')
g.addEdge('A','D')
g.addEdge('C','D')
g.addEdge('B','E')
g.addEdge('F','B')

g.print()

// var dPred = g.bfs('A',(res)=>{
//     console.log('res',res)
// })

// console.log('dPred',dPred)

var dPred = g.dfs('A',(res)=>{
    console.log('res',res)
})
console.log('dPred',dPred)

//图遍历 ---> 广度优先和深度优先

//1、广度优先(队列)
//a未发现
//b已发现(发现连接到此，但未查找此节点的全部链接节点)
//c已探索(已发现此节点全部链接节点)

// · 发现未发现节点放在队列中，等待查找，并且标志为已发现
// · 在队列中拿出已发现节点开始探索全部节点，并且跳过已发现节点
// · 遍历完此节点后，将此节点标志为已探索
// · 开始在队列中探索下一个节点

// bfs

//最短路径问题
// 假设从A开始
// 1、记录d（distance） = {A:0,B:1,E:2}
// 2、记录回溯路径 pred = [A:null,B:'A',E:'B'...]

// 每次探索新点后（如E），设置回溯点 （B）
// pred['E'] = 'B'

// 每次探索新点后（如E），将该点距离（d['E']）设置为回溯点（B）的距离加1
// d['E'] = d['B'] + 1
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

var s = g.bfs('A')

var zuiduan = function(from,to){
    var v = to;
    var path = new Stack();
    while(v !== from){
        path.push(v)
        v = s.pred[v]
    }
    path.push(v)
    var str = ''
    while(!path.isEmpty()){
        str += path.pop() + '-'
    }
    str = str.slice(0,str.length-1)
    console.log(str)
}

zuiduan('A','F')

//2、深度优先(递归)
//a未发现
//b已发现(发现连接到此，但未查找此节点的全部链接节点)
//c已探索(已发现此节点全部链接节点)
// · 从某一节点开始查找，并且将自己标志为已发现
// · 从此节点继续探索其全部节点，并且跳过已发现节点
// · 遍历完此节点，将此节点标志为已探索
// · 递归返回，继续探索下一路径的最深节点
