import { addNotification } from '../features/notifications/notificationSlice';

let notificationSocket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

/**
 * Connect to WebSocket for notifications.
 * @param {string} token - JWT token for authentication.
 * @param {number} userId - The user ID for the notifications.
 * @param {function} dispatch - Redux dispatch function.
 * @returns {WebSocket} - The WebSocket instance.
 */
export const connectNotificationWebSocket = (token, userId, dispatch) => {
  if (notificationSocket && notificationSocket.readyState === WebSocket.OPEN) {
    console.warn('Notification WebSocket already connected.Id is:', userId);
    return notificationSocket;
  }

   notificationSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/${userId}/?token=${token}`);


  notificationSocket.onopen = () => {
    console.log('Notification WebSocket connection established.');
    reconnectAttempts = 0; // Reset reconnect attempts on successful connection
  };

  notificationSocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('WebSocket message:', data);

      if (data.notification) {
        const notification = {
          id: data.notification.id,
          message: data.notification.message,
          is_read: data.notification.is_read,
          user: data.notification.user_id,
          notification_type: data.notification.notification_type,
          created_at: data.notification.timestamp,
        };
        dispatch(addNotification(notification));
        console.log('Dispatched notification:', notification);
      }
    } catch (e) {
      console.error('Failed to parse notification WebSocket message:', e);
    }
  };

  notificationSocket.onerror = (error) => {
    console.error('Notification WebSocket error:', error);
  };

  notificationSocket.onclose = (event) => {
    console.log('Notification WebSocket connection closed:', event);
    if (reconnectAttempts < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectAttempts++;
        console.log(`Reconnection attempt ${reconnectAttempts}...`);
        connectNotificationWebSocket(token, userId, dispatch);
      }, 5000); // Increase delay to 5 seconds
    } else {
      console.error('Max reconnect attempts reached. Could not reconnect.');
    }
  };

  return notificationSocket;
};

/**
 * Send a notification through WebSocket.
 * @param {Object} notificationPayload - The notification data to be sent.
 */
export const sendNotificationWebSocketMessage = (notificationPayload) => {
  if (notificationSocket && notificationSocket.readyState === WebSocket.OPEN) {
    notificationSocket.send(JSON.stringify(notificationPayload));
    console.log("Sent notification:", notificationPayload);
  } else {
    console.warn('Notification WebSocket is not connected.');
  }
};

/**
 * Close the WebSocket connection.
 */
export const closeNotificationWebSocket = () => {
  if (notificationSocket) {
    notificationSocket.close();
    notificationSocket = null;
    console.log('Notification WebSocket connection closed.');
  }
};
