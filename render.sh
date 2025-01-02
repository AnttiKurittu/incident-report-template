#!/bin/bash
echo "Running Pandoc and processing attachments..."
current_date=$(date +"%Y-%m-%d %H:%M:%S")
python3 process_attachments.py
pandoc ./Report/*.md -o ${1:-./output/report.html} --css=./css/style-light.css --embed-resources --standalone --metadata title=" " --toc
file_hash=$(sha256sum "${1:-./output/report.html}" | cut -d ' ' -f 1)
echo "$current_date Document rendered to ${1:-./output/report.html} with file checksum $file_hash" >> render.log
echo "Wrote the report to ${1:-./output/report.html}."
