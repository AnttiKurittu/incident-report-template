import os
import hashlib

# Path to the directory with the attachments
attachments_dir = './Attachments'
# Path to the output markdown file
report_path = './Report/6 Attachments.md'

# Function to calculate SHA-256 checksum of a file
def calculate_sha256(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        # Read and update hash string value in blocks of 4K
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

# Function to generate the markdown content with the required format
def generate_markdown_content(files_data):
    content = "# 6 Attachments\n\n"
    
    for file_data in files_data:
        content += f"**File name**: `{file_data['name']}`\\\n"
        content += f"**File size**: `{file_data['size']}`\\\n"
        content += f"**File hash**: `{file_data['checksum']}`\n\n"
    
    return content

# Function to scan files and generate the report
def generate_report():
    if not os.path.exists(attachments_dir):
        print(f"Directory '{attachments_dir}' does not exist.")
        return

    files_data = []

    # Iterate through files in the attachments folder
    for filename in os.listdir(attachments_dir):
        file_path = os.path.join(attachments_dir, filename)

        # Ignore files that start with a period (hidden files)
        if filename.startswith("."):
            continue

        if os.path.isfile(file_path):  # Only process files (skip directories)
            file_size = os.path.getsize(file_path)
            file_checksum = calculate_sha256(file_path)
            files_data.append({'name': filename, 'size': file_size, 'checksum': file_checksum})

    if files_data:
        markdown_content = generate_markdown_content(files_data)

        # Write the markdown content to the file
        os.makedirs(os.path.dirname(report_path), exist_ok=True)
        with open(report_path, 'w') as f:
            f.write(markdown_content)
        print(f"Report written to {report_path}")
    else:
        print("No files found in the directory.")

# Run the report generation
if __name__ == "__main__":
    generate_report()
