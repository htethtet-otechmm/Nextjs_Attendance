import React from "react";
import styles from "./signinPage.module.scss";
import { useRouter } from "next/router";
import { getSession, GetSessionParams, signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading("Logging you in...");

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result && result.ok) {
      toast.update(toastId, {
        render: "Login successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push("/checkin-out");
      }, 2000);
    } else {
      toast.update(toastId, {
        render: "Invalid email or password. Please try again.", // Error message for the user
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

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/checkin-out",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
