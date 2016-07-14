#Daptiv's NodeJs Stats Logger

Provides a universal interface for logging stats. Any stats client implementation can be used (i.e. home grown statsd, datadog, etc...) by creating an adaptor to meet the requirements of the StatsClient interface.

#Setup
`npm install`
This will install all dependencies, including typings. Then build and test the library.

#Update Version
Upgrade the version of the package by running
`npm version (major | minor | patch)` Select 1 from major, minor, or patch.
