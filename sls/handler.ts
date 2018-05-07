import {BitBucketPipelines} from './handlers/bitbucket-pipelines';
import {config} from './config';

const bitBucketBuilds = async (event, context, callback) => {
    const service = new BitBucketPipelines(config);
    const resp = await service.queryBuilds();

    const results = {
        statusCode: 200,
        body: resp,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

    callback(null, results);
};

module.exports.handler = bitBucketBuilds;
