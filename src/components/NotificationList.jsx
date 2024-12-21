//src/components/NotificationList.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { markNotificationAsRead, fetchNotifications, addNotification } from '../features/notifications/notificationSlice';
import { connectNotificationWebSocket, closeNotificationWebSocket } from '../utils/notificationWebSocket';
import { fetchProfile } from '../features/jobseekerprofile/jobseekerProfileSlice';


const NotificationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  
  const [currentNotification, setCurrentNotification] = useState(null);
  const { data, status, error } = useSelector((state) => state.profile);

    console.log("opw2", data);

  const role = data?.user?.user_type
  console.log("role is ",role);
  const userid = data?.user?.id;
  console.log("useridd iiss",userid);
  const token = useSelector(state => state.auth.accessToken);
  console.log("token iiss",token); 
  
  useEffect(() => {
    // Fetch initial notifications
    if (token && userid) {
      dispatch(fetchNotifications(token));

      // Connect WebSocket
      const notificationSocket = connectNotificationWebSocket(token, userid, (notification) => {
        if (notification.payload) {
          const { id, message, is_read, user_id, notification_type, timestamp } = notification.payload;
          dispatch(addNotification({
            id,
            message,
            is_read,
            user: user_id,
            notification_type,
            created_at: timestamp || notification.payload.created_at,
          }));
        }
      });

      return () => {
        closeNotificationWebSocket();
      };
    }
  }, [dispatch, token, userid]);

    useEffect(() => {
        dispatch(fetchProfile());
      }, [dispatch]);
  
  useEffect(() => {
    // Calculate unread notifications count
    const count = notifications.filter(notification => !notification.is_read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleNotificationClick = (notification) => {
    dispatch(markNotificationAsRead(notification.id));

     // Immediately update the local notifications to reflect the change
    dispatch(fetchNotifications(token)); // Ensure the state stays in sync
    setUnreadCount((prev) => Math.max(0, prev - 1));


    setCurrentNotification(notification);
    setOpen(true);
console.log("nnnnnnn:", notification.notification_type)

    // Navigate based on notification type
if (notification.notification_type === 'CHAT') {
  if (role === 'jobseeker') {
    navigate('/chat');
  } else if (role === 'employee') {
    navigate('/employerchat');
  }
} else if (notification.notification_type === 'APPLICATION_STATUS' && role === 'jobseeker') {
  navigate('/dashboard');
}
  }


  const handleMenuClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle the dropdown visibility
    
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const unreadNotifications = notifications.filter(notification => !notification.is_read);

  const recentNotifications = [...notifications]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 20);

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={handleMenuClick}
        className="relative flex items-center justify-center p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      >
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {unreadCount}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> 
        </svg>
      </button>

      {/* Notifications Dropdown */}
      {anchorEl && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-2 cursor-pointer ${!notification.is_read ? 'bg-gray-200 font-bold' : 'bg-white'} hover:bg-gray-300`}
              >
                <p className="text-sm">{notification.message}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">No new notifications</div>
          )}
        </div>
      )}
   
    </div>
  );
};

export default NotificationList;
