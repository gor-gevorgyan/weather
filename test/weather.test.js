const weather = require('./weather');

test('weather api', async () => {
    expect( await weather.checkAPI('london')).toBe('london');
});