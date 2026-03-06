function solution(genres, plays) {
    var answer = [];
    const N = genres.length;
    
    const genreMap = new Map();
    const albumMap = new Map();
    
    for(let i = 0; i<N; i++){
        let genre = genres[i];
        let play = plays[i];
    
        genreMap.set(genre, (genreMap.get(genre) || 0) + play);
        
        if(!albumMap.has(genre)){
            albumMap.set(genre, []);
        }
        
        albumMap.get(genre).push({id: i, play: play});
    }
    
    const sortedGenres = [...genreMap].sort((a,b) => b[1] - a[1]).map((genre)=> genre[0]);
    
    sortedGenres.forEach((genre) => {
        const song = albumMap.get(genre);
        
        song.sort((a,b) => b.play - a.play || a.id - b.id)
        
        for(let i = 0; i < song.length && i<2; i++){
            answer.push(song[i].id);
        }
        
    })
    
    return answer;
}