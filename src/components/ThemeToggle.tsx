import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  clearThemePreference,
  getThemePreference,
  onThemeChange,
  setThemePreference,
  type ThemePreference,
} from "@/lib/theme";

type ThemeOption = ThemePreference | "system";

export const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [pref, setPref] = useState<ThemePreference | null>(getThemePreference);

  useEffect(() => onThemeChange(() => setPref(getThemePreference())), []);

  const options = [
    { value: "system" as const, icon: Monitor, label: t("theme.system") },
    { value: "light" as const, icon: Sun, label: t("theme.light") },
    { value: "dark" as const, icon: Moon, label: t("theme.dark") },
  ];

  const select = (value: ThemeOption) =>
    value === "system" ? clearThemePreference() : setThemePreference(value);

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-hairline bg-fill p-0.5">
      {options.map(({ value, icon: Icon, label }) => {
        const active = value === "system" ? pref === null : pref === value;
        return (
          <button
            key={value}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={() => select(value)}
            className={`flex items-center justify-center w-7 h-6 rounded-md transition-colors cursor-pointer ${
              active
                ? "bg-surface-raised text-text shadow-xs"
                : "text-mid-gray hover:text-text"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
};
