/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LogIn, KeyRound, Mail, User as UserIcon, LogOut, CheckCircle2 } from "lucide-react";
import { User } from "../types";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";

interface AuthLayoutProps {
  currentUser: User | null;
  onAuthSuccess: (user: User, token: string) => void;
  onLogout: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  currentUser,
  onAuthSuccess,
  onLogout
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please fill out your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Sign In with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        const idToken = await fbUser.getIdToken();
        
        // Retrieve profile from Firestore
        const userDocRef = doc(db, "users", fbUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        let loadedUser: User;
        if (userDocSnap.exists()) {
          loadedUser = userDocSnap.data() as User;
        } else {
          // If document doesn't exist for some reason, build a fresh profile and write it
          const isUserEmailAdmin = fbUser.email?.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
          loadedUser = {
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split("@")[0].toUpperCase() || "Student",
            email: fbUser.email || email,
            role: isUserEmailAdmin ? "admin" : "user",
            learningProgress: 25,
            savedBlogs: [],
            savedTools: []
          };
          await setDoc(userDocRef, loadedUser);
        }
        
        onAuthSuccess(loadedUser, idToken);
      } else {
        // Register using Firebase Email & Password
        if (!name) {
          setError("Full name is required for registration.");
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        await updateProfile(fbUser, { displayName: name });
        const idToken = await fbUser.getIdToken();
        
        // Write fresh profile to Firestore
        const isUserEmailAdmin = email.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
        const newUser: User = {
          id: fbUser.uid,
          name: name,
          email: email,
          role: isUserEmailAdmin ? "admin" : "user",
          learningProgress: 20,
          savedBlogs: [],
          savedTools: []
        };
        await setDoc(doc(db, "users", fbUser.uid), newUser);
        
        onAuthSuccess(newUser, idToken);
      }
    } catch (err: any) {
      let msg = err.message;
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Invalid email address or passcode credentials.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered. Please sign in instead.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password choice is too weak. Please choose a safer pin.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const idToken = await fbUser.getIdToken();
      
      const userDocRef = doc(db, "users", fbUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let loadedUser: User;
      if (userDocSnap.exists()) {
        loadedUser = userDocSnap.data() as User;
      } else {
        const isUserEmailAdmin = fbUser.email?.toLowerCase() === "dattatreya_nammina@srmap.edu.in";
        loadedUser = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0].toUpperCase() || "Google Aspirant",
          email: fbUser.email || "",
          role: isUserEmailAdmin ? "admin" : "user",
          learningProgress: 20,
          savedBlogs: [],
          savedTools: []
        };
        await setDoc(userDocRef, loadedUser);
      }
      
      onAuthSuccess(loadedUser, idToken);
    } catch (err: any) {
      let msg = err.message;
      if (err.code === "auth/popup-blocked") {
        msg = "The popup was blocked by your browser settings. Please enable popups or tap again.";
      } else if (err.code === "auth/popup-closed-by-user") {
        msg = "Google Identity login popup was closed. Please try again.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    return (
      <div id="auth-status-card" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">{currentUser.name}</h4>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                currentUser.role === 'admin' 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-400">{currentUser.email}</p>
          </div>
        </div>
        <button 
          id="logout-btn"
          onClick={onLogout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 hover:text-rose-400 text-slate-300 px-4 py-2 rounded-xl transition duration-200 border border-slate-700/80 font-medium cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto" id="auth-box-container">
      <div className="bg-white border border-slate-200/85 shadow-sm rounded-3xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">
            {isLogin ? "Welcome Back" : "Create Career Account"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {isLogin ? "Sign in to save progress and run AI tools" : "Get personal placement and learning tracks"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <UserIcon size={16} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
              {isLogin && (
                <button type="button" className="text-xs text-indigo-600 hover:underline">Forgot?</button>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <KeyRound size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full transition-all duration-150 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl shadow-sm text-sm cursor-pointer"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Register Credentials"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Or continue with</span></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          disabled={loading}
          className="w-full border border-slate-200 hover:bg-slate-50 font-medium py-2.5 px-4 rounded-xl transition duration-150 text-slate-700 text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.62 14.98 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.96 3.07C6.38 7.56 8.96 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.61-.21-2.38H12v4.51h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.87 3.38-8.52z"/>
            <path fill="#FBBC05" d="M5.46 13.57C5.22 12.87 5.1 12.12 5.1 11.37c0-.75.12-1.5.36-2.2L1.5 6.1C.55 8 0 10.12 0 12.37s.55 4.37 1.5 6.27l3.96-3.07z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.94-2.91l-3.66-2.84c-1.01.67-2.31 1.08-3.8 1.08-3.04 0-5.62-2.52-6.54-5.53L1.93 15.9C3.82 20.15 7.56 23 12 23z"/>
          </svg>
          Google Identity Login
        </button>

        <div className="mt-6 text-center text-xs text-slate-500">
          {isLogin ? (
            <p>
              New to CareerForge?{" "}
              <button onClick={() => setIsLogin(false)} className="text-indigo-600 hover:underline font-semibold cursor-pointer bg-transparent border-0">
                Sign Up Free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-indigo-600 hover:underline font-semibold cursor-pointer bg-transparent border-0">
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

