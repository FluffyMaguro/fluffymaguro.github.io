// Written by Maguro
// www.maguro.one

function error_msg(msg) {
    console.log("ERROR:", msg);
    $("#errordiv").css("display", "block");
    $("#errordiv").text(msg);
};

function clear_error_msg() {
    $("#errordiv").css("display", "none");
};

function file_selected() {
    clear_error_msg();
    if (!window.FileReader) {
        error_msg('Your browser is not supported')
    }
    let files = $('#files').get(0).files;

    // Create a reader object
    let reader = new FileReader();
    if (files.length) {
        let textFile = files[0];
        reader.readAsText(textFile);
        $(reader).on('load', process_hotkey_file);
    } else {
        error_msg('Please choose a hotkey file before continuing')
    }
};

// Checks whether this should be a square bracket
function should_be_square_bracked(i, lines) {
    let next = lines[i + 1];
    let next2 = lines[i + 2];

    if (next == null)
        return false
    else if (next.includes("{"))
        return true;
    else if (next.trim() == "" && next2 != null && next2.includes("{"))
        return true;
    return false;
};

// Removes trailing comma
function remove_trailing_comma(i, lines) {
    if (lines[i].trim().endsWith(",") && lines[i + 1].includes("}"))
        lines[i] = lines[i].replace(",", "");
};


function process_hotkey_file(e) {
    let file = e.target.result,
        results;

    if (file && file.length) {
        const pattern = /.* = /;
        lines = file.split("\n");

        // Let's track how many indexes are we up
        let bracket_count = 0;
        let square_bracket_indexes = [];

        // Lets go over lines
        let i = -1;
        for (const line of lines) {
            i++;
            // Trim and replace "=" with ":"
            if (line.match(pattern)) {
                let splt = line.split(" = ");
                lines[i] = `"${splt[0].trim()}":${splt[1].trim()}`.trim();
            } else
                lines[i] = line.trim();

            // Change brackets to "[" or "]" when necessary
            if (line.includes("{")) {
                bracket_count++;
                if (should_be_square_bracked(i, lines)) {
                    lines[i] = lines[i].replace("{", "[");
                    square_bracket_indexes.push(bracket_count);
                }
            }
            if (line.includes("}")) {
                if (square_bracket_indexes.includes(bracket_count)) {
                    lines[i] = lines[i].replace("}", "]");
                    delete square_bracket_indexes[square_bracket_indexes.indexOf(bracket_count)];
                }
                bracket_count--;
            }
            //Remove trailing commas
            remove_trailing_comma(i, lines);
        }
        // Finalize and switch "{}" to "[]"
        let final = `{${lines.join("")}}`.replace(/{}/g, "[]");
        try {
            process_hotkey_data(JSON.parse(final));
        } catch (err) {
            error_msg(`Failed to parse the hotkey file: ${$('#files').get(0).files[0].name}`);
            console.log(err);
        }
    } else
        error_msg("Failed to process file");
};


// Takes global_hotkey_data, encodes it using LUA syntax, and offers the user to save
function parse_and_save_data() {
    clear_error_msg();
    global_hotkey_data['profile']['name'] = $("#profile_name").val();
    global_hotkey_data['profile']['classicKeys'] = $("#classickeys").is(":checked");
    let content = encode_recursively(global_hotkey_data, 0).slice(1, -1);
    save_data(content);
};

function indent(i) {
    return "\t".repeat(i)
}

// Recursively converts an object using LUA syntax (i = indentation level)
function encode_recursively(obj, i) {
    let result = "";
    for (const key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
        else if (Array.isArray(obj))
            result += `\n${indent(i)}{${encode_recursively(obj[key], i + 1)}\n${indent(i)}},`
        else if (typeof obj[key] == "object")
            result += `\n${indent(i)}${key} = \n${indent(i)}{${indent(i + 1)}${encode_recursively(obj[key], i + 1)}\n${indent(i)}},`
        else if (typeof obj[key] === 'string' || obj[key] instanceof String)
            result += `\n${indent(i)}${key} = "${(obj[key])}",`
        else
            result += `\n${indent(i)}${key} = ${(obj[key])},`
    }
    return result;
};

// Saves data to a file with name based on profile name specified
function save_data(content) {
    let file_name = `${$("#profile_name").val()}.rkp`
    let temp_element = document.createElement("a");
    temp_element.href = window.URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    temp_element.download = file_name;
    temp_element.click();
}