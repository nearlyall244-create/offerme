import React, { useState, useRef, useEffect } from "react";

export const OTPInput = ({ length = 6, value, onChange, disabled = false }) => {
  const [inputs, setInputs] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value === "") {
      setInputs(Array(length).fill(""));
    }
  }, [value, length]);

  useEffect(() => {
    // Auto-focus first input
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (index, e) => {
    const val = e.target.value;

    // Only allow single digit
    if (val.length > 1) return;
    if (val && !/^\d$/.test(val)) return;

    const newInputs = [...inputs];
    newInputs[index] = val;
    setInputs(newInputs);

    // Call parent onChange with full string
    onChange(newInputs.join(""));

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous on backspace
    if (e.key === "Backspace" && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newInputs = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newInputs[i] = pasted[i];
    }
    setInputs(newInputs);
    onChange(pasted);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {inputs.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold font-mono bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  );
};

export default OTPInput;
