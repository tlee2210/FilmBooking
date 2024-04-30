
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const NonAuthLayout = ({ children }) => {

    const selectLayoutState = (state) => state.Layout;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (layout) => ({
            layoutThemeType: layout.layoutThemeType,
            layoutModeType: layout.layoutModeType,
        })
    );
    // Inside your component
    const {
        layoutModeType,
        layoutThemeType,
    } = useSelector(selectLayoutProperties);

    useEffect(() => {
        document.body.setAttribute("data-theme", layoutThemeType);

        if (layoutModeType === "dark") {
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("data-bs-theme", "light");
        }
        return () => {
            document.body.removeAttribute("data-bs-theme");
            document.body.removeAttribute("data-theme");
        };
    }, [layoutModeType]);

    return (
        <div>
            {children}
        </div>
    )
}

export default NonAuthLayout
