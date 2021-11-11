// Written by Maguro
// www.maguro.one

var global_keycode_dict = { 61: "=", 173: "-", 169: ")", 8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Ctrl', 18: 'Alt', 19: 'Pause/Break', 20: 'Caps Lock', 32: 'Space', 27: 'Esc', 33: 'Page Up', 34: 'Page Down', 35: 'End', 36: 'Home', 37: '←', 38: '↑', 39: '→', 40: '↓', 45: 'Insert', 46: 'Delete', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z', 91: 'Left WinKey', 92: 'Right WinKey', 93: 'Select', 96: 'NumPad 0', 97: 'NumPad 1', 98: 'NumPad 2', 99: 'NumPad 3', 100: 'NumPad 4', 101: 'NumPad 5', 102: 'NumPad 6', 103: 'NumPad 7', 104: 'NumPad 8', 105: 'NumPad 9', 106: 'NumPad *', 107: 'NumPad +', 109: 'NumPad -', 110: 'NumPad .', 111: 'NumPad /', 112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12', 144: 'Num Lock', 145: 'Scroll Lock', 186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: "'" };
var global_logging = false;
var global_keys = [];

window.onkeydown = function (e) {
    // console.log(e.keyCode, global_keycode_dict[e.keyCode]);
    if (!global_logging || [91, 92].includes(e.keyCode)) // Exclude Left & Right WinKey
        return
    e.preventDefault();
    global_keys.push(global_keycode_dict[e.keyCode])
};

window.addEventListener('mousedown', (event) => {
    // console.log("mousedown:", event, event.button);
    if (!global_logging)
        return
    event.preventDefault();
    if (event.button == 0)
        global_keys.push("MouseLeft")
    else if (event.button == 1)
        global_keys.push("MouseMiddle")
    else if (event.button == 2)
        global_keys.push("MouseRight")
});


// Translate key from AoE syntax
function fromAOE(text) {
    let splt = text.split("+");
    for (const key in global_key_translation) {
        if (global_key_translation.hasOwnProperty(key)) {
            for (const i in splt) {
                if (splt[i] == global_key_translation[key])
                    splt[i] = key
            }
        }
    }
    return splt.join("+")
};

// Translate key to AoE syntax
function toAOE(text) {
    for (const key in global_key_translation) {
        if (global_key_translation.hasOwnProperty(key)) {
            if (text.includes(key))
                text = text.replace(key, global_key_translation[key])
        }
    }
    return text
};

// Normal : AoE4 syntax
var global_key_translation = {
    "→": "Right",
    "↑": "Up",
    "←": "Left",
    "↓": "Down",
    "Ctrl": "Control",
    "Numpad 0": "Numpad0",
    "Numpad 1": "Numpad1",
    "Numpad 2": "Numpad2",
    "Numpad 3": "Numpad3",
    "Numpad 4": "Numpad4",
    "Numpad 5": "Numpad5",
    "Numpad 6": "Numpad6",
    "Numpad 7": "Numpad7",
    "Numpad 8": "Numpad8",
    "Numpad 9": "Numpad9",
    "Numpad +": "NumpadPlus",
    "Numpad -": "NumpadMinus",
    "Numpad *": "NumpadMultiply",
    "Numpad /": "NumpadSlash",
    "Numpad .": "NumpadPeriod",
    "Num Lock": "NumLock",
    "Page Down": "PageDown",
    "Page Up": "PageUp",
    ",": "Comma",
    ".": "Period",
    "/": "Slash",
    "'": "Apostrophe",
    "Esc": "Escape",
    "]": "RBracket",
    "[": "LBracket",
    "`": "Grave",
    "-": "Minus",
    "=": "Equal",
    ";": "Sem   lon",
    "Caps Lock": "CapsLock",
    "\\": "Backslash",
    "Scroll Lock": "ScrollLock",
    "Pause/Break": "Pause"
};

// Header order and translation
var global_header_translation = {
    hud_selection_orders: "Selection",
    camera: "Camera",
    hud_unit_control: "Unit Management",
    hud_control_groups: "Control Groups",
    hud_dynamic_classic: "Communication",
    hud_game: "Game",
    hud_single_player: "Single Player",
    hud_replay: "Replay HUD",
    hud_dynamic_modern: "Grid hotkeys",
    hud_menu: ""
};

// Commands that have no impact in-game
var global_not_working_commands = [
    "screen_pan_down",
    "screen_pan_left",
    "screen_pan_right",
    "screen_pan_up",
    "capture_tool",
    "skip_nis"
];

// Returns a description for given command if there is one
function description(command) {
    if (global_command_translation.hasOwnProperty(command) && global_command_translation[command] != "")
        return global_command_translation[command];
    return command
}

// Command translation
var global_command_translation = {
    default: "Reset camera",
    orbit: "Rotate camera (Hold)",
    pan: "Pan",
    pan_down: "Pan camera down",
    pan_left: "Pan camera left",
    pan_right: "Pan camera right",
    pan_up: "Pan camera up",
    rotate_ccw_45: "Rotate camera 45 degrees counter-clockwise",
    rotate_cw_45: "Rotate camera 45 degrees clockwise",
    screen_pan_down: "Screen pan down",
    screen_pan_left: "Screen pan left",
    screen_pan_right: "Screen pan right",
    screen_pan_up: "Screen pan up",
    hkgroup_focus0: "Focus on control group 0",
    hkgroup_focus1: "Focus on control group 1",
    hkgroup_focus2: "Focus on control group 2",
    hkgroup_focus3: "Focus on control group 3",
    hkgroup_focus4: "Focus on control group 4",
    hkgroup_focus5: "Focus on control group 5",
    hkgroup_focus6: "Focus on control group 6",
    hkgroup_focus7: "Focus on control group 7",
    hkgroup_focus8: "Focus on control group 8",
    hkgroup_focus9: "Focus on control group 9",
    hkgroup_select0: "Select control group 0",
    hkgroup_select1: "Select control group 1",
    hkgroup_select2: "Select control group 2",
    hkgroup_select3: "Select control group 3",
    hkgroup_select4: "Select control group 4",
    hkgroup_select5: "Select control group 5",
    hkgroup_select6: "Select control group 6",
    hkgroup_select7: "Select control group 7",
    hkgroup_select8: "Select control group 8",
    hkgroup_select9: "Select control group 9",
    hkgroup_set0: "Set control group 0",
    hkgroup_set1: "Set control group 1",
    hkgroup_set2: "Set control group 2",
    hkgroup_set3: "Set control group 3",
    hkgroup_set4: "Set control group 4",
    hkgroup_set5: "Set control group 5",
    hkgroup_set6: "Set control group 6",
    hkgroup_set7: "Set control group 7",
    hkgroup_set8: "Set control group 8",
    hkgroup_set9: "Set control group 9",
    down: "Down",
    enter: "Enter",
    focus_event_cue: "Focus on last event",
    page_down: "Scroll chat messages (newer)",
    page_up: "Scroll chat messages (older)",
    ping_attack: "Attack Ping",
    ping_defend: "Defend Ping",
    ping_question: "Notify Ping",
    shift_enter: "[All] Global chat",
    tab: "Tab",
    up: "Up",
    command_card_row01_column01: "Row 1 – Column 1",
    command_card_row01_column02: "Row 1 – Column 2",
    command_card_row01_column03: "Row 1 – Column 3",
    command_card_row01_column04: "Row 1 – Column 4",
    command_card_row01_column05: "Row 1 – Column 5",
    command_card_row02_column01: "Row 2 – Column 1",
    command_card_row02_column02: "Row 2 – Column 2",
    command_card_row02_column03: "Row 2 – Column 3",
    command_card_row02_column04: "Row 2 – Column 4",
    command_card_row02_column05: "Row 2 – Column 5",
    command_card_row03_column01: "Row 3 – Column 1",
    command_card_row03_column02: "Row 3 – Column 2",
    command_card_row03_column03: "Row 3 – Column 3",
    command_card_row03_column04: "Row 3 – Column 4",
    command_card_row03_column05: "Row 3 – Column 5",
    pause_menu: "Game Menu",
    toggle_diplomacy_panel: "Toggle Players & Tribute panel",
    toggle_team_colours: "Toggle team-based or unique player colors",
    toggle_time_display: "Toggle game time display",
    capture_tool: "",
    skip_nis: "",
    faster: "Faster",
    next_player: "View next player",
    previous_player: "View previous player",
    slower: "Slower",
    toggle_camera: "Toggle free camera",
    toggle_fow: "Toggle Fog of War",
    toggle_ui: "Toggle cinematic mode",
    access_secondary_ui_panel: "Access secondary UI panel",
    escape: "Escape",
    select_all_special: "Select all units on screen (Shift: select all units)",
    quick_load: "Quick Load",
    quick_save: "Quick Save",
    focus_selected: "Focus on selected unit(s)",
    follow_selected: "Follow selected unit",
    pick_all_economy_buildings: "Select all economy buildings",
    pick_all_idle_military: "Select all idle military units",
    pick_all_idle_villagers: "Select all idle Villagers",
    pick_all_military: "Select all military units",
    pick_all_military_buildings: "Select all military production buildings",
    pick_all_research_buildings: "Select all technology buildings",
    pick_all_special_buildings: "Select all Landmarks, Wonders, and Capital Town Centers",
    pick_all_villagers: "Select all Villagers",
    pick_next_food_gatherer: "Cycle through Villagers gathering Food",
    pick_next_gold_gatherer: "Cycle through Villagers gathering Gold",
    pick_next_idle_military: "Cycle through idle military units",
    pick_next_idle_worker: "Cycle through idle economic units",
    pick_next_monk: "Cycle through individual religious units",
    pick_next_scout: "Cycle through individual Scout units",
    pick_next_stone_gatherer: "Cycle through Villagers gathering Stone",
    pick_next_town: "Cycle through Town Centers",
    pick_next_wood_gatherer: "Cycle through Villagers gathering Wood",
    return_villagers_to_work: "Return all Villagers to work (from Seek Shelter)",
    select_focus_capital: "Focus on Capital Town Center",
    subselect_next: "Cycle through selected unit types (forward)",
    subselect_previous: "Cycle through selected unit types (reverse)",
};
