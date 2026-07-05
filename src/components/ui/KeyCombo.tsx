import React from "react";

interface KeyComboProps {
  /** Display-formatted key parts, e.g. ["Ctrl", "Space"] (see formatKeyParts) */
  keys: string[];
}

/** Renders a key combination as individual keycap chips: [Ctrl] + [Space] */
export const KeyCombo: React.FC<KeyComboProps> = ({ keys }) => (
  <span className="inline-flex items-center gap-1.5">
    {keys.map((key, index) => (
      <React.Fragment key={`${key}-${index}`}>
        {index > 0 && <span className="text-xs text-mid-gray/70">+</span>}
        <kbd className="px-2 py-0.5 rounded-md bg-fill border border-hairline-strong text-xs font-semibold font-sans">
          {key}
        </kbd>
      </React.Fragment>
    ))}
  </span>
);

interface ShortcutDisplayProps {
  /** True while capturing a new binding; shows the live keys as one chip */
  recording: boolean;
  /** Raw display string of the keys held down while recording */
  liveKeys: string;
  /** Display-formatted parts of the current binding */
  keys: string[];
  onEdit: () => void;
}

/** Current binding as keycaps; click to re-record. Ref targets the recording chip. */
export const ShortcutDisplay = React.forwardRef<
  HTMLDivElement,
  ShortcutDisplayProps
>(({ recording, liveKeys, keys, onEdit }, ref) =>
  recording ? (
    <div
      ref={ref}
      className="px-2 py-1 text-sm font-medium border border-accent/60 bg-accent/15 text-accent rounded-lg ring-2 ring-accent/20"
    >
      {liveKeys}
    </div>
  ) : (
    <div
      className="cursor-pointer rounded-lg p-1 -m-1 transition-opacity hover:opacity-75"
      onClick={onEdit}
    >
      <KeyCombo keys={keys} />
    </div>
  ),
);
ShortcutDisplay.displayName = "ShortcutDisplay";
