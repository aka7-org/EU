// admin.js

const usersCollection = db.collection('users');

// Load all users and display in the admin table
function loadUsers() {
    usersCollection.get().then(snapshot => {
        const userTableBody = document.getElementById('user-table-body');
        userTableBody.innerHTML = '';

        snapshot.forEach(doc => {
            const user = doc.data();
            const userId = doc.id;
            const username = user.username || 'N/A';
            const userXP = user.xp || 0;
            const isBanned = user.banned || false;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userId}</td>
                <td>${username}</td>
                <td>${userXP}</td>
                <td>${isBanned ? 'Banned' : 'Active'}</td>
                <td>
                    <button onclick="toggleBan('${userId}', ${isBanned})">
                        ${isBanned ? 'Unban' : 'Ban'}
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }).catch(error => {
        console.error("Error loading users:", error);
    });
}

// Toggle ban status of a user
function toggleBan(userId, isBanned) {
    usersCollection.doc(userId).update({ banned: !isBanned }).then(() => {
        alert(`User ${userId} has been ${isBanned ? 'unbanned' : 'banned'}.`);
        loadUsers();
    }).catch(error => {
        console.error("Error updating ban status:", error);
    });
}

// Load users on page load
window.onload = loadUsers;
