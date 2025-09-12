console.log("Welcome to Spotify");


async function main(){ 
    let a = await fetch("http://127.0.0.1:5501/Spotify-Clone/songs/");
    let response = await a.text();
    console.log(response);
} 

main();