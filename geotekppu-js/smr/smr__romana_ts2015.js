/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// Slope Mass Rating (based on Romana. M (1985)) - Romana et.al (2015)


// define A, B, and C first
var A = 0
var B = 0
var C = 0


/**
 * Correction factor F1 which depends on parallelism (denoted by "A") between discontinuity dip direction (alpha j) and slope dip (alpha s)
 * 
 * if ftype: P, then A = |alpha j - alpha s| OR absolute value of alpha j minus alpha s
 * if ftype: T, the A = |alpha j - alpha s - 180| OR absolute value of alpha j minus alpha s minus 180
 * 
 * @param {String} ftype type of slope failure (P = planar, T = Toppling)
 * @param {Number} dis_dd discontinuity dip direction
 * @param {Number} slope_d slope dip
 * @returns {Number}
 */
function FactorF1(ftype, dis_dd, slope_d){
    let val_f1 = 0
    if(dis_dd <= 360 && slope_d <=360){
        if(ftype == "P"){
            A = Math.abs(dis_dd-slope_d)
            if(A>30){
                val_f1 = 0.15
            } else if(A <= 30 && A > 20){
                val_f1 = 0.40
            } else if(A <=20 && A > 10){
                val_f1 = 0.70
            } else if(A <= 10 && A > 5){
                val_f1 = 0.85
            } else if(A <= 5){
                val_f1 = 1.00
            }
        } else if(ftype == "T"){
            A = Math.abs(dis_dd-slope_d-180)
            if(A>30){
                val_f1 = 0.15
            } else if(A <= 30 && A > 20){
                val_f1 = 0.40
            } else if(A <=20 && A > 10){
                val_f1 = 0.70
            } else if(A <= 10 && A > 5){
                val_f1 = 0.85
            } else if(A <= 5){
                val_f1 = 1.00
            }
        }
    } else {
        val_f1 = null
    }
    return val_f1
}



/**
 * Correction factor F2 related to the probability of discontinuity shear strength (B) (Romana, 1993), depends on the discontinuity dip. In case of failure type Planar: B = beta j ; in case of Toppling: B = 1.0
 * 
 * @param {String} ftype type of slope failure (P = planar, T = Toppling)
 * @param {Number} dis_dip discontinuity dip angle
 * @returns {Number}
 */
function FactorF2(ftype, dis_dip){
    let val_f2 = 0
    if(dis_dip <= 90){
        if(ftype == "P"){
            if(dis_dip < 20){
                val_f2 = 0.15
            } else if(dis_dip >= 20 && dis_dip < 30){
                val_f2 = 0.40
            } else if(dis_dip >= 30 && dis_dip < 35){
                val_f2 = 0.70
            } else if(dis_dip >= 35 && dis_dip < 45){
                val_f2 = 0.85
            } else if(dis_dip >= 45){
                val_f2 = 1.00
            }
        } else if(ftype == "T"){
            val_f2 = 1.00
        }
    } else {
        val_f2 = null
    }
    return val_f2
}



/**
 * Correction factor F3 indicates relationship (C) between slope (beta s) discontinuity dips (beta j) that is probability of the discontinuity to outcrop on the slope face (Romana, 1993) for planar failure (Romana, 2015)
 * 
 * @param {String} ftype type of slope failure (P = planar, T = Toppling)
 * @param {Number} slope slope
 * @param {Number} ddips discontinuity dips
 * @returns {Number}
 */
function FactorF3(ftype, slope, ddips){
    let val_f3 = 0
    if(ftype == "P"){
        C = slope - ddips
        if(C <= 90){
            if(C > 10){
                val_f3 = 0
            } else if(C <= 10 && C > 0){
                val_f3 = -6
            } else if(C == 0){
                val_f3 = -25
            } else if(C < 0 && C >= -10){
                val_f3 = -50
            } else if(C < -10){
                val_f3 = -60
            }
        } else {
            val_f3 = null
        }
    } else if(ftype == "T"){
        C = slope + ddips
        if(C <= 180){
            if(C < 110){
                val_f3 = 0
            } else if(C >= 110 && C < 120){
                val_f3 = -6
            } else if(C >= 120){
                val_f3 = -25
            }
        } else {
            val_f3 = null
        }
    }
    return val_f3
}



/**
 * Correction factor F4 considering the excavation method.
 * 
 * @param {String} method excavation methods option ("pre": Presplitting; "sb": Smooth blasting; "ns": Natural slope; "bm": Blasting or mechanical)
 * @returns {Number}
 */
function FactorF4(method){
    let val_f4 = 0
    if(method == "pre"){
        val_f4 = 10
    } else if(method == "sb"){
        val_f4 = 8
    } else if(method == "ns"){
        val_f4 = 15
    } else if(method == "bm"){
        val_f4 = 0
    }
    return val_f4
}



/**
 * Slope Mass Rating (SMR) as proposed by Romana (1985, 2015).
 * 
 * @param {Number} rmrb RMR basic
 * @param {Number} F1 correction factor F1 regarding parallelism
 * @param {Number} F2 correction factor F2 regarding probability of discontinuity shear strength
 * @param {Number} F3 correction factor F3 
 * @param {Number} F4 correction factor F4
 * @returns {Number}
 */
function SMR2015(rmrb, F1, F2, F3, F4){
    let smr = 0
    if(rmrb != null && F1 != null && F2 != null && F3 != null && F4 != null){
        smr = rmrb + (F1 * F2 * F3) + F4
    } else {
        smr = null
    }
    return smr
}

module.exports = { FactorF1, FactorF2, FactorF3, FactorF4, SMR2015 }