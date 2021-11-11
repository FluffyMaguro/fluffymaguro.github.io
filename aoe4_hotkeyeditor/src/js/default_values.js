// Written by Maguro
// www.maguro.one

var default_values = {
    "profile": {
        "bindingGroups": {
            "camera": [
                {
                    "command": "pan",
                    "keycombos": [
                        {
                            "combo": "MouseMiddle",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pan_up",
                    "keycombos": [
                        {
                            "combo": "Up",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Alt+W",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "default",
                    "keycombos": [
                        {
                            "combo": "Backspace",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pan_right",
                    "keycombos": [
                        {
                            "combo": "Right",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Alt+D",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "rotate_cw_45",
                    "keycombos": [
                        {
                            "combo": "RBracket",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "screen_pan_right",
                    "keycombos": []
                },
                {
                    "command": "screen_pan_left",
                    "keycombos": []
                },
                {
                    "command": "orbit",
                    "keycombos": [
                        {
                            "combo": "Alt",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "screen_pan_down",
                    "keycombos": []
                },
                {
                    "command": "pan_left",
                    "keycombos": [
                        {
                            "combo": "Left",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Alt+A",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "rotate_ccw_45",
                    "keycombos": [
                        {
                            "combo": "LBracket",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "screen_pan_up",
                    "keycombos": []
                },
                {
                    "command": "pan_down",
                    "keycombos": [
                        {
                            "combo": "Down",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Alt+S",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_control_groups": [
                {
                    "command": "hkgroup_focus7",
                    "keycombos": [
                        {
                            "combo": "7",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad7",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select7",
                    "keycombos": [
                        {
                            "combo": "7",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad7",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus3",
                    "keycombos": [
                        {
                            "combo": "3",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad3",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set8",
                    "keycombos": [
                        {
                            "combo": "Control+8",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad8",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set0",
                    "keycombos": [
                        {
                            "combo": "Control+0",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad0",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select2",
                    "keycombos": [
                        {
                            "combo": "2",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad2",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_select4",
                    "keycombos": [
                        {
                            "combo": "4",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad4",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_set9",
                    "keycombos": [
                        {
                            "combo": "Control+9",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad9",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set7",
                    "keycombos": [
                        {
                            "combo": "Control+7",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad7",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set6",
                    "keycombos": [
                        {
                            "combo": "Control+6",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad6",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select9",
                    "keycombos": [
                        {
                            "combo": "9",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad9",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_set5",
                    "keycombos": [
                        {
                            "combo": "Control+5",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad5",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set1",
                    "keycombos": [
                        {
                            "combo": "Control+1",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad1",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus5",
                    "keycombos": [
                        {
                            "combo": "5",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad5",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set4",
                    "keycombos": [
                        {
                            "combo": "Control+4",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad4",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus0",
                    "keycombos": [
                        {
                            "combo": "0",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad0",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_set3",
                    "keycombos": [
                        {
                            "combo": "Control+3",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad3",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select5",
                    "keycombos": [
                        {
                            "combo": "5",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad5",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_select1",
                    "keycombos": [
                        {
                            "combo": "1",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad1",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_set2",
                    "keycombos": [
                        {
                            "combo": "Control+2",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Control+Numpad2",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus9",
                    "keycombos": [
                        {
                            "combo": "9",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad9",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus8",
                    "keycombos": [
                        {
                            "combo": "8",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad8",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus4",
                    "keycombos": [
                        {
                            "combo": "4",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad4",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus6",
                    "keycombos": [
                        {
                            "combo": "6",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad6",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select8",
                    "keycombos": [
                        {
                            "combo": "8",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad8",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_select6",
                    "keycombos": [
                        {
                            "combo": "6",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad6",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus1",
                    "keycombos": [
                        {
                            "combo": "1",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad1",
                            "repeatCount": 1
                        }
                    ]
                },
                {
                    "command": "hkgroup_select0",
                    "keycombos": [
                        {
                            "combo": "0",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad0",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_select3",
                    "keycombos": [
                        {
                            "combo": "3",
                            "repeatCount": 0
                        },
                        {
                            "combo": "Numpad3",
                            "repeatCount": 0
                        }
                    ]
                },
                {
                    "command": "hkgroup_focus2",
                    "keycombos": [
                        {
                            "combo": "2",
                            "repeatCount": 1
                        },
                        {
                            "combo": "Numpad2",
                            "repeatCount": 1
                        }
                    ]
                }
            ],
            "hud_dynamic_classic": [
                {
                    "command": "shift_enter",
                    "keycombos": [
                        {
                            "combo": "Shift+Enter",
                            "repeatCount": -1
                        },
                        {
                            "combo": "Backslash",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "up",
                    "keycombos": [
                        {
                            "combo": "Up",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "ping_defend",
                    "keycombos": [
                        {
                            "combo": "Control+T",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "ping_question",
                    "keycombos": [
                        {
                            "combo": "Control+E",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "ping_attack",
                    "keycombos": [
                        {
                            "combo": "Control+R",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "page_down",
                    "keycombos": [
                        {
                            "combo": "PageDown",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "tab",
                    "keycombos": [
                        {
                            "combo": "Tab",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "down",
                    "keycombos": [
                        {
                            "combo": "Down",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "focus_event_cue",
                    "keycombos": [
                        {
                            "combo": "Space",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "page_up",
                    "keycombos": [
                        {
                            "combo": "PageUp",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "enter",
                    "keycombos": [
                        {
                            "combo": "Enter",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_dynamic_modern": [
                {
                    "command": "command_card_row01_column01",
                    "keycombos": [
                        {
                            "combo": "Q",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row03_column05",
                    "keycombos": [
                        {
                            "combo": "Delete",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row01_column03",
                    "keycombos": [
                        {
                            "combo": "E",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row03_column03",
                    "keycombos": [
                        {
                            "combo": "C",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row03_column04",
                    "keycombos": [
                        {
                            "combo": "V",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row03_column02",
                    "keycombos": [
                        {
                            "combo": "X",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row02_column03",
                    "keycombos": [
                        {
                            "combo": "D",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row01_column05",
                    "keycombos": [
                        {
                            "combo": "T",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row02_column01",
                    "keycombos": [
                        {
                            "combo": "A",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row02_column02",
                    "keycombos": [
                        {
                            "combo": "S",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row03_column01",
                    "keycombos": [
                        {
                            "combo": "Z",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row01_column04",
                    "keycombos": [
                        {
                            "combo": "R",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row02_column05",
                    "keycombos": [
                        {
                            "combo": "G",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row01_column02",
                    "keycombos": [
                        {
                            "combo": "W",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "command_card_row02_column04",
                    "keycombos": [
                        {
                            "combo": "F",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_game": [
                {
                    "command": "toggle_time_display",
                    "keycombos": [
                        {
                            "combo": "F11",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "toggle_diplomacy_panel",
                    "keycombos": [
                        {
                            "combo": "F6",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "toggle_team_colours",
                    "keycombos": [
                        {
                            "combo": "Insert",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pause_menu",
                    "keycombos": [
                        {
                            "combo": "F10",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_menu": [
                {
                    "command": "skip_nis",
                    "keycombos": [
                        {
                            "combo": "Escape",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "capture_tool",
                    "keycombos": [
                        {
                            "combo": "Shift+Grave",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_replay": [
                {
                    "command": "next_player",
                    "keycombos": [
                        {
                            "combo": "Control+RBracket",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "toggle_camera",
                    "keycombos": [
                        {
                            "combo": "Control+C",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "previous_player",
                    "keycombos": [
                        {
                            "combo": "Control+LBracket",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "toggle_ui",
                    "keycombos": [
                        {
                            "combo": "Control+U",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "toggle_fow",
                    "keycombos": [
                        {
                            "combo": "Control+F",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "slower",
                    "keycombos": [
                        {
                            "combo": "Minus",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "faster",
                    "keycombos": [
                        {
                            "combo": "Equal",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_selection_orders": [
                {
                    "command": "access_secondary_ui_panel",
                    "keycombos": [
                        {
                            "combo": "Y",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "select_all_special",
                    "keycombos": [
                        {
                            "combo": "Control+A",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "escape",
                    "keycombos": [
                        {
                            "combo": "Escape",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_single_player": [
                {
                    "command": "quick_load",
                    "keycombos": [
                        {
                            "combo": "F9",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "quick_save",
                    "keycombos": [
                        {
                            "combo": "F8",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                }
            ],
            "hud_unit_control": [
                {
                    "command": "pick_next_idle_worker",
                    "keycombos": [
                        {
                            "combo": "Period",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "follow_selected",
                    "keycombos": [
                        {
                            "combo": "Home",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_research_buildings",
                    "keycombos": [
                        {
                            "combo": "F3",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_idle_military",
                    "keycombos": [
                        {
                            "combo": "Control+Comma",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_monk",
                    "keycombos": [
                        {
                            "combo": "Apostrophe",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "focus_selected",
                    "keycombos": [
                        {
                            "combo": "F5",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_stone_gatherer",
                    "keycombos": [
                        {
                            "combo": "Control+S",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_villagers",
                    "keycombos": [
                        {
                            "combo": "Control+Shift+V",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_scout",
                    "keycombos": [
                        {
                            "combo": "Slash",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_town",
                    "keycombos": [
                        {
                            "combo": "H",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "subselect_previous",
                    "keycombos": [
                        {
                            "combo": "Control+Tab",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_special_buildings",
                    "keycombos": [
                        {
                            "combo": "F4",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_wood_gatherer",
                    "keycombos": [
                        {
                            "combo": "Control+W",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "return_villagers_to_work",
                    "keycombos": [
                        {
                            "combo": "Control+Shift+R",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_economy_buildings",
                    "keycombos": [
                        {
                            "combo": "F2",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_gold_gatherer",
                    "keycombos": [
                        {
                            "combo": "Control+G",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "subselect_next",
                    "keycombos": [
                        {
                            "combo": "Tab",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_military_buildings",
                    "keycombos": [
                        {
                            "combo": "F1",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_military",
                    "keycombos": [
                        {
                            "combo": "Control+Shift+C",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_idle_military",
                    "keycombos": [
                        {
                            "combo": "Comma",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_next_food_gatherer",
                    "keycombos": [
                        {
                            "combo": "Control+F",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "pick_all_idle_villagers",
                    "keycombos": [
                        {
                            "combo": "Control+Period",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                },
                {
                    "command": "select_focus_capital",
                    "keycombos": [
                        {
                            "combo": "Control+H",
                            "repeatCount": -1
                        },
                        {
                            "combo": "",
                            "repeatCount": -1
                        }
                    ]
                }
            ]
        },
        "classicKeys": false,
        "name": "NewProfile"
    }
}