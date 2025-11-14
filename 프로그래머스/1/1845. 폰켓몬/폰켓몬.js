function solution(nums) {
    var answer = 0;
    const map = new Map();
    
    for(let num of nums){
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    const need = nums.length / 2;
    
    answer = map.size >= need ? need : map.size
    return answer;
}