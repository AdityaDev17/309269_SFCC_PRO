'use client'
import Input from "../../atomic/Input/Input";
import styles from "./Login.module.css";
import Checkbox from "@/components/atomic/CheckBox/CheckBox";
import { Button } from "../../atomic/Button/Button";
import { useState } from "react";

const Login = ({ onLoginClicked, onCreateAccount }: any) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDisable = () => {
    if (formData?.email != "" && formData?.password != "") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className={styles.layout}>
      <div className={styles.header}>Welcome</div>
      <div>
        <div className={styles.fontColor}>Email</div>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          style={{ width: "325px", borderColor: "#B3B2B5" }}
        />
      </div>
      <div>
        <div className={styles.fontColor}>Password</div>
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          style={{ width: "325px", borderColor: "#B3B2B5" }}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.rowGap}>
          <Checkbox data-testid="checkbox" style={{ borderColor: "#4F4B53" }} />
          <div className={styles.forgotPassword}>Remember Me</div>
        </div>
        <div>
          <div className={styles.forgotPassword}>Forgot Password?</div>
        </div>
      </div>
      <Button
        variant="secondary"
        size="lg"
        style={{
          width: "325px",
          color: "#FFFFFF",
          fontSize: "12px",
          fontWeight: "600",
        }}
        disabled={handleDisable()}
        onClick={() => onLoginClicked(formData)}
      >
        LOGIN
      </Button>
      <div>
        <div className={`${styles.fontColor} ${styles.marginBottom}`}>
          Not yet registered with us
        </div>
        <Button
          onClick={onCreateAccount}
          variant="secondary"
          size="lg"
          style={{
            width: "325px",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          CREATE ACCOUNT
        </Button>
      </div>
    </div>
  );
};
export default Login;

/**
 * ## Login
 *
 * The Login component is a user authentication form that captures email and password input
 * and optionally includes a "Remember Me" checkbox. It includes primary and secondary action buttons
 * for login and account creation.
 *
 * ### Props
 *
 * - **onLoginClicked** `(function)`: A callback function triggered when the "LOGIN" button is clicked.
 *   Receives the entered email and password as an object:
 *   ```ts
 *   (formData: {
 *     email: string;
 *     password: string;
 *   }) => void
 *   ```
 *
 * ### Component Behavior
 *
 * - Renders an email/password login form using controlled inputs.
 * - The **"LOGIN"** button is disabled until both email and password fields are filled.
 * - Includes a **"Remember Me"** checkbox for user convenience.
 * - Displays a **"Forgot Password?"** link for password recovery (non-functional placeholder).
 * - Provides a **"CREATE ACCOUNT"** button for users who are not yet registered (non-functional placeholder).
 *
 * ### Internal State
 *
 * - `formData`: Object containing `email` and `password`, updated in real-time as the user types.
 *
 * ### Styling
 *
 * - Layout and design are handled via CSS modules (`Login.module.css`).
 * - Button and input styling can be overridden with inline styles as needed.
 *
 * ### Usage Example
 *
 * ```tsx
 * import Login from "@/components/molecules/Login/Login";
 *
 * const handleLogin = (credentials) => {
 *   console.log("User logged in with:", credentials);
 * };
 *
 * <Login onLoginClicked={handleLogin} />
 * ```
 */

