# Git Kraken Glo Board Discord Webhook Server

[![GitHub issues](https://img.shields.io/github/issues/DerpDays/Glo-Board-Webhook-Converter.svg?style=for-the-badge)](https://GitHub.com/Naereen/Glo-Board-Webhook-Converter/issues/)
[![GitHub closed-issues](https://img.shields.io/github/issues-closed/DerpDays/Glo-Board-Webhook-Converter.svg?style=for-the-badge)](https://GitHub.com/Naereen/Glo-Board-Webhook-Converter/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/DerpDays/Glo-Board-Webhook-Converter.svg?style=for-the-badge)](https://GitHub.com/Naereen/Glo-Board-Webhook-Converter/pull/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr-closed/DerpDays/Glo-Board-Webhook-Converter.svg?style=for-the-badge)](https://GitHub.com/Naereen/Glo-Board-Webhook-Converter/pull/)

## About

This webserver accepts webhooks from Git Kraken's Glo Boards and converts their payload into a valid discord webhook and then sends it to the desired discord webhook.
It is fully configurable with customizable messages (with variable support) and is modular meaning that you can disable specific webhook from being sent/processed.

  - Fully customizable
  - Modular
  - Custom messages support

## New Features!
New feature requests are always welcome! Please create an issue describing the feature you would like or feel free to make a pull request yourself!

## Requirements
This project requires:
- NodeJS v10 or above (hasn't been tested on anything lower)
- Yarn (you can use NPM however be weary that theres no lock file for it)

### Installation

Clone the repository, then run `yarn` to install all the required dependencies (or `npm install`)
Then simply navigate to `config.example.ts` and rename it to `config.ts`, and edit it to your pleasing.

**Please spend time going through the config and ensure the discord webhook path, secret, API key and port are all set properly.**

**You also can't currently delete any properties from the config without risking a crash.**

Down below is a example of an installation.

```sh
$ git clone https://github.com/DerpDays/Glo-Board-Webhook-Converter.git glo-board-webhook-converter
$ cd glo-board-webhook-converter
$ yarn
$ mv config.example.ts config.
# HERE YOU EDIT YOUR CONFIG
$ yarn run start
```

### Todos

 - None right now, create an issue with any ideas you would like to see!

License
----

**Free Software, Hell Yeah!**

MIT License

Copyright (c) 2020 DerpDays

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


