import { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "./ReactPortal";

export default function Modal({ children, isOpen, handleClose }) {

    const nodeRef = useRef(null);

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);



    return (
        <ReactPortal wrapperId="modal-root">

            <div className={isOpen ? 'modal' : ''}>
                <CSSTransition
                    in={isOpen}
                    timeout={{ entry: 0, exit: 400 }}
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