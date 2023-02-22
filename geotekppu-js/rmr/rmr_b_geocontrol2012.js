/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// change kg/cm2 to MPa
const convfactor = 0.0980665


/**
 * RMR(1) Uniaxial Compressive Strength of intact rock.
 * @param {Number} strengh ucs of intact rock (in kg/cm2, for consistency it will be converted automatically to MPa)
 * @returns {Number}
 */
function CalcRMRucs(strengh){
    let val_rmr_ucs = 0
    if(strengh > (2500*convfactor)){
        val_rmr_ucs = 15
    } else if(strength >= (1000*convfactor) && strength <= (2500*convfactor)){
        val_rmr_ucs = 12
    } else if(strength >= (500*convfactor) && strength < (1000*convfactor)){
        val_rmr_ucs = 7
    } else if(strength >= (250*convfactor) && strength < (500*convfactor)){
        val_rmr_ucs = 4
    } else if(strength >= (50*convfactor) && strength < (250*convfactor)){
        val_rmr_ucs = 2
    } else if(strength >= (10*convfactor) && strength < (50*convfactor)){
        val_rmr_ucs = 1
    } else if(strength < (10*convfactor)){
        val_rmr_ucs = 0
    }
    return val_rmr_ucs
}


/**
 * RMR(2+3) RQD and spacing of joints.
 * @param {Number} joints joints per meter
 * @returns {Number}
 */
function CalcRMRrqdSpacing(joints){
    let val_rmr_rqd = 0

    return val_rmr_rqd
}

module.exports = { CalcRMRucs }