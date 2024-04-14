#!/bin/bash
# Script to convert a PDF to a JPG using ImageMagick

# Check if the correct number of arguments was passed
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <input_pdf>"
    exit 1
fi

input_pdf="$1"
# Extract the base name without the extension
base_name=$(basename "$input_pdf" .pdf)
# Create a directory name with "output" and the base name of the PDF
output_dir="output_${base_name}"

output_jpg="${output_dir}/${base_name}.jpg"

# Create the output directory
mkdir -p "$output_dir"

# Convert the PDF to JPG
convert -density 300 "$input_pdf" -quality 100 "$output_jpg"

echo "Conversion complete: $output_jpg"
