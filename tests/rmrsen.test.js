const { RMR02pls, RMR02ucs } = require("../geotekppu-js/rmr/rmr__sen_sadagah2002")

// Test function RMR02pls
test('Test function RMR02pls #1', () => {
    expect(RMR02pls(1.2,20,5,-5,-5)).toBe(85.7223);
})

test('Test function RMR02pls #2', () => {
    expect(RMR02pls(1.2,null,5,-5,-5)).toBe(null);
})

// Test function RMR02ucs
test('Test function RMR02ucs #1', () => {
    expect(RMR02ucs(1.2,200,5,-5,-5)).toBe(65.6523);
})

test('Test function RMR02ucs #1', () => {
    expect(RMR02ucs(null,200,5,-5,-5)).toBe(null);
})

