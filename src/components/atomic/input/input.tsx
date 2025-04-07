'use client'
import * as React from "react"
import styles from './input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPasswordVisible?: (name: string) => void
  error?: boolean 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, onPasswordVisible, error, ...props }, ref) => {
    
    const inputClass = `${styles.Input} ${className} ${error ? styles.error : ''}`;

    
    const isDisabled = props.disabled;
    const isReadonly = props.readOnly;

    return (
      
        <input
          ref={ref}
          type={type}
          className={inputClass}
          disabled={isDisabled}
          readOnly={isReadonly}
          {...props}
        />
        
       
    );
  }
);

Input.displayName = "Input";
export default Input;


