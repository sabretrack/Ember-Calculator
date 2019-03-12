# JS Calculator

A web based calculator built with Ember.js.
Choose your theme from the select menu and start calculating!

View a live demo at [laplantedesign.com/calculator](http://laplantedesign.com/calculator/)

![homepage screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/ember-calculator-home.jpg)
![default theme screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/ember-calculator-default.jpg)
![light theme screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/ember-calculator-light.jpg)
![dark theme screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/ember-calculator-dark.jpg)
![colors theme screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/ember-calculator-colors.jpg)

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
![Theme component javascript screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/component-themejs.jpg)
### setTheme(theme){ }
* `this.serviceTheme.set('activeTheme',theme);` Sets "activeTheme" at the application level inside "app/services/theme.js". This allows the application template (/templates/application.hbs) to retrieve the "activeTheme" value and determine the background color of the entire page: `<div id="cover-page" class="bg-{{activeThemeService.activeTheme}}">`

* `this.set('activeTheme', theme);` Sets "activeTheme" at the component level.  Any template  containing the "theme" component (/templates/components/theme.hbs) will recognize the "activeTheme" value.  In the "calculator" template (/templates/calculator.hbs) this will update the `<h1>` title and change the classname of the `<div>` wrapper around the "calculator" component: `<div class="shadow p-3 rounded mt-5 calc calc-{{activeTheme}}">`

* `localStorageTheme.setItem('localActiveTheme'...`  will set the "localActiveTheme" value in localstorage.

### didInsertElement(){ }
* `localStorageTheme` variable gets "localActiveTheme" from localstorage.  The app will remember what the latest "activeTheme"  is when navigating through the pages or coming back at a later date.  If "localActiveTheme" is not defined, it will be set to "default" ("default" is set in "app/services/theme.js").

### actions: setThemeAction(theme){ }
* `if(this.get('router').currentURL != '/calculator')`  If a user is not on the "/calculator" page, they will be redirected when selecting a theme from the `<select>` menu.  If already on the "/calculator" page, it will change the "activeTheme" without redirecting.
  
* `this.setTheme(theme)`  calls "setTheme(theme)" method.  It is triggered using the "onChange" method when a user selects a theme from the `<select>` menu...     `<select id="ChooseTheme" class="form-control" onChange={{action "setThemeAction" value="target.value"}}>`

## Calculator Component (/app/components/calculator.js)
![Calculator component screenshot](https://raw.githubusercontent.com/sabretrack/Ember-Calculator/master/public/images/documentation/component-calculatorjs.jpg)

`didRender:` call resizeTable() method when component has finished rendering

`debounceRate: 50` prevent "resizeTable()" from firing too often

`didResize(){ }` call "resizeTable()" when window has been resized

`resizeTable() { }` calculate "cellHeight" of calculator `<table>` so the buttons' widths and heights remain proportional without skewing.

`solved:` set to "false" by default.  Determines if calculator equation should be reset when a new equation is created.

### actions: clear() { }
* reset the calculator to "0" when "clear" button is clicked.

### actions: input(value){ }
* `currentValue:` Every time a button is clicked, get the value of the button

* `if(solved && !isNaN(value) || solved && value == ".")`  if the equation has been solved, determine whether to reset the calculator to "0"  or build a new equation based on the previous answer.  If a number or decimal is clicked, reset the equation.  If an operator is clicked, add the operator to the previous answer and begin a new equation.

* `if(currentValue == '0' && !isNaN(value))` if calculator is set to 0, remove the zero when a number is clicked. (Ex. Click the "5" button. The calculator will show "5"  instead of "05")

* `if(isNaN(lastChar) && isNaN(value) && isNaN(currentValue) || value == "." )`  will prevent invalid equations such as 5`+-×`2  or 5.5.5+2.2.2.2.

* `this.set('equation', currentValue + value);`  Will update the equation after each button click.  

### actions: solve(finalEquation){ }
* "solve" is triggered when "equals" button is clicked.  "finalEquation" is the value of the equation when "equals" is clicked.

* `if(finalEquation.indexOf("×") || finalEquation.indexOf("÷"))` "`×`" and "`÷`" are visual symbols.  We need to convert these into operators that Javascript can understand before solving the equation. "`×`" is changed to "`*`" and "`÷`" is changed to "`/`".

* `if(isNaN(lastChar))` if the last character in the equation is an operator, "slice" it off before solving the equation.  (ex: "5+5+" will be changed to "5+5")

* `eval(finalEquation)` will attempt to solve the equation

* `solution = Math.round((solution) * 1e12) / 1e12;`  makes sure the result is accurate.  Before I added this I noticed some simple equations, involving decimals, returning the wrong answers.

* `this.set('equation', solution);` update the equation with the rendered answer.

* `this.solved = true;` Lets the calculator know an answer has been rendered.  When a button is clicked, the calculator will know whether to clear the answer or use it as part of the next equation.
