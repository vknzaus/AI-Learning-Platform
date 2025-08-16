import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  gems: number;
  hearts: number;
  level: number;
  xp: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Dummy users for testing
const DUMMY_USERS = [
  {
    id: "1",
    username: "demo",
    password: "demo123",
    email: "demo@funlabs.ai",
    gems: 250,
    hearts: 5,
    level: 3,
    xp: 1250,
    avatar: "👨‍💻",
  },
  {
    id: "2",
    username: "student",
    password: "student123",
    email: "student@funlabs.ai",
    gems: 180,
    hearts: 4,
    level: 2,
    xp: 890,
    avatar: "👩‍🎓",
  },
  {
    id: "3",
    username: "learner",
    password: "learner123",
    email: "learner@funlabs.ai",
    gems: 320,
    hearts: 5,
    level: 4,
    xp: 1680,
    avatar: "🧠",
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("funlabs_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isSignedIn = !!user;

  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user in dummy data
    const foundUser = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        gems: foundUser.gems,
        hearts: foundUser.hearts,
        level: foundUser.level,
        xp: foundUser.xp,
        avatar: foundUser.avatar,
      };

      setUser(userWithoutPassword);
      localStorage.setItem("funlabs_user", JSON.stringify(userWithoutPassword));
      console.log("✅ User signed in successfully:", userWithoutPassword);
      return true;
    }

    console.log("❌ Invalid credentials provided");
    return false;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("funlabs_user");
    console.log("👋 User signed out successfully");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("funlabs_user", JSON.stringify(updatedUser));
      console.log("🔄 User updated:", updates);
    }
  };

  const value: AuthContextType = {
    user,
    isSignedIn,
    signIn,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
