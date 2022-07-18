import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';

describe('Indecision component', () => {
    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    answer: 'yes',
                    forced: false,
                    image: 'https://yesno.wtf/assets/yes/2.gif',
                }),
        })
    );

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, 'log');

        jest.clearAllMocks();
    });

    test('match with the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('write in the input', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hello World');

        expect(clgSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).not.toHaveBeenCalled();
    });

    test('getAnswer have been called', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hello World?');

        expect(getAnswerSpy).toHaveBeenCalled();
    });

    test('testing getAnswer', async () => {
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBe(true);
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
    });

    test('fetch failed', async () => {
        fetch.mockImplementationOnce(() => Promise.reject('API is down'));
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBe(true);
        expect(wrapper.vm.answer).toBe('API Error');
    });
});
