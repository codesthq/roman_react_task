import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { createModalWrapper } from '../utils/DOMUtils'

export default function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {

    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            systemCreated = true;
            element = createModalWrapper(wrapperId);
        }
        setWrapperElement(element);
        return () => {
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
