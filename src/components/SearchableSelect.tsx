"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SearchableSelectProps {
  options: (string | SelectOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  align?: "left" | "right";
  fullWidth?: boolean;
  buttonStyle?: React.CSSProperties;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Search",
  label,
  className = "",
  disabled = false,
  align = "left",
  fullWidth = true,
  buttonStyle,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  // Normalize options to { label, value }
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: fullWidth ? "100%" : "auto",
        display: "inline-block",
      }}
      className={className}
    >
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "0.68rem",
            color: "#768196",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            fontWeight: 700,
            marginBottom: "0.25rem",
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          padding: "0.2rem 0",
          fontSize: "0.88rem",
          color: selectedOption ? "#172033" : "#94a3b8",
          fontWeight: 500,
          textAlign: "left",
          ...buttonStyle,
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          color="#647086"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              [align]: 0,
              minWidth: "220px",
              width: "max(100%, 220px)",
              zIndex: 99,
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "0.85rem",
              boxShadow:
                "0 12px 32px -4px rgba(16, 24, 40, 0.16), 0 4px 16px -2px rgba(16, 24, 40, 0.08)",
              border: "1px solid #e2e8f0",
            }}
            role="listbox"
            id={listId}
          >
            {/* Search Input inside Dropdown - exact match to user reference image! */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #94a3b8",
                borderRadius: "9999px",
                padding: "0.4rem 0.85rem",
                backgroundColor: "#ffffff",
                marginBottom: "0.6rem",
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "0.9rem",
                  color: "#1e293b",
                  fontWeight: 400,
                  paddingLeft: "0.2rem",
                }}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={14} color="#94a3b8" />
                </button>
              ) : null}
            </div>

            {/* Options List */}
            <div
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.15rem",
                paddingRight: "0.15rem",
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.75rem",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: isSelected ? "#f0f4ff" : "transparent",
                        color: isSelected ? "#0b3b8e" : "#2d3748",
                        fontWeight: isSelected ? 600 : 400,
                        fontSize: "0.92rem",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "#f8fafc";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={16} color="#0b3b8e" />}
                    </button>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "0.75rem",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  Tidak ditemukan
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
