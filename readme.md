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

Currently, only [Abstract](https://www.abstract.com) data sources are supported. You'll need an access token and project GUID from the [Abstract SDK](https://sdk.goabstract.com), stored as a local `.env` file (see `.env.sample` in this repository), before running this tool.

You'll also need a set of templates, stored in a `templates` folder in the directory in which you run this tool, to be rendered after the Sketch data is extracted. Templates use the [Handlebars](https://handlebarsjs.com) format.

Once these items are in place, simply execute the tool:

```bash
$ sketch-processor
```
