/* Segmented one-time-code input — one box per digit.
   Hand-written, NOT generated from the design.

   A single wide text field was standing in for this. It worked, but it reads
   like a password box, gives no sense of how many digits are expected, and
   offers nowhere for the eye to land. Every OTP screen people already use
   (banks, Stripe, Google) is segmented, so this matches that muscle memory.

   Behaviour that a naive six-inputs implementation usually gets wrong, and
   which is handled here:
     - pasting the whole code into any box fills all of them
     - typing past a filled box advances rather than overwriting silently
     - backspace on an empty box steps back and clears the previous one
     - arrow keys / clicking jump between boxes
     - autocomplete="one-time-code" on the first box so iOS/Android SMS and
       mail autofill still work, which a div-of-inputs normally breaks
*/
"use client";

import React from "react";

const LEN = 6;

export default function OtpInput({
  value = "",
  onChange,
  onComplete,
  disabled = false,
  invalid = false,
  autoFocus = true,
  label,
}) {
  const refs = React.useRef([]);
  const digits = String(value || "").replace(/\D/g, "").slice(0, LEN).split("");

  React.useEffect(() => {
    if (autoFocus && refs.current[0]) refs.current[0].focus();
    /* Only on mount: refocusing on every value change would fight the
       auto-advance below and trap the caret in the first box. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = (next) => {
    const code = next.join("").slice(0, LEN);
    if (onChange) onChange(code);
    if (code.length === LEN && onComplete) onComplete(code);
  };

  const focusAt = (i) => {
    const el = refs.current[Math.max(0, Math.min(LEN - 1, i))];
    if (el) { el.focus(); el.select(); }
  };

  const handleInput = (i) => (e) => {
    const raw = String(e.target.value || "").replace(/\D/g, "");
    if (!raw) return;
    const next = digits.slice();
    /* More than one digit means a paste (or a fast autofill): spread it from
       the box that received it instead of keeping only the first character. */
    for (let k = 0; k < raw.length && i + k < LEN; k++) next[i + k] = raw[k];
    for (let k = 0; k < LEN; k++) if (next[k] === undefined) next[k] = "";
    emit(next);
    focusAt(i + raw.length);
  };

  const handleKeyDown = (i) => (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.slice();
      for (let k = 0; k < LEN; k++) if (next[k] === undefined) next[k] = "";
      if (next[i]) { next[i] = ""; emit(next); return; }
      if (i > 0) { next[i - 1] = ""; emit(next); focusAt(i - 1); }
      return;
    }
    if (e.key === "ArrowLeft") { e.preventDefault(); focusAt(i - 1); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); focusAt(i + 1); return; }
    if (e.key === "Delete") {
      e.preventDefault();
      const next = digits.slice();
      for (let k = 0; k < LEN; k++) if (next[k] === undefined) next[k] = "";
      next[i] = "";
      emit(next);
    }
  };

  const handlePaste = (e) => {
    const raw = (e.clipboardData && e.clipboardData.getData("text")) || "";
    const nums = raw.replace(/\D/g, "").slice(0, LEN);
    if (!nums) return;
    e.preventDefault();
    const next = [];
    for (let k = 0; k < LEN; k++) next[k] = nums[k] || "";
    emit(next);
    focusAt(nums.length);
  };

  const box = (filled) => ({
    width: "100%",
    minWidth: 0,
    aspectRatio: "1 / 1",
    maxHeight: 56,
    padding: 0,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
    color: "var(--ink)",
    background: disabled ? "var(--surface)" : "var(--panel)",
    border: "1px solid " + (invalid ? "var(--bad-text)" : filled ? "var(--indigo-text)" : "var(--border-strong)"),
    borderRadius: 10,
    outlineOffset: 2,
    boxSizing: "border-box",
    transition: "border-color 120ms ease",
  });

  return (
    <div
      role="group"
      aria-label={label || "6-digit verification code"}
      style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, maxWidth: 340 }}
    >
      {Array.from({ length: LEN }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          /* Only the first box carries the autofill hint — repeating it on all
             six makes browsers offer the whole code six times. */
          autoComplete={i === 0 ? "one-time-code" : "off"}
          aria-label={"Digit " + (i + 1) + " of " + LEN}
          aria-invalid={invalid || undefined}
          maxLength={LEN}
          disabled={disabled}
          value={digits[i] || ""}
          onChange={handleInput(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          style={box(Boolean(digits[i]))}
        />
      ))}
    </div>
  );
}
