const { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass } = require('../geotekppu-js/rmr/rmr__bieniawski1989')

// Test function CalcR1
test('Test strength of intact rock material rating (pls) #1', () => {
    expect(CalcR1("pls",16)).toBe(15);
})

test('Test strength of intact rock material rating (ucs) #1', () => {
    expect(CalcR1("ucs",251)).toBe(15);
})

// Test function CalcR2
test('Test Drill core RQD rating', () => {
    expect(CalcR2(100)).toBe(20);
})

// Test function CalcR3
test('Space of discontinuity rating', () => {
    expect(CalcR3(2.1)).toBe(20);
})