"""
This is a simple module to support templated webpages.

In a html file you can add somewhere: <!-- INCLUDE NAME -->
Where NAME is the name of the html file you want to include. Included files
are stored in `src/includes` as html. In this example if there was a "name.html"
file in src/includes, its contents would get copied after the include statement.

After the webpages were generated, changes would be added to git and then reverted.

"""

import os
from typing import Dict, Set

INCLUDE_FOLDER = "include"
changed_pages = set()


def get_html_files() -> Set:
    """ Returns all valid html files """
    htmls = set()
    for root, _, files in os.walk(os.path.dirname(__file__)):
        for f in files:
            if "\\.git\\" in root or INCLUDE_FOLDER in root:
                continue
            if f.endswith('.html'):
                htmls.add(os.path.join(root, f))
    return htmls


def get_includes() -> Dict[str, str]:
    """ Returns all includes as a dictionary"""
    includes = dict()
    include_path = os.path.join(os.path.dirname(__file__), "src",
                                INCLUDE_FOLDER)
    for f in os.listdir(include_path):
        path = os.path.join(include_path, f)
        with open(path, "r") as fp:
            includes[f.replace('.html', '').lower()] = fp.read().strip()
    return includes


def insert_to_html(html: str, includes: Dict[str, str]):
    """ Inserts includes to a html file"""
    with open(html, 'r') as fp:
        lines = fp.readlines()

    # Find where we will need to insert includes
    where_to_place = dict()
    for i, line in enumerate(lines):
        if "<!-- INCLUDE " in line:
            offset = line.find("<!-- INCLUDE ")
            what = line.replace("<!-- INCLUDE ", "").replace("-->", "")
            what = what.strip().lower()
            where_to_place[i + 1] = (what, offset)

    # Go over the items in reversed order so not to change indexes
    for i, (what, offset) in reversed(where_to_place.items()):
        if not what in includes:
            print(f"Warning! {what} not in includes!")
            continue

        changed_pages.add(html)
        # Insert the include and end tag. Add correct offset for indentation
        lines.insert(i, f"{' '*offset}{includes[what]}")
        lines.insert(i + 1, f"\n{' '*offset}<!-- INCLUDE_END -->\n")

    # Save
    with open(html, 'w') as fp:
        fp.write("".join(lines))


def insert_includes():
    """ Inserts includes to html files"""
    htmls = get_html_files()
    includes = get_includes()
    for html in htmls:
        insert_to_html(html, includes)


def clean_html(html: str):
    """ Removes includes from a html file"""
    with open(html, 'r') as fp:
        lines = fp.readlines()

    where_remove = []
    for i, line in enumerate(lines):
        if "<!-- INCLUDE " in line:
            where_remove.append([i + 1, 0])
        if "<!-- INCLUDE_END -->" in line:
            where_remove[-1][1] = i + 1

    # Remove those intervals. Going in reversed order to preserve indexes
    for start, end in where_remove[::-1]:
        changed_pages.add(html)
        del lines[start:end]

    # Save
    with open(html, 'w') as fp:
        fp.write("".join(lines))


def remove_includes():
    """ Removes includes from html files"""
    htmls = get_html_files()
    for html in htmls:
        clean_html(html)


def main():
    """ Inserts includes, adds changes to git, and removes includes"""
    remove_includes()  # Just to make sure includes aren't there
    insert_includes()
    for html in changed_pages:
        os.system(f"git add {os.path.relpath(html)}")
    remove_includes()


if __name__ == "__main__":
    main()