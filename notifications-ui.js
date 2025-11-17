// Notifications UI Component
class NotificationUI {
    constructor(notificationManager) {
        this.notificationManager = notificationManager;
        this.container = null;
        this.init();
    }

    init() {
        // Create notifications container
        this.createContainer();
        
        // Bind to notification manager events
        this.notificationManager.onNotificationAdded = (notification) => {
            this.addNotificationToUI(notification);
        };
        
        this.notificationManager.onNotificationRead = (notification) => {
            this.updateNotificationInUI(notification);
        };
        
        this.notificationManager.onAllNotificationsRead = () => {
            this.updateAllNotificationsUI();
        };
        
        this.notificationManager.onNotificationRemoved = (notificationId) => {
            this.removeNotificationFromUI(notificationId);
        };
        
        this.notificationManager.onAllNotificationsCleared = () => {
            this.clearNotificationsUI();
        };
        
        // Load existing notifications
        this.loadNotifications();
    }

    createContainer() {
        // Create notification bell icon
        const bellIcon = document.createElement('div');
        bellIcon.id = 'notification-bell';
        bellIcon.innerHTML = `
            <i class="fas fa-bell"></i>
            <span id="notification-count" class="notification-badge">0</span>
        `;
        bellIcon.style.cssText = `
            position: relative;
            cursor: pointer;
            font-size: 1.5rem;
            color: var(--text-primary);
        `;
        
        // Create notification dropdown
        const dropdown = document.createElement('div');
        dropdown.id = 'notification-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            width: 350px;
            max-height: 400px;
            overflow-y: auto;
            background: var(--secondary-bg);
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius-main);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: none;
        `;
        
        dropdown.innerHTML = `
            <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <h3>Notifications</h3>
                <button id="clear-all-btn" style="background: none; border: none; color: var(--accent-color); cursor: pointer;">Clear All</button>
            </div>
            <div id="notifications-list" style="padding: 0.5rem;"></div>
        `;
        
        // Add to document
        const headerNav = document.querySelector('nav');
        if (headerNav) {
            const navLinks = headerNav.querySelector('.nav-links');
            if (navLinks) {
                const notificationsWrapper = document.createElement('div');
                notificationsWrapper.style.position = 'relative';
                notificationsWrapper.appendChild(bellIcon);
                notificationsWrapper.appendChild(dropdown);
                navLinks.appendChild(notificationsWrapper);
                
                // Add event listeners
                bellIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDropdown();
                });
                
                document.getElementById('clear-all-btn').addEventListener('click', () => {
                    this.notificationManager.clearAll();
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!notificationsWrapper.contains(e.target)) {
                        dropdown.style.display = 'none';
                    }
                });
                
                this.container = dropdown;
            }
        }
    }

    toggleDropdown() {
        const dropdown = document.getElementById('notification-dropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    }

    loadNotifications() {
        const notifications = this.notificationManager.getAllNotifications();
        const list = document.getElementById('notifications-list');
        if (list) {
            list.innerHTML = '';
            notifications.forEach(notification => {
                this.addNotificationToUI(notification);
            });
        }
        this.updateNotificationCount();
    }

    addNotificationToUI(notification) {
        const list = document.getElementById('notifications-list');
        if (!list) return;
        
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification-item';
        notificationElement.dataset.id = notification.id;
        notificationElement.style.cssText = `
            padding: 1rem;
            border-bottom: 1px solid var(--border-color);
            cursor: pointer;
            ${notification.read ? 'opacity: 0.7;' : ''}
        `;
        
        // Determine icon based on type
        let icon = 'info-circle';
        let iconColor = 'var(--accent-color)';
        switch (notification.type) {
            case 'success':
                icon = 'check-circle';
                iconColor = '#10b981';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                iconColor = '#f59e0b';
                break;
            case 'error':
                icon = 'exclamation-circle';
                iconColor = '#ef4444';
                break;
            case 'group':
                icon = 'layer-group';
                break;
        }
        
        notificationElement.innerHTML = `
            <div style="display: flex; gap: 0.8rem;">
                <div style="color: ${iconColor};">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 0.3rem;">${notification.title}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.3rem;">${notification.body}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        ${this.formatTime(notification.timestamp)}
                    </div>
                </div>
                <div>
                    <button class="dismiss-btn" style="background: none; border: none; color: var(--text-secondary); cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        notificationElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('dismiss-btn') && !e.target.parentElement.classList.contains('dismiss-btn')) {
                this.notificationManager.markAsRead(notification.id);
                this.handleNotificationClick(notification);
            }
        });
        
        notificationElement.querySelector('.dismiss-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.notificationManager.removeNotification(notification.id);
        });
        
        // Add to top of list
        if (list.firstChild) {
            list.insertBefore(notificationElement, list.firstChild);
        } else {
            list.appendChild(notificationElement);
        }
        
        this.updateNotificationCount();
    }

    updateNotificationInUI(notification) {
        const element = document.querySelector(`.notification-item[data-id="${notification.id}"]`);
        if (element) {
            element.style.opacity = '0.7';
        }
        this.updateNotificationCount();
    }

    updateAllNotificationsUI() {
        const elements = document.querySelectorAll('.notification-item');
        elements.forEach(element => {
            element.style.opacity = '0.7';
        });
        this.updateNotificationCount();
    }

    removeNotificationFromUI(notificationId) {
        const element = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
        if (element) {
            element.remove();
        }
        this.updateNotificationCount();
    }

    clearNotificationsUI() {
        const list = document.getElementById('notifications-list');
        if (list) {
            list.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">No notifications</div>';
        }
        this.updateNotificationCount();
    }

    updateNotificationCount() {
        const count = this.notificationManager.getUnreadCount();
        const countElement = document.getElementById('notification-count');
        if (countElement) {
            countElement.textContent = count > 0 ? count : '0';
            countElement.style.display = count > 0 ? 'block' : 'none';
        }
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    handleNotificationClick(notification) {
        // Handle different notification types
        switch (notification.type) {
            case 'post':
                // Navigate to post
                this.scrollToPost(notification.data.postId);
                break;
            case 'connection':
                // Navigate to connections page
                window.location.href = 'network.html';
                break;
            case 'group':
                // Show all notifications in group
                this.showGroupNotifications(notification.groupId);
                break;
            default:
                // Do nothing for other types
                break;
        }
    }

    scrollToPost(postId) {
        // Switch to feed tab and scroll to post
        switchTab('feed');
        setTimeout(() => {
            const postElement = document.querySelector(`.post[data-id="${postId}"]`);
            if (postElement) {
                postElement.scrollIntoView({ behavior: 'smooth' });
                postElement.style.border = '2px solid var(--accent-color)';
                setTimeout(() => {
                    postElement.style.border = '';
                }, 3000);
            }
        }, 300);
    }

    showGroupNotifications(groupId) {
        // Show all notifications in a group
        const notifications = this.notificationManager.getNotificationsByGroup(groupId);
        console.log('Showing group notifications:', notifications);
        // In a real implementation, this would open a modal with all notifications in the group
    }
}

// Initialize notification UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make sure notification manager is available
    if (typeof notificationManager !== 'undefined') {
        window.notificationUI = new NotificationUI(notificationManager);
    }
});