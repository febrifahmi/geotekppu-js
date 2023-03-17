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
    let val_r1 = 0;
    if(idx == "pls"){
        if(strength >= 10){
            val_r1 = 15
        } else if(strength < 10 && strength >= 4){
            val_r1 = 12
        } else if(strength < 4 && strength >= 2){
            val_r1 = 7
        } else if(strength < 2 && strength >= 1){
            val_r1 = 4
        } else if(strength < 1 && strength >= 0) {
            val_r1 = "For value lower than 1 MPa, please proceed with Uniaxial Compressive Strength (ucs) idx"
        } else {
            val_r1 = null
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
        } else if(strength < 1 && strength >= 0){
            val_r1 = 0
        } else {
            val_r1 = null
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
    } else if(drillcoreRQD < 25 && drillcoreRQD >= 0){
        val_r2 = 3
    } else {
        val_r2 = null
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
    } else if(spacing < 0.06 && spacing >= 0){
        val_r3 = 5
    } else {
        val_r3 = null
    }
    return val_r3
}


/**
 * Classification of discontinuity condition.
 * @param {Number} dl discontinuity length (persistence) in m (<1m; 1-3m; 3-10m; 10-20m; >20m)
 * @param {Any} sep separation (aperture) in mm (None; <0.1mm; 0.1-1.0mm; 1-5mm; >5mm)
 * @param {String} rough roughness (very_rough; rough; slightly_rough; smooth; slickensided)
 * @param {Any} gouge infilling (None; hl<5; hl>5; sl<5; sl>5)
 * @param {String} weather weathering (unweathered; slightly_weathered; moderately_weathered; highly_weathered; decomposed)
 * @returns {Number}
 */
function CalcDiscontinuityClass(dl, sep, rough, gouge, weather){
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
    } else {
        dl_rating = null
    }

    if(sep == "None"){
        sep_rating = 6
    } else if(sep < 0.1 && sep >= 0){
        sep_rating = 5
    } else if(sep >= 0.1 && sep < 1.0){
        sep_rating = 4
    } else if(sep >= 1.0 && sep < 5){
        sep_rating = 1
    } else if(sep >= 5){
        sep_rating = 0
    } else {
        sep_rating = null
    }

    if(rough == "very_rough"){
        rough_rating = 6
    } else if(rough == "rough"){
        rough_rating = 5
    } else if(rough == "slightly_rough"){
        rough_rating = 3
    } else if(rough == "smooth"){
        rough_rating = 1
    } else if(rough == "slickensided"){
        rough_rating = 0
    } else {
        rough_rating = null
    }

    if(gouge == "None"){
        gouge_rating = 6
    } else if(gouge == "hl<5"){
        gouge_rating = 4
    } else if(gouge == "hl>5"){
        gouge_rating = 2
    } else if(gouge == "sl<5"){
        gouge_rating = 2
    } else if(gouge == "sl>5"){
        gouge_rating = 0
    } else {
        gouge_rating = null
    }

    if(weather == "unweathered"){
        weather_rating = 6
    } else if(weather == "slightly_weathered"){
        weather_rating = 5
    } else if(weather == "moderately_weathered"){
        weather_rating = 3
    } else if(weather == "highly_weathered"){
        weather_rating = 1
    } else if(weather == "decomposed"){
        weather_rating = 0
    } else {
        weather_rating = null
    }

    // console.log(dl_rating, sep_rating, rough_rating, gouge_rating, weather_rating)
    let totalrating = 0
    if(dl_rating != null && sep_rating != null && rough_rating != null && gouge_rating != null && weather_rating != null){
        totalrating = dl_rating + sep_rating + rough_rating + gouge_rating + weather_rating
    } else {
        totalrating = null
    }

    return totalrating
}


/**
 * Groundwater condition.
 * @param {Number} inflow inflow per 10 m tunnel length (i/m) (None or number)
 * @param {Number} wpress joint water pressure / major principal
 * @param {String} cond general conditions (dry, damp, wet, dripping, or flowing)
 * @returns {Number}
 */
function CalcR5(inflow, wpress, cond){
    let val_r5 = 0
    if(inflow == "None" && wpress == 0 && cond == "dry"){
        val_r5 = 15
    } else if(inflow < 10 && wpress < 0.1 && cond == "damp"){
        val_r5 = 10
    } else if(25 >= inflow && inflow >= 10 && 0.2 >= wpress && wpress >= 0.1 && cond == "wet"){
        val_r5 = 7
    } else if(125 >= inflow && inflow > 25 && 0.5 >= wpress && wpress >= 0.2 && cond == "dripping"){
        val_r5 = 4
    } else if(inflow > 125 && wpress > 0.5 && cond == "flowing"){
        val_r5 = 0
    } else {
        val_r5 = null
    }
    return val_r5
}


/**
 * Rock Mass Rating (RMR) value calculation as proposed by Bieniawski (1973) to classify rock mass based on 5 classification parameters.
 * @param {Number} r1 strength rating
 * @param {Number} r2 Rock Quality Designation (RQD) rating
 * @param {Number} r3 space of discontinuity rating
 * @param {Number} discontinuity_class condition of discontinuity rating
 * @param {Number} r5 ground water rating
 * @returns {Number}
 */
function CalcRMR89(r1, r2, r3, discontinuity_class, r5){
    let rmr89 = 0
    if(r1 != null && r2 != null && r3 != null && discontinuity_class != null && r5 != null){
        rmr89 = r1 + r2 + r3 + discontinuity_class + r5
    } else {
        rmr89 = null
    }
    return rmr89
}

module.exports = { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass, CalcR5, CalcRMR89 }
