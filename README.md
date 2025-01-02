# Investigation Report Template

This repository contains a generic incident response template. It is permissively licensed and is offered to support the community. The purpose of this template is to help structure and write a report on investigating a cyber incident. It contains guidance on style, content and best practices on ensuring that your report is of high quality and usefulness in your organization.

The report template follows good practices for covering all the important issues that should be addressed when working on a cyber security incident.

The markdown files are rendered to an HTML output for maximum compatibility. In most cases, the HTML file can be printed out directly. You can edit the CSS filed to match your company visual style.

Additions, fixes, corrections and enhancements are welcome!

Usage:

- Write your report using the template in the `Report/` folder
- Install [pandoc](https://pandoc.org/installing.html)
- Ensure python3 is installed
- Run `./render.sh output/your-report-name.html`
- Review the report for correctness and ensure helper texts are hidden (there's a link for that on the title page)
- Open the resulting self-contained HTML file in a compatible browser, and print to PDF
- Review resulting file for layout and correctness