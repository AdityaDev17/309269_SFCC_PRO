'use client'
import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Input from "../../atomic/Input/Input";
import styles from "./Search.module.css";
import { Search as SearchIcon, X, Mic } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  onMicClick?: () => void;
  showMic?: boolean;
  className?: string;
}

const Search = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  onClear,
  onMicClick,
  showMic = true,
  className = "",
}: SearchProps) => {
  const [internalValue, setInternalValue] = useState("");

  const inputValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (onChange) {
      onChange(newVal);
    } else {
      setInternalValue(newVal);
    }
  };

  const handleClear = () => {
    if (onClear) onClear();
    else {
      setInternalValue("");
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Button style={{backgroundColor: 'white', border: 'none', padding: '6px 8px'}} aria-label="Search" onClick={onSearch}>
        <SearchIcon strokeWidth={1.2} color="grey" />
      </Button>

      <Input
        type="search"
        id="search"
        placeholder={placeholder}
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
      />

      {inputValue && (
        <Button  style={{backgroundColor: 'white', border: 'none', padding: '6px 8px'}}aria-label="Clear search" onClick={handleClear}>
          <X strokeWidth={2} color="grey" />
        </Button>
      )}

      <span className={styles.bar} />

      {showMic && (
        <Button style={{backgroundColor: 'white', border: 'none', padding: '6px 8px'}} aria-label="Voice search" onClick={onMicClick}>
          <Mic strokeWidth={1.8} color="grey" />
        </Button>
      )}
    </div>
  );
};

export default Search;
