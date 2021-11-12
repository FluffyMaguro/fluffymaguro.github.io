// Written by Maguro
// www.maguro.one

var global_created_headers = [];
var global_hotkey_data = {};
var global_current_hotkey = null;

$(document).ready(init_function);

function init_function() {
    process_hotkey_data(global_default_values);
    $(".confirmation .cbtn").click(confirm_button_clicked);
    $("#delbutton").click(del_button_clicked);
    $("#resetbutton").click(reset_hotkey_clicked);
    $("#savebtn").click(parse_and_save_data);
    $("#notebutton").click(show_hide_notes);
};

// Shows or hides notes when a button is clicked
function show_hide_notes() {
    if ($("#notes").css("display") == "none")
        $("#notes").css("display", "block");
    else
        $("#notes").css("display", "none");
};

// Processes parsed hotkey data
function process_hotkey_data(data) {
    // Reset the state
    $("#visualization").text("");
    global_created_headers = [];

    // Load data
    global_hotkey_data = $.extend(true, {}, data); // Deep copy data
    $("#profile_name").val(data["profile"]["name"]);
    let found_commands = {};
    find_commands(data, "", found_commands);
    sort_and_add_commands(found_commands);
    $(".btn").click(hotkey_button_clicked);
    $("#visualization").append(`<div class="classic_keys_div" title="It currently doesn't do anything"><label for="classickeys">Classic keys</label> <input type="checkbox" id="classickeys" name="classickeys"></div>`);
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
    let bg_index = 0;
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
            add_command(command[0], command[1], command[2], key, bg_index++);
    }


    // Check if there were some keys not present in global_header_translation
    for (const key in found_commands) {
        if (!found_commands.hasOwnProperty(key)) continue;
        if (created_headers.includes(key)) continue;
        error_msg(`${key} not present in global_header_translation`);
        found_commands[key].sort();
        for (const command of found_commands[key])
            add_command(command[0], command[1], command[2], key, bg_index++);
    }
}

// Formats hotkey data to a string
function format_hotkey(combo, repeats) {
    let s = fromAOE(combo);
    if (repeats != -1)
        s += ` [x${repeats + 1}]`;
    return s
}

// Adds a command to the window
function add_command(translated_name, name, hotkeys, command_type, bg_index) {
    let keys = ["Empty", "Empty"];
    let classes = ["empty", "empty"];
    for (let i = 0; i < hotkeys.length; i++) {
        if (hotkeys[i]['key']) {
            keys[i] = format_hotkey(hotkeys[i]['key'], hotkeys[i]['repeats'])
            classes[i] = "";
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
    let bg_class = "";
    if (bg_index % 2)
        bg_class = " bg"
    let working = "";
    let title = "";
    if (global_not_working_commands.includes(name)) {
        working = " not_working";
        title = "This command doesn't seem to do anything in-game"
    }

    $("#visualization").append(`<div class="command${bg_class}" title="${title}" data-command="${name}">` +
        `<div class="name${working}">${translated_name}</div>` +
        `<div class="btns"><div class="btn first_button ${classes[0]}">${keys[0]}</div>` +
        `<div class="btn ${classes[1]}">${keys[1]}</div></div></div>`)
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

// Resets the hotkey to its default value
function reset_hotkey_clicked() {
    global_logging = false;

    // Update visual stuff 
    $("#popupdiv").css("display", "none");
    $(".initial").css("display", "block");
    $(".confirmation").css("display", "none");

    // Update global hotkey data
    global_current_hotkey['reset'] = true;
    update_global_hotkey_data();
}

// Sets up hotkey logging and visual change
function hotkey_button_clicked(args) {
    clear_error_msg();
    let command = args['target'].parentNode.parentNode.dataset.command;
    global_current_hotkey = { 'btn': args['target'] };
    global_current_hotkey['command'] = command;
    $(".initial span").text("Press a new key for");
    $(".initial p").text(description(command));
    $(".confirmation span").html(`Confirm the new hotkey for <i>${description(command)}</i>?`);
    $("#popupdiv").css("display", "block");
    // Show/hide remove button
    if (args['target'].classList.contains("empty"))
        $("#delbutton").css("display", "none")
    else
        $("#delbutton").css("display", "inline-block")
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

// Finds a specific command in an object (recursive function)
function find_command_rec(obj, command) {
    if (obj.hasOwnProperty("command")) {
        if (obj["command"] == command)
            return obj;
    }
    let result = null;
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        else if (typeof obj[key] == "object") {
            result = find_command_rec(obj[key], command);
            if (result != null)
                return result
        }
    }
}

// Updates global hotkey data with current hotkey data
function update_global_hotkey_data() {
    let obj = find_command_rec(global_hotkey_data, global_current_hotkey['command']);
    if (obj == null) {
        console.log(`Failed to find command "${global_current_hotkey['command']}""`);
        global_current_hotkey = null;
        return
    }
    // Find button index
    let button_index = 1;
    if (global_current_hotkey['btn'].classList.contains("first_button"))
        button_index = 0;

    // DELETING
    if (global_current_hotkey['delete'] == true) {
        console.log(`Deleting ${obj["command"]} | button: ${button_index}`)
        if (obj["keycombos"].length == 1 && button_index == 1)
            obj["keycombos"] = [];
        else
            obj["keycombos"].splice(button_index, 1);
        global_current_hotkey = null;
        return
    }

    // RESETTING
    if (global_current_hotkey['reset'] == true) {
        console.log(`Resetting ${obj["command"]} | button: ${button_index}`);
        let default_command = find_command_rec(global_default_values, global_current_hotkey['command']);

        // Resetting to empty
        if (default_command["keycombos"][button_index] == null || default_command["keycombos"][button_index]["combo"] == "") {
            global_current_hotkey['btn'].classList.add("empty");
            global_current_hotkey['btn'].innerHTML = "Empty";

            if (obj["keycombos"].length > button_index)
                obj["keycombos"].splice(button_index, 1)
        }
        // Updating with default value
        else {
            if (obj["keycombos"][button_index] != null)
                obj["keycombos"][button_index] = $.extend(true, {}, default_command["keycombos"][button_index])
            else
                obj["keycombos"].push($.extend(true, {}, default_command["keycombos"][button_index]))

            // Updating the button
            global_current_hotkey['btn'].classList.remove("empty");
            let new_text = format_hotkey(obj["keycombos"][button_index]["combo"], obj["keycombos"][button_index]["repeatCount"]);
            global_current_hotkey['btn'].innerHTML = new_text
        }
        global_current_hotkey = null;
        return
    }

    // CHANGING
    let translated = toAOE(global_current_hotkey['key']);
    if (obj["keycombos"].length <= button_index)
        obj["keycombos"].push({ "combo": translated, "repeatCount": global_current_hotkey['repeats'] })
    else
        obj["keycombos"][button_index] = { "combo": translated, "repeatCount": global_current_hotkey['repeats'] }

    console.log(`Updating command for: "${obj["command"]}" | button: ${button_index} | key: ${translated} | repeats: ${global_current_hotkey['repeats']}`);
    global_current_hotkey = null;
}