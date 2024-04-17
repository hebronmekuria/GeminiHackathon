#!/bin/bash
# Script to convert a PDF to a JPG using ImageMagick

# Check if the correct number of arguments was passed
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <input_pdf>"
    exit 1
fi

# Get the absolute path of the input PDF
input_pdf="$(realpath "$1")"

# Check if the file exists
if [ ! -f "$input_pdf" ]; then
    echo "Error: File does not exist."
    exit 1
fi

# Extract the directory where the PDF is located
input_dir=$(dirname "$input_pdf")
# Extract the base name without the extension
base_name=$(basename "$input_pdf" .pdf)
# Create a directory name with "output" and the base name of the PDF in the same directory as the input PDF
output_dir="${input_dir}/output_${base_name}"

output_jpg="${output_dir}/${base_name}.jpg"

# Create the output directory
mkdir -p "$output_dir"

# Convert the PDF to JPG
convert -density 300 "$input_pdf" -quality 100 "$output_jpg"

# Verify if JPG was created
if [ -f "$output_jpg" ]; then
    echo "Conversion complete: $output_jpg"
else
    # Clean up empty output directory if conversion failed
    rmdir "$output_dir"
fi
