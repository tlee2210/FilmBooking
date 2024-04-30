const getChartColorsArray = (chartId) => {
    const chartElement = document.getElementById(chartId);
    if (chartElement !== null) {
        const colorAttr = "data-colors" + ("-" + document.documentElement.getAttribute("data-theme") ?? "");
        console.log("chartElement",colorAttr)
      let colors = chartElement.getAttribute(colorAttr) ?? chartElement.getAttribute("data-colors");
  
      if (colors) {
        colors = JSON.parse(colors);
  
        return colors.map((value) => {
          const newValue = value.replace(" ", "");
  
          if (newValue.indexOf(",") === -1) {
            const color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
  
            if (color) return color;
            else return newValue;
          } else {
            const val = value.split(',');
  
            if (val.length === 2) {
              let rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
              rgbaColor = `rgba(${rgbaColor},${val[1]})`;
              return rgbaColor;
            } else {
              return newValue;
            }
          }
        });
      } else {
        console.warn('data-colors attributes not found on', chartId);
      }
    }
  
    return undefined;
  };
  

export default getChartColorsArray;
