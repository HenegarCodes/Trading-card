

document.getElementById('usernameInput'), addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // stops form from refreshing
        const username = event.target.value.trim(); // get text from input
        if (username) {
            getUserProfile(username);

        }

    }
})

async function getUserProfile(username) {
    const APIURL = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error(
                `Response status: ${response.status}`
            );
        }

        const result = await response.json()
        console.log(result)
        createUserCard(result);
    } catch (error) {
        console.error(error.message)
    }
}

function createUserCard(user) {
    const cardInsert = document.getElementById("main");
    cardInsert.innerHTML = `
        <img src="${user.avatar_url}" />
        <h2 class="user-name">${user.name || user.login}</h2>
        
        <div class="stats">
          <div>
            <h3>${user.public_repos}</h3>
            <p>Repos</p>
          </div>
          <div>
            <h3>${user.followers}</h3>
            <p>Followers</p>
          </div>
          <div>
            <h3>${user.following}</h3>
            <p>Following</p>
          </div>
        </div>

        <p class="bio-text">${user.bio || "This trainer has not shared their journey yet."}</p>
    `;
}


