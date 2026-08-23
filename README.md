# Passable Lock Manager Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![version](https://img.shields.io/github/v/release/GBear09/passable-lock-manager-card)](https://github.com/GBear09/passable-lock-manager-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sleek, dynamic, unified dashboard card for Home Assistant smart locks and PIN code management. Combines live door lock/unlock toggling, battery levels, high-urgency deadbolt jammed alerts, and full code slot administration (6-digit random PIN generation, temporary duration access timers, guest mode toggles, and day/time schedule access controls).

---

## ✨ Features

- 🚪 **Live Door Controls Hero Section**: 1-tap lock/unlock toggles, live status pill indicators, relative last-changed timestamps, and "Lock All" action.
- 🚨 **Jammed Deadbolt Alerts**: Instant high-urgency pulsing warning banner when a lock is jammed.
- 🔋 **Battery Health Diagnostics**: Color-coded battery percentage indicators with critical low-battery alerts.
- 🛡️ **Built-in Role-Based Access Control (RBAC)**: Restrict PIN code slot visibility to specified admin users (`admin_users`) or administrators (`require_admin`).
- 📂 **Collapsible Inactive Slots**: Keep the card compact by showing active slots first with a 1-tap toggle to expand all slots.
- 🔐 **Slot Overview Grid**: Displays up to 30 code slots with real-time active/disabled badges, configured name, masked PIN preview (`••••`), and active counters.
- ⚡ **Full Visual Editor Support**: Native Home Assistant UI editor allowing easy configuration of title, subtitle, door locks, total slot count, collapse settings, and management script entity.
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

### Manual YAML Example (Unified Command Center)

```yaml
type: custom:passable-lock-manager-card
title: Entry Door Locks & Access
subtitle: Smart Lock Command Center
slots: 10
manage_script: script.manage_lock_codes
admin_users:
  - 8dbc02434afe44edb77eab6b41471860
  - 12061794833e45b6bd5dc50ebbbbbf11
collapse_inactive_slots: true
show_lock_all: true
locks:
  - entity: lock.front_door
    name: Front Door
    battery: sensor.front_door_battery_level
    jammed: binary_sensor.front_door_lock_jammed
  - entity: lock.mudroom_door
    name: Mudroom Door
    battery: sensor.mudroom_door_battery_level
    jammed: binary_sensor.mudroom_door_lock_jammed
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
