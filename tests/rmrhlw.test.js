const { AdjustedR1ucs, AdjustedR2, AdjustedR3, CalcR6, CalcR7, CalcR8, CalcR9 } = require("../geotekppu-js/rmr/rmr_hlw_tong_etal2022")

// Test function AdjustedR1ucs
test('Test function AdjustedR1ucs #1', () => {
    expect(AdjustedR1ucs(200)).toBe(12.4981);
})

test('Test function AdjustedR1ucs #2', () => {
    expect(AdjustedR1ucs(245)).toBe(14.215);
})

test('Test function AdjustedR1ucs #3', () => {
    expect(AdjustedR1ucs(25)).toBe(3.3421);
})

test('Test function AdjustedR1ucs #4', () => {
    expect(AdjustedR1ucs(251)).toBe(15);
})

// Test function AdjustedR2
test('Test function AdjustedR2 #1', () => {
    expect(AdjustedR2(99)).toBe(20.0326);
})

test('Test function AdjustedR2 #2', () => {
    expect(AdjustedR2(100)).toBe(20);
})

test('Test function AdjustedR2 #3', () => {
    expect(AdjustedR2(200)).toBe(null);
})

// Testing function AdjustedR3
test('Testing function AdjustedR3 #1', () => {
    expect(AdjustedR3(2.0)).toBe(20);
})

test('Testing function AdjustedR3 #2', () => {
    expect(AdjustedR3(1.9)).toBe(19.1897);
})

// Testing function CalcR6
test('Testing function CalcR6', () => {
    expect(CalcR6("tunnel","fair")).toBe(-5);
})

// Testing function CalcR7
test('Testing function CalcR7', ()=>{
    expect(CalcR7(-4,80)).toBe(-320);
})

// Testing function CalcR8
test('Testing function CalcR8', () => {
    expect(CalcR8(0.6)).toBe(-4.80);
})

// Testing function CalcR9
test('Testing function CalcR9 #1', () => {
    expect(CalcR9(7,11,16)).toBe(0);
})

test('Testing function CalcR9 #2', () => {
    expect(CalcR9(7,11,21)).toBe(-4);
})

test('Testing function CalcR9 #3', () => {
    expect(CalcR9(3,51,19)).toBe(-8);
})

test('Testing function CalcR9 #4', () => {
    expect(CalcR9(3,16,21)).toBe(-8);
})

test('Testing function CalcR9 #5', () => {
    expect(CalcR9(11,52,21)).toBe(-8);
})