module.exports = api => {
    const isTest = api.env('test');

    const targets = {
        browsers: "> 0.25%, not dead"
    }

    if (isTest) {
        delete targets.browsers;
        targets.node = "current";
    }

    return {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-typescript"
        ],
        "plugins": [
            "@babel/plugin-proposal-class-properties"
        ]
    };
};

