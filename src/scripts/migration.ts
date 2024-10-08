// migration.ts
import { execSync } from 'child_process';

// Get the command type and any additional arguments passed
const commandType = process.argv[2]; // 'generate', 'create', 'show', 'run', 'revert'
const migrationName = process.argv[3]; // For 'generate' and 'create'

let command: string;

switch (commandType) {
  case 'generate':
    if (!migrationName) {
      console.error('Please provide a migration name for generate.');
      process.exit(1);
    }
    command = `npx typeorm-ts-node-commonjs -d ./src/database/data-source.ts migration:generate ./src/migrations/${migrationName}`;
    break;

  case 'create':
    if (!migrationName) {
      console.error('Please provide a migration name for create.');
      process.exit(1);
    }
    command = `npx typeorm-ts-node-commonjs -d ./src/database/data-source.ts migration:create ./src/migrations/${migrationName}`;
    break;

  case 'show':
    command = `npx typeorm-ts-node-commonjs -d ./src/database/data-source.ts migration:show`;
    break;

  case 'run':
    command = `npx typeorm-ts-node-commonjs -d ./src/database/data-source.ts migration:run`;
    break;

  case 'revert':
    command = `npx typeorm-ts-node-commonjs -d ./src/database/data-source.ts migration:revert`;
    break;

  default:
    console.error(
      'Invalid command type. Use "generate", "create", "show", "run", or "revert".',
    );
    process.exit(1);
}

// Execute the command
execSync(command, { stdio: 'inherit' });
