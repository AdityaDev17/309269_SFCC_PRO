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
