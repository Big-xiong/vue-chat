// 元素相对于body的offsetTop
export const getOffsetTopByBody = (el) => {
    let offsetTop = 0
    while (el && el.tagName !== 'BODY') {
        offsetTop += el.offsetTop
        el = el.offsetParent
    }
    return offsetTop
}

export const loadScript = ({ id, url,custom, cb }) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.id = id;
    script.custom = custom;
    script.onload = () => {
        cb && cb();
    };
    document.body.appendChild(script);
}