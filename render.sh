#!/bin/bash
echo "Running Pandoc and processing attachments..."
python3 process_attachments.py
pandoc ./Report/*.md -o ./Output/report.docx --reference-doc=./Template/template.dotx --lua-filter=./Filters/pagebreak.lua --lua-filter=./Filters/blockquote.lua
echo "Done."
