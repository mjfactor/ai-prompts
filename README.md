# AI Prompt Instructions

A comprehensive npm package containing standardized AI coding assistant prompt instructions for multiple programming languages and frameworks.

## Features

- 🎯 **Multi-Language Support**: Templates for React/Next.js, Python, Java, Go, Rust, and more
- 🎨 **Interactive Selection**: Choose your language/framework with an intuitive CLI
- 🔧 **Easy Installation**: Simple CLI commands to set up in any project
- 📋 **Best Practices**: Follows DRY principles, accessibility standards, and modern coding conventions
- 🚀 **Production Ready**: Includes error handling, input sanitization, and security best practices
- 🌙 **Theme Support**: Respects design systems like shadcn/ui with dark mode support

## Installation

### Global Installation (Recommended)

```bash
npm install -g @mjfactor/ai-prompts
```

### Per-Project Installation

```bash
npx @mjfactor/ai-prompts init
```

## Usage

### Quick Start

Initialize AI prompt instructions in your current project with interactive language selection:

```bash
ai-prompts init
```

Or directly specify a language:

```bash
ai-prompts init -l react-nextjs-shadcn
```

This will create `.github/instructions/prompt.instructions.md` in your project, which will be automatically used by GitHub Copilot.

### CLI Commands

#### Initialize Instructions (Interactive)

```bash
ai-prompts init [options]
```

Options:
- `-l, --language <language>` - Specify programming language/framework directly
- `-f, --force` - Overwrite existing files

#### Copy Files to Custom Directory

```bash
ai-prompts copy [options]
```

Options:
- `-l, --language <language>` - Copy specific language template
- `-d, --destination <path>` - Destination directory (default: `.github/instructions`)
- `-f, --force` - Overwrite existing files

#### List Available Languages

```bash
ai-prompts list
```

Shows all available programming languages and frameworks with descriptions.

## Supported Languages & Frameworks

Currently supported languages and frameworks:

### Web Development
- **React/Next.js with shadcn/ui** (`react-nextjs-shadcn`)
  - Modern React development with Next.js, TypeScript, TailwindCSS, and shadcn/ui
  - Includes theming support and accessibility guidelines

*More languages will be added as templates are provided*

## What's Included

The package includes carefully crafted prompt instructions that guide AI coding assistants to:

### Code Quality Standards
- Write clean, readable, and maintainable code
- Follow DRY principles (Don't Repeat Yourself)
- Implement proper error handling and input sanitization
- Use modern, idiomatic language features

### Language-Specific Guidelines
Each language template includes:
- **Best Practices**: Framework-specific coding standards
- **Security**: Input validation and secure coding practices
- **Performance**: Optimization techniques and patterns
- **Testing**: Unit testing and quality assurance guidelines
- **Documentation**: Proper code documentation standards

### Development Workflow
- Consistent naming conventions
- Proper project structure
- Import/export best practices
- Error handling patterns

## File Structure

After running `ai-prompts init`, your project will have:

```
your-project/
├── .github/
│   └── instructions/
│       └── prompt.instructions.md
└── ... your other files
```

## Adding New Languages

To add support for a new programming language:

1. **Create a template file** in the `templates/` directory
2. **Update the language configuration** in both `bin/cli.js` and `index.js`
3. **Add the language to the LANGUAGE_CONFIGS object**

Example configuration:
```javascript
const LANGUAGE_CONFIGS = {
    'python-django': {
        name: 'Python with Django',
        description: 'Python web development with Django framework',
        filename: 'python-django.instructions.md',
        outputName: 'prompt.instructions.md'
    }
};
```

## Usage Examples

### Interactive Language Selection
```bash
$ npx @mjfactor/ai-prompts init
? Choose a programming language/framework: (Use arrow keys)
❯ React/Next.js with shadcn/ui - Modern React development with Next.js, TypeScript, TailwindCSS, and shadcn/ui
  Python with Django - Python web development with Django framework
  Java with Spring Boot - Enterprise Java development with Spring Boot
```

### Direct Language Selection
```bash
# Initialize React/Next.js project
npx @mjfactor/ai-prompts init -l react-nextjs-shadcn

# Copy template to custom directory
npx @mjfactor/ai-prompts copy -l react-nextjs-shadcn -d ./ai-instructions

# List all available languages
npx @mjfactor/ai-prompts list
```

## GitHub Copilot Integration

These instructions are automatically detected and used by GitHub Copilot when placed in the `.github/instructions/` directory. No additional configuration is required.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/emjay/ai-prompt-instructions/issues)
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your setup and the issue

## Changelog

### v1.1.0
- Added multi-language support with interactive selection
- Restructured CLI with language-specific commands
- Added inquirer for interactive prompts
- Renamed templates to be more descriptive
- Enhanced programmatic API with language support

### v1.0.0
- Initial release
- CLI tool for easy initialization
- React/Next.js/TypeScript optimized instructions
- shadcn/ui theming support
- Accessibility guidelines included

---

Made with ❤️ for the developer community
