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
 * @param {Number} strength ucs of intact rock (in kg/cm2, for consistency it will be converted automatically to MPa)
 * @returns {Number}
 */
function CalcRMRucs(strength){
    let val_rmr_ucs = 0
    if(strength > (2500*convfactor)){
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
    } else if(strength < (10*convfactor) && strength >= 0){
        val_rmr_ucs = 0
    } else {
        val_rmr_ucs = null
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
    if(joints == 0){
        val_rmr_rqd = 40
    } else if(joints == 1){
        val_rmr_rqd = 34
    } else if(joints == 2){
        val_rmr_rqd = 31
    } else if(joints == 3){
        val_rmr_rqd = 29
    } else if(joints == 4){
        val_rmr_rqd = 28
    } else if(joints == 5){
        val_rmr_rqd = 27
    } else if(joints == 6){
        val_rmr_rqd = 26
    } else if(joints == 7){
        val_rmr_rqd = 25
    } else if(joints == 8){
        val_rmr_rqd = 24
    } else if(joints == 9){
        val_rmr_rqd = 23
    } else if(joints == 10){
        val_rmr_rqd = 22
    } else if(joints == 11){
        val_rmr_rqd = 21
    } else if(joints == 12){
        val_rmr_rqd = 20
    } else if(joints == 13){
        val_rmr_rqd = 19
    } else if(joints == 14){
        val_rmr_rqd = 18
    } else if(joints == 15){
        val_rmr_rqd = 17
    } else if(joints == 16){
        val_rmr_rqd = 17
    } else if(joints == 17){
        val_rmr_rqd = 16
    } else if(joints == 18){
        val_rmr_rqd = 15
    } else if(joints == 19){
        val_rmr_rqd = 14
    } else if(joints == 20){
        val_rmr_rqd = 14
    } else if(joints == 21){
        val_rmr_rqd = 13
    } else if(joints == 22){
        val_rmr_rqd = 13
    } else if(joints == 23){
        val_rmr_rqd = 12
    } else if(joints == 24){
        val_rmr_rqd = 12
    } else if(joints == 25){
        val_rmr_rqd = 11
    } else if(joints == 26){
        val_rmr_rqd = 11
    } else if(joints == 27){
        val_rmr_rqd = 10
    } else if(joints == 28){
        val_rmr_rqd = 10
    } else if(joints == 29){
        val_rmr_rqd = 9
    } else if(joints == 30){
        val_rmr_rqd = 9
    } else if(joints == 31){
        val_rmr_rqd = 9
    } else if(joints == 32){
        val_rmr_rqd = 8
    } else if(joints == 33){
        val_rmr_rqd = 8
    } else if(joints == 34){
        val_rmr_rqd = 7
    } else if(joints == 35){
        val_rmr_rqd = 7
    } else if(joints == 36){
        val_rmr_rqd = 7
    } else if(joints == 37){
        val_rmr_rqd = 6
    } else if(joints == 38){
        val_rmr_rqd = 6
    } else if(joints == 39){
        val_rmr_rqd = 6
    } else if(joints == 40){
        val_rmr_rqd = 5
    } else if(joints == 41){
        val_rmr_rqd = 4
    } else if(joints == 42){
        val_rmr_rqd = 3
    } else if(joints == 43){
        val_rmr_rqd = 3
    } else if(joints == 44){
        val_rmr_rqd = 2
    } else if(joints == 45){
        val_rmr_rqd = 2
    } else if(joints == 46){
        val_rmr_rqd = 1.5
    } else if(joints == 47){
        val_rmr_rqd = 1
    } else if(joints == 48){
        val_rmr_rqd = 1
    } else if(joints == 49){
        val_rmr_rqd = 0.5
    } else if(joints == 50){
        val_rmr_rqd = 0
    } else {
        val_rmr_rqd = null
    }
    return val_rmr_rqd
}


/**
 * RMRb - Rock Mass Rating basic for classifying rock mass as proposed by Geocontrol (2012) after Bieniawski (1989).
 * @param {Number} rmr_ucs rating of Uniaxial Compressive Strength rating of intact rock
 * @param {Number} rmr_rqd_spacing rating of RMR RQD and spacing of joints
 * @param {Number} discontinuity discontinuity condition as proposed in Bieniawski (1989)
 * @param {Number} groundwater groundwater condition
 * @returns {Number}
 */
function RMRb(rmr_ucs, rmr_rqd_spacing, discontinuity, groundwater){
    let rmrb = 0
    if(rmr_ucs != null && rmr_rqd_spacing != null && discontinuity != null && groundwater != null){
        rmrb = rmr_ucs + rmr_rqd_spacing + discontinuity + groundwater
    } else {
        rmrb = null
    }
    return rmrb
}

module.exports = { CalcRMRucs, CalcRMRrqdSpacing, RMRb }