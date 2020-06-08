# Sketch Processor

Extracts assets from Sketch files and renders them to templates.

## Installation

Sketch Processor works as a binary file, which can be installed globally:

```bash
$ npm install -g sketch-processor
```

...or locally:

```bash
$ npm install --save-dev sketch-processor
```

## Use

To get the most out of this tool, you'll need a set of templates to be rendered after the Sketch data is extracted. Templates use the [Handlebars](https://handlebarsjs.com) format. You'll also need a Sketch file, which can be stored either locally or inside an Abstract project.

### Local Files

To process a locally-sourced Sketch file, specify the `local` storage type and provide an `input` file:

```
$ sketch-processor --storage local --input ./path/to/designs.sketch --templates ./example-templates --output ./out
```

### Files Stored in Abstract

To access files in Abstract, you'll need an access token and project GUID from the [Abstract SDK](https://sdk.goabstract.com), stored as a local `.env` file (see `.env.sample` in this repository).

Once these items are in place, simply execute the tool:

```bash
$ sketch-processor --storage abstract --templates ./example-templates --output ./out
```
