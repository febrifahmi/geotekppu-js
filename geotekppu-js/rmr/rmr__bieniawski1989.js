/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Strength of intact rock material rating.
 * @param {String} idx selected index either 'pls' for point-loads strength or 'ucs' for uniaxial compressive strength
 * @param {Number} strength strength of intact rock material (in MPa)
 * @returns {Number} 
 */
function CalcR1(idx, strength){
    // let val_r1 = 0;
    if(idx == "pls"){
        if(strength >= 10){
            val_r1 = 15
        } else if(strength < 10 && strengh >= 4){
            val_r1 = 12
        } else if(strength < 4 && strength >= 2){
            val_r1 = 7
        } else if(strength < 2 && strength >= 1){
            val_r1 = 4
        } else {
            val_r1 = "For value lower than 1 MPa, please proceed with Uniaxial Compressive Strength Test"
        }
    } else if(idx == "ucs"){
        if(strength >= 250){
            val_r1 = 15
        } else if(strength < 250 && strength >= 100){
            val_r1 = 12
        } else if(strength < 100 && strength >= 50){
            val_r1 = 7
        } else if(strength < 50 && strength >= 25){
            val_r1 = 4
        } else if(strength < 25 && strength >= 5){
            val_r1 = 2
        } else if(strength < 5 && strength >= 1){
            val_r1 = 1
        } else if(strength < 1){
            val_r1 = 0
        }
    }
    return val_r1
}


/**
 * Drill core RQD rating.
 * @param {Number} drillcoreRQD drill core quality or rock quality designation (in percent)
 * @returns {Number}
 */
function CalcR2(drillcoreRQD){
    let val_r2 = 0;
    if(drillcoreRQD <= 100 && drillcoreRQD >= 90){
        val_r2 = 20
    } else if(drillcoreRQD < 90 && drillcoreRQD >= 75){
        val_r2 = 17
    } else if(drillcoreRQD < 75 && drillcoreRQD >= 50){
        val_r2 = 13
    } else if(drillcoreRQD < 50 && drillcoreRQD >= 25){
        val_r2 = 8
    } else if(drillcoreRQD < 25){
        val_r2 = 3
    }
    return val_r2 
}


/**
 * Space of discontinuity rating.
 * @param {Number} spacing value of rock spacing (in m, float/decimal)
 * @returns {Number}
 */
function CalcR3(spacing){
    let val_r3 = 0;
    if(spacing >= 2.0){
        val_r3 = 20
    } else if(2.0 > spacing >= 0.6){
        val_r3 = 15
    } else if(0.6 > spacing >= 0.2){
        val_r3 = 10
    } else if(0.2 > spacing >= 0.06){
        val_r3 = 8
    } else if(spacing < 0.06){
        val_r3 = 5
    }
    return val_r3
}


/**
 * 
 * @param {Number} dl discontinuity length (persistence) in m (<1m; 1-3m; 3-10m; 10-20m; >20m)
 * @param {Any} sep separation (aperture) in mm (None; <0.1mm; 0.1-1.0mm; 1-5mm; >5mm)
 * @param {String} rough roughness (very_rough; rough; slightly_rough; smooth; slickensided)
 * @param {Any} gouge infilling (None; hl<5; hl>5; sl<5; sl>5)
 * @param {String} weather weathering (unweathered; slightly_weathered; moderately_weathered; highly_weathered; decomposed)
 * @returns {Number}
 */
function CalcDiscontinuityClass(dl, sep, rough, gouge, weather){
    let val_r4 = 0
    let dl_rating = 0
    let sep_rating = 0
    let rough_rating = 0
    let gouge_rating = 0
    let weather_rating = 0

    if(dl < 1){
        dl_rating = 6
    } else if(1 <= dl < 3){
        dl_rating = 4
    } else if(3 <= dl < 10){
        dl_rating = 2
    } else if(10 <= dl <= 20){
        dl_rating = 1
    } else if(dl > 20){
        dl_rating = 0
    }

    return val_r4
}

module.exports = { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass }
