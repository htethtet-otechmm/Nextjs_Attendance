import React, { useState, useEffect } from "react";
import styles from "./signinPage.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userString = localStorage.getItem("user");
      if (userString && userString !== "undefined") {
        try {
          const user = JSON.parse(userString);
          if (user.role === "admin") {
            router.push("/admin/leave-requests");
          } else {
            router.push("/leave-requests");
          }
        } catch (e) {
          router.push("/leave-requests");
        }
      } else {
        router.push("/leave-requests");
      }
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading("Logging you in...");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (
          data &&
          data.user &&
          typeof data.user === "object" &&
          data.accessToken
        ) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));

          toast.update(toastId, {
            render: "Login successfully! 🎉",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          setTimeout(() => {
            if (data.user.role === "admin") {
              router.push("/admin/leave-requests");
            } else {
              router.push("/leave-requests");
            }
          }, 2000);
        } else {
          console.error(
            "Login response is missing 'user' object or 'accessToken':",
            data
          );
          toast.update(toastId, {
            render: "Login failed: Invalid data received from server.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid email or password");
      }
    } catch (error: any) {
      // Error handling
      toast.update(toastId, {
        render: error.message || "Invalid email or password. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Log In</h1>
      <div className={styles.loginCard}>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="admin@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="password123"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <button type="submit" className={styles.signInButton}>
            Sign In
          </button>
        </form>

        <a href="#" className={styles.forgotPasswordLink}>
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
