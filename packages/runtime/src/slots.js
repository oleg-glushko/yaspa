import { DOM_TYPES, hFragment } from "./h";
import { traverseDFS } from "./traverse-dom";

export function fillSlots(vdom, externalContent = []) {
    function processNode(node, parent, index) {
        insertViewInSlot(node, parent, index, externalContent);
    }

    traverseDFS(vdom, processNode, shouldSkipBranch);
}

function insertViewInSlot(node, parent, index, externalContent) {
    if (node.type !== DOM_TYPES.SLOT) return;

    const defaultContent = node.children;
    const content = externalContent.length > 0 ? externalContent : defaultContent;

    content.length > 0
        ? parent.children.splice(index, 1, hFragment(content))
        : parent.children.splice(index, 1);
}

function shouldSkipBranch(node) {
    return node.type === DOM_TYPES.COMPONENT;
}
