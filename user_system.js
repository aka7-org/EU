// user_system.js

const usersCollection = db.collection('users');

// Function to create a new user in Firebase Database
function createUserInDB(username, password) {
    const userId = `user_${Math.floor(Math.random() * 1000000)}`;
    usersCollection.doc(userId).set({
        username: username,
        password: password,
        xp: 0,
        banned: false
    }).then(() => {
        console.log(`New user created: ${username}`);
    }).catch(error => {
        console.error("Error creating user: ", error);
    });
}

// Function to check if a user is banned and redirect if necessary
function loadUserAndCheckBan() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        usersCollection.doc(userId).onSnapshot(doc => {
            if (doc.exists && doc.data().banned) {
                alert('You have been banned from Hackers Hub.');
                window.location.href = 'banned.html';
            }
        });
    } else {
        checkAuthentication(); // Redirect to login if not authenticated
    }
}
