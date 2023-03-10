const { FactorF1, FactorF2, FactorF3, FactorF4, SMR2015 } = require("../geotekppu-js/smr/smr__romana_ts2015")

// Test function FactorF1
test('Test function FactorF1 #1', () => {
    expect(FactorF1("P",120,60)).toBe(0.15);
})

test('Test function FactorF1 #2', () => {
    expect(FactorF1("P",90,60)).toBe(0.40);
})

test('Test function FactorF1 #3', () => {
    expect(FactorF1("P",75,60)).toBe(0.70);
})

test('Test function FactorF1 #4', () => {
    expect(FactorF1("P",66,60)).toBe(0.85);
})

test('Test function FactorF1 #5', () => {
    expect(FactorF1("P",65,60)).toBe(1.00);
})

test('Test function FactorF1 #6', () => {
    expect(FactorF1("T",65,60)).toBe(0.15);
})

test('Test function FactorF1 #7', () => {
    expect(FactorF1("T",360,155)).toBe(0.40);
})

test('Test function FactorF1 #8', () => {
    expect(FactorF1("T",360,160)).toBe(0.70);
})

test('Test function FactorF1 #9', () => {
    expect(FactorF1("T",360,170)).toBe(0.85);
})

test('Test function FactorF1 #10', () => {
    expect(FactorF1("T",360,176)).toBe(1.00);
})

// Test function FactorF2
test('Test function FactorF2 #1', () => {
    expect(FactorF2("P",55)).toBe(1.0);
})

test('Test function FactorF2 #2', () => {
    expect(FactorF2("P",45)).toBe(1.0);
})

test('Test function FactorF2 #3', () => {
    expect(FactorF2("P",44)).toBe(0.85);
})

test('Test function FactorF2 #4', () => {
    expect(FactorF2("P",35)).toBe(0.85);
})

test('Test function FactorF2 #5', () => {
    expect(FactorF2("P",34)).toBe(0.70);
})

test('Test function FactorF2 #6', () => {
    expect(FactorF2("P",30)).toBe(0.70);
})

test('Test function FactorF2 #7', () => {
    expect(FactorF2("P",29)).toBe(0.40);
})

test('Test function FactorF2 #8', () => {
    expect(FactorF2("P",20)).toBe(0.40);
})

test('Test function FactorF2 #9', () => {
    expect(FactorF2("P",19)).toBe(0.15);
})

// Test function FactorF3
test('Test function FactorF3 #1', () => {
    expect(FactorF3("P",45,20)).toBe(0);
})

test('Test function FactorF3 #2', () => {
    expect(FactorF3("P",25,20)).toBe(-6);
})

test('Test function FactorF3 #3', () => {
    expect(FactorF3("P",20,20)).toBe(-25);
})

test('Test function FactorF3 #4', () => {
    expect(FactorF3("P",11,20)).toBe(-50);
})

test('Test function FactorF3 #5', () => {
    expect(FactorF3("P",1,20)).toBe(-60);
})

// Test function FactorF4
test('Test function FactorF4 #1', () => {
    expect(FactorF4("pre")).toBe(10);
})

test('Test function FactorF4 #2', () => {
    expect(FactorF4("sb")).toBe(8);
})

test('Test function FactorF4 #3', () => {
    expect(FactorF4("ns")).toBe(15);
})

test('Test function FactorF4 #4', () => {
    expect(FactorF4("bm")).toBe(0);
})

// Test function SMR2015
test('Test function SMR2015 #1', () => {
    expect(SMR2015(60,0.40,0.70,-6,15)).toBe(73.32);
})

test('Test function SMR2015 #2', () => {
    expect(SMR2015(60,0.15,0.15,0,15)).toBe(75);
})

test('Test function SMR2015 #3', () => {
    expect(SMR2015(45,0.15,0.15,0,15)).toBe(60);
})

test('Test function SMR2015 #4', () => {
    expect(SMR2015(75,0.15,0.15,0,15)).toBe(90);
})
