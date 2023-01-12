let track_art = document.querySelectorAll('.track-art')
let track_name = document.querySelectorAll('.track-name')
let track_artist = document.querySelectorAll('.track-artist')

let playpause_btn = document.querySelectorAll('.playpause-btn')
let next_btn = document.querySelectorAll('.next-track')
let prev_btn = document.querySelectorAll('prev-track')

let seek_slider = document.querySelectorAll('.seek-slider')
let curr_time = document.querySelectorAll('.current-time')
let total_duration = document.querySelectorAll('.total-duration')
let curr_track = document.createElement('audio')


let track_index = 0
let isPlaying = false
let updateTimer

const music_list = [
    {
        img: './assets/images/gerald_collier.jpg',
        name: 'Help Is On The Way',
        artist: 'Gerald Collier',
        music: './assets/music/Gerald Collier - Help Is On The Way (Live @ KEXP).mp3'
    },
    {
        img: './assets/images/trig.jfif',
        name: 'Shelter',
        artist: 'Trigg',
        music: './assets/music/Trigg - Shelter.mp3'
    },
    {
        img: './assets/images/sycamore_drive.jfif',
        name: 'Moves',
        artist: 'Sycamore Drive',
        music: './assets/music/Sycamore Drive - Moves.mp3'
    },
    {
        img: './assets/images/juniore.jfif',
        name: 'Sudain',
        artist: 'Juniore',
        music: './assets/music/Juniore - Soudain.mp3'
    },
    {
        img: './assets/images/holizna.jfif',
        name: 'Revenge',
        artist: 'Holizna',
        music: './assets/music/HoliznaPATREON - Revenge.mp3'
    }
]

loadTrack(track_index)

function loadTrack() {
    clearInterval(updateTimer)
    reset()

    curr_track.src = music_list[track_index].music
    curr_track.load()
    
    track_art.forEach(element => {
        element.style.backgroundImage = "url(" + music_list[track_index].img + ")"
    })
    track_name.forEach(element => {
        element.textContent = music_list[track_index].name
    })
    track_artist.forEach(element => {
        element.textContent = music_list[track_index].artist
    })

    updateTimer = setInterval(setUpdate, 1000)
    curr_track.addEventListener('ended', nextTrack)
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    
    for(let i=0; i<3; i++) {
        track_art[i].classList.add('animate');
        playpause_btn[i].innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    
    for(let i=0; i<3; i++) {
        track_art[i].classList.remove('animate');
        playpause_btn[i].innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    
}
function nextTrack(){
    if(track_index < music_list.length - 1){
        track_index += 1;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    seek_slider.forEach(element => {
        element.addEventListener('input', () => {
            let seekto = curr_track.duration * (element.value / 100);
            curr_track.currentTime = seekto;
            setUpdate()
        })
    })
    
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.forEach(element => {
            element.value = seekPosition;
        });

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.forEach(element => {
            element.textContent = currentMinutes + ":" + currentSeconds;
        });
        total_duration.forEach(element => {
            element.textContent = durationMinutes + ":" + durationSeconds;
        });
    }
    handleInputChange()
}


function handleInputChange() {
    seek_slider.forEach(element => {
        const min = element.min
        const max = element.max
        const val = element.value
    
        element.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    })
    
}
  