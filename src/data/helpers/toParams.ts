const params = [
    "/",
    "activePagePath",
    "activeProjectPath",
    "activeViewPath"
];

export const toParams =
    (path) =>
        path.split("/")
            .reduce((acc, curr, i) => {
                acc[params[i]] = curr;
                return acc;
            }, {});
