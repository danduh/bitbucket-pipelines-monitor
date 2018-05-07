import * as https from 'https';
import {RequestOptions} from 'https';

export class BitBucketPipelines {
    authToken: string;
    baseUrl = 'api.bitbucket.org';
    config: any;
    email = process.env.BITBUCKET_USER;
    pswd = process.env.BITBUCKET_PSWD;

    constructor(config) {
        this.config = config;
        this.configure();
    }

    configure() {
        this.authToken = Buffer.from(this.email + ':' + this.pswd).toString('base64');
    };

    makeUrl(repo, branch) {
        return `/2.0/repositories/${repo.slug}/pipelines/?fields=%2Bvalues.target.commit.message%2C%2Bvalues.target.%2A%2C%2Bvalues.%2A%2C%2Bpage%2C%2Bsize&page=1&pagelen=${repo.numberOfBuilds}&sort=-created_on&target.ref_name=${branch}&target.ref_type=BRANCH`;
    }

    makeRequest(repo, branch) {
        const options = {
            hostname: this.baseUrl,
            method: 'GET',
            port: 443,
            path: this.makeUrl(repo, branch),
            headers: {Authorization: 'Basic ' + this.authToken}
        };

        return new Promise((resolve, reject) => {
            https.get(<RequestOptions>options, (res) => {
                let resp = '';
                res.on('data', (chunk) => {
                    resp += chunk;
                });
                res.on('end', (chunk) => {
                    resolve(JSON.parse(resp));
                });
                res.on('error', (error) => {
                    console.error(error);
                    resolve(error);
                });
            });
        }).then(this.processData.bind(this, repo));
    }

    parseDate(dateAsString) {
        return dateAsString ? new Date(dateAsString) : null;
    }

    processData(repo, data) {
        if (data.pagelen === 0)
            return;

        const _builds = [];
        data.values.forEach((build) => {

            _builds.push({
                id: build.uuid,
                buildNumber: build.build_number,
                completedOn: build.completed_on,
                creator: build.creator.display_name,
                repository: build.repository.name,
                branch: build.target.ref_name,
                commit: build.target.commit.message,
                statusText: this.getStatusText(build.state.name, (build.state.result || {}).name, (build.state.stage || {}).name),
                status: this.getStatus(build.state.name, (build.state.result || {}).name, (build.state.stage || {}).name),
                isRunning: !build.completed_on,
                startedAt: this.parseDate(build.created_on),
                finishedAt: this.parseDate(build.completed_on),
            });
        });

        return {
            repositoryDisplayName: repo.name,
            repository: data.values[0].repository.name,
            branch: data.values[0].target.ref_name,
            builds: _builds
        };

    }

    getStatus(statusText, resultText, stageStatus) {
        if (statusText === 'COMPLETED' && resultText === 'SUCCESSFUL') return 'Green';
        if (statusText === 'COMPLETED' && resultText === 'FAILED') return 'Red';
        if (statusText === 'COMPLETED' && resultText === 'STOPPED') return 'Gray';
        if (statusText === 'IN_PROGRESS' && stageStatus === 'PAUSED') return '#48807D';
        if (statusText === 'PENDING') return '\'#FFA500\'';
        if (statusText === 'IN_PROGRESS') return 'Blue';
    }

    getStatusText(statusText, resultText, stageStatus) {
        if (statusText === 'COMPLETED' && resultText === 'SUCCESSFUL') return 'Succeeded';
        if (statusText === 'COMPLETED' && resultText === 'FAILED') return 'Failed';
        if (statusText === 'COMPLETED' && resultText === 'STOPPED') return 'Stopped';
        if (statusText === 'IN_PROGRESS' && stageStatus === 'PAUSED') return 'Not All Steps Done';
        if (statusText === 'PENDING') return 'Pending';
        if (statusText === 'IN_PROGRESS') return 'In Progress';

        return statusText;
    }

    async queryBuilds() {

        return Promise.all(this.config.repos.map((repo) => {
            return Promise.all(repo.branches.map((branch) => {
                return this.makeRequest(repo, branch);
            })).catch((err) => {
                console.error(err);
            });

        }))
            .then((resp: any[]) => {
                let newResponse = [];
                resp.forEach((_repo) => {
                    let repo: any = {
                        repository: '',
                        branches: _repo.filter(x => x)
                    };

                    _repo.forEach((branch, i) => {
                        if (i === 0) {
                            repo.repository = branch.repository;
                            repo.repositoryDisplayName = branch.repositoryDisplayName;
                        }
                    });
                    newResponse.push(repo);
                });

                return newResponse;
            })
            .catch((error) => {
                console.error(error);
            });

    }

}
