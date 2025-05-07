/**
 * ## Captcha
 *
 * The `Captcha` component is a simple, customizable CAPTCHA validator for verifying user input.
 * It is designed to add a lightweight security check against bots or automated interactions.
 *
 *
 * ### Features:
 * - **Random CAPTCHA Code**: Automatically generates a 6-character alphanumeric CAPTCHA code.
 * - **User Input Verification**: Compares user input with the generated code.
 * - **Dynamic Validation Message**: Displays success or error messages based on user input.
 * - **Callback Support**: Triggers `onVerify` callback with the result of the validation.
 *
 *
 * ### Props:
 *
 * | Prop       | Type                     | Description |
 * |------------|--------------------------|-------------|
 * | `onVerify` | `(isValid: boolean) => void` | Callback triggered after CAPTCHA validation. Receives a boolean indicating if the validation was successful. |
 *
 *
 * ### Accessibility Considerations:
 * - Includes `placeholder` in the input field to assist screen readers.
 * - Validation messages are rendered as text updates for clear feedback.
 * - CAPTCHA code is displayed as plain text, making it easy to read.
 *
 *
 * ### Challenges & Considerations:
 * - **Security**: Intended for basic protection; not suitable for high-security applications.
 * - **User Experience**: Ensures validation feedback is immediate and easy to understand.
 * - **State Management**: Tracks the CAPTCHA code, user input, and validation status using `useState`.
 
 */

import React, { useState } from "react";
import styles from "./Captcha.module.css";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [captchaCode, setCaptchaCode] = useState(generateCaptchaCode());

  function generateCaptchaCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  const handleSubmit = () => {
    const isValidCaptcha = userInput === captchaCode;
    setIsValid(isValidCaptcha);
    onVerify(isValidCaptcha);
  };

  return (
    <div className={styles.captchaContainer}>
      <div className={styles.captchaBox}>
        <div className={styles.captchaText}>{captchaCode}</div>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={styles.inputField}
        placeholder="Enter Captcha"
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
      {isValid !== null && (
        <div className={isValid ? styles.valid : styles.invalid}>
          {isValid ? "Captcha Verified!" : "Incorrect Captcha, try again."}
        </div>
      )}
    </div>
  );
};

export default Captcha;