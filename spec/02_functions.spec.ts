import { isEven } from './utils';
import { exec } from 'child_process';

describe('writing functions', () => {
    describe('3 ways of creating them', () => {
        it('the syntax', () => {

            // named function
            function add(a: number, b: number) {
                return a + b;
            }

            // anonymous
            const subtract = function (a: number, b: number) {
                return a - b;
            };

            // arrow function (expression bodied)
            const multiply = (a: number, b: number) => a * b;

            // arrow function (block bodied)
            const divide = (a: number, b: number) => {
                if (b === 0) {
                    throw new Error('errro');
                }
                return a / b;
            };

            expect(add(2, 2)).toBe(4);
            expect(subtract(10, 2)).toBe(8);
            expect(multiply(3, 3)).toBe(9);
            expect(divide(20, 2)).toBe(10);

        });


        describe('array methods', () => {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            it('look at each one', () => {
                numbers.forEach(n => console.log(n));
            });
            describe('that return other arrays', () => {
                it('has filter', () => {

                    const evens = numbers.filter(isEven);
                    expect(evens).toEqual([2, 4, 6, 8]);
                });
                it('has a map', () => {
                    const doubled = numbers.map(n => n * 2);
                    expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
                    const stringedNumbers = numbers.map(n => n.toString());
                    const doubledEvens = numbers
                        .filter(isEven)
                        .map(n => n * 2);

                });
            });
            describe('methods that returna single(scalar) value', () => {
                it('for checking membership of an array', () => {
                    // these return a bool - the some and every
                    const hasSomeEvens = numbers.some(isEven);
                    expect(hasSomeEvens).toBe(true);
                    const allEven = numbers.every(isEven);
                    expect(allEven).toBe(false);
                });
                it('has a reduce method', () => {

                    const total = numbers.reduce((s, n) => s + n);
                    expect(total).toBe(45);
                    // 100 is an initial value to start with
                    const total2 = numbers.reduce((s, n) => s + n, 100);
                    expect(total2).toBe(145);
                });

            });
            describe('parameters to functions', () => {
                it('cannot overload', () => {
                    function formatName(first: string, last: string, mi?: string) {
                        let fullname = `${last}, ${first}`;
                        if (mi) {
                            fullname += `; $; { mi; } `;
                        }
                    }
                    // expect(formatName('Han', 'Solo')).toBe('Solo', 'Han');
                    // expect(formatName('Han', 'Solo', 'D')).toBe('Solo', 'Han D');
                });
                it('default values and rest', () => {
                    // default values make sendingthe parm into the function optional
                    // rest operator means 'all the remainder'
                    // will create a new array called rest
                    function add(a: number = 10, b: number = 5, ...rest: number[]) {
                        const firstTwo = a + b;
                        return rest.reduce((s, n) => s + n, firstTwo);
                    }

                    expect(add(2, 2)).toBe(4);
                    // pass in parms in order, will use default for second
                    expect(add(2)).toBe(7);
                    // if undefined it will use the default
                    expect(add(undefined, 7)).toBe(17);
                    expect(add()).toBe(15);
                    expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
                });
            });

        });
        describe('quick practice', () => {
            interface Vehicle { vin: string; make: string; year: number; mileage: number; }
            const data: Vehicle[] = [
                { vin: '3938983', make: 'Ford Explorer', year: 2013, mileage: 100_013 },
                { vin: '378493739', make: 'Honda Pilot', year: 2019, mileage: 823 },
                { vin: '3843978', make: 'Chevy Camaro', year: 1973, mileage: 200_232 }
            ];

            it('practice 1', () => {

                const answer = data
                    .filter(v => v.mileage > 100_000)
                    .map(v => v.make);
                expect(answer).toEqual(['Ford Explorer', 'Chevy Camaro']);
            });


        });

        describe('redux for dummies', () => {

            interface Action { type: string; }
            class Increment implements Action {
                readonly type = 'Increment';
            }

            class Decrement implements Action {
                readonly type = 'Decrement';
            }

            class Reset implements Action {
                readonly type = 'Reset';
            }

            it('demo', () => {
                const historyOfActions: Action[] = [
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Decrement(),
                    new Decrement(),
                    new Reset(),
                    new Increment(),
                    new Increment()
                ];

                interface State {
                    count: number;
                }

                const initialState: State = {
                    count: 0
                };

                const finalAnswer = historyOfActions.reduce((s: State, n: Action) => {
                    switch (n.type) {
                        case 'Increment': {
                            return {
                                count: s.count + 1
                            };
                        }
                        case 'Decrement': {
                            return { count: s.count - 1 };
                        }
                        case 'Reset': {
                            return initialState;
                        }
                    }
                }, initialState);

                expect(finalAnswer.count).toBe(2);
            });


        });
    });
});



