import type React from 'react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import WebSocketDemo from './WebSocketDemo';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'websocket'>('home');

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              🔥 Phoenix Vibe
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Phoenix 1.7 + React 18 + shadcn/ui + WebSocket Magic
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Navigation */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex justify-center gap-4">
              <Button
                variant={currentView === 'home' ? 'default' : 'outline'}
                onClick={() => setCurrentView('home')}
              >
                🏠 Home
              </Button>
              <Button
                variant={currentView === 'websocket' ? 'default' : 'outline'}
                onClick={() => setCurrentView('websocket')}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                🚀 WebSocket Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interactive Counter */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">⚡ Local Counter</CardTitle>
              <CardDescription className="text-slate-400">
                Client-side state management
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-4">{count}</div>
              <div className="space-x-2">
                <Button onClick={() => setCount(count + 1)}>+1</Button>
                <Button variant="destructive" onClick={() => setCount(count - 1)}>
                  -1
                </Button>
                <Button variant="outline" onClick={() => setCount(0)}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">🛠️ Tech Stack</CardTitle>
              <CardDescription className="text-slate-400">
                Modern full-stack technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Phoenix</span>
                  <Badge className="bg-orange-500">v1.7.21</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">React</span>
                  <Badge className="bg-blue-500">v18.2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">TypeScript</span>
                  <Badge className="bg-blue-600">v5.0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">shadcn/ui</span>
                  <Badge className="bg-green-500">Latest</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">WebSockets</span>
                  <Badge className="bg-purple-500">Phoenix Channels</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">✨ Features</CardTitle>
              <CardDescription className="text-slate-400">
                What's included in this demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Server-side rendering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>React integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>shadcn/ui components</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Real-time WebSockets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>TypeScript support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button Showcase */}
          <Card className="bg-slate-800/50 border-slate-700 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white">🎨 shadcn/ui Button Variants</CardTitle>
              <CardDescription className="text-slate-400">
                Showcasing the beautiful button component system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
                <Button className="bg-gradient-to-r from-pink-500 to-violet-500">Custom</Button>
                <Button
                  onClick={() => setCurrentView('websocket')}
                  className="md:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  🚀 Try WebSocket Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-400">Built with ❤️ using Phoenix, React, and shadcn/ui</p>
            <p className="text-slate-500 text-sm mt-2">Ready for production-grade applications</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (currentView === 'websocket') {
    return <WebSocketDemo />;
  }

  return <HomePage />;
};

export default App;
