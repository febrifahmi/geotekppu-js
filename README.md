# GeotekPPU-JS (geotekppu-js)
![coverage](badge-functions.svg "Test Coverage")

A Node package for simple geotechnic analysis.

## Usage
### Installation

`npm install geotekppu-js`

### How to use

```
const { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass, CalcR5, CalcRMR89 } = require('../geotekppu-js/rmr/rmr__bieniawski1989')
const { CalcRMRucs, CalcRMRrqdSpacing, RMRb } = require("../geotekppu-js/rmr/rmr_b_geocontrol2012")
const { CalcF0, CalcFexcavation, CalcICE } = require("../geotekppu-js/rmr/rmr_celada_etal2014")


let r1 = CalcR1("pls",16)

```


References
----------

[1] Bieniawski, Z.T. 1989. Engineering rock mass classifications. New York: Wiley.

[2] B. Celada, I. Tardáguila, P. Varona, A. Rodríguez, and Z. T. Bieniawski, “Innovating Tunnel Design by an Improved Experience-based RMR System.,” Proc. World Tunn. Congr. 2014 – Tunnels a better Life, vol. 3, pp. 1–9, 2014.