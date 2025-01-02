#!/bin/bash
echo "Running Pandoc and processing attachments..."
python3 process_attachments.py
pandoc ./Report/*.md -o ${1:-./output/report.html} --css=./css/style-light.css --embed-resources --standalone --metadata title=" " --toc
echo "$(date +"%Y-%m-%d %H:%M:%S") Document rendered to ${1:-./output/report.html} with file checksum $(sha256sum "${1:-./output/report.html}" | cut -d ' ' -f 1)" >> render.log
echo "Wrote the report to ${1:-./output/report.html}."
