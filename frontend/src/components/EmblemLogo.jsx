import React from 'react';

/**
 * EmblemLogo — reusable SVG component.
 * Recreates the exact uploaded emblem:
 *   - Outer circular ring
 *   - Inner circular ring
 *   - Faceless female portrait with wavy hair
 *   - Two 4-point sparkle stars (left & right)
 * All white strokes on a transparent background.
 */
export default function EmblemLogo({
  width = 64,
  height = 64,
  className = '',
  style = {},
  onClick,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', ...style }}
      onClick={onClick}
      aria-label="Akshaya Chittimilla emblem"
      role="img"
      fill="none"
    >
      {/* ── Outer ring ── */}
      <circle cx="100" cy="100" r="93" stroke="#fff" strokeWidth="3.5" />

      {/* ── Inner ring ── */}
      <circle cx="100" cy="100" r="82" stroke="#fff" strokeWidth="3" />

      {/* ── Left 4-point sparkle star ── */}
      {/* centre ≈ (38, 95) */}
      <path
        d="M38 84 L40.2 93 L49 95 L40.2 97 L38 106 L35.8 97 L27 95 L35.8 93 Z"
        fill="#fff"
        stroke="none"
      />

      {/* ── Right 4-point sparkle star ── */}
      {/* centre ≈ (162, 95) */}
      <path
        d="M162 84 L164.2 93 L173 95 L164.2 97 L162 106 L159.8 97 L151 95 L159.8 93 Z"
        fill="#fff"
        stroke="none"
      />

      {/* ══════════════════════════════════
          PORTRAIT — single compound path
          drawn with white stroke, no fill
         ══════════════════════════════════ */}

      {/* ── Outer hair silhouette (left side flowing down) ── */}
      <path
        d="
          M 100 38
          C 82 38, 66 48, 62 62
          C 58 72, 60 84, 58 94
          C 56 106, 52 116, 48 128
          C 46 136, 46 148, 54 156
          C 62 163, 74 166, 88 168
        "
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Outer hair silhouette (right side flowing down) ── */}
      <path
        d="
          M 100 38
          C 118 38, 134 48, 138 62
          C 142 72, 140 84, 142 94
          C 144 106, 148 116, 152 128
          C 154 136, 154 148, 146 156
          C 138 163, 126 166, 112 168
        "
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Head top curve ── */}
      <path
        d="M 74 68 C 76 54, 88 46, 100 46 C 112 46, 124 54, 126 68"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── Face left outline ── */}
      <path
        d="M 74 68 C 72 80, 72 92, 74 104 C 76 112, 80 118, 86 122 C 90 126, 95 128, 100 128"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Face right outline ── */}
      <path
        d="M 126 68 C 128 80, 128 92, 126 104 C 124 112, 120 118, 114 122 C 110 126, 105 128, 100 128"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Neck left ── */}
      <path
        d="M 91 128 C 90 134, 90 140, 92 148"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── Neck right ── */}
      <path
        d="M 109 128 C 110 134, 110 140, 108 148"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── Left shoulder ── */}
      <path
        d="M 92 148 C 84 150, 72 154, 60 162 C 52 168, 46 174, 40 182"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Right shoulder ── */}
      <path
        d="M 108 148 C 116 150, 128 154, 140 162 C 148 168, 154 174, 160 182"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Hair parting line (top centre) ── */}
      <path
        d="M 100 46 C 100 56, 100 68, 100 80"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Hair strand sweeping across face (left to right) ── */}
      <path
        d="M 82 58 C 88 64, 96 70, 104 74 C 110 78, 114 82, 112 88"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ── Left wavy hair curl (lower left) ── */}
      <path
        d="
          M 62 120
          C 58 128, 58 136, 62 142
          C 66 148, 64 154, 60 160
          C 56 166, 56 172, 60 178
        "
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Right wavy hair curl (lower right) ── */}
      <path
        d="
          M 138 120
          C 142 128, 142 136, 138 142
          C 134 148, 136 154, 140 160
          C 144 166, 144 172, 140 178
        "
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
