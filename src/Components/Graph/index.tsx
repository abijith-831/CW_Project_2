import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarLabelProps, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';

export default function LabelsAboveBars() {
  return (
    <ChartContainer
      xAxis={[{ scaleType: 'band', data: ['Authorised', 'Capital'] }]}
      series={[
        {
          type: 'bar',
          id: 'series1',
          data: [100000, null],
          color: '#3CB5B3',
          stack: 'total'
        },
        {
          type: 'bar',
          id: 'series2',
          data: [null, 170000],
          color: '#0A4E4E',
          stack: 'total'
        }
      ]}
      height={220}
      yAxis={[{ width: 90 }]}
      margin={{ left: 0, right: 120 }}
    >
      <BarPlot barLabel="value" slots={{ barLabel: BarLabel }} />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}

const Text = styled('text')(({ theme }) => ({
  ...theme ?.typography ?.body2,
  stroke: 'none',
  fill: (theme.vars || theme) ?.palette ?.text ?.primary,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  pointerEvents: 'none',
}));

function BarLabel(props: BarLabelProps) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element: SVGTextElement, p) => {
        element.setAttribute('x', p.x.toString());
        element.setAttribute('y', p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}