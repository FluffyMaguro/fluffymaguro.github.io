// Written by Maguro
// www.maguro.one

var global_created_headers = [];
var global_hotkey_data = {};
var global_current_hotkey = null;

$(document).ready(init_function);

function init_function() {
    process_hotkey_data(default_values);
    $(".cbtn").click(confirm_button_clicked);
    $("#delbutton").click(del_button_clicked);
    $("#savebtn").click(parse_and_save_data);
    $("#notebutton").click(show_hide_notes);
};

// Shows or hides notes when a button is clicked
function show_hide_notes() {
    if ($("#notes").css("display") == "none") {
        $("#notes").css("display", "block");
        $("#notebutton span").text("︽ ︽")
        $("#notebutton span").css("top", "0px")
    } else {
        $("#notes").css("display", "none");
        $("#notebutton span").text("︾ ︾");
        $("#notebutton span").css("top", "11px")
    }
};

// Processes parsed hotkey data
function process_hotkey_data(data) {
    // Reset the state
    $("#visualization").text("");
    global_created_headers = [];

    // Load data
    global_hotkey_data = data;
    $("#profile_name").val(data["profile"]["name"]);
    let found_commands = {};
    find_commands(data, "", found_commands);
    sort_and_add_commands(found_commands);
    $(".btn").click(hotkey_button_clicked);
};

// Finds commands inside a parsed hotkey data
function find_commands(data, command_type, found_commands) {
    // We might have reached a command
    if (data.hasOwnProperty("command")) {
        let hotkeys = [];
        for (const key of data["keycombos"])
            hotkeys.push({ "key": key["combo"], "repeats": key["repeatCount"] })

        if (!found_commands.hasOwnProperty(command_type))
            found_commands[command_type] = []

        // Save commmand
        found_commands[command_type].push([description(data["command"]), data["command"], hotkeys]);
        return;
    }

    // Or iterate inside objects
    for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;

        else if (typeof data[key] == "object") {
            if (!Array.isArray(data))
                command_type = key;
            find_commands(data[key], command_type, found_commands)
        }
    }
};

// Sorts found commands and adds them to the page
function sort_and_add_commands(found_commands) {
    let created_headers = [];
    // First create headers in order specified in global_header_translation
    for (const key in global_header_translation) {
        if (!global_header_translation.hasOwnProperty(key)) continue;
        if (!found_commands.hasOwnProperty(key)) {
            error_msg(`Didn't find ${key} in found_commands`);
            continue
        }
        created_headers.push(key);
        found_commands[key].sort();
        for (const command of found_commands[key])
            add_command(command[0], command[1], command[2], key);
    }

    // Check if there were some keys not present in global_header_translation
    for (const key in found_commands) {
        if (!found_commands.hasOwnProperty(key)) continue;
        if (created_headers.includes(key)) continue;
        error_msg(`${key} not present in global_header_translation`);
        found_commands[key].sort();
        for (const command of found_commands[key])
            add_command(command[0], command[1], command[2], key);
    }
}

// Adds a command to the window
function add_command(translated_name, name, hotkeys, command_type) {
    let keys = ["Empty", "Empty"];
    let classes = ["empty", "empty"];
    for (let i = 0; i < hotkeys.length; i++) {
        if (hotkeys[i]['key']) {
            keys[i] = fromAOE(hotkeys[i]['key']);
            classes[i] = "";
            if (hotkeys[i]['repeats'] != -1)
                keys[i] += ` [x${hotkeys[i]['repeats'] + 1}]`;
        }
    }
    // Create a header if necessary
    if (!global_created_headers.includes(command_type)) {
        global_created_headers.push(command_type);
        let translated_header = command_type;
        if (global_header_translation.hasOwnProperty(command_type) && global_header_translation[command_type] != "")
            translated_header = global_header_translation[command_type];
        $("#visualization").append(`<div class="header">${translated_header.toUpperCase()}</div>`)
    }

    // Add command
    let working = "";
    let title = "";
    if (global_not_working_commands.includes(name)) {
        working = " not_working";
        title = "This command doesn't seem to do anything in-game"
    }

    $("#visualization").append(`<div class="command" title="${title}" data-command="${name}">
                        <div class="name${working}">${translated_name}</div>
                        <div class="btn first_button ${classes[0]}">${keys[0]}</div>
                        <div class="btn ${classes[1]}">${keys[1]}</div>
                        </div>`);
};

// When clicked button to delete a hotkey
function del_button_clicked() {
    global_logging = false;

    // Update visual stuff 
    $("#popupdiv").css("display", "none");
    $(".initial").css("display", "block");
    $(".confirmation").css("display", "none");
    global_current_hotkey['btn'].classList.add("empty");
    global_current_hotkey['btn'].innerHTML = "Empty";

    // Update global hotkey data
    global_current_hotkey['delete'] = true;
    update_global_hotkey_data();
};

// Sets up hotkey logging and visual change
function hotkey_button_clicked(args) {
    clear_error_msg();
    let command = args['target'].parentNode.dataset.command;
    global_current_hotkey = { 'btn': args['target'] };
    global_current_hotkey['command'] = command;
    $(".initial span").text("Press a new key for");
    $(".initial p").text(description(command));
    $(".confirmation span").text(`Confirm the hotkey for "${description(command)}"?`);
    $("#popupdiv").css("display", "block");
    // Show/hide remove button
    if (args['target'].classList.contains("empty"))
        $("#delbutton").css("display", "none")
    else
        $("#delbutton").css("display", "block")
    global_logging = true;
    global_keys = [];
    setTimeout(key_check_continuous, 1000);
};

// Continous check while logging key presses
function key_check_continuous() {
    if (global_current_hotkey == null) return;

    if (global_keys.includes("Esc")) {
        $("#popupdiv").css("display", "none");
        global_logging = false;
    }
    else if (global_keys.length > 0)
        setTimeout(key_logging_finished, 200);
    else
        setTimeout(key_check_continuous, 200);
};

function key_logging_finished() {
    if (global_current_hotkey == null) return;
    global_logging = false;

    // Get how many times hotkey repeated (minimum of repeated hotkeys)
    let count = 0;
    let repeats = 10;
    for (const item of global_keys) {
        count = global_keys.filter(x => x === item).length;
        if (count < repeats)
            repeats = count;
    }
    repeats -= 1;

    // Put modifiers first
    let modifiers = [];
    let normal = [];
    let mouse_buttons = [];
    for (const item of new Set(global_keys)) {
        if (["Ctrl", "Alt", "Shift"].includes(item))
            modifiers.push(item)
        else if (["MouseLeft", "MouseMiddle", "MouseRight"].includes(item))
            mouse_buttons.push(item)
        else if (normal.length == 0)
            normal.push(item)
    }

    modifiers.sort();
    normal.sort();
    let key = (modifiers.concat(normal).concat(mouse_buttons)).join("+");
    global_current_hotkey['key'] = key;
    global_current_hotkey['repeats'] = repeats;
    if (repeats > 0)
        key += ` [x${repeats + 1}]`
    else
        global_current_hotkey['repeats'] = -1

    // Add notes
    let notes = "";
    if (global_not_working_commands.includes(global_current_hotkey['command']))
        notes += "– This command doesn't seem to do anything in-game<br>"
    if (normal.length == 0 && modifiers.length > 0)
        notes += "– Modifiers without normal keys might work only in special cases like camera control<br>"
    if (mouse_buttons.length > 0)
        notes += "– Mouse buttons might work only in some cases like camera control"

    global_current_hotkey['text'] = key;
    $(".confirmation p").text(key);
    $("#confirm_notes").html(notes);
    $(".initial").css("display", "none");
    $(".confirmation").css("display", "block");
};

function confirm_button_clicked(args) {
    let confirmed = args['target'].classList.contains("yes");
    // Reset stuff
    $("#popupdiv").css("display", "none");
    $(".initial").css("display", "block");
    $(".confirmation").css("display", "none");

    if (confirmed) {
        global_current_hotkey['btn'].innerHTML = global_current_hotkey['text'];
        global_current_hotkey['btn'].classList.remove("empty");
        update_global_hotkey_data()
    }
};

// Updates global hotkey data with current hotkey data
function update_global_hotkey_data() {
    find_and_update_command(global_hotkey_data);
};

// Find a specific command in global data and updates it (recursive function)
function find_and_update_command(obj) {
    if (global_current_hotkey == null) return;

    if (obj.hasOwnProperty("command")) {
        if (obj["command"] == global_current_hotkey["command"]) {
            // Update global datastructure
            let button_index = 1;
            if (global_current_hotkey['btn'].classList.contains("first_button"))
                button_index = 0;

            // If we are deleting
            if (global_current_hotkey['delete'] == true) {
                console.log(`Deleting ${obj["command"]} | button-idx: ${button_index}`)
                if (obj["keycombos"].length == 1 && button_index == 1)
                    obj["keycombos"] = [];
                else
                    obj["keycombos"].splice(button_index, 1);
                global_current_hotkey = null;
                return
            }

            // Changing command
            let translated = toAOE(global_current_hotkey['key']);
            if (obj["keycombos"].length < button_index + 1)
                obj["keycombos"].push({ "combo": translated, "repeatCount": global_current_hotkey['repeats'] })
            else
                obj["keycombos"][button_index] = { "combo": translated, "repeatCount": global_current_hotkey['repeats'] }

            console.log(`Updating command for: "${obj["command"]}" | button-idx: ${button_index} | key: ${translated} | repeats: ${global_current_hotkey['repeats']}`);
            // This ends other branches
            global_current_hotkey = null;
        }
        return
    }
    for (const key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        else if (typeof obj[key] == "object")
            find_and_update_command(obj[key])
    }
}