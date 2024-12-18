import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Option {
  label: string;
  value: any;
}

interface SelectOptionsProps {
  options: Option[];
  onSelect: (selectedObject: Option) => void;
  placeholder?: string;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
  options,
  onSelect,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Track selected option
  const [dropdownAbove, setDropdownAbove] = useState(false); // Track if dropdown should open above
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown for closing it on outside clicks
  const triggerRef = useRef<HTMLDivElement | null>(null); // Reference to the trigger for positioning logic

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle positioning of the dropdown
  useEffect(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const availableSpaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 160; // Same as max-height of dropdown (set in CSS)

    // Determine if dropdown should open above or below
    setDropdownAbove(availableSpaceBelow < dropdownHeight);
  }, [isOpen]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option); // Trigger the callback with the selected option
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative w-48 text-white">
      {/* Selected option or placeholder */}
      <div
        ref={triggerRef}
        className="border border-zinc-700 bg-zinc-900 p-0 rounded cursor-pointer flex justify-between items-center hover:bg-zinc-800 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown list */}
      <div
        ref={dropdownRef}
        className={`absolute z-10 w-full bg-zinc-900 border border-zinc-700 rounded shadow-lg transform transition-all duration-300 ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{
          transformOrigin: dropdownAbove ? "bottom" : "top",
          top: dropdownAbove ? undefined : "100%", // Position below the trigger
          bottom: dropdownAbove ? "100%" : undefined, // Position above the trigger
        }}
      >
        <div className="flex flex-col max-h-40 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 text-sm truncate cursor-pointer hover:bg-zinc-700 ${
                selectedOption?.value === option.value ? "bg-zinc-800" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
