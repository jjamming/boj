function solution(friends, gifts) {
    var answer = 0;
    const n = friends.length;
    // giftCount[a][b] === a가 b에게 준 선물 개수
    const giftCount = Array.from({length: n}, ()=> Array(n).fill(0));
    
    const nameMap = new Map()
    for(let i = 0; i<n; i++){
        let name = friends[i];
        nameMap.set(name, i)
    }
    
    const m = gifts.length;
    for(let i = 0; i<m; i++){
        let [from, to] = gifts[i].split(" ");
        let fromIdx = nameMap.get(from);
        let toIdx = nameMap.get(to);
        giftCount[fromIdx][toIdx]++;
    }
    
    const giftPoint = Array(n).fill(0);
    for(let i = 0; i<n; i++){
        let given = 0;
        let taken = 0;
        for(let j = 0; j<n; j++){
            given += giftCount[i][j];
            taken += giftCount[j][i];
        }
        giftPoint[i] = given - taken;
    }
    
    const nextGift = Array(n).fill(0);
    
    for(let giver of friends){
        let giverIdx = nameMap.get(giver);
        let willTakeCount = 0;
        // 준 사람들에 대해 받은 개수를 비교
        for(let friend of friends){
            if(giver === friend) continue; // 자신 제외
            let fIdx = nameMap.get(friend);
            let takeCount = giftCount[fIdx][giverIdx];
            let giveCount = giftCount[giverIdx][fIdx];
            
            if(takeCount < giveCount) willTakeCount++;
            else if(takeCount === giveCount){
                if(giftPoint[giverIdx] > giftPoint[fIdx]) willTakeCount++;
            }
        }
        nextGift[giverIdx] += willTakeCount;
    }
    
    answer = Math.max(...nextGift)
    
    return answer;
}