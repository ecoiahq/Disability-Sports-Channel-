#!/bin/bash

# Remove large directories that shouldn't be in Git
rm -rf node_modules/
rm -rf .next/
rm -rf out/
rm -rf build/
rm -rf dist/
rm -rf .vercel/
rm -rf .sanity/

# Remove log files
find . -name "*.log" -delete
find . -name "npm-debug.log*" -delete
find . -name "yarn-debug.log*" -delete
find . -name "yarn-error.log*" -delete

# Remove OS files
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete

# Remove IDE files
rm -rf .vscode/
rm -rf .idea/

echo "Repository cleaned successfully!"
