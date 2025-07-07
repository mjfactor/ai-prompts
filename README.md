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
  - Copilot prompt to not define theme and style in inline but use the global.css
*More languages will be added as templates are provided*
