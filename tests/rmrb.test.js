const { CalcRMRucs, CalcRMRrqdSpacing, RMRb } = require("../geotekppu-js/rmr/rmr_b_geocontrol2012")
const { CalcDiscontinuityClass, CalcR5 } = require("../geotekppu-js/rmr/rmr__bieniawski1989")


// Test function CalcRMRucs
test('Test function CalcRMRucs #1', () => {
    expect(CalcRMRucs(2501)).toBe(15);
})

// Test function CalcRMRrqdSpacing
test('Test function CalcRMRrqdSpacing #1', () => {
    expect(CalcRMRrqdSpacing(5)).toBe(27);
})

// Test function RMRb
test('Test function RMRb', () => {
    expect(RMRb(CalcRMRucs(2501), CalcRMRrqdSpacing(5), CalcDiscontinuityClass(0.5, 0.1, "rough", "hl<5", "decomposed"), CalcR5("None", 0, "dry"))).toBe(76);
})