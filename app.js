const app= ()=>{
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.video-container video');
    const sounds=document.querySelectorAll('.sound-picker button');
    const timeDisplay=document.querySelector('.time-display');
    const totalOutlineLength=outline.getTotalLength();
    const timeSelect=document.querySelectorAll('.timer button');
    let falseDuration=600;

    outline.style.strokeDasharray=totalOutlineLength;
    outline.style.strokeDashoffset=totalOutlineLength;

    //to pick different sounds

    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkplaying(song);
        })
    })

    play.addEventListener('click',()=>{
        checkplaying(song);
    });

   timeSelect.forEach(option=>{
       option.addEventListener('click',function(){
           falseDuration=this.getAttribute('data-time');
           timeDisplay.textContent=`${Math.floor(falseDuration/60)}: ${Math.floor(
               falseDuration%60)}`;
       })
   })

    const checkplaying=song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src='./pause.svg';
        }
        else{
            song.pause();
            video.pause();
            play.src='./play.svg';
        }
    }
    song.ontimeupdate=()=>{
        let currentTime=song.currentTime;
        let timeElapsed=falseDuration-currentTime;
        let seconds=Math.floor(timeElapsed % 60);
        let minutes=Math.floor(timeElapsed / 60);

        //Animation
        let progress= totalOutlineLength-(currentTime/falseDuration)*totalOutlineLength;
        outline.style.strokeDashoffset=progress;
        timeDisplay.textContent=`${minutes}:${seconds}`;
        if(currentTime>= falseDuration){
            song.pause();
            song.currentTime=0;
            play.src='./play.svg';
            video.pause();
        }
    }
};

app();