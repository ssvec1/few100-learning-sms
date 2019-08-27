import { type } from 'os';

describe('declaring variables with typescript', () => {
    it('implicit declaraton', () => {
        let name = 'Joe';
        name = 'Joseph';
        // name = 1137;  does not like this

        let x;
        x = 'Joe';
        x = 1137;  // this is ok because x was not initialized a value that TS will use the define the type

    });
    it('union types', () => {
        // i am ok with x being a string or a number but nothing else
        let x: string | number;
        x = 'Joe';
        x = 1137;
        // x = ['dog'];  cant be an array

        let seatType: 'aisle' | 'window' | 'middle';
        // seatType = 'jump';  can only be one of the declared values;
        seatType = 'middle';
    });
    it('about const', () => {
        const PI = 3.14;
        // PI = 3; cant change the value of a const

        const friends = ['Sean', 'Ed'];
        friends[2] = 'Bill';  // Ths is ok because its an array, just cant point it to a different array

        const movie = {
            title: 'Rise of Skywalker',
            director: 'Abrams'
        };

        movie.director = 'JJ Abrams'; // this is a property
    });
    it('has a var keyword but dont use var', () => {
        const age = 22;

        if (age > 21) {
            // tslint:disable-next-line: no-var-keyword
            var message = 'Old enough';
        }

        expect(message).toBe('Old enough'); // this works but is BAD
    });
});

describe('type literals', () => {
    describe('string literals', () => {
        it('can be a single quote', () => {
            const name = 'joe';
            expect(typeof (name)).toBe('string');
            // tslint:disable-next-line: quotemark --disable lint rule because it will correct this
            expect(name).toEqual("joe"); // can be double or single

            const quote = 'favorite author is Bill O\'Connor'; // have to escape or use a combo of double and single quotes

        });
        it('template strings', () => {
            // can delimit a string with a backtick to do multiline
            const story = ` chapter 1
            it was a dark
             and stormy night`;
            console.log(story);

            const customer = 'Bob';
            const creditLimit = 3000;

            const s1 = 'the customer is ' + customer + ' and limit is ' + creditLimit;
            const s2 = 'the customer is ${customer} and limit is  ${creditLimit}';

        });
    });
    describe('number literals', () => {
        const n1 = 10;
        const n2 = 3.4;
        const n3 = 1_000_000;
        const n4 = 0b10101;
        const n5 = 0xfff;
        const n6 = 0o123;

    });
    describe('array literals', () => {
        it('array', () => {

            const numbers = [1, 2, 3, 4, 5];
            // numbers[0] = 'dog';
            const empty = [];
            empty[0] = 1;
            empty[2] = 'tacos';
            empty[3] = empty;
            empty[999] = 'more tacos';
            expect(empty[2]).toBe('tacos');
            // expect(empty[3][2]).toBe('tacos');

            const friends: string[] = [];
            const workFriends: Array<string>;

            friends[0] = 'Zosia';
            expect(friends[3]).toBeUndefined();
        });
        it('array union', () => {
            const v1: (string | number)[];
            const v2: Array<string | number> = [];

            v2[0] = 'dog';
            v2[1] = 'cat';
            v2[2] = 99;

            const first = v2[1];

        });

    });
    describe('tuples', () => {
        it('basic syntax', () => {
            type Person = [string, string, number];
            const friend: Person = ['Warren', 'Ellis', 58];
            const age = friend[2];
            const friends2: Person = ['Nick', 'Cave', 62];
            // side hike.
            type ThingyWithLetters = string;

            const name: ThingyWithLetters = 'Jeff';
        });
        it('tuple destructuring', () => {
            type Age = number;
            type Person = [string, string, Age];
            const blixa: Person = ['Blixa', 'Bargelt', 58];

            // const lastName = blixa[1];
            // const age = blixa[2];
            const [, lastName, age] = blixa;

            expect(lastName).toBe('Bargelt');
            expect(age).toBe(58);

            const [first, , herbert] = [1974, 3, 20];
            expect(first).toBe(1974);
            expect(herbert).toBe(20);
        });
        it('an example - using a tuple', () => {

            function formatName(first: string, last: string): [string, number] {
                const name = `${last}, ${first}`;
                return [name, name.length];
            }

            const [fullName] = formatName('Han', 'Solo');
            expect(fullName).toBe('Solo, Han');
            // expect(len).toBe(9);

            function formatName2(first: string, last: string) {
                const name = `${last}, ${first}`;
                return {
                    fullName: name,
                    length: name.length
                };
            }

            const { fullName: fname } = formatName2('Luke', 'Skywalker');
            expect(fname).toBe('Skywalker, Luke');
        });
        describe('object literals', () => {
            it('creating them', () => {
                interface Movie {
                    title: string;
                    director: string;
                    yearReleased: number;
                    cast: {
                        role: string;
                        actor: string;
                    }[];
                }
                // curlies are the delimitiers for objects and blocks(ifs)
                // key value pairs
                const movie: Movie = {
                    title: 'Thor Ragnarok',
                    director: 'Taika Waitit',
                    yearReleased: 2017,
                    cast: [
                        { role: 'Thor', actor: 'Chris Hemsworth' },
                        { role: 'Loki', actor: 'Tom Hiddleston' }
                    ]
                };

                expect(movie.title).toBe('Thor Ragnarok');
                expect(movie.cast[0].actor).toBe('Chris Hemsworth');
                // movie.yearreleased = 2018;
                movie.cast = [...movie.cast, { role: 'Valkrie', actor: 'Tessa Thompson' }];
            });
            it('duck typing', () => {
                // ts calls this structural typing
                // if it walks and talks like a duck its probably a duck
                // pass in whatever you want to this function it just needs a message
                interface ThingWithAMessage {
                    message: string;
                }
                function logIt(thingy: ThingWithAMessage): void {

                    console.log(`At ${new Date().toString()} this happened: ${thingy.message}`);
                }

                // logIt();
                // logIt("dog");
                logIt({ message: 'Get Milk' });

                const phoneCall = { from: 'Yer Mom', message: 'Call Me' };
                logIt(phoneCall);

                class Meeting {
                    message: string;
                    fromtime: string;
                    toTime: string;

                }
                const s = new Meeting();
                s.fromtime = 'Noon';
                s.message = 'Getting sales inline!';
                s.toTime = 'Dinner';

                logIt(s);
            });

            it('interface details', () => {
                interface Point {
                    x: number;
                    y: number;
                    z?: number;  // this is optional
                }

                // it doesnt inherit from Point but it is still considered one because it is structurally the same
                const middle = { x: 20, y: 30 };
                plotIt(middle);

                const left: Point = { x: 12, y: 5 };
                plotIt(left);

                function plotIt(p: Point) { }

                interface ThingWithAMessage {
                    message: string;
                }
                function logIt(thingy: ThingWithAMessage): void {

                    console.log(`At ${new Date().toString()} this happened: ${thingy.message}`);
                }

                // logIt();
                // logIt("dog");
                logIt({ message: 'Get Milk' });

                const phoneCall = { from: 'Yer Mom', message: 'Call Me' };
                logIt(phoneCall);

                class Meeting {
                    message: string;
                    fromtime: string;
                    toTime: string;

                }
                const s = new Meeting();
                s.fromtime = 'Noon';
                s.message = 'Getting sales inline!';
                s.toTime = 'Dinner';

                logIt(s);



            });
        });
    });
});

