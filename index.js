import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const ResizablePanels = ({
  children,
  key, // key used mainly for local storage if we have multiple resizable uses
  showResizable, // condition to show or hide resizables or not
  hideInitial, // if we want to hide the first child on init
  onResize, // callback on resize
  className
}) => {
    const resizableRef = React.createRef();

    const [isDragging, setIsDragging] = useState(false);
    const [panels, setPanels] = useState([74, 74, 74]);
    const [delta, setDelta] = useState(null);
    const [currentPanel, setCurrentPanel] = useState(0);
    const [initialPos, setInitialPos] = useState(null);
    const rest = children.slice(1);

    useEffect(() => {
        const currentRef = resizableRef.current;
        resizableRef.current.addEventListener("mousemove", resizePanel);
        resizableRef.current.addEventListener("mouseup", stopResize);
        resizableRef.current.addEventListener("mouseleave", stopResize);

        return () => {
            currentRef.removeEventListener("mousemove", resizePanel);
            currentRef.removeEventListener("mouseup", stopResize);
            currentRef.removeEventListener("mouseleave", stopResize);
        };
    }, [resizePanel, stopResize, resizableRef]);

    useEffect(() => {
        if (key != "") {
            const storedPanelWidths = localStorage.getItem(key);
            if (storedPanelWidths && showResizable) {
                setPanels(JSON.parse(storedPanelWidths));
                onResize(JSON.parse(storedPanelWidths));
            } else {
                setPanels([74, 74, 74]);
            }
        }
    }, [key, onResize, setPanels, showResizable]);

    const startResize = useCallback((event, index) => {
        setIsDragging(true);
        setCurrentPanel(index);
        setInitialPos((event.clientX / document.documentElement.clientWidth) * 100);
    }, []);

    // magic don't touch - vu
    const stopResize = useCallback(() => {
        if (isDragging) {
            setPanels({
                ...panels,
                [currentPanel]: (panels[currentPanel] || 0) - delta,
                [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta,
            });
            setIsDragging(false);
            setDelta(0);
            setCurrentPanel(0);
            if (key != "") {
                localStorage.setItem(
                    key,
                    JSON.stringify({
                        ...panels,
                        [currentPanel]: (panels[currentPanel] || 0) - delta,
                        [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta,
                    })
                );
                onResize({
                    ...panels,
                    [currentPanel]: (panels[currentPanel] || 0) - delta,
                    [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta,
                });
            }
        }
    }, [currentPanel, delta, key, isDragging, onResize, panels]);

    const resizePanel = useCallback(
        event => {
            if (isDragging) {
                const delta = (event.clientX / document.documentElement.clientWidth) * 100 - initialPos;
                setDelta(delta);
            }
        },
        [initialPos, isDragging]
    );

    return (
        <div
            ref={resizableRef}
            className={`panel-container ${className ? className : ""}`}
            onMouseUp={() => stopResize()}
        >
            <div className="panel" style={!hideInitial ? { width: `calc(100% - ${panels[1]}vw)` } : { width: 0 }}>
                {children[0]}
            </div>
            {[].concat(
                ...rest.map((child, i) => {
                    if (rest.length - 1 === i) {
                        if (!showResizable) {
                            return [
                                <div
                                    key={"panel_" + i}
                                    className="panel"
                                    style={{ width: `${panels[i + 1]}vw`, flex: "1 1 0%" }}
                                >
                                    {child}
                                </div>,
                            ];
                        }
                        return [
                            <div
                                onMouseDown={e => startResize(e, i + 1)}
                                key={"resizer_" + i}
                                style={currentPanel === i + 1 ? { left: delta } : {}}
                                className="resizer"
                            />,
                            <div
                                key={"panel_" + i}
                                className="panel"
                                style={{ width: `${panels[i + 1]}vw`, flex: "1 1 0%" }}
                            >
                                {child}
                            </div>,
                        ];
                    } else {
                        if (!showResizable) {
                            return [
                                <div key={"panel_" + i} className="panel" style={{ width: panels[i + 1] }}>
                                    {child}
                                </div>,
                            ];
                        }
                        return [
                            <div
                                onMouseDown={e => startResize(e, i + 1)}
                                key={"resizer_" + i}
                                style={currentPanel === i + 1 ? { left: delta } : {}}
                                className="resizer"
                            />,
                            <div key={"panel_" + i} className="panel" style={{ width: `${panels[i + 1]}vw` }}>
                                {child}
                            </div>,
                        ];
                    }
                })
            )}
        </div>
    );
};

ResizablePanels.propTypes = {
    children: PropTypes.any,
    showResizable: PropTypes.bool,
    hideInitial: PropTypes.bool,
    key: PropTypes.string,
    onResize: PropTypes.func,
    key: PropTypes.any,
    className: PropTypes.string,
};

export default ResizablePanels;
