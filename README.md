# JS Calculator

A web based calculator built with Ember.js.
Choose your theme from the select menu and start calculating!

View a live demo at [laplantedesign.com/calculator](http://laplantedesign.com/calculator/)

![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/ember-calculator-home.jpg)
![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/ember-calculator-default.jpg)
![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/ember-calculator-light.jpg)
![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/ember-calculator-dark.jpg)
![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/ember-calculator-colors.jpg)

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd calculator`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Theme Component (/app/components/theme.js)
![alt text](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/component-themejs.jpg)
### setTheme(theme){ }
* `this.serviceTheme.set('activeTheme',theme);` Sets "activeTheme" at the application level inside "app/services/theme.js". This allows the application template (/templates/application.hbs) to retrieve the "activeTheme" value and determine the background color of the entire page: `<div id="cover-page" class="bg-{{activeThemeService.activeTheme}}">`

* `this.set('activeTheme', theme);` Sets "activeTheme" at the component level.  Any template  containing the "theme" component (/templates/components/theme.hbs) will recognize the "activeTheme" value.  In the "calculator" template (/templates/calculator.hbs) this will update the `<h1>` title and change the classname of the `<div>` wrapper around the "calculator" component: `<div class="shadow p-3 rounded mt-5 calc calc-{{activeTheme}}">`

* `localStorageTheme.setItem('localActiveTheme'...`  will set the "localActiveTheme" value in localstorage.

### didInsertElement(){ }
* `this.calculatorRoute` variable is set inside "routes/calculator.js".  Every time the "theme" component is called, it will know if it is currently on the "/calculator" page or not.

* `this.isCalculatorRoute` will update to "true" or "false" depending on what page the user is currently on.  It is used as a roundabout way to trigger the if statement inside "setThemeAction()" without generating routing errors in integration tests.

* `localStorageTheme` variable gets "localActiveTheme" from localstorage.  The app will remember what the latest "activeTheme"  is when navigating through the pages or coming back at a later date.  If "localActiveTheme" is not defined, it will be set to "default" ("default" is set in "app/services/theme.js").

### actions: setThemeAction(theme){ }
* `if(!this.isCalculatorRoute)`  If a user is not on the "/calculator" page, they will be redirected when selecting a theme from the `<select>` menu.  If already on the "/calculator" page, it will change the "activeTheme" without redirecting.
  
* `this.setTheme(theme)`  calls "setTheme(theme)" method.  It is triggered using the "onChange" method when a user selects a theme from the `<select>` menu...     `<select id="ChooseTheme" class="form-control" onChange={{action "setThemeAction" value="target.value"}}>`
