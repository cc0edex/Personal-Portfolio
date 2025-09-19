"use client";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useState, useActionState } from "react";
import { motion } from "framer-motion";
import { login } from "@/app/admin/actions";
export default function Auth() {
  const [state, formAction, isPending] = useActionState(login, { error: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <form className="space-y-6" action={formAction}>
      {state.error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
        >
          <p className="text-red-700 dark:text-red-400 text-sm">
            {state.error}
          </p>
        </motion.div>
      )}
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
          htmlFor="username"
        >
          Username
        </label>
        <div className="relative">
          <User className="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="flex w-full rounded-md border outline-none dark:bg-slate-900 bg-indigo-50 px-3 py-2 text-sm ring-offset-indigo-50 dark:ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-slate-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 h-12"
            id="username"
            placeholder="Enter your username"
            required={true}
            type="text"
            name="username"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="flex w-full rounded-md border outline-none dark:bg-slate-900 bg-indigo-50 px-3 py-2 text-sm ring-offset-indigo-50 dark:ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-slate-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 h-12"
            id="password"
            placeholder="Enter your password"
            required={true}
            type={passwordVisible ? "text" : "password"}
            name="password"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {passwordVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Signing in...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
