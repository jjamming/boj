function solution(phone_book) {
    var answer = true;
    
    phone_book.sort();
    const n = phone_book.length;
    for(let i = 0; i<n-1; i++){
        if(phone_book[i+1].startsWith(phone_book[i])){
            answer = false;
            break;
        }
    }
    
    return answer;
}