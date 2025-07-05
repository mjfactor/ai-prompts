#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

program
    .name('ai-prompts')
    .description('AI coding assistant prompt instructions for multiple programming languages')
    .version('1.1.0');

// Language configurations
const LANGUAGE_CONFIGS = {
    'react-nextjs-shadcn': {
        name: 'React/Next.js with shadcn/ui',
        description: 'Modern React development with Next.js, TypeScript, TailwindCSS, and shadcn/ui',
        filename: 'web-react-shadcn.instructions.md',
        outputName: 'prompt.instructions.md'
    }
    // Additional languages will be added here when provided
};

const getAvailableLanguages = () => {
    return Object.keys(LANGUAGE_CONFIGS).map(key => ({
        name: LANGUAGE_CONFIGS[key].name,
        value: key,
        description: LANGUAGE_CONFIGS[key].description
    }));
};

program
    .command('init')
    .description('Initialize AI prompt instructions in current project')
    .option('-l, --language <language>', 'specify programming language/framework')
    .option('-f, --force', 'overwrite existing files')
    .action(async (options) => {
        try {
            const cwd = process.cwd();
            const githubDir = path.join(cwd, '.github');
            const instructionsDir = path.join(githubDir, 'instructions');

            // Create directories if they don't exist
            await fs.ensureDir(instructionsDir);

            let selectedLanguage = options.language;            // If no language specified, show interactive selection
            if (!selectedLanguage) {
                const availableLanguages = getAvailableLanguages();

                if (availableLanguages.length === 0) {
                    console.log(chalk.red('❌ No language templates available.'));
                    process.exit(1);
                }

                // Welcome message
                console.log(chalk.blue('🚀 Welcome to AI Prompt Instructions!'));
                console.log(chalk.gray('Use ↑↓ arrow keys to navigate, Enter to select\n'));

                const answers = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'language',
                        message: 'Choose a programming language/framework:',
                        choices: availableLanguages.map(lang => ({
                            name: `${chalk.cyan('📋')} ${chalk.bold(lang.name)}\n    ${chalk.gray(lang.description)}`,
                            value: lang.value,
                            short: lang.name
                        })),
                        pageSize: 10,
                        default: 0,
                        loop: false
                    }
                ]);

                selectedLanguage = answers.language;
            }

            // Validate language selection
            if (!LANGUAGE_CONFIGS[selectedLanguage]) {
                console.log(chalk.red(`❌ Unknown language: ${selectedLanguage}`));
                console.log(chalk.blue('Available languages:'));
                getAvailableLanguages().forEach(lang => {
                    console.log(chalk.gray(`  • ${lang.value}: ${lang.name}`));
                });
                process.exit(1);
            }

            const config = LANGUAGE_CONFIGS[selectedLanguage];
            const templateDir = path.join(__dirname, '..', 'templates');
            const promptFile = path.join(instructionsDir, config.outputName);
            const templateFile = path.join(templateDir, config.filename);

            if (await fs.pathExists(promptFile) && !options.force) {
                console.log(chalk.yellow('⚠️  Prompt instructions already exist. Use --force to overwrite.'));
                return;
            }

            if (!await fs.pathExists(templateFile)) {
                console.log(chalk.red(`❌ Template file not found: ${config.filename}`));
                process.exit(1);
            }

            await fs.copy(templateFile, promptFile);

            console.log(chalk.green('✅ Successfully initialized AI prompt instructions!'));
            console.log(chalk.blue(`📁 Created: .github/instructions/${config.outputName}`));
            console.log(chalk.blue(`🎯 Language: ${config.name}`));
            console.log(chalk.gray('💡 These instructions will be automatically used by GitHub Copilot'));

        } catch (error) {
            console.error(chalk.red('❌ Error initializing prompt instructions:'), error.message);
            process.exit(1);
        }
    });

program
    .command('copy')
    .description('Copy instruction files to current project')
    .option('-l, --language <language>', 'specify programming language/framework')
    .option('-d, --destination <path>', 'destination directory', '.github/instructions')
    .option('-f, --force', 'overwrite existing files')
    .action(async (options) => {
        try {
            const cwd = process.cwd();
            const destDir = path.join(cwd, options.destination);

            await fs.ensureDir(destDir);

            const templateDir = path.join(__dirname, '..', 'templates');

            if (options.language) {
                // Copy specific language template
                if (!LANGUAGE_CONFIGS[options.language]) {
                    console.log(chalk.red(`❌ Unknown language: ${options.language}`));
                    console.log(chalk.blue('Available languages:'));
                    getAvailableLanguages().forEach(lang => {
                        console.log(chalk.gray(`  • ${lang.value}: ${lang.name}`));
                    });
                    process.exit(1);
                }

                const config = LANGUAGE_CONFIGS[options.language];
                const srcFile = path.join(templateDir, config.filename);
                const destFile = path.join(destDir, config.outputName);

                if (await fs.pathExists(destFile) && !options.force) {
                    console.log(chalk.yellow(`⚠️  ${config.outputName} already exists. Use --force to overwrite.`));
                    return;
                }

                await fs.copy(srcFile, destFile);
                console.log(chalk.green(`✅ Copied: ${config.outputName} (${config.name})`));
            } else {
                // Copy all template files
                const files = await fs.readdir(templateDir);

                for (const file of files) {
                    const srcFile = path.join(templateDir, file);
                    const destFile = path.join(destDir, file);

                    if (await fs.pathExists(destFile) && !options.force) {
                        console.log(chalk.yellow(`⚠️  ${file} already exists. Use --force to overwrite.`));
                        continue;
                    }

                    await fs.copy(srcFile, destFile);
                    console.log(chalk.green(`✅ Copied: ${file}`));
                }
            }

            console.log(chalk.blue(`📁 Files copied to: ${options.destination}`));

        } catch (error) {
            console.error(chalk.red('❌ Error copying files:'), error.message);
            process.exit(1);
        }
    });

program
    .command('list')
    .description('List available programming languages and templates')
    .action(async () => {
        try {
            console.log(chalk.blue('🚀 Available Programming Languages:'));
            console.log('');

            const availableLanguages = getAvailableLanguages();

            if (availableLanguages.length === 0) {
                console.log(chalk.yellow('⚠️  No language templates available.'));
                return;
            }

            availableLanguages.forEach(lang => {
                const config = LANGUAGE_CONFIGS[lang.value];
                console.log(chalk.green(`📋 ${lang.name}`));
                console.log(chalk.gray(`   Description: ${lang.description}`));
                console.log(chalk.gray(`   Template: ${config.filename}`));
                console.log(chalk.gray(`   Output: ${config.outputName}`));
                console.log('');
            });

            console.log(chalk.blue('� Usage:'));
            console.log(chalk.gray('  ai-prompts init                    # Interactive selection'));
            console.log(chalk.gray('  ai-prompts init -l <language>      # Direct language selection'));
            console.log(chalk.gray('  ai-prompts copy -l <language>      # Copy specific language template'));

        } catch (error) {
            console.error(chalk.red('❌ Error listing languages:'), error.message);
            process.exit(1);
        }
    });

program.parse();
