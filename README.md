# Gulp Angular Recipe

This is bare skeleton of how I setup my Angular Apps.

Thought I'd put it here for future reference.


## How to use for development

```bash
git clone git@github.com:crisward/gulp-angular.git
cd gulp-angular
bower install
npm install
gulp
```
This will install everything needed. 
The gulp command starts watching your files for changes.

Open the index html in your browser. Install the chrome live reload widget and your 
browser will refresh while you code.

## What does it include

### Compilation for
* Stylus for css
* Coffeescript for js
* Jade for templates
* Debowerify to allow you to 'require' bower modules
* Watchify for quick continuous js rebuilding

### Included Libs

* Angular JS 1.3
* Bootstrap Stylus 3.2

## Preparing Code For Deployment

```bash
gulp production
```
This does the same as `gulp` without the watch and adds uglify compression on your js
and compresses your css in both cases removing comments, console.logs and line spaces.


## Project Structure

The structure I tend to follow is a source and build folder. 
The build folder has one js file and one css file.
The source folder has a main.coffee file which boots the app and loads the modules.

I generally put one module per folder. Including the templates (in jade), and and coffee script file.
Any css specific to the module is put into a .styl file within the module folder and is imported into
the main.styl file. I typically name the main coffeescript file and main stylus file the same as the folder.

```
|- index.html
|- build
|  |- main.js
|  |- main.css
|- src
|  |- main.coffe
|  |- main.styl
|  |- module1
|     |- module1.coffee
|     |- module1.jade
|     |- module1.styl
|  |- module2
|     |- module2.coffee
|     |- module2.jade
|     |- module2.styl

```






