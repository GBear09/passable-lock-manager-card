# Passable Lock Manager Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![version](https://img.shields.io/github/v/release/GBear09/passable-lock-manager-card)](https://github.com/GBear09/passable-lock-manager-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sleek, dynamic, custom dashboard card for Home Assistant smart lock PIN code management. Designed for entry door lock code slots with active status counters, 6-digit random PIN generation, temporary duration access timers, guest mode toggles, and day/time schedule access controls.

---

## ✨ Features

- 🔐 **Slot Overview Grid**: Displays up to 30 code slots with real-time active/disabled badges, configured name, masked PIN preview (`••••`), and active counters.
- ⚡ **Full Visual Editor Support**: Native Home Assistant UI editor allowing easy configuration of card title, subtitle, total slot count, and management script entity.
- 🎲 **Instant PIN Generator**: One-click 6-digit secure random PIN creation inside the slot edit modal.
- ⏱️ **Temporary Access Timers**: Set duration in hours with selectable timer actions (`clear_code`, `disable_slot`, `notify_only`) and quick start/stop control.
- 🛡️ **Guest Mode Integration**: Easily assign guest access mode triggers to individual lock slots.
- 📅 **Schedule Controls**: Interactively toggle allowed days of the week (Sun–Sat) and active start/end time windows for each slot.
- 🔄 **Universal Entity & Backend Alignment**: Designed to pair seamlessly with the included `lock_code_manager.yaml` Home Assistant package or Keymaster/custom lock integrations.

---

## 📦 Installation via HACS

1. Open **HACS** in your Home Assistant instance.
2. Click the three dots in the top-right corner and select **Custom repositories**.
3. Add Repository URL: `https://github.com/GBear09/passable-lock-manager-card`
4. Select Category: **Dashboard** (or **Lovelace**).
5. Click **Add**, search for **Passable Lock Manager Card**, and click **Download**.
6. Hard refresh your browser (`Ctrl + Shift + R` or `Cmd + Shift + R`).

---

## ⚙️ Configuration

### Visual UI Editor
Click **Edit Dashboard** -> **Add Card** -> Search for **Passable Lock Manager Card**. Use the form fields to customize:
- **Card Title** (default: `Lock Manager`)
- **Card Subtitle** (default: `Entry Door Smart Locks`)
- **Number of Code Slots** (default: `10`)
- **Manage Lock Codes Script** (default: `script.manage_lock_codes`)

### Manual YAML Example

```yaml
type: custom:passable-lock-manager-card
title: Front Door Lock Codes
subtitle: Entry & Guest Access
slots: 10
manage_script: script.manage_lock_codes
```

---

## 🛠️ Home Assistant Backend Entities

This card communicates with Home Assistant entities per code slot (`slot` 1 to N):

| Entity Pattern | Type | Description |
|---|---|---|
| `input_text.lock_code_name_{slot}` | `input_text` | Slot user / description |
| `input_text.lock_code_pin_{slot}` | `input_text` | PIN code value |
| `input_boolean.lock_code_enabled_{slot}` | `input_boolean` | Active state toggle |
| `input_boolean.lock_guest_mode_enabled_{slot}` | `input_boolean` | Guest mode toggle |
| `input_number.lock_code_duration_{slot}` | `input_number` | Access timer duration (hours) |
| `input_select.lock_timer_action_{slot}` | `input_select` | Action when timer expires |
| `timer.lock_code_timer_{slot}` | `timer` | Active timer status entity |
| `input_boolean.lock_schedule_enabled_{slot}` | `input_boolean` | Schedule state toggle |
| `input_text.lock_schedule_days_{slot}` | `input_text` | Comma-separated active days |
| `input_datetime.lock_schedule_start_time_{slot}` | `input_datetime` | Daily active start time |
| `input_datetime.lock_schedule_end_time_{slot}` | `input_datetime` | Daily active end time |
| `script.manage_lock_codes` | `script` | Management service script |

*(For full backend configuration, place the included `lock_code_manager.yaml` file into your Home Assistant `packages` directory).*

---

## 📄 License

MIT License. Created by GBear09.
