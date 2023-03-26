const { CalcR1, CalcR2, CalcR3, CalcDiscontinuityClass, CalcR5, CalcR5Simple, CalcRMR89 } = require('../geotekppu-js/rmr/rmr__bieniawski1989')

// Test function CalcR1
test('Test strength of intact rock material rating (pls) #1', () => {
    expect(CalcR1("pls",16)).toBe(15);
})

test('Test strength of intact rock material rating (pls) #2', () => {
    expect(CalcR1("pls",5)).toBe(12);
})

test('Test strength of intact rock material rating (ucs) #3', () => {
    expect(CalcR1("ucs",251)).toBe(15);
})

test('Test strength of intact rock material rating (pls) #4', () => {
    expect(CalcR1('plss',15)).toBe(null);
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

// Test function CalcR5
test('Test function CalcR5 #1', () => {
    expect(CalcR5("None",0,"dry")).toBe(15);
})

test('Test function CalcR5 #2', () => {
    expect(CalcR5(10,0.15,"wet")).toBe(7);
})

// Test function CalcR5Simple
test('Test function CalcR5Simple #1', () => {
    expect(CalcR5Simple('dry')['val_r5']).toBe(15);
})

test('Test function CalcR5Simple #2', () => {
    expect(CalcR5Simple('damp')['val_r5']).toBe(10);
})

test('Test function CalcR5Simple #3', () => {
    expect(CalcR5Simple('wet')['val_r5']).toBe(7);
})

test('Test function CalcR5Simple #4', () => {
    expect(CalcR5Simple('dripping')['val_r5']).toBe(4);
})

test('Test function CalcR5Simple #5', () => {
    expect(CalcR5Simple('flowing')['val_r5']).toBe(0);
})


// Test function CalcRMR89
test('Test function CalcRMR89', () => {
    expect(CalcRMR89(CalcR1("pls",251),CalcR2(92),CalcR3(0.6),CalcDiscontinuityClass(1,0.1,"rough","hl<5","slightly_weathered"),CalcR5("None",0,"dry"))).toBe(87);
})