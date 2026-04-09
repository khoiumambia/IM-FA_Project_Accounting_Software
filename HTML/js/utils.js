// utils.js - Add these functions

// Get current logged in user
function getCurrentUser() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        try {
            return JSON.parse(user);
        } catch(e) {
            return null;
        }
    }
    return null;
}

// Check if current user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.type === 'admin';
}

// Check if current user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Show permission denied message
function showPermissionDenied(message = 'Only administrators can perform this action.') {
    // You can use your existing notification system
    if (typeof showNotification === 'function') {
        showNotification(message, 'error');
    } else {
        alert(message);
    }
}

// Hide/show delete buttons based on user role
function updateDeleteButtonsVisibility() {
    const isUserAdmin = isAdmin();
    const deleteButtons = document.querySelectorAll('.delete-btn, .delete-ledger-btn, .delete-backup-btn, .remove-row-btn');
    
    deleteButtons.forEach(btn => {
        if (isUserAdmin) {
            btn.style.display = '';
            btn.disabled = false;
        } else {
            btn.style.display = 'none';
            btn.disabled = true;
        }
    });
}