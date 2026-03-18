function solution(fees, records) {
    const [baseTime, baseFee, unitTime, unitFee] = [...fees];
    const inMap = new Map();
    const totalTimeMap = new Map(); // 요금 대신 누적 시간을 저장!
    
    for(const record of records){
        const [time, num, type] = record.split(" ")
        const minTime = timeToMin(time);
        if(type === "IN"){
            inMap.set(num, minTime);
        } else { // type === "OUT"
            const stayed = minTime - inMap.get(num);
            totalTimeMap.set(num, (totalTimeMap.get(num) || 0) + stayed);
            inMap.delete(num);
        }
    }
    
    
    for(const [num,inTime] of inMap){
        const stayed = (23 * 60) + 59 - inTime;
        totalTimeMap.set(num, (totalTimeMap.get(num) || 0) + stayed);
    }
    
    return [...totalTimeMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([num, totalTime]) => {
            if (totalTime <= baseTime) return baseFee;
            return baseFee + Math.ceil((totalTime - baseTime) / unitTime) * unitFee;
        });
}

function timeToMin(strTime){
    // 05:34 -> 300 + 34 = 334
    const [hour, min] = strTime.split(":").map(Number);
    return hour * 60 + min; 
}