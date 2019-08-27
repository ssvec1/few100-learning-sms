import { isEven } from './utils';

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

                    const doubledEvens = numbers
                        .filter(isEven)
                        .map(n => n * 2);

                });
            });
        });
    });
});
