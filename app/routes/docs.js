const SwaggerParser = require('swagger-parser');
const path = require('path');

exports.routes = {
    name: 'docs',
    version: '1.0.0',
    register: async (server, options) => {
        await server.route({
            method: 'GET',
            path: '/docs.{ext}',
            config: { 
                auth: 'jwt'
            },
            handler: async (request, h) => {
                let docs = await SwaggerParser.bundle(path.resolve(__dirname, "../docs/index.yml"));
                switch (request.params.ext) {
                    case 'yml':
                        return SwaggerParser.YAML.stringify(docs);
                    default:
                        return docs;
                }

            }
        });
    }
}