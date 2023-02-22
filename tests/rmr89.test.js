const { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass } = require('../geotekppu-js/rmr/rmr__bieniawski1989')

// Test function CalcR1
test('Test strength of intact rock material rating (pls) #1', () => {
    expect(CalcR1("pls",16)).toBe(15);
})

test('Test strength of intact rock material rating (ucs) #1', () => {
    expect(CalcR1("ucs",251)).toBe(15);
})

// Test function CalcR2
test('Test Drill core RQD rating #1', () => {
    expect(CalcR2(100)).toBe(20);
})

// Test function CalcR3
test('Test Space of discontinuity rating #1', () => {
    expect(CalcR3(2.1)).toBe(20);
})

// Test function CalcDiscontinuityClass
test('Test Classification of discontinuity condition #1', () => {
    expect(CalcDiscontinuityClass(0.9,"None","very_rough","None","unweathered")).toBe(30);
})