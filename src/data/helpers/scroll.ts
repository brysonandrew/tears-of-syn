export const getScrollTopMax = () => {
    let ref;
    return (ref = document.scrollingElement["scrollTopMax"]) != null
        ? ref
        : (document.scrollingElement.scrollHeight - document.documentElement.clientHeight);
};
