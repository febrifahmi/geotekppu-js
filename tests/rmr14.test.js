const { CalcF0, CalcFexcavation, CalcICE, CalcFStressStrain, RMRbAdj, RMR14 } = require("../geotekppu-js/rmr/rmr_celada_etal2014")

// Test function CalcF0
test('Test function CalcF0 #1', () => {
    expect(CalcF0("dwd",30)).toBe(-2);
})

test('Test function CalcF0 #2', () => {
    expect(CalcF0("dad",91)).toBe(null);
})

test('Test function CalcF0 #3', () => {
    expect(CalcF0("parallel",91)).toBe(null);
})

test('Test function CalcF0 #4', () => {
    expect(CalcF0("irrespective",91)).toBe(null);
})


// Test function CalcFexcavation
test('Test function CalcFexcavation #1', () => {
    expect(CalcFexcavation(39)).toBe(1.3042);
})

test('Test function CalcFexcavation #2', () => {
    expect(CalcFexcavation(41)).toBe(1.28);
})

test('Test function CalcFexcavation #3', () => {
    expect(CalcFexcavation(40)).toBe(1.32);
})

// Testing function CalcICE
test('Testing function CalcICE #1', () => {
    expect(CalcICE(50,251,2,20,1.3)).toBe(1504.9008);
})

test('Testing function CalcICE #2', () => {
    expect(CalcICE('rmrb','ucs','k0','H','F')).toBe(null);
})

// Testing function CalcFStressStrain
test('Testing function CalcFStressStrain #1', () => {
    expect(CalcFStressStrain(1504.9008)).toBe(1);
})

test('Testing function CalcFStressStrain #2', () => {
    expect(CalcFStressStrain(14)).toBe(1.3);
})

test('Testing function CalcFStressStrain #3', () => {
    expect(CalcFStressStrain(17)).toBe(1.2926);
})

// Testing function RMRbAdj
test('Testing function RMRbAdj', () => {
    expect(RMRbAdj(50,-5)).toBe(45);
})

// Testing function RMR14
test('Testing function RMR14', () => {
    expect(RMR14(45,1.32,1.3)).toBe(77.22);
})