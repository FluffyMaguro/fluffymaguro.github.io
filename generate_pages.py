import os
from typing import Dict


def get_html_files() -> set:
    htmls = set()
    for root, directories, files in os.walk(os.path.dirname(__file__)):
        for f in files:
            if "\\.git\\" in root or "include" in root:
                continue
            if f.endswith('.html'):
                htmls.add(os.path.join(root, f))
    return htmls


def get_includes() -> Dict[str, str]:
    includes = dict()
    for f in os.listdir(os.path.join(os.path.dirname(__file__), "include")):
        path = os.path.join(os.path.dirname(__file__), "include", f)
        with open(path, "r") as fp:
            includes[f.replace('.html', '').lower()] = fp.read()
    return includes


def insert_includes():
    htmls = get_html_files()
    includes = get_includes()

    for html in htmls:
        with open(html, 'r') as fp:
            lines = fp.readlines()

        where_to_place = dict()  # Save where we will be placing stuff
        for i, line in enumerate(lines):
            if "<!-- INCLUDE " in line:
                what = line.replace("<!-- INCLUDE ",
                                    "").replace("-->", "").strip().lower()
                where_to_place[i + 1] = what


insert_includes()