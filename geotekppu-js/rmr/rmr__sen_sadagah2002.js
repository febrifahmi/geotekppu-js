/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var e = 2.71828183

/**
 * RMR 2002 as proposed by Sen & Sadagah (2002) is an improvement of original RMR system by incorporating only five basic parameters: RQD, ucs or point load strength of intact rock material, conditions of most unfavorable joints, groundwater condition, joint orientation.
 * @param {Number} l lambda or average joint spacing or average intact length (in m)
 * @param {Number} strength point load strength of intact rock material
 * @param {Number} G groundwater condition
 * @param {Number} rj conditions of most unfavorable joints
 * @param {Number} rd joint orientation
 * @returns {Number}
 */
function RMR02pls(l, strength, G, rj, rd) {
    let rmr02pls = (20 * (1 + (0.1 * l)) * e ** (-0.1 * l)) - (15 * Math.log10(l)) + (1.670 * strength) - (2.9 * Math.log10(G)) + 35.67 + (rj - rd)
    return +rmr02pls.toFixed(4)
}


/**
 * RMR 2002 as proposed by Sen & Sadagah (2002) is an improvement of original RMR system by incorporating only five basic parameters: RQD, ucs or point load strength of intact rock material, conditions of most unfavorable joints, groundwater condition, joint orientation.
 * @param {Number} l lambda or average joint spacing or average intact length (in m)
 * @param {Number} strength uniaxial compressive strength of intact rock material
 * @param {Number} G groundwater condition
 * @param {Number} rj conditions of most unfavorable joints
 * @param {Number} rd joint orientation
 * @returns {Number}
 */
function RMR02ucs(l, strength, G, rj, rd){
    let rmr02ucs = (20 * (1 + (0.1 * l)) * e ** (-0.1 * l)) - (15 * Math.log10(l)) + (0.075 * strength) - (2.9 * Math.log10(G)) + 34.00 + (rj - rd)
    return +rmr02ucs.toFixed(4)
}

module.exports = { RMR02pls, RMR02ucs }