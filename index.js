#!/usr/bin/env node

const fs = require('fs-extra');
const { program } = require('commander');

program
  .version('1.0.4')
  .description('Ensure there is an empty line at the end of a file')
  .arguments('<files...>')
  .action((files) => {
    let hasError = false;
    
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        const lastLine = lines[lines.length - 1];
        
        if (lastLine.length === 0) {
          console.log(`Empty line found at the end of ${file}`);
        } else {
          console.error(`Error: Missing empty line at the end of ${file}`);
          hasError = true;
        }
      } catch (err) {
        console.error(`Error: Failed to read file ${file}`);
        console.error(err);
        hasError = true;
      }
    });
    
    if (hasError) {
      process.exit(1);
    }
  });

program.parse(process.argv);
