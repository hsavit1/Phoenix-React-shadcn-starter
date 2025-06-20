import { useCallback, useEffect, useRef, useState } from 'react';

// Phoenix imports (using require for compatibility)
declare const require: any;
const { Socket } = require('phoenix');

export interface WebSocketHookOptions {
  topic: string;
  onMessage?: (event: string, payload: any) => void;
  onJoin?: () => void;
  onError?: (error: any) => void;
}

export interface WebSocketHookReturn {
  socket: any;
  channel: any;
  connected: boolean;
  push: (event: string, payload: any) => void;
  users: Record<string, any>;
  messages: Array<any>;
  typing: string[];
}

export const useWebSocket = (options: WebSocketHookOptions): WebSocketHookReturn => {
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<Array<any>>([]);
  const [typing, setTyping] = useState<string[]>([]);

  const socketRef = useRef<any>(null);
  const channelRef = useRef<any>(null);

  const push = useCallback((event: string, payload: any) => {
    if (channelRef.current) {
      channelRef.current.push(event, payload);
    }
  }, []);

  useEffect(() => {
    // Generate a unique user ID for this session
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    const username = `User${userId.slice(-4)}`;

    // Create socket connection
    const socket = new Socket('/socket', {
      params: { user_id: userId, username: username },
    });

    // Connect to the socket
    socket.connect();
    socketRef.current = socket;

    // Join the channel
    const channel = socket.channel(options.topic, {});
    channelRef.current = channel;

    // Handle join
    channel
      .join()
      .receive('ok', () => {
        setConnected(true);
        options.onJoin?.();
      })
      .receive('error', (error: any) => {
        console.error('Failed to join channel:', error);
        options.onError?.(error);
      });

    // Handle presence
    channel.on('presence_state', (state: any) => {
      setUsers(state);
    });

    channel.on('presence_diff', (diff: any) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };

        // Remove users who left
        if (diff.leaves) {
          Object.keys(diff.leaves).forEach((userId) => {
            delete newUsers[userId];
          });
        }

        // Add users who joined
        if (diff.joins) {
          Object.assign(newUsers, diff.joins);
        }

        return newUsers;
      });
    });

    // Handle counter updates
    channel.on('counter_update', (payload: any) => {
      options.onMessage?.('counter_update', payload);
    });

    // Handle chat messages
    channel.on('new_message', (payload: any) => {
      setMessages((prev) => [...prev, payload]);
      options.onMessage?.('new_message', payload);
    });

    // Handle typing indicators
    channel.on('typing_start', (payload: any) => {
      setTyping((prev) => {
        if (prev.indexOf(payload.user) === -1) {
          return [...prev, payload.user];
        }
        return prev;
      });
    });

    channel.on('typing_stop', (payload: any) => {
      setTyping((prev) => prev.filter((user) => user !== payload.user));
    });

    // Handle reactions
    channel.on('reaction', (payload: any) => {
      options.onMessage?.('reaction', payload);
    });

    // Cleanup on unmount
    return () => {
      channel.leave();
      socket.disconnect();
    };
  }, [options.topic]);

  return {
    socket: socketRef.current,
    channel: channelRef.current,
    connected,
    push,
    users,
    messages,
    typing,
  };
};
