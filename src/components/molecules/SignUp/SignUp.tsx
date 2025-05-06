"use client";
import Input from "../../atomic/Input/Input";
import styles from "./SignUp.module.css";
import CheckBox from "@/components/atomic/CheckBox/CheckBox";
import { Button } from "../../atomic/Button/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../atomic/Select/Select";
import { useState } from "react";

const SignUp = ({ onProceed }: any) => {
  const [passwordScreen, setpasswordScreen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const handleChange = (e: any, name?: any) => {
    const targetName = e?.target?.name || name;
    const value = e?.target?.value || e;

    setFormData((prevData) => ({
      ...prevData,
      [targetName]: value,
    }));
  };

  const handleDisable = () => {
    if (
      formData?.birthDate != "" &&
      formData?.email != "" &&
      formData?.firstName != "" &&
      formData?.lastName != "" &&
      formData?.gender != "" &&
      formData?.title != ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>CREATE ACCOUNT</div>
      <div
        style={{ display: passwordScreen ? "none" : "grid" }}
        className={styles.layout}
      >
        <div>
          <div className={styles.fontColor}>Title*</div>
          <Select onValueChange={(e) => handleChange(e, "title")}>
            <SelectTrigger
              style={{
                width: "325px",
                border: "solid",
                borderWidth: "1px",
                borderColor: "#B3B2B5",
                color: "#75757A",
              }}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "325px",
                borderColor: "#B3B2B5",
                color: "#75757A",
              }}
            >
              <SelectGroup>
                <SelectItem value="Mr" data-testid="select-item-1">
                  Mr
                </SelectItem>
                <SelectItem value="Mrs" data-testid="select-item-2">
                  Mrs
                </SelectItem>
                <SelectItem value="Ms" data-testid="select-item-2">
                  Ms
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className={styles.fontColor}>First Name*</div>
          <Input
            type="text"
            name="firstName"
            value={formData?.firstName || ""}
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <div>
          <div className={styles.fontColor}>Last Name*</div>
          <Input
            type="text"
            name="lastName"
            value={formData?.lastName || ""}
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <div>
          <div className={styles.fontColor}>Gender*</div>
          <Select onValueChange={(e) => handleChange(e, "gender")}>
            <SelectTrigger
              style={{
                width: "325px",
                border: "solid",
                borderWidth: "1px",
                borderColor: "#B3B2B5",
                color: "#75757A",
              }}
            >
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "325px",
                borderColor: "#B3B2B5",
                color: "#75757A",
              }}
            >
              <SelectGroup>
                <SelectItem value="male" data-testid="select-item-1">
                  Male
                </SelectItem>
                <SelectItem value="female" data-testid="select-item-2">
                  Female
                </SelectItem>
                <SelectItem value="others" data-testid="select-item-2">
                  Others
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className={styles.fontColor}>Birth Date*</div>
          <Input
            type="date"
            name="birthDate"
            value={formData?.birthDate || ""}
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <div>
          <div className={styles.fontColor}>Email ID*</div>
          <Input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <Button
          variant="secondary"
          className={styles.buttonStyle}
          size="lg"
          disabled={handleDisable()}
          style={{
            width: "325px",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: "600",
          }}
          onClick={() => setpasswordScreen(true)}
        >
          CONTINUE
        </Button>
      </div>
      <div
        style={{ display: passwordScreen ? "grid" : "none" }}
        className={styles.layout}
      >
        <div>
          <div className={styles.fontColor}>Password</div>
          <Input
            type="password"
            value={formData?.password || ""}
            name="password"
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <div>
          <div className={styles.fontColor}>Confirm Password</div>
          <Input
            type="password"
            value={formData?.confirmPassword || ""}
            name="confirmPassword"
            onChange={handleChange}
            style={{ width: "325px", borderColor: "#B3B2B5" }}
          />
        </div>
        <div className={styles.row}>
          <CheckBox
            data-testid="checkbox"
            style={{ borderColor: "#4F4B53" }}
            checked={formData.agreeToTerms}
            onCheckedChange={(checked: boolean) =>
              setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
            }
          />
          <div className={styles.policy}>
            I have read, agreed to T&C & Privacy Policy*
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
          onClick={() => onProceed(formData)}
          disabled={
            formData?.password !== formData?.confirmPassword ||
            !formData.agreeToTerms
          }
        >
          PROCEED
        </Button>
      </div>
    </div>
  );
};
export default SignUp;

/**
 * ## SignUp 
 *
 * The SignUp component is a two-step registration form that collects user information
 * and validates input before proceeding. It features a clean UI and is built using
 * atomic design components such as `Input`, `Select`, `Checkbox`, and `Button`.
 *
 * ### Props
 *
 * - **onProceed** `(function)`: A callback function invoked with the complete form data
 *   once the user submits the form.
 *   ```ts
 *   (formData: {
 *     title: string;
 *     firstName: string;
 *     lastName: string;
 *     gender: string;
 *     birthDate: string;
 *     email: string;
 *     password: string;
 *     confirmPassword: string;
 *     agreeToTerms: boolean;
 *   }) => void
 *   ```
 *
 * ### Component Behavior
 *
 * - Renders a two-step form:
 *   1. **Step 1**: Collects personal details like title, name, gender, birth date, and email.
 *   2. **Step 2**: Prompts for password setup and agreement to terms.
 *
 * - The **"CONTINUE"** button is disabled until all required fields in Step 1 are filled.
 * - The **"PROCEED"** button is disabled until:
 *   - Password and confirm password fields match
 *   - Terms & Conditions checkbox is checked
 *
 * - Form field values are controlled via component state.
 * - Styling is handled via CSS modules (`SignUp.module.css`) and inline overrides.
 *
 * ### Internal State
 *
 * - `formData`: Object containing all field values.
 * - `passwordScreen`: Boolean flag to switch between Step 1 and Step 2.
 *
 * ### Usage Example
 *
 * ```tsx
 * import SignUp from "@/components/molecules/SignUp/SignUp";
 *
 * const handleSignUp = (formData) => {
 *   console.log("User submitted form:", formData);
 * };
 *
 * <SignUp onProceed={handleSignUp} />
 * ```
 */

