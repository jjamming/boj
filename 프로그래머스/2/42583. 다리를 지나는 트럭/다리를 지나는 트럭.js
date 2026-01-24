function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    let curWeight = 0;
    const bridgeQ = Array(bridge_length).fill(0);
    
    while(bridgeQ.length > 0){
        time++;
        
        const exit = bridgeQ.shift();
        if(exit){
            curWeight -= exit;
        }
        
        if(truck_weights.length > 0){
            if(truck_weights[0] + curWeight <= weight){
                const newWeight = truck_weights.shift();
                bridgeQ.push(newWeight);
                curWeight += newWeight;
            }else {
                bridgeQ.push(0);
            }
        }
    }
    return time;
}