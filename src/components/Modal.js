import { useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./ReactPortal";

export default function Modal({ children, isOpen, handleClose }) {

    const nodeRef = useRef(null);

    const closeOnEscapeKey = useCallback(
        (e) => e.key === "Escape" ? handleClose() : null,
        [handleClose],
    )

    useEffect(() => {
        if (!isOpen)
            return

        document.body.addEventListener("keydown", closeOnEscapeKey);

        return () => document.body.removeEventListener("keydown", closeOnEscapeKey);

    }, [isOpen, closeOnEscapeKey]);



    return (
        <ReactPortal wrapperId="modal-root">

            <div className={isOpen ? 'modal' : ''}>
                <CSSTransition
                    in={isOpen}
                    timeout={{ entry: 1000, exit: 0 }}
                    unmountOnExit
                    className="modal-content"
                    nodeRef={nodeRef}
                >
                    <div className="modal-content" ref={nodeRef}>
                        <div className="close-container" onClick={handleClose} >
                            <div className="leftright"></div>
                            <div className="rightleft"></div>
                            <label className="close">close</label>
                        </div>
                        {children}
                    </div>
                </CSSTransition>
            </div>

        </ReactPortal>
    );
}
