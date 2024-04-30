import { useEffect, useState } from 'react';
import getChartColorsArray from '../Common/DynamicChartsColor';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const useChartColors = (chartId) => {
  const [chartColors, setChartColors] = useState([]);

  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutThemeType: layout.layoutThemeType,
      layoutThemeColorType: layout.layoutThemeColorType
    })
  );
  // Inside your component
  const {
    layoutThemeType, layoutThemeColorType
  } = useSelector(selectLayoutProperties);
  
  useEffect(() => {
    const colors = getChartColorsArray(chartId);
    setChartColors(colors);
  }, [chartId, layoutThemeType, layoutThemeColorType]);

  return chartColors;
};

export default useChartColors;
