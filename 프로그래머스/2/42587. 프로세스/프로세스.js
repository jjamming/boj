function solution(priorities, location) {
    var answer = 0;
    const processes = [];
    const N = priorities.length;
    let count = 1;
    
    for(let i = 0 ; i<N; i++){
        processes.push([i, priorities[i]])
    }
    
    while(processes.length){
        const [name, priority] = processes.shift();
        const curPriorities = processes.map(([n, p])=> p)
        
        if(priority < Math.max(...curPriorities)){
            processes.push([name, priority]);
        } else {
            if(name === location){
                answer = count;
            }
            count++;
        }
    }
    
    return answer;
}