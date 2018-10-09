const SwaggerParser = require('swagger-parser');
const path = require('path');
const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();


lab.suite('docs', async () => {
    lab.test('docs are valid', { plan: 1 }, async () => {
        try {
            let api = await SwaggerParser.bundle(path.resolve(__dirname, "../../app/docs/index.yml"));
            let valid = await SwaggerParser.validate(api);
            expect(valid).to.be.object();
        }
        catch (err) {
            console.log(err);
        }
    });
});