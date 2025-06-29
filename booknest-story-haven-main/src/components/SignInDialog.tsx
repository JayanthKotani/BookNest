
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignInDialogProps {
  children: React.ReactNode;
}

interface UserData {
  email: string;
  name: string;
  isSignedIn: boolean;
}

export const SignInDialog = ({ children }: SignInDialogProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Check if user is already signed in
  const getUserData = (): UserData | null => {
    const userData = localStorage.getItem('booknest-user');
    return userData ? JSON.parse(userData) : null;
  };

  const currentUser = getUserData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (!isSignIn && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isSignIn) {
      // Mock sign in - check if user exists in localStorage
      const storedUsers = localStorage.getItem('booknest-users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Store current user session
        localStorage.setItem('booknest-user', JSON.stringify({
          email: user.email,
          name: user.name,
          isSignedIn: true
        }));
        
        toast({
          title: "Signed in successfully!",
          description: `Welcome back, ${user.name}`,
        });
        
        // Refresh the page to update UI
        window.location.reload();
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } else {
      // Mock sign up - store user data in localStorage
      const storedUsers = localStorage.getItem('booknest-users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        toast({
          title: "Sign up failed",
          description: "User with this email already exists",
          variant: "destructive",
        });
        return;
      }
      
      // Add new user
      const newUser = { email, password, name };
      users.push(newUser);
      localStorage.setItem('booknest-users', JSON.stringify(users));
      
      // Store current user session
      localStorage.setItem('booknest-user', JSON.stringify({
        email,
        name,
        isSignedIn: true
      }));
      
      toast({
        title: "Account created successfully!",
        description: `Welcome to BookNest, ${name}`,
      });
      
      // Refresh the page to update UI
      window.location.reload();
    }
    
    setOpen(false);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSignOut = () => {
    localStorage.removeItem('booknest-user');
    toast({
      title: "Signed out successfully",
      description: "See you next time!",
    });
    window.location.reload();
  };

  // If user is signed in, show profile button instead of sign in
  if (currentUser?.isSignedIn) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">{currentUser.name}</h3>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            {isSignIn ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-sm"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-sm"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-600 text-sm sm:text-base"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
