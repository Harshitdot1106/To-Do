import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - in a real app, this would validate against a backend
    if (username && password) {
      dispatch(login(username));
      toast.success("Successfully logged in!");
    } else {
      toast.error("Please enter both username and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-secondary/50 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary/50 border-0"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50 border-0"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};