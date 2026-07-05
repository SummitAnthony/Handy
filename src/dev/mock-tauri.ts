/**
 * Browser-only Tauri IPC mock for UI development.
 *
 * Lets the UI render in a plain browser (`bun run dev`) without the Rust
 * backend. Loaded ahead of each entry's module graph by the `devBrowserMock`
 * Vite plugin (vite.config.ts) — dev server only, so it never ships in
 * production — and self-installs below only when no real Tauri runtime is
 * present.
 */
import { mockIPC } from "@tauri-apps/api/mocks";
import type {
  AppSettings,
  AudioDevice,
  AvailableAccelerators,
  CustomSounds,
  ModelInfo,
  PaginatedHistory,
  WindowsMicrophonePermissionStatus,
} from "@/bindings";

const MOCK_SETTINGS: AppSettings = {
  settings_schema_version: 1,
  bindings: {
    transcribe: {
      id: "transcribe",
      name: "Transcribe",
      description: "Start/stop transcription",
      default_binding: "ctrl+space",
      current_binding: "ctrl+space",
    },
    cancel: {
      id: "cancel",
      name: "Cancel",
      description: "Cancel the current operation",
      default_binding: "ctrl+shift+c",
      current_binding: "ctrl+shift+c",
    },
  },
  push_to_talk: false,
  audio_feedback: true,
  audio_feedback_volume: 0.5,
  sound_theme: "marimba",
  start_hidden: false,
  autostart_enabled: false,
  update_checks_enabled: true,
  show_whats_new_on_update: true,
  whats_new_last_seen_version: "0.9.0",
  selected_model: "whisper-small",
  onboarding_completed: true,
  always_on_microphone: false,
  selected_microphone: null,
  clamshell_microphone: null,
  selected_output_device: null,
  translate_to_english: false,
  selected_language: "auto",
  overlay_position: "bottom",
  overlay_style: "minimal",
  debug_mode: false,
  log_level: "info",
  custom_words: ["Handy", "Tauri", "Whisper"],
  model_unload_timeout: "min_5",
  word_correction_threshold: 0.18,
  history_limit: 100,
  recording_retention_period: "weeks_2",
  paste_method: "ctrl_v",
  clipboard_handling: "dont_modify",
  auto_submit: false,
  auto_submit_key: "enter",
  post_process_enabled: false,
  mute_while_recording: false,
  append_trailing_space: true,
  app_language: "en",
  experimental_enabled: false,
  lazy_stream_close: false,
  keyboard_implementation: "tauri",
  show_tray_icon: true,
  paste_delay_ms: 0,
  external_script_path: null,
  transcribe_accelerator: "auto",
  ort_accelerator: "auto",
  transcribe_gpu_device: 0,
  extra_recording_buffer_ms: 0,
  vad_enabled: true,
};

const MODEL_DEFAULTS = {
  filename: "model.bin",
  source: {
    Url: { url: "https://blob.handy.computer/model.bin", sha256: null },
  },
  is_downloading: false,
  partial_size: 0,
  is_directory: false,
  supports_translation: true,
  supported_languages: ["en", "es", "fr", "de", "ja", "zh"],
  supports_language_selection: true,
  is_custom: false,
  supports_streaming: false,
  supports_language_detection: true,
} satisfies Partial<ModelInfo>;

const MOCK_MODELS: ModelInfo[] = [
  {
    ...MODEL_DEFAULTS,
    id: "whisper-small",
    name: "Whisper Small",
    description: "Fast and accurate for everyday use",
    size_mb: 487,
    is_downloaded: true,
    engine_type: "TranscribeCpp",
    accuracy_score: 3,
    speed_score: 4,
    is_recommended: true,
  },
  {
    ...MODEL_DEFAULTS,
    id: "whisper-turbo",
    name: "Whisper Turbo",
    description: "Best balance of speed and accuracy",
    size_mb: 1620,
    is_downloaded: true,
    engine_type: "TranscribeCpp",
    accuracy_score: 4,
    speed_score: 4,
    is_recommended: false,
  },
  {
    ...MODEL_DEFAULTS,
    id: "parakeet-v3",
    name: "Parakeet V3",
    description: "Streaming English transcription",
    size_mb: 640,
    is_downloaded: false,
    engine_type: "Parakeet",
    accuracy_score: 4,
    speed_score: 5,
    is_recommended: false,
    supports_streaming: true,
    supported_languages: ["en"],
  },
];

const now = Date.now();
const MOCK_HISTORY: PaginatedHistory = {
  entries: [
    {
      id: 3,
      file_name: "rec_003.wav",
      timestamp: Math.floor((now - 5 * 60_000) / 1000),
      saved: true,
      title: "Meeting notes",
      transcription_text:
        "Let's move the design review to Thursday afternoon and invite the platform team as well.",
      post_processed_text: null,
      post_process_prompt: null,
      post_process_requested: false,
    },
    {
      id: 2,
      file_name: "rec_002.wav",
      timestamp: Math.floor((now - 2 * 3_600_000) / 1000),
      saved: false,
      title: "Quick reminder",
      transcription_text:
        "Remember to update the changelog before tagging the release.",
      post_processed_text: null,
      post_process_prompt: null,
      post_process_requested: false,
    },
    {
      id: 1,
      file_name: "rec_001.wav",
      timestamp: Math.floor((now - 26 * 3_600_000) / 1000),
      saved: false,
      title: "Message draft",
      transcription_text:
        "Hey, I just pushed the branch with the new glass theme, let me know what you think.",
      post_processed_text: null,
      post_process_prompt: null,
      post_process_requested: false,
    },
  ],
  has_more: false,
};

const MOCK_MICS: AudioDevice[] = [
  { index: "default", name: "Default", is_default: true },
  { index: "1", name: "MacBook Pro Microphone", is_default: false },
  { index: "2", name: "Blue Yeti USB", is_default: false },
];

const MOCK_OUTPUTS: AudioDevice[] = [
  { index: "default", name: "Default", is_default: true },
  { index: "1", name: "External Speakers", is_default: false },
];

const MOCK_MIC_PERMISSION: WindowsMicrophonePermissionStatus = {
  supported: false,
  overall_access: "allowed",
  device_access: "allowed",
  app_access: "allowed",
  desktop_app_access: "allowed",
};

const MOCK_ACCELERATORS: AvailableAccelerators = {
  transcribe: ["auto", "cpu", "gpu"],
  ort: ["auto", "cpu", "directml"],
  gpu_devices: [
    { id: 0, name: "NVIDIA GeForce RTX 4070", total_vram_mb: 12282 },
  ],
};

const CUSTOM_SOUNDS: CustomSounds = { start: false, stop: false };

let eventListenerId = 0;

function installMockTauri(): void {
  // plugin-os reads these synchronously from a global injected by the runtime
  (window as any).__TAURI_OS_PLUGIN_INTERNALS__ = {
    platform: "windows",
    version: "10.0.22631",
    family: "windows",
    os_type: "windows",
    arch: "x86_64",
    exe_extension: "exe",
    eol: "\r\n",
  };

  mockIPC((cmd: string): unknown => {
    if (cmd.startsWith("plugin:")) {
      switch (cmd) {
        case "plugin:event|listen":
          return ++eventListenerId;
        case "plugin:app|version":
          return "0.9.0";
        case "plugin:app|name":
          return "Handy";
        case "plugin:updater|check":
          return null;
        case "plugin:autostart|is_enabled":
          return false;
        default:
          return null;
      }
    }

    switch (cmd) {
      case "get_app_settings":
      case "get_default_settings":
        return MOCK_SETTINGS;
      case "get_available_models":
        return MOCK_MODELS;
      case "get_current_model":
        return "whisper-small";
      case "get_transcription_model_status":
        return null;
      case "get_history_entries":
        return MOCK_HISTORY;
      case "get_available_microphones":
        return MOCK_MICS;
      case "get_available_output_devices":
        return MOCK_OUTPUTS;
      case "get_selected_microphone":
      case "get_selected_output_device":
      case "get_clamshell_microphone":
        return "default";
      case "get_microphone_mode":
        return false;
      case "check_custom_sounds":
        return CUSTOM_SOUNDS;
      case "get_windows_microphone_permission_status":
        return MOCK_MIC_PERMISSION;
      case "get_available_accelerators":
        return MOCK_ACCELERATORS;
      case "get_available_typing_tools":
        return ["auto"];
      case "get_keyboard_implementation":
        return "tauri";
      case "is_portable":
        return false;
      case "get_app_dir_path":
        return "C:\\Users\\dev\\AppData\\Roaming\\com.pais.handy";
      case "get_log_dir_path":
        return "C:\\Users\\dev\\AppData\\Roaming\\com.pais.handy\\logs";
      default:
        return null;
    }
  });

  console.info("[mock-tauri] Tauri IPC mocked — UI running with fake data");
}

// Self-install: only when there is no real Tauri runtime (plain browser dev)
if (!("__TAURI_INTERNALS__" in window)) {
  installMockTauri();
}
