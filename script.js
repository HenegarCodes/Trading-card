document.addEventListener('DOMContentLoaded', () => { // Use DOMContentLoaded for safety
    const usernameInput = document.getElementById('usernameInput');
    const mainDiv = document.getElementById('main'); // Get the main div reference

    // Initially hide the main div when the page loads
    // This is a fallback if CSS isn't applied or for dynamic resets
    mainDiv.style.display = 'none';

    usernameInput.addEventListener('keydown', async (event) => { // Changed to async to await getUserProfile if needed, though not directly awaiting here
        if (event.key === "Enter") {
            event.preventDefault(); // stops form from refreshing
            const username = event.target.value.trim(); // get text from input
            if (username) {
                // Clear previous content and potentially show a loading state
                mainDiv.innerHTML = '<p>Loading profile...</p>';
                mainDiv.style.display = 'block'; // Show loading state

                await getUserProfile(username); // Await the profile fetching

            } else {
                // If the input is empty after Enter, hide the main div
                mainDiv.style.display = 'none';
            }
        }
    });

    async function getUserProfile(username) {
        const APIURL = `https://api.github.com/users/${username}`;
        try {
            const response = await fetch(APIURL);
            if (!response.ok) {
                // If response is not ok (e.g., 404 for user not found)
                if (response.status === 404) {
                    mainDiv.innerHTML = `<p>User "${username}" not found.</p>`;
                } else {
                    mainDiv.innerHTML = `<p>Error: ${response.status} - Could not fetch profile.</p>`;
                }
                mainDiv.style.display = 'block'; // Ensure div is visible to show error
                return; // Stop execution here
            }

            const result = await response.json();
            console.log(result);
            createUserCard(result);
            mainDiv.style.display = 'block'; // Make the div visible after content is created
        } catch (error) {
            console.error(error.message);
            mainDiv.innerHTML = `<p>An unexpected error occurred: ${error.message}</p>`;
            mainDiv.style.display = 'block'; // Ensure div is visible to show error
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
            <br />

            <p class="bio-text">${user.bio || "This trainer has not shared their journey yet."}</p>
        `;
    }
});
