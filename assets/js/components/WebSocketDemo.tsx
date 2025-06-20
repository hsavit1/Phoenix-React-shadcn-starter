import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

const WebSocketDemo: React.FC = () => {
  const [globalCount, setGlobalCount] = useState(0);
  const [message, setMessage] = useState('');
  const [reactions, setReactions] = useState<Array<any>>([]);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { connected, push, users, messages, typing } = useWebSocket({
    topic: 'room:lobby',
    onMessage: (event, payload) => {
      switch (event) {
        case 'counter_update':
          setGlobalCount(payload.count);
          break;
        case 'reaction':
          setReactions((prev) => [
            ...prev.slice(-9), // Keep only last 10 reactions
            payload,
          ]);
          // Remove reaction after 3 seconds
          setTimeout(() => {
            setReactions((prev) => prev.filter((r) => r.timestamp !== payload.timestamp));
          }, 3000);
          break;
      }
    },
    onJoin: () => {
      console.log('Successfully joined the room!');
    },
    onError: (error) => {
      console.error('WebSocket error:', error);
    },
  });

  const handleCounterUpdate = (newCount: number) => {
    setGlobalCount(newCount);
    push('counter_update', { count: newCount });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      push('new_message', { message: message.trim() });
      setMessage('');
      handleStopTyping();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    // Start typing indicator
    push('typing_start', {});

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to stop typing indicator
    const timeout = window.setTimeout(() => {
      handleStopTyping();
    }, 1000);

    setTypingTimeout(timeout);
  };

  const handleStopTyping = () => {
    push('typing_stop', {});
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  };

  const handleReaction = (type: string) => {
    push('reaction', { type });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  // Get online user count
  const onlineCount = Object.keys(users).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">🚀 WebSocket Demo</CardTitle>
            <CardDescription>Real-time features powered by Phoenix Channels</CardDescription>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Badge variant={connected ? 'success' : 'destructive'}>
                {connected ? '🟢 Connected' : '🔴 Disconnected'}
              </Badge>
              <Badge variant="secondary">👥 {onlineCount} Online</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Counter */}
          <Card>
            <CardHeader>
              <CardTitle>🔄 Synchronized Counter</CardTitle>
              <CardDescription>Updates in real-time across all connected clients</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-primary mb-6">{globalCount}</div>
              <div className="flex justify-center gap-2">
                <Button onClick={() => handleCounterUpdate(globalCount + 1)} disabled={!connected}>
                  +1
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCounterUpdate(globalCount - 1)}
                  disabled={!connected}
                >
                  -1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCounterUpdate(0)}
                  disabled={!connected}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Online Users */}
          <Card>
            <CardHeader>
              <CardTitle>👥 Online Users</CardTitle>
              <CardDescription>Real-time presence tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(users).map(([userId, userData]: [string, any]) => (
                  <div
                    key={userId}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">
                        {userData.metas?.[0]?.username || `User${userId.slice(-4)}`}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {userData.metas?.[0]?.online_at ? 'Online' : 'Away'}
                    </Badge>
                  </div>
                ))}
                {onlineCount === 0 && (
                  <div className="text-center text-muted-foreground py-4">No users online</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat System */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>💬 Real-time Chat</CardTitle>
              <CardDescription>Send messages and see typing indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Messages */}
                <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-muted/30">
                  <div className="space-y-3">
                    {messages.map((msg, index) => (
                      <div key={index} className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{msg.user}</span>
                          <span>{formatTime(msg.timestamp)}</span>
                        </div>
                        <div className="bg-background p-2 rounded-lg">{msg.message}</div>
                      </div>
                    ))}
                    {/* Typing Indicators */}
                    {typing.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        {typing.join(', ')} {typing.length === 1 ? 'is' : 'are'} typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={!connected}
                  />
                  <Button onClick={handleSendMessage} disabled={!connected || !message.trim()}>
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reaction System */}
        <Card>
          <CardHeader>
            <CardTitle>😊 Live Reactions</CardTitle>
            <CardDescription>Send reactions that appear in real-time for everyone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 mb-4">
              {['👍', '❤️', '😂', '😮', '😢', '🎉'].map((emoji) => (
                <Button
                  key={emoji}
                  variant="outline"
                  size="sm"
                  onClick={() => handleReaction(emoji)}
                  disabled={!connected}
                >
                  {emoji}
                </Button>
              ))}
            </div>

            {/* Floating Reactions */}
            <div className="relative h-20 overflow-hidden">
              {reactions.map((reaction, index) => (
                <div
                  key={`${reaction.timestamp}-${index}`}
                  className="absolute bottom-0 text-2xl animate-bounce"
                  style={{
                    left: `${Math.random() * 80}%`,
                    animationDuration: '3s',
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {reaction.type}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-muted-foreground">
            Reactions will automatically disappear after 3 seconds
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WebSocketDemo;
