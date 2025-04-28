import React, { useState, useRef, useEffect } from "react";
import "./MultiSelectDropdown.scss";

interface Option {
  label: string;
  value: string;
  emoji?: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options: initialOptions,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    if (selectedOptions.some((o) => o.value === option.value)) {
      setSelectedOptions(
        selectedOptions.filter((o) => o.value !== option.value)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newOption = { label: inputValue.trim(), value: inputValue.trim() };
      setOptions([...options, newOption]);
      setSelectedOptions([...selectedOptions, newOption]);
      setInputValue("");
      e.preventDefault();
    }
  };

  const displayValue =
    selectedOptions.map((o) => o.label).join(", ") || placeholder;

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div
        className={`input-box ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {displayValue}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            className="dropdown-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type to add..."
          />
          <div className="options">
            {options.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  selectedOptions.some((o) => o.value === option.value)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <div className="gap-8">
                  {option.label}
                  {option.emoji && (
                    <span className="emoji">{option.emoji}</span>
                  )}
                </div>
                {selectedOptions.some((o) => o.value === option.value) && (
                  <span className="checkmark">✔</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
