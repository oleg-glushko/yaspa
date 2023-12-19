import { withoutNulls } from './utils/arrays'

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
    COMPONENT: 'component',
};

export function h(tag, props = {}, children = []) {
    const type = typeof tag === 'string'
        ? DOM_TYPES.ELEMENT
        : DOM_TYPES.COMPONENT;

    return {
        tag,
        props,
        type,
        children: mapTextNodes(withoutNulls(children)),
    };
}

export function hString(str) {
    return { type: DOM_TYPES.TEXT, value: String(str) };
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes))
    };
}

function mapTextNodes(children) {
    return children.map((child) =>
        typeof child === 'string'
            || typeof child === 'number'
            || typeof child === 'boolean'
            || typeof child === 'bigint'
            || typeof child === 'symbol'
            ? hString(child)
            : child);
}

export function extractChildren(vdom) {
    if (vdom.children == null)
        return [];

    const children = [];

    for (const child of vdom.children) {
        if (child.type === DOM_TYPES.FRAGMENT) {
            children.push(...extractChildren(child));
        } else {
            children.push(child);
        }
    }

    return children;
}
