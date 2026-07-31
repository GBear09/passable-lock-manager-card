import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit@3.0.0/index.js?module";

const CARD_VERSION = "1.0.1";

console.info(
  `%c PASSABLE-LOCK-MANAGER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #2196f3; font-weight: bold;",
  "color: white; background: #10b981; font-weight: bold;"
);

// --- INLINE ICONS (Extracted from Lucide) ---
const Icons = {
  Lock: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>`,
  Unlock: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>`,
  User: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>`,
  Clock: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>`,
  ClockLg: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>`,
  Trash2: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>`,
  RefreshCw: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>`,
  Save: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>`,
  ArrowLeft: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>`,
  Key: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
    <path d="m21 2-9.6 9.6" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>`,
  ShieldAlert: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M20 13c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3 8 3v8Z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>`,
  Calendar: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>`,
  ChevronDown: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>`,
  Play: html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>`,
};

class PassableLockManagerCard extends LitElement {
  static getConfigElement() {
    return document.createElement("passable-lock-manager-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Lock Manager",
      subtitle: "Entry Door Smart Locks",
      slots: 10,
      manage_script: "script.manage_lock_codes",
    };
  }

  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _editingSlot: { state: true },
    _localName: { state: true },
    _localPin: { state: true },
    _openSections: { state: true },
  };

  constructor() {
    super();
    this._editingSlot = null;
    this._localName = "";
    this._localPin = "";
    this._openSections = {};
    this._fullDaysList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this._shortDaysList = ["S", "M", "T", "W", "T", "F", "S"];
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    this.config = config;
  }

  getCardSize() {
    return 4;
  }

  _callService(domain, service, data) {
    if (this.hass) {
      this.hass.callService(domain, service, data);
    }
  }

  // --- STATE EXTRACTORS ---
  _getEntity(entityId) {
    return this.hass?.states[entityId];
  }

  _getState(entityId, defaultVal = "") {
    const ent = this._getEntity(entityId);
    return ent ? ent.state : defaultVal;
  }

  // --- EVENT HANDLERS ---
  _openEdit(slot) {
    this._editingSlot = slot;
    this._localName = this._getState(`input_text.lock_code_name_${slot}`);
    this._localPin = this._getState(`input_text.lock_code_pin_${slot}`);
  }

  _closeEdit() {
    this._editingSlot = null;
  }

  _handleSave() {
    const slot = this._editingSlot;
    const scriptEntity = this.config?.manage_script || "script.manage_lock_codes";
    const [domain, service] = scriptEntity.split(".");

    this._callService("input_text", "set_value", {
      entity_id: `input_text.lock_code_name_${slot}`,
      value: this._localName,
    });
    this._callService("input_text", "set_value", {
      entity_id: `input_text.lock_code_pin_${slot}`,
      value: this._localPin,
    });
    this._callService(domain || "script", service || "manage_lock_codes", {
      action: "set",
      code_slot: slot.toString(),
    });
    this._closeEdit();
  }

  _handleGenerate() {
    let pin = "";
    for (let i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    this._localPin = pin;
  }

  _handleClear() {
    const slot = this._editingSlot;
    const scriptEntity = this.config?.manage_script || "script.manage_lock_codes";
    const [domain, service] = scriptEntity.split(".");

    if (confirm(`Delete code slot ${slot}?`)) {
      this._callService("input_text", "set_value", {
        entity_id: `input_text.lock_code_name_${slot}`,
        value: "",
      });
      this._callService("input_text", "set_value", {
        entity_id: `input_text.lock_code_pin_${slot}`,
        value: "",
      });
      this._callService("input_boolean", "turn_off", {
        entity_id: `input_boolean.lock_code_enabled_${slot}`,
      });
      this._callService(domain || "script", service || "manage_lock_codes", {
        action: "clear",
        code_slot: slot.toString(),
      });
      this._closeEdit();
    }
  }

  _toggleBoolean(entityId) {
    const state = this._getState(entityId);
    this._callService(
      "input_boolean",
      state === "on" ? "turn_off" : "turn_on",
      { entity_id: entityId }
    );
  }

  _toggleSection(section) {
    this._openSections = {
      ...this._openSections,
      [section]: !this._openSections[section],
    };
  }

  _toggleDay(day) {
    const slot = this._editingSlot;
    const schedEnabledEntId = `input_boolean.lock_schedule_enabled_${slot}`;
    const isSchedEnabled = this._getState(schedEnabledEntId) === "on";

    if (!isSchedEnabled) return;

    const schedDaysEntId = `input_text.lock_schedule_days_${slot}`;
    const currentStr = this._getState(
      schedDaysEntId,
      "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday"
    );
    let selectedDays = currentStr ? currentStr.split(",") : [];

    if (selectedDays.includes(day)) {
      selectedDays = selectedDays.filter((d) => d !== day);
    } else {
      selectedDays.push(day);
      selectedDays.sort(
        (a, b) => this._fullDaysList.indexOf(a) - this._fullDaysList.indexOf(b)
      );
    }
    this._callService("input_text", "set_value", {
      entity_id: schedDaysEntId,
      value: selectedDays.join(","),
    });
  }

  // --- RENDERING ---
  render() {
    if (!this.hass) return html`<div class="loading">Loading...</div>`;

    return html`
      <div class="container">
        ${!this._editingSlot ? this._renderGrid() : this._renderEdit()}
      </div>
    `;
  }

  _renderGrid() {
    const totalSlots = this.config?.slots || 10;
    const title = this.config?.title || "Lock Manager";
    const subtitle = this.config?.subtitle || "Entry Door Smart Locks";

    const activeSlots = Object.keys(this.hass.states).filter(
      (k) =>
        k.startsWith("input_boolean.lock_code_enabled_") &&
        this.hass.states[k].state === "on"
    ).length;

    return html`
      <div class="view fade-in">
        <div class="header">
          <div>
            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>
          </div>
          <div style="text-align: right;">
            <div class="stats-count">
              ${activeSlots}<span class="divider">/</span>${totalSlots}
            </div>
            <div class="stats-label">Active</div>
          </div>
        </div>

        <div class="grid">
          ${Array.from({ length: totalSlots }, (_, i) =>
            this._renderSlotCard(i + 1, i)
          )}
        </div>
      </div>
    `;
  }

  _renderSlotCard(slot, index) {
    const name = this._getState(`input_text.lock_code_name_${slot}`);
    const pin = this._getState(`input_text.lock_code_pin_${slot}`);
    const enabled =
      this._getState(`input_boolean.lock_code_enabled_${slot}`) === "on";
    const guest = this._getState(
      `input_boolean.lock_guest_mode_enabled_${slot}`,
      "off"
    );
    const timer = this._getState(`timer.lock_code_timer_${slot}`, "idle");
    const isConfigured = (name && name.length > 0) || (pin && pin.length > 0);

    return html`
      <div
        class="slot-card ${enabled ? "enabled" : "disabled"}"
        style="animation-delay: ${index * 0.05}s"
        @click=${() => this._openEdit(slot)}
      >
        <div class="card-header">
          <div class="icon-box ${enabled ? "active" : ""}">
            ${enabled ? Icons.User : Icons.Lock}
          </div>
          <div class="slot-number">#${slot}</div>
        </div>

        <div class="card-body">
          <h3 class="card-title ${enabled || isConfigured ? "active" : ""}">
            ${name || "Empty Slot"}
          </h3>
          <p class="pin-text">${pin ? "••••" : "Not Set"}</p>
        </div>

        <div class="badge-container">
          ${!enabled
            ? html`<span class="badge offline"
                >${isConfigured ? "Disabled" : "Empty"}</span
              >`
            : html`
                <span class="badge success">Active</span>
                ${guest === "on"
                  ? html`<span class="badge warning">${Icons.User} Guest</span>`
                  : ""}
                ${timer === "active"
                  ? html`<span class="badge info">${Icons.Clock} Timer</span>`
                  : ""}
              `}
        </div>
      </div>
    `;
  }

  _renderEdit() {
    const slot = this._editingSlot;

    // Entities
    const enabledEntId = `input_boolean.lock_code_enabled_${slot}`;
    const guestEntId = `input_boolean.lock_guest_mode_enabled_${slot}`;
    const durationEntId = `input_number.lock_code_duration_${slot}`;
    const timerActionEntId = `input_select.lock_timer_action_${slot}`;
    const timerStateEntId = `timer.lock_code_timer_${slot}`;
    const schedEnabledEntId = `input_boolean.lock_schedule_enabled_${slot}`;
    const schedStartEntId = `input_datetime.lock_schedule_start_time_${slot}`;
    const schedEndEntId = `input_datetime.lock_schedule_end_time_${slot}`;

    const isEnabled = this._getState(enabledEntId) === "on";
    const isGuest = this._getState(guestEntId) === "on";
    const isSchedEnabled = this._getState(schedEnabledEntId) === "on";
    const timerState = this._getState(timerStateEntId);

    const schedDaysStr = this._getState(
      `input_text.lock_schedule_days_${slot}`,
      "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday"
    );
    const selectedDays = schedDaysStr ? schedDaysStr.split(",") : [];

    const timerOpts =
      this._getEntity(timerActionEntId)?.attributes?.options || [];

    const scriptEntity = this.config?.manage_script || "script.manage_lock_codes";
    const [domain, service] = scriptEntity.split(".");

    return html`
      <div class="view fade-in">
        <div class="edit-header">
          <button class="back-button" @click=${this._closeEdit}>
            ${Icons.ArrowLeft} Back
          </button>
          <div class="edit-header-right">
            <div class="icon-box active circle">${slot}</div>
            <div style="text-align: right">
              <h2 class="edit-title">Slot ${slot}</h2>
              <span class="edit-status ${isEnabled ? "success" : ""}">
                ${isEnabled ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        <div class="edit-body">
          <!-- Name Input -->
          <div class="input-group">
            <label class="input-label">Name</label>
            <div class="input-wrapper">
              <div class="icon-absolute">${Icons.User}</div>
              <input
                class="custom-input"
                .value=${this._localName}
                @input=${(e) => (this._localName = e.target.value)}
                placeholder="Name this code"
              />
            </div>
          </div>

          <!-- PIN Input -->
          <div class="input-group">
            <label class="input-label">PIN Code</label>
            <div style="display: flex; gap: 12px; align-items: center;">
              <div class="input-wrapper" style="flex: 1;">
                <div class="icon-absolute">${Icons.Key}</div>
                <input
                  class="custom-input pin-input"
                  .value=${this._localPin}
                  @input=${(e) => (this._localPin = e.target.value)}
                  placeholder="••••"
                />
              </div>
              <button class="icon-button" @click=${this._handleGenerate}>
                ${Icons.RefreshCw}
              </button>
            </div>
          </div>

          <!-- Settings Toggles -->
          <div class="settings-list">
            <div
              class="toggle-row"
              @click=${() => this._toggleBoolean(enabledEntId)}
            >
              <div class="toggle-info">
                <div
                  style="color: ${isEnabled
                    ? "var(--primary-color)"
                    : "var(--secondary-text-color)"}"
                >
                  ${isEnabled ? Icons.Unlock : Icons.Lock}
                </div>
                <div>
                  <div class="toggle-title">Enable Slot</div>
                  <div class="toggle-desc">Allow this code to operate lock</div>
                </div>
              </div>
              <div class="toggle-switch ${isEnabled ? "active" : ""}">
                <div class="toggle-knob ${isEnabled ? "active" : ""}"></div>
              </div>
            </div>

            <div
              class="toggle-row no-border"
              @click=${() => this._toggleBoolean(guestEntId)}
            >
              <div class="toggle-info">
                <div
                  style="color: ${isGuest
                    ? "var(--warning-color, #ff9800)"
                    : "var(--secondary-text-color)"}"
                >
                  ${Icons.ShieldAlert}
                </div>
                <div>
                  <div class="toggle-title">Guest Mode</div>
                  <div class="toggle-desc">
                    Turns on "Guest Mode" when code is used
                  </div>
                </div>
              </div>
              <div class="toggle-switch ${isGuest ? "active" : ""}">
                <div class="toggle-knob ${isGuest ? "active" : ""}"></div>
              </div>
            </div>
          </div>

          <!-- Timer Section -->
          ${this._renderSection(
            "timer",
            "Timer",
            Icons.ClockLg,
            html`
              <div class="inline-grid">
                <div class="input-group">
                  <label class="input-label">Duration (Hours)</label>
                  <input
                    type="number"
                    class="custom-input"
                    .value=${this._getState(durationEntId)}
                    @change=${(e) =>
                      this._callService("input_number", "set_value", {
                        entity_id: durationEntId,
                        value: e.target.value,
                      })}
                  />
                </div>
                <div class="input-group">
                  <label class="input-label">Action</label>
                  <select
                    class="custom-select"
                    .value=${this._getState(timerActionEntId)}
                    @change=${(e) =>
                      this._callService("input_select", "select_option", {
                        entity_id: timerActionEntId,
                        option: e.target.value,
                      })}
                  >
                    ${timerOpts.map(
                      (opt) => html`<option value="${opt}">${opt}</option>`
                    )}
                  </select>
                </div>
              </div>
              <button
                class="button-outline"
                style="margin-top: 16px;"
                @click=${() =>
                  this._callService(domain || "script", service || "manage_lock_codes", {
                    action: "set_timed",
                    code_slot: slot.toString(),
                  })}
              >
                ${Icons.Play}
                <span style="margin-left:8px"
                  >${timerState === "active"
                    ? "Timer Active"
                    : "Start Timer"}</span
                >
              </button>
            `
          )}

          <!-- Schedule Section -->
          ${this._renderSection(
            "schedule",
            "Schedule",
            Icons.Calendar,
            html`
              <div
                class="toggle-row no-border no-pad"
                @click=${() => this._toggleBoolean(schedEnabledEntId)}
              >
                <div class="toggle-title">Enable Schedule</div>
                <div class="toggle-switch ${isSchedEnabled ? "active" : ""}">
                  <div
                    class="toggle-knob ${isSchedEnabled ? "active" : ""}"
                  ></div>
                </div>
              </div>

              <div class="input-group">
                <label class="input-label">Active Days</label>
                <div
                  class="day-chips"
                  style="opacity: ${isSchedEnabled ? "1" : "0.5"}"
                >
                  ${this._fullDaysList.map((day, idx) => {
                    const isSel = selectedDays.includes(day);
                    return html`
                      <div
                        class="day-chip ${isSel ? "selected" : ""}"
                        @click=${() => this._toggleDay(day)}
                      >
                        ${this._shortDaysList[idx]}
                      </div>
                    `;
                  })}
                </div>
              </div>

              <div class="inline-grid">
                <div class="input-group">
                  <label class="input-label">Start Time</label>
                  <input
                    type="time"
                    class="custom-input time-input"
                    .value=${this._getState(schedStartEntId).slice(0, 5)}
                    @change=${(e) =>
                      this._callService("input_datetime", "set_datetime", {
                        entity_id: schedStartEntId,
                        time: e.target.value,
                      })}
                    ?disabled=${!isSchedEnabled}
                  />
                </div>
                <div class="input-group">
                  <label class="input-label">End Time</label>
                  <input
                    type="time"
                    class="custom-input time-input"
                    .value=${this._getState(schedEndEntId).slice(0, 5)}
                    @change=${(e) =>
                      this._callService("input_datetime", "set_datetime", {
                        entity_id: schedEndEntId,
                        time: e.target.value,
                      })}
                    ?disabled=${!isSchedEnabled}
                  />
                </div>
              </div>
            `
          )}
        </div>

        <div class="footer-actions">
          <button class="button-danger" @click=${this._handleClear}>
            ${Icons.Trash2} Delete
          </button>
          <button class="button-primary" @click=${this._handleSave}>
            ${Icons.Save} Save
          </button>
        </div>
      </div>
    `;
  }

  _renderSection(key, title, icon, content) {
    const isOpen = this._openSections[key] || false;
    return html`
      <div class="section">
        <div
          class="section-header ${isOpen ? "open" : ""}"
          @click=${() => this._toggleSection(key)}
        >
          <div class="section-title">
            <span style="color: var(--primary-color)">${icon}</span>
            ${title}
          </div>
          <div
            class="section-chevron"
            style="transform: rotate(${isOpen ? "180deg" : "0deg"})"
          >
            ${Icons.ChevronDown}
          </div>
        </div>
        <div
          class="section-content-wrapper"
          style="max-height: ${isOpen ? "500px" : "0px"}; opacity: ${isOpen
            ? "1"
            : "0"}"
        >
          <div class="section-content">${content}</div>
        </div>
      </div>
    `;
  }

  // --- STYLES ---
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .loading {
        color: var(--primary-text-color);
        padding: 20px;
      }
      .container {
        font-family: Roboto, "Segoe UI", sans-serif;
        background-color: var(
          --ha-card-background,
          var(--card-background-color, #fff)
        );
        color: var(--primary-text-color, #212121);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(
          --ha-card-box-shadow,
          0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12),
          0 3px 1px -2px rgba(0, 0, 0, 0.2)
        );
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        position: relative;
        min-height: 400px;
        transition: height 0.3s ease;
      }
      .view {
        padding: 16px;
        width: 100%;
        box-sizing: border-box;
      }
      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 24px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 16px;
      }
      .title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        letter-spacing: -0.01em;
      }
      .subtitle {
        color: var(--secondary-text-color, #757575);
        font-size: 14px;
        margin-top: 4px;
        margin-bottom: 0;
      }
      .stats-count {
        font-size: 24px;
        font-weight: 300;
      }
      .stats-count .divider {
        color: var(--secondary-text-color);
        font-size: 16px;
        margin: 0 4px;
      }
      .stats-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-weight: 500;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
      }
      .slot-card {
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 16px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        animation: slideUp 0.3s cubic-bezier(0, 0, 0.2, 1) forwards;
        display: flex;
        flex-direction: column;
        min-height: 130px;
        position: relative;
        transform: scale(1);
      }
      .slot-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .slot-card.enabled {
        background-color: var(--secondary-background-color, #f5f5f5);
        border: 1px solid var(--divider-color, #e0e0e0);
      }
      .slot-card.enabled:hover {
        border-color: var(--primary-color, #2196f3);
      }
      .slot-card.disabled {
        background-color: transparent;
        border: 1px dashed var(--divider-color, #bdbdbd);
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      .icon-box {
        padding: 8px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        background-color: var(--secondary-background-color, #eee);
        color: var(--disabled-text-color, #bdbdbd);
      }
      .icon-box.active {
        background-color: rgba(var(--rgb-primary-color, 33, 150, 243), 0.1);
        color: var(--primary-color, #2196f3);
      }
      .icon-box.circle {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        padding: 0;
      }
      .slot-number {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color, #757575);
      }
      .card-body {
        margin-bottom: 16px;
      }
      .card-title {
        font-weight: 500;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 0 4px 0;
        color: var(--disabled-text-color, #9e9e9e);
      }
      .card-title.active {
        color: var(--primary-text-color, #212121);
      }
      .pin-text {
        font-size: 14px;
        color: var(--secondary-text-color, #757575);
        font-family: monospace;
        margin: 0;
        letter-spacing: 1px;
      }
      .badge-container {
        display: flex;
        gap: 4px;
        margin-top: auto;
        flex-wrap: wrap;
      }
      .badge {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge svg {
        margin-right: 4px;
      }
      .badge.offline {
        background-color: rgba(0, 0, 0, 0.05);
        color: var(--disabled-text-color, #9e9e9e);
      }
      .badge.success {
        background-color: rgba(var(--rgb-success-color, 76, 175, 80), 0.15);
        color: var(--success-color, #4caf50);
      }
      .badge.warning {
        background-color: rgba(var(--rgb-warning-color, 255, 152, 0), 0.15);
        color: var(--warning-color, #ff9800);
      }
      .badge.info {
        background-color: rgba(var(--rgb-info-color, 33, 150, 243), 0.15);
        color: var(--info-color, #2196f3);
      }

      /* Edit View Styles */
      .edit-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .back-button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        color: var(--primary-text-color);
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        padding: 8px 8px 8px 0;
        transition: opacity 0.2s;
      }
      .back-button:hover {
        opacity: 0.7;
      }
      .edit-header-right {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .edit-title {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }
      .edit-status {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .edit-status.success {
        color: var(--success-color, #4caf50);
      }
      .edit-body {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .input-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--primary-color, #2196f3);
        margin-left: 4px;
      }
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      .icon-absolute {
        position: absolute;
        left: 12px;
        color: var(--secondary-text-color, #757575);
        display: flex;
        z-index: 1;
      }
      .custom-input {
        width: 100%;
        background-color: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color, #212121);
        border: 1px solid var(--divider-color, #bdbdbd);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 16px 16px 16px 44px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s, background-color 0.2s;
      }
      .custom-input:focus {
        border-color: var(--primary-color, #2196f3);
        background-color: var(--card-background-color, #fff);
      }
      .pin-input {
        font-family: monospace;
        letter-spacing: 2px;
      }
      .icon-button {
        background: transparent;
        border: 1px solid var(--divider-color);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color);
        cursor: pointer;
        transition: all 0.2s;
      }
      .icon-button:hover {
        background-color: var(--secondary-background-color);
        color: var(--primary-color);
      }
      .custom-select {
        width: 100%;
        background-color: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color, #212121);
        border: 1px solid var(--divider-color, #bdbdbd);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 16px;
        font-size: 16px;
        outline: none;
        appearance: none;
        box-sizing: border-box;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22gray%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 12px top 50%;
        background-size: 10px;
      }
      .toggle-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background-color: var(--card-background-color, #fff);
        cursor: pointer;
        border-bottom: 1px solid var(--divider-color, #eee);
        transition: background-color 0.2s;
      }
      .toggle-row.no-border {
        border-bottom: none;
      }
      .toggle-row.no-pad {
        padding-left: 0;
        padding-right: 0;
      }
      .toggle-info {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .toggle-title {
        font-size: 16px;
        color: var(--primary-text-color);
      }
      .toggle-desc {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .toggle-switch {
        width: 52px;
        height: 32px;
        background-color: var(--switch-unchecked-track-color, #e7e0ec);
        border: 2px solid var(--switch-unchecked-button-color, #79747e);
        border-radius: 16px;
        position: relative;
        transition: background-color 0.2s ease, border-color 0.2s ease;
        box-sizing: border-box;
      }
      .toggle-switch.active {
        background-color: var(
          --switch-checked-track-color,
          var(--primary-color, #6750a4)
        );
        border-color: var(
          --switch-checked-track-color,
          var(--primary-color, #6750a4)
        );
      }
      .toggle-knob {
        width: 16px;
        height: 16px;
        background-color: var(--switch-unchecked-button-color, #79747e);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 6px;
        transform: translateY(-50%);
        transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
      }
      .toggle-knob.active {
        width: 24px;
        height: 24px;
        background-color: var(--switch-checked-button-color, #ffffff);
        left: calc(100% - 24px - 2px);
      }

      .section {
        background-color: var(--card-background-color, #fff);
        border-radius: var(--ha-card-border-radius, 12px);
        border: 1px solid var(--divider-color, #e0e0e0);
        overflow: hidden;
        margin-top: 8px;
      }
      .section-header {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        background-color: var(--secondary-background-color, #fafafa);
        border-bottom: 1px solid transparent;
      }
      .section-header:hover {
        background-color: var(--secondary-background-color, #eee);
      }
      .section-header.open {
        border-bottom-color: var(--divider-color, #e0e0e0);
      }
      .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .section-chevron {
        color: var(--secondary-text-color);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .section-content-wrapper {
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .section-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .inline-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .time-input {
        padding-left: 16px;
      }

      .day-chips {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .day-chip {
        flex: 1;
        aspect-ratio: 1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        background-color: var(--secondary-background-color, #f5f5f5);
        color: var(--secondary-text-color, #757575);
        border: 1px solid var(--divider-color, #bdbdbd);
        transition: all 0.2s;
      }
      .day-chip.selected {
        background-color: var(--primary-color, #2196f3);
        color: var(--on-primary-color, #fff);
        border-color: var(--primary-color, #2196f3);
      }

      .footer-actions {
        padding: 24px 0;
        display: flex;
        gap: 16px;
      }
      .button-primary,
      .button-danger,
      .button-outline {
        padding: 10px 24px;
        border-radius: 24px;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        flex: 1;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: all 0.2s;
      }
      .button-primary {
        background-color: var(--primary-color, #2196f3);
        color: var(--text-primary-color, #fff);
        border: none;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
          0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      }
      .button-primary:hover {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
          0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
      }
      .button-danger {
        background-color: transparent;
        color: var(--error-color, #f44336);
        border: 1px solid var(--error-color, #f44336);
      }
      .button-danger:hover {
        background-color: rgba(var(--rgb-error-color), 0.1);
      }
      .button-outline {
        background-color: transparent;
        color: var(--primary-color);
        border: 1px solid var(--divider-color);
      }
      .button-outline:hover {
        background-color: rgba(var(--rgb-primary-color), 0.1);
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
  }
}

// --- VISUAL EDITOR ---
class PassableLockManagerCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "title", label: "Card Title", selector: { text: {} } },
      { name: "subtitle", label: "Card Subtitle", selector: { text: {} } },
      {
        name: "slots",
        label: "Number of Code Slots",
        selector: { number: { min: 1, max: 30, mode: "box" } },
      },
      {
        name: "manage_script",
        label: "Manage Lock Codes Script",
        selector: { entity: { domain: "script" } },
      },
    ];
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;
    const newConfig = {
      ...this._config,
      ...ev.detail.value,
    };
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const data = {
      title: this._config.title || "Lock Manager",
      subtitle: this._config.subtitle || "Entry Door Smart Locks",
      slots: this._config.slots !== undefined ? this._config.slots : 10,
      manage_script: this._config.manage_script || "script.manage_lock_codes",
    };

    return html`
      <div style="padding: 0 16px 16px; color: var(--primary-text-color);">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${this._schema}
          .computeLabel=${(s) => s.label || s.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
}

// --- ELEMENT REGISTRATION ---
if (!customElements.get("passable-lock-manager-card-editor")) {
  customElements.define(
    "passable-lock-manager-card-editor",
    PassableLockManagerCardEditor
  );
}
if (!customElements.get("lock-manager-card-editor")) {
  class LegacyLockManagerCardEditor extends PassableLockManagerCardEditor {}
  customElements.define(
    "lock-manager-card-editor",
    LegacyLockManagerCardEditor
  );
}

PassableLockManagerCard.getConfigElement = () =>
  document.createElement("passable-lock-manager-card-editor");

if (!customElements.get("passable-lock-manager-card")) {
  customElements.define(
    "passable-lock-manager-card",
    PassableLockManagerCard
  );
}
if (!customElements.get("lock-manager-card")) {
  class LegacyLockManagerCard extends PassableLockManagerCard {}
  customElements.define("lock-manager-card", LegacyLockManagerCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "passable-lock-manager-card",
  name: "Passable Lock Manager Card",
  preview: true,
  description:
    "Dynamic smart lock PIN code manager card for Home Assistant supporting slot management, temporary timers, guest modes, and schedule controls.",
  documentationURL: "https://github.com/GBear09/passable-lock-manager-card",
});
