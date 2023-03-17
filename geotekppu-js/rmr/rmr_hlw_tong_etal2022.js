/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/**
 * Adjusted R1 (adjusted uniaxial compressive rock mass strength incorporating the influence of ground water weakening and temperature environment on deep located excavation project).
 * The equation of adjusted R1 proposed by Tong et.al (2022) is:
 * if strength (x) <= 250 MPa -> R1 = ((0.6343*math.log(x,10)) - 0.3627)
 * if strength (x) > 250 -> R1 = 15
 * @param {Number} strength uniaxial compressive strength test result of intact rock material/rock mass strength (in MPa)
 * @returns {Number}
 */
function AdjustedR1ucs(strength){
    let val_r1_adj = 0
    if(strength <= 250 && strength >=0){
        val_r1_adj = 10**((0.6343*Math.log10(strength))-0.3627)
    } else if(strength > 250){
        val_r1_adj = 15
    } else {
        val_r1_adj = null
    }
    if(val_r1_adj != null){
        return +val_r1_adj.toFixed(4)
    } else {
        return val_r1_adj
    }
}


/**
 * Adjusted R2 - adjustment of rock quality designation rating.
 * @param {Number} rqd RQD rating/value (0-100).
 * @returns {Number}
 */
function AdjustedR2(rqd){
    let val_r2_adj = 0
    if(rqd < 100 && rqd >= 0){
        val_r2_adj = (0.1958*rqd) + 0.6484
    } else if(rqd == 100){
        val_r2_adj = 20
    } else {
        val_r2_adj = null
    }
    if(val_r2_adj != null){
        return +val_r2_adj.toFixed(4)
    } else {
        return val_r2_adj
    }
}


/**
 * Adjusted R3 - adjustment of rating value based on joint spacing.
 * @param {Number} spacing space of discontinuity (in m)
 * @returns {Number}
 */
function AdjustedR3(spacing){
    let val_r3_adj = 0
    if(spacing < 2 && spacing >=0){
        val_r3_adj = 10**((0.1799*((Math.log10(spacing))**3)) + (0.3834*((Math.log10(spacing))**2)) + (0.4462*Math.log10(spacing)) + 1.125)
    } else if(spacing >= 2){
        val_r3_adj = 20
    } else {
        val_r3_adj = null
    }
    if(val_r3_adj != null){
        return +val_r3_adj.toFixed(4)
    } else {
        return val_r3_adj
    }
}


/**
 * Adjustment rating for tunnel, foundation and slope based of favorability.
 * @param {String} cat category (tunnel, foundation, slope) (type String)
 * @param {String} favorability favorability opstion (vfav -> very favorable; fav -> favorable; fair; unfav -> unfavorable; vunfav: very unfavorable)
 * @returns {Number}
 */
function CalcR6(cat,favorability){
    let val_r6 = 0
    if(cat == "tunnel"){
        if(favorability == "vfav"){
            val_r6 = 0
        } else if(favorability == "fav"){
            val_r6 = -2
        } else if(favorability == "fair"){
            val_r6 = -5
        } else if(favorability == "unfav"){
            val_r6 = -10
        } else if(favorability == "vunfav"){
            val_r6 = -12
        } else {
            val_r6 = null
        }
    } else if(cat == "foundation"){
        if(favorability == "vfav"){
            val_r6 = 0
        } else if(favorability == "fav"){
            val_r6 = -2
        } else if(favorability == "fair"){
            val_r6 = -7
        } else if(favorability == "unfav"){
            val_r6 = -15
        } else if(favorability == "vunfav"){
            val_r6 = -25
        } else {
            val_r6 = null
        }
    } else if(cat == "slope"){
        if(favorability == "vfav"){
            val_r6 = 0
        } else if(favorability == "fav"){
            val_r6 = -5
        } else if(favorability == "fair"){
            val_r6 = -25
        } else if(favorability == "unfav"){
            val_r6 = -50
        } else if(favorability == "vunfav"){
            val_r6 = -60
        } else {
            val_r6 = null
        }
    } else {
        val_r6 = null
    }
    return val_r6
}


/**
 * Geostress correction / strength-stress ratio index / in-situ stress modification index (R7) as proposed in Tong et.al (2022) (a ration to measure the risk of rock bursts). 
 * Denoted by the equation:
 * R7 = Sum of (Ri x Percentage of (i))
 * 
 * Where Ri for specific rock burst grade:
 * I (no rock burst) --> Ri = 0
 * II (slight rock burst) --> Ri = -4
 * III (moderate rock burst) --> Ri = -8
 * IV (severe rock burst) --> Ri = -12
 * @param {Number} ri score of Ri based on rock burst grade
 * @param {Number} per_i percentage of different rock burst grade
 * @returns {Number}
 */
function CalcR7(ri,per_i){
    let val_r7 = 0
    if(per_i >= 0 && per_i <= 100){
        val_r7 = ri * per_i
    } else {
        val_r7 = null
    }
    return val_r7
}


/**
 * Rock Mass Permeability Index as main factor influence the water seepage in rocks material.
 * 
 * This value defined as:
 * R8 = -12 x (1 - Perm(<=10^-9m/s))
 * @param {Number} perm_co coefficient of permeability value and it should within the range <=10^-9 m/s. If permeability coefficient value == <=10^-9 m/s == 1, then R8 = -12 x (1-1) = 0. Otherwise, when permeability coefficient value == <=10^-9 m/s == 0, R8 is -12. The coefficient is between 0 and 1.
 * @returns {Number}
 */
function CalcR8(perm_co){
    let val_r8 = 0
    if(perm_co <= 1 && perm_co >= 0){
        val_r8 = -12 * (1 - perm_co)
    } else {
        val_r8 = null
    }
    if(val_r8 != null){
        return +val_r8.toFixed(2)
    } else {
        return val_r8
    }
}


/**
 * The groundwater chemistry index as proposed by Tong et.al (2022).
 * @param {Number} pH pH (acidity)
 * @param {Number} tds total dissolved solids (g/L)
 * @param {Number} cl non/negatively charged chlorine (g/L)
 * @returns {Number}
 */
function CalcR9(pH,tds,cl){
    let val_r9 = 0
    if(pH > 6 && pH < 10 && tds < 50 && cl < 20){
        val_r9 = 0
    } else if(pH > 6 && pH < 10 && tds < 50 && cl >= 20){
        val_r9 = -4
    } else if(pH > 6 && pH < 10 && tds >= 50 && cl < 20){
        val_r9 = -4
    } else if((pH <= 6 || pH >= 10) && tds < 50 && cl < 20){
        val_r9 = -4
    } else if((pH <= 6 || pH >= 10) && tds >= 50 && cl < 20){
        val_r9 = -8
    } else if((pH <= 6 || pH >= 10) && tds < 50 && cl >= 20){
        val_r9 = -8
    } else if((pH <= 6 || pH >= 10) && tds >= 50 && cl >= 20){
        val_r9 = -8
    } else {
        val_r9 = null
    }
    return val_r9
}


/**
 * Modified Rock Classification System RMRHLW for HLW Geological Disposal as proposed in Tong et.al (2022).
 * @param {Number} r1 adjusted uniaxial compressive rock mass strength incorporating the influence of ground water weakening and temperature environment on deep located excavation project.
 * @param {Number} r2 adjustment of rock quality designation rating.
 * @param {Number} r3 adjustment of rating value based on joint spacing.
 * @param {Number} r4 classification of discontinuity condition as in RMR89.
 * @param {Number} r5 groundwater condition as in RMR89.
 * @param {Number} r6 adjustment rating for tunnel, foundation and slope based of favorability.
 * @param {Number} r7 geostress correction/strength-stress ratio index/in-situ stress modification index.
 * @param {Number} r8 Rock Mass Permeability Index.
 * @param {Number} r9 groundwater chemistry index.
 * @returns {Number}
 */
function RMRhlw(r1,r2,r3,r4,r5,r6,r7,r8,r9){
    let rmrhlw = 0
    if(r1 != null && r2 != null && r3 != null && r4 != null && r5 != null && r6 != null && r7 != null && r8 != null && r9 != null){
        rmrhlw = r1 + r2 + r3 + r4 + r5 + r6 + r7 + r8 + r9
    } else {
        rmrhlw = null
    }
    return rmrhlw
}

module.exports = { AdjustedR1ucs, AdjustedR2, AdjustedR3, CalcR6, CalcR7, CalcR8, CalcR9, RMRhlw }
