// Notifications system with smart grouping
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.groups = new Map();
        this.maxGroupSize = 5;
        this.init();
    }

    init() {
        // Request notification permissions
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');
                }
            });
        }
    }

    // Add a notification
    addNotification(title, body, type = 'info', groupId = null) {
        const notification = {
            id: Date.now() + Math.random(),
            title,
            body,
            type,
            timestamp: new Date(),
            groupId,
            read: false
        };

        this.notifications.push(notification);

        // Group similar notifications
        if (groupId) {
            if (!this.groups.has(groupId)) {
                this.groups.set(groupId, []);
            }
            
            const group = this.groups.get(groupId);
            group.push(notification);
            
            // If group is too large, consolidate
            if (group.length > this.maxGroupSize) {
                this.consolidateGroup(groupId);
            }
        }

        // Show browser notification
        this.showBrowserNotification(notification);
        
        // Trigger UI update
        this.onNotificationAdded(notification);
        
        return notification.id;
    }

    // Consolidate notifications in a group
    consolidateGroup(groupId) {
        const group = this.groups.get(groupId);
        if (!group || group.length <= this.maxGroupSize) return;

        // Keep the latest notifications and consolidate the rest
        const notificationsToKeep = group.slice(-this.maxGroupSize);
        const notificationsToConsolidate = group.slice(0, -this.maxGroupSize);
        
        // Remove consolidated notifications
        this.notifications = this.notifications.filter(n => 
            !notificationsToConsolidate.includes(n)
        );
        
        // Create a consolidated notification
        const consolidatedNotification = {
            id: Date.now() + Math.random(),
            title: `${notificationsToConsolidate.length} new ${groupId} notifications`,
            body: `You have ${notificationsToConsolidate.length} new ${groupId} notifications. Click to view all.`,
            type: 'group',
            timestamp: new Date(),
            groupId,
            read: false,
            consolidated: true,
            originalCount: notificationsToConsolidate.length
        };
        
        this.notifications.push(consolidatedNotification);
        this.groups.set(groupId, [...notificationsToKeep, consolidatedNotification]);
        
        // Show consolidated notification
        this.showBrowserNotification(consolidatedNotification);
        this.onNotificationAdded(consolidatedNotification);
    }

    // Show browser notification
    showBrowserNotification(notification) {
        if (Notification.permission === 'granted') {
            const browserNotification = new Notification(notification.title, {
                body: notification.body,
                icon: '/favicon.ico',
                tag: notification.id.toString()
            });
            
            browserNotification.onclick = () => {
                this.markAsRead(notification.id);
                window.focus();
                browserNotification.close();
            };
        }
    }

    // Mark notification as read
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.onNotificationRead(notification);
        }
    }

    // Mark all notifications as read
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.onAllNotificationsRead();
    }

    // Get unread notifications count
    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    // Get notifications by group
    getNotificationsByGroup(groupId) {
        return this.groups.get(groupId) || [];
    }

    // Get all notifications
    getAllNotifications() {
        return [...this.notifications].sort((a, b) => b.timestamp - a.timestamp);
    }

    // Get recent notifications
    getRecentNotifications(limit = 10) {
        return this.getAllNotifications().slice(0, limit);
    }

    // Remove notification
    removeNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        
        // Also remove from groups
        for (const [groupId, group] of this.groups) {
            const updatedGroup = group.filter(n => n.id !== notificationId);
            if (updatedGroup.length === 0) {
                this.groups.delete(groupId);
            } else {
                this.groups.set(groupId, updatedGroup);
            }
        }
        
        this.onNotificationRemoved(notificationId);
    }

    // Clear all notifications
    clearAll() {
        this.notifications = [];
        this.groups.clear();
        this.onAllNotificationsCleared();
    }

    // Event handlers (to be overridden by UI)
    onNotificationAdded(notification) {
        // Override this in UI implementation
        console.log('Notification added:', notification);
    }

    onNotificationRead(notification) {
        // Override this in UI implementation
        console.log('Notification read:', notification);
    }

    onAllNotificationsRead() {
        // Override this in UI implementation
        console.log('All notifications marked as read');
    }

    onNotificationRemoved(notificationId) {
        // Override this in UI implementation
        console.log('Notification removed:', notificationId);
    }

    onAllNotificationsCleared() {
        // Override this in UI implementation
        console.log('All notifications cleared');
    }
}

// Export as singleton
const notificationManager = new NotificationManager();