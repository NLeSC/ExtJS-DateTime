DateTime form input field for ExtJS.

Build
-----

Build requires:
* SenchaCmd, download from [Sencha](http://www.sencha.com/products/sencha-cmd/download/) and install.
* karma, for running tests, install with `sudo apt-get install phantomjs nodejs lcov` and `sudo npm install -g karma karma-coverage karma-junit-reporter`.
* jsduck, for documentation, install with `sudo gem install jsduck`.

Build with `sencha package build` inside `packages/datetime/` folder.

To make pkg available run `sencha package add ../../build/datetime/datetime.pkg` and make `<SenchaCmd Installation Prefix>/repo/pkgs` folder available online.

Installation and usage
----------------------

To use with a SenchaCmd based project:

1. `sencha repo add -address <to be announced> -name NLeSC
2. Add 'datetime' to `requires` array in `app.json`.
3. Use component in your application.
4. `sencha app refresh` do download package.

To use with a non-SenchaCmd project:

1. unzip `datetime.pkg`
2. Add `build/datetime.js` into html page.

Documentation
-------------

Documentation can be generated with `ant docs`.
To make inline examples work, make a copy of the ExtJS SDK directory as `docs/extjs-build`.
Place the docs folder online and open `docs/index.html` in a webbrowser.

Copyrights & Disclaimers
------------------------

extjs-datetime is copyrighted by the Netherlands eScience Center and releases under
the Apache License, Version 2.0.

See <http://www.esciencecenter.nl> for more information on the Netherlands
eScience Center.

See the "LICENSE" file for more information.
