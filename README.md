# Domain Name Suggestion and Availability
> Terminal based domain search and availability tool.  Enter a word and automagically check availability of all related synonyms across .com, .net, .io and .xyz domains.

## Prerequisites

- Node v8.9.0
- NPM/Yarn

## Features

- Gets synonyms from [thesaurus.com](https://thesaurus.com)
- Uses free proxies from [gimmeproxy.com](https://gimmeproxy.com) to reduce/remove WhoIs rate limits
- Checks for availability across .com, .net, .io and .xyz
- Terminal integration
- Programmatic integration

## Global Installation

Using NPM

    $ npm install -g domainbot
    
Using Yarn

    $ yarn global add domainbot

### Synonyms Usage
      
    Usage: domainbot search [options] <word>

    Thesaurus synonyms domain search against all extensions

    Options:

        -p, --proxy <boolean>      turn proxies on or off.                     [default: true]
        -P, --proxycount <number>  define the number of proxies to use         [default: 5]
        -w, --wait <number>        define the time to wait between calls (ms)  [default: 1300]
        -m, --mock                 mock run (dont call whois servers)          [default: false]
        -h, --help                 output usage information

### Single Word Usage
      
    Usage: domainbot check [options] <word>

    Single word domain search against all extensions

    Options:

        -p, --proxy <boolean>      turn proxies on or off.                     [default: true]
        -P, --proxycount <number>  define the number of proxies to use         [default: 5]
        -w, --wait <number>        define the time to wait between calls (ms)  [default: 1300]
        -m, --mock                 mock run (dont call whois servers)          [default: false]
        -h, --help                 output usage information
        
## Global Installation

Using NPM

    $ npm install domainbot --save
    
Using Yarn

    $ yarn add domainbot

### Synonyms Usage

```js
var domainbot = require('domainbot');

// default options
const {available, unavailable, errors} = await domainbot.synonyms('robot');

// custom options
const {available, unavailable, errors} = await domainbot.synonyms('robot', {proxies: false});
```

### Single Word Usage

```js
var domainbot = require('domainbot');

// default options
const {available, unavailable, errors} = await domainbot.check('robot');

// custom options
const {available, unavailable, errors} = await domainbot.check('robot', {proxies: false});
```

### Options

#### proxy

Type: `boolean`  
Choices: `true`, `false`  
Default: `true`

Perform whois checks behind a proxy.  Proxies are fetched from the gimmeproxy.com free proxy api (daily limit max 240)

#### proxycount

Type: `number`  
Default: `'5'`

Number of proxies to fetch and rotate for each whois call

#### wait

Type: `number`  
Default: `1300`

Wait in `ms` between each fresh whois check (new word, not new extension)

#### whois
Type: `object`

Optional options to pass to [node-whois](https://github.com/FurqanSoftware/node-whois).  Please check out the readme for more information on options available.  Please note is you pass custom proxy details through this option the you will need disable `proxy` so that `domainbot` does not conflict.

## Contributing

Contributions are welcome.

## License

Domainbot is available under the [BSD (2-Clause) License](http://opensource.org/licenses/BSD-2-Clause).