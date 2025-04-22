import styles from "./EditPassword.module.css";
import Input from "../../atomic/Input/Input";
import { Button } from "../../atomic/Button/Button";
import { useState } from "react";
const EditPassword = ({onUpdateClicked}:any) => {
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    let name = e?.target?.name;
    setUserPassword((prevData: any) => ({
      ...prevData,
      [name]: e?.target?.value,
    }));
  };
  const handleDisable = () => {
    if (
      userPassword?.confirmPassword != "" &&
      userPassword?.currentPassword != "" &&
      userPassword?.newPassword != "" &&
      userPassword?.confirmPassword === userPassword?.newPassword
    ) {
      return false;
    } else {
      return true;
    }
  };
  console.log("24343", userPassword);
  return (
    <div className={styles.layout}>
      <div className={styles.profileText}>Password</div>
      <div className={styles.section}>
        <div className={styles.sectionForm}>
          <div>
            <div className={styles.fontColor}>Current Password*</div>
            <Input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              style={{ width: "325px", borderColor: "#B3B2B5" }}
            />
          </div>
          <div>
            <div className={styles.fontColor}>New Password*</div>
            <Input
              type="password"
              name="newPassword"
              onChange={handleChange}
              style={{ width: "325px", borderColor: "#B3B2B5" }}
            />
          </div>
          <div>
            <div className={styles.fontColor}>Confirm Password*</div>
            <Input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              style={{ width: "325px", borderColor: "#B3B2B5" }}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={handleDisable()}
        style={{
          height: "36px",
          color: "#FFF",
          border: "None",
          backgroundColor: "#000",
          fontSize: "12px",
        }}
        onClick={() => onUpdateClicked(userPassword)}
      >
        UPDATE
      </Button>
    </div>
  );
};
export default EditPassword;

/**
 * # EditPassword Component
 *
 * The `EditPassword` component provides a controlled form for users to update their password securely.
 *
 * ## Props
 *
 * - **onUpdateClicked** (function): A callback function triggered on "UPDATE" button click.
 *   It receives the updated password object as its argument.
 *
 * ## Component Behavior
 *
 * - Maintains internal state (`userPassword`) to track current, new, and confirm password fields.
 * - Disables the "UPDATE" button unless all fields are filled and the new password matches the confirmation password.
 * - Input fields are password-type and styled using `EditPassword.module.css`.
 *
 * ## Form Fields
 *
 * - **Current Password** (password input)
 * - **New Password** (password input)
 * - **Confirm Password** (password input)
 *
 * ## Validation
 *
 * - All fields must be filled.
 * - The new password and confirm password fields must match.
 *
 * ## Styling
 *
 * - Styles are handled via the `EditPassword.module.css` CSS module.
 */

