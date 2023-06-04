#!/usr/bin/env node

const fs = require('fs-extra');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('Ensure there is an empty line at the end of a file')
  .arguments('<file>')
  .action(file => {
    fs.readFile(file, 'utf8')
      .then(content => {
        const trimmedContent = content.trim();
        const lastCharacter = trimmedContent.charAt(trimmedContent.length - 1);

        if (lastCharacter !== '\n') {
          console.error(`Error: Missing empty line at the end of ${file}`);
          process.exit(1);
        } else {
          console.log(`Empty line found at the end of ${file}`);
        }
      })
      .catch(err => {
        console.error(`Error: Failed to read file ${file}`);
        console.error(err);
        process.exit(1);
      });
  });

program.parse(process.argv);

