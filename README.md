# Investigation Report Template

This repository contains a generic incident response template. It is permissively licensed and is offered to support the community. The purpose of this template is to help structure and write a report on investigating a cyber incident. It contains guidance on style, content and best practices on ensuring that your report is of high quality and usefulness in your organization.

The report template follows good practices for covering all the important issues that should be addressed when working on a cyber security incident.

Additions, fixes, corrections and enhancements are welcome!

## Usage

### Writing the report

Edit the markdown files in the `Report/` folder using any text editor or markdown-capable tool. The files are numbered to control the order of sections in the final report. Each file contains helper text (shown in green) that guides you through writing that section.

### Viewing the report

The repository includes a browser-based viewer that renders your markdown report with professional styling, a navigable table of contents, and print support. No installation or server is required.

1. Open `index.html` in your browser directly from the repository
2. Drop your `Report/*.md` files onto the page (select all of them at once), or click **Browse files** to select them
   - The files are automatically sorted alphabetically, matching the numbered file naming convention
3. The viewer renders the report with:
   - A **sidebar table of contents** that tracks your scroll position
   - A **Help** toggle to show or hide the green helper/guidance text
   - A **Dark/Light** theme toggle
   - A **Print** button for exporting to PDF

### Exporting to PDF

1. Load your report in the viewer
2. Ensure helper texts are hidden (the Help button in the sidebar should not be active)
3. Click **Print** in the sidebar, or use your browser's print function (Ctrl+P / Cmd+P)
4. Select "Save as PDF" as the destination
5. Review the resulting file for layout and correctness

### Trying it out

Click **Load example report** on the viewer landing page to see a pre-loaded example demonstrating all the template sections and formatting options.

## Project structure

| Path | Description |
|------|-------------|
| `Report/` | Markdown template files (numbered for ordering) |
| `Images/` | Images referenced in the report (logos, screenshots) |
| `Attachments/` | Files to be listed in the attachments section |
| `Diagrams/` | Source files for diagrams (e.g. draw.io) |
| `Documentation/` | Style guide and documentation on writing reports |
| `index.html` | Report viewer entry point (open in browser) |
| `assets/` | Viewer application assets (JS/CSS) |
| `viewer/` | Viewer source code (React/Vite/TypeScript) |

## Developing the viewer

The viewer is a React + TypeScript application built with Vite. To make changes:

```bash
cd viewer
npm install
npm run dev       # Start dev server with hot reload
npm run build     # Build for production
```

After building, copy the output to the repository root:

```bash
cp viewer/dist/index.html .
cp -r viewer/dist/assets .
```
