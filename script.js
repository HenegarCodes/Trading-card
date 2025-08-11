

document.getElementById('usernameInput'),addEventListener('keydown', (event) =>{
    if (event.key === "Enter") {
        event.preventDefault(); // stops form from refreshing
        const username = event.target.value.trim(); // get text from input
        if (username) {
            getUserProfile(username);
            
        }

    }
})

async function getUserProfile(username){
    const APIURL = `https://api.github.com/users/${username}`;
    try{
        const response = await fetch(APIURL);
        if(!response.ok){
            throw new Error(
                `Response status: ${response.status}`
            );
        }

        const result = await response.json()
        console.log(result)
        createUserCard(result);
    }  catch(error) {
        console.error(error.message)
    }}


    function createUserCard(user){
        const cardInsert =document.getElementById("main") 
        cardInsert.innerHTML = `
            <div class="card">
    <div class="header">
      <h2>${user.name}</h2>
    </div>
      <div class="container">
      <ul>
        <li>${user.public_repos}</li>

        <li><img src="${user.avatar_url}"</li>
        <li>${user.followers}</</li>
        <li>${user.bio}</li>
      </ul>
      
    </div>
  </div>  
        `
    }


    