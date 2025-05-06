"use client";
import { useState } from "react";
import { Button } from "../../atomic/Button/Button";
import Input from "../../atomic/Input/Input";
import styles from "./Search.module.css";
import { Search as SearchIcon, X, Mic, ChevronLeft  } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  onClose?: () => void;
  onMicClick?: () => void;
  showMic?: boolean;
  className?: string;
  isMobile?: boolean;
}

const Search = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  onClear,
  onClose,
  onMicClick,
  showMic = true,
  className = "",
  isMobile,
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
      {isMobile ? (
        <SearchBarButton
          aria-label="Close"
          clickHandler={onClose}
        >
          <ChevronLeft strokeWidth={1.2} color="grey" />
        </SearchBarButton>
      ) : (
        <SearchBarButton
          aria-label="Search"
          clickHandler={onSearch}
        >
          <SearchIcon strokeWidth={1.2} color="grey" />
        </SearchBarButton>
      )}

      <Input
        type="search"
        id="search"
        placeholder={placeholder}
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
      />

      {inputValue && (
        <SearchBarButton
          aria-label="Clear search"
          clickHandler={handleClear}
        >
          <X strokeWidth={2} color="grey" />
        </SearchBarButton>
      )}

      <span className={styles.bar} />

      {showMic && (
        <SearchBarButton
          aria-label="Voice search"
          clickHandler={onMicClick}
        >
          <Mic strokeWidth={1.8} color="grey" />
        </SearchBarButton>
      )}
    </div>
  );
};

export default Search;


function SearchBarButton({children, label, clickHandler}: any) {
  const [isHovered, setIsHovered] = useState(false);
  const baseStyle = {
    backgroundColor: 'white',
    border: 'none',
    padding: '6px 8px',
    cursor: 'pointer'
  };

  const hoverStyle = {
    backgroundColor: 'white',
    border: 'none'
  };

  const combinedStyle = isHovered
    ? { ...baseStyle, ...hoverStyle }
    : baseStyle;

  return (
    <Button
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      onClick={clickHandler}
    >
      {children}
    </Button>
  );
}