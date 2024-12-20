# Investigation Report Template

This repository contains a generic incident response template. It is permissively licensed and is offered to support the community. The purpose of this template is to help structure and write a report on investigating a cyber incident. It contains guidance on style, content and best practices on ensuring that your report is of high quality and usefulness in your organization.

The report template follows good practices for covering all the important issues that should be addressed when working on a cyber security incident.

Additions, fixes, corrections and enhancements are welcomed.

Usage:

- Write your report using the template in the `Report/` folder
- Install `[pandoc](https://pandoc.org/installing.html)`
- Run `render.sh`
- Report in Word format will be rendered in the `Output` folder

Known issues:
- Lua filter for applying styles to tables and code, both inline and blocks, isn't working. We had a long discussion about this with ChatGPT but I'm starting to think that guy doesn't really know Pandoc and Lua either...