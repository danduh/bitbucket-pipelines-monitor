export const config = {
    monitor: {
        interval: 5000,
        numberOfBuilds: 12,
        latestBuildOnly: false,
        sortOrder: 'date',
        debug: true
    },
    repos: [
        {
            name: 'Reali Old APP',
            slug: 'reali-dev/reali-web',
            numberOfBuilds: 1,
            branches: ['develop', 'qa', 'master']
        },
        {
            name: 'Reali NG AP',
            slug: 'reali-dev/reali-ng-webapp',
            numberOfBuilds: 1,
            branches: ['dev', 'master', 'qa', 'staging']
        },
        {
            name: 'Reali RIP Office',
            slug: 'reali-dev/reali-back-office',
            numberOfBuilds: 1,
            branches: ['develop', 'qa']
        },
        {
            name: 'Reali NG ECHO',
            slug: 'reali-dev/reali-ng-echo',
            numberOfBuilds: 1,
            branches: ['develop', 'master']
        },
        {
            name: 'Reali GO Api',
            slug: 'reali-dev/go-web-api',
            numberOfBuilds: 1,
            branches: ['master']
        },
    ]
};
