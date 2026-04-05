const searchbx =document.querySelector("#search");
const search=document.querySelector(".search-btn");
const movie=document.querySelector("#movieList");
const movieimg=document.querySelector("#img");
const aboutmovie=document.querySelector(".details")

search.addEventListener("click",()=>{
    if(searchbx.value.trim()==""){
        alert("please enter  a movie name")
         aboutmovie.innerHTML ="<p> please enter a movie name</p>"
         return;
    }
    let searchvalue= searchbx.value.toLowerCase().trim();
    console.log(searchvalue)
     getMovie(searchvalue);

})
async function getMovie(name){
    try{
        let mname = cleanertext(name);
        let data= await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(mname)}&apikey=2a1dc971`);
        let jsondata= await data.json();
        movieimg.src=jsondata.Poster;
        aboutmovie.innerHTML=` 
        <h2> Title :${jsondata.Title}</h2>


    <p>
        <b>${jsondata.Title}</b> is a ${jsondata.Genre} movie released in ${jsondata.Year}. 
        It is directed to entertain audiences through engaging storytelling, strong characters, and emotional depth. 
        The film stars ${jsondata.Actors} and belongs to the ${jsondata.Genre} genre. 
        It has received an IMDb rating of ${jsondata.imdbRating} ⭐.
        
        <br><br>

        📖 ${jsondata.Plot}
    </p>
`;
         

    } catch (error) {
        console.error("Error fetching movie data:", error);
        aboutmovie.innerHTML = "<p>Movie not found.</p>";
    }
    
}
function cleanertext(str){
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "") 
        .replace(/\s+/g, " ")       
        .trim();
 }
