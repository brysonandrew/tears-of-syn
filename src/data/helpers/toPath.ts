export const toPath =
    (name) =>
        name.replace(/-/g, "")
            .replace(/\s/g, "-")
            .replace(/[.,]/g, "")
            .toLowerCase();
