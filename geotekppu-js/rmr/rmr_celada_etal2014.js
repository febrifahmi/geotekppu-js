/*
Copyright (2023) Febri Fahmi Hakim (fahmi_fafa@yahoo.com) and Daru Jaka Sasangka (darujakasasangka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/**
 * F0 is adjustment factor for the orientation of tunnel axis with regard to main set of discontinuities.
 * @param {String} strike_orientation orientation of strike to tunnel axis ('dwd' or drive with dip, 'dad' or drive against dip, 'parallel', 'irrespective')
 * @param {Number} dip_angle dip angle (dwd, dad, parallel: 45-90 or 20-45, irrespective: 0-20)
 * @returns {Number}
 */
function CalcF0(strike_orientation, dip_angle){
    let val_f0 = 0
    if(strike_orientation == "dwd"){
        if(dip_angle >= 20 && dip_angle < 45){
            val_f0 = -2
        } else if(dip_angle >= 45 && dip_angle <=90){
            val_f0 = 0
        } else if(dip_angle < 20){
            val_f0 = null
        } else if(dip_angle > 90){
            val_f0 = null
        }
    } else if(strike_orientation == "dad"){
        if(dip_angle >= 20 && dip_angle < 45){
            val_f0 = -10
        } else if(dip_angle >= 45 && dip_angle <=90){
            val_f0 = -5
        } else if(dip_angle < 20){
            val_f0 = null
        } else if(dip_angle > 90){
            val_f0 = null
        }
    } else if(strike_orientation == "parallel"){
        if(dip_angle >= 20 && dip_angle < 45){
            val_f0 = -5
        } else if(dip_angle >= 45 && dip_angle <=90){
            val_f0 = -12
        } else if(dip_angle < 20){
            val_f0 = null
        } else if(dip_angle > 90){
            val_f0 = null
        }
    } else if(strike_orientation == "irrespective"){
        if(dip_angle >= 0 && dip_angle <= 20){
            val_f0 = -5
        } else if(dip_angle > 20){
            val_f0 = null
        }
    }
    return val_f0
}


/**
 * Adjusment factor for RMR considering excavation method (Tunneling Bore Method/TBM or Drill and Blast/D+B).
 * @param {Number} rmrb RMRb rating value before adjustments (for rmrb > 40 and rmrb < 40)
 * @returns {Number}
 */
function CalcFexcavation(rmrb){
    let val_fe = 0
    if(rmrb < 40 && rmrb >= 0){
        val_fe = 1 + (2 * (rmrb / 100)**2)
    } else if(rmrb >= 40 && rmrb <= 100){
        val_fe = 1.32 - (Math.sqrt(rmrb-40)/25)
    } else {
        val_fe = null
    }
    return val_fe
}


/**
 * "Índice de Comportamiento Elástico" (ICE) as proposed by Bieniawski and Celada (2011).
 * @param {Number} rmrb value of RMRb
 * @param {Number} ucs uniaxial compressive strength of intact rock (in MPa)
 * @param {Number} k0 ratio of the horizontal to vertical virgin stress
 * @param {Number} H tunnel depth (in meter)
 * @param {Number} F shape coefficient (circular tunnel d = 6 m -> F 1.3 ; circular tunnel d = 10 m -> F 1.0 ; coventional tunnel 14 m wide -> F 0.75 ; caverns 25 m wide x 60 m high -> F 0.55)
 * @returns {Number}
 */
function CalcICE(rmrb,ucs,k0,H,F){
    let val_ice = 0
    const e = 2.71828183
    if(k0 <= 1 && k0 >= 0){
        val_ice = ((3704*ucs*(e**((rmrb-100)/24)))/((3-k0)*H))*F
    } else if(k0 >1){
        val_ice = ((3704*ucs*(e**((rmrb-100)/24)))/(((3*k0)-1)*H))*F
    } else {
        val_ice = null
    }
    return +val_ice.toFixed(4) // since toFixed() will output/change the value of a float with 4 decimal digits to String, we put + plus sign in front of val_ice to keep its data type as a Number
}


/**
 * Adjustment factor of stress-strain based on "Índice de Comportamiento Elástico" (ICE) value.
 * @param {Number} ice "Índice de Comportamiento Elástico" (ICE) value.
 * @returns {Number}
 */
function CalcFStressStrain(ice){
    let val_fs = 0
    if(ice < 15 && ice >= 0){
        val_fs = 1.3
    } else if(ice >= 15 && ice < 70){
        val_fs = (2.3*Math.sqrt((100-ice)))/(7.1+Math.sqrt((100-ice)))
    } else if(ice >= 70){
        val_fs = 1
    } else {
        val_fs = null
    }
    return +val_fs.toFixed(4) // since toFixed() will output/change the value of a float with 4 decimal digits to String, we put + plus sign in front of val_ice to keep its data type as a Number
}


/**
 * RMRb adjusted with F0 value.
 * @param {Number} rmrb RMRb value
 * @param {Number} f0 F0 value
 * @returns {Number}
 */
function RMRbAdj(rmrb,f0){
    let rmradj = 0
    if(rmrb != null && f0 != null){
        rmradj = rmrb + f0
    }
    return rmradj
}


/**
 * RMR14 as proposed by Celada etal (2014) - RMR with three adjusment factors applied.
 * @param {Number} rmrb_adj RMRb adjustment factor fot tunnel orientation 
 * @param {Number} val_fe Fe adjustment factor for excavation
 * @param {Number} val_fs Fs adjustment factor for stress strain
 * @returns {Number}
 */
function RMR14(rmrb_adj, val_fe, val_fs){
    let rmr14 = 0
    if(rmrb_adj != null && val_fe != null && val_fs != null){
        rmr14 = rmrb_adj * val_fe * val_fs
    } else {
        rmr14 = null
    }
    if(rmr14 != null){
        return +rmr14.toFixed(2) // since toFixed() will output/change the value of a float with 4 decimal digits to String, we put + plus sign in front of val_ice to keep its data type as a Number
    } else {
        return rmr14
    }
}

module.exports = { CalcF0, CalcFexcavation, CalcICE, CalcFStressStrain, RMRbAdj, RMR14 }