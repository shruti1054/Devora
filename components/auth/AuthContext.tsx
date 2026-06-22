"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export interface AuthUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  isDemo: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);
const DEMO_USER_KEY = "devora_demo_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = !isFirebaseConfigured;

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsub = onAuthStateChanged(auth, (u: User | null) => {
        setUser(
          u
            ? { displayName: u.displayName, email: u.email, photoURL: u.photoURL }
            : null
        );
        setLoading(false);
      });
      return () => unsub();
    }
    // demo mode: restore any demo session
    try {
      const raw = window.localStorage.getItem(DEMO_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      await signInWithPopup(auth, googleProvider);
      return;
    }
    // demo sign-in
    const demo: AuthUser = {
      displayName: "Guest Shopper",
      email: "guest@devora.demo",
      photoURL: null,
    };
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demo));
    setUser(demo);
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
      return;
    }
    window.localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, isDemo, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
