import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface AppProps {
  message?: string;
}

const App: React.FC<AppProps> = ({ message = 'Welcome to Phoenix with React!' }) => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">🔥 Phoenix Vibe</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
        </Card>

        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>
              Test React state management with shadcn/ui components
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-primary mb-4">
              {count}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button
              variant="default"
              onClick={() => setCount(count + 1)}
            >
              Increment
            </Button>
            <Button
              variant="destructive"
              onClick={() => setCount(count - 1)}
            >
              Decrement
            </Button>
            <Button
              variant="outline"
              onClick={() => setCount(0)}
            >
              Reset
            </Button>
          </CardFooter>
        </Card>

        {/* Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>
              Modern web development with the best tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Phoenix Framework 1.7.21</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">React 18 + TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">shadcn/ui Components</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              <span className="text-sm">Tailwind CSS</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
              <Button variant="link" size="sm">
                Link
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-muted-foreground">
            shadcn/ui button variants showcase
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default App; 