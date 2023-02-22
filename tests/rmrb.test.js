const { CalcRMRucs } = require("../geotekppu-js/rmr/rmr_b_geocontrol2012")

// Test function CalcRMRucs
test('Test function CalcRMRucs #1', () => {
    expect(CalcRMRucs(2501)).toBe(15);
})