/**
 * Manual light/dark theme switching.
 *
 * The resolved theme is stamped on `<html data-theme="light|dark">`, which
 * drives both the CSS token blocks in `styles/theme.css` and Tailwind's
 * `dark:` variant (see the `@custom-variant` in `App.css`). With no stored
 * preference the OS setting is followed live. localStorage is shared across
 * the app's windows, so the overlay picks the same theme via the `storage`
 * event.
 */

export type ThemePreference = "light" | "dark";

const STORAGE_KEY = "app-theme";
const THEME_CHANGE_EVENT = "app-theme-change";

const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

export function getThemePreference(): ThemePreference | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function getResolvedTheme(): ThemePreference {
  return getThemePreference() ?? (systemDark.matches ? "dark" : "light");
}

function apply(): void {
  document.documentElement.dataset.theme = getResolvedTheme();
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT));
}

export function setThemePreference(pref: ThemePreference): void {
  localStorage.setItem(STORAGE_KEY, pref);
  apply();
}

/** Forget the manual choice and follow the OS again. */
export function clearThemePreference(): void {
  localStorage.removeItem(STORAGE_KEY);
  apply();
}

/** Subscribe to resolved-theme changes; returns an unsubscribe function. */
export function onThemeChange(callback: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

/** Stamp the initial theme and follow OS / other-window changes. */
export function initTheme(): void {
  apply();
  systemDark.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) apply();
  });
}
