describe('HelloWorld.vue', () => {
    test('must be 10', () => {
        //A
        let value = 5;

        //A
        value = value + 5;

        //A
        expect(value).toEqual(10);
    });
});
