import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ArrowRight, Loader2 } from 'lucide-react';
import { register } from '@/lib/auth';
import { toast } from 'sonner';

interface SignUpProps {
  onSuccess: () => void;
  onNavigate: (page: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onNavigate }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Package className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details to start sourcing components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Account
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-4">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Already have an account?</span>
          <Button variant="link" className="p-0 h-auto" onClick={() => onNavigate('login')}>
            Sign In <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};