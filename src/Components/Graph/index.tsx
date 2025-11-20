import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarLabelProps, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';

interface CompanyDataProps {
  AuthorizedCapital: string;
  CIN: string;
  CompanyCategory: string;
  CompanyClass: string;
  CompanyIndianOrForeignCompany: string;
  CompanyIndustrialClassification: string;
  CompanyName: string;
  CompanyROCcode: string;
  CompanyRegistrationdate_date: string;
  CompanyStateCode: string;
  CompanyStatus: string;
  CompanySubCategory: string;
  Listingstatus: string;
  PaidupCapital: string;
  Registered_Office_Address: string;
  nic_code: string;
}

interface LabelsAboveBarsProps {
  company: CompanyDataProps;
}

export default function LabelsAboveBars({ company }: LabelsAboveBarsProps) {
  console.log('company data:', company);
  
  // Parse capital values from strings to numbers
  const authorizedCapital = parseFloat(company.AuthorizedCapital) || 0;
  const paidupCapital = parseFloat(company.PaidupCapital) || 0;
  
  // Determine listing status
  const isListed = company.Listingstatus?.toLowerCase() === 'listed';
  
  return (
    <div className='border border-border-primary rounded-lg py-2 shadow-md'>
      <div className='flex justify-between px-4'>
        <h1 className='text-primary'>{company.CompanyName.length > 30    ? company.CompanyName.slice(0, 30) + "…"  : company.CompanyName}</h1>
        <h3 className={`border border-border-secondary px-4 text-sm rounded-md text-secondary ${
          isListed ? 'bg-[#D0EFDF]' : 'bg-[#DDEFD0]'
        }`}>
          {isListed ? 'listed' : 'unlisted'}
        </h3>
      </div>
      
      <div className="w-full max-w-[550px] md:max-w-full px-6 md:px-4 xl:px-10 ml-2 md:ml-10 py-2">
        <ChartContainer
          xAxis={[{ scaleType: 'band', data: ['Authorised', 'Paid-up'] }]}
          series={[
            {
              type: 'bar',
              id: 'series1',
              data: [authorizedCapital, null],
              color: '#3CB5B3',
              stack: 'total'
            },
            {
              type: 'bar',
              id: 'series2',
              data: [null, paidupCapital],
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
      </div>

      <div className="flex flex-col gap-2">
        {/* First row */}
        <div className="flex items-center pl-20 lg:pl-30 gap-2">
          <div className="bg-bg-secondary w-4 h-4 rounded-full"></div>
          <div className="flex gap-6">
            <h2 className='text-xs text-fourth'>Authorised capital</h2>
            <h2 className='text-xs text-fourth'>{authorizedCapital.toFixed(2)} Rs</h2>
          </div>
        </div>

        {/* Second row */}
        <div className="flex items-center gap-2 pl-20 lg:pl-30">
          <div className="bg-bg-primary w-4 h-4 rounded-full"></div>
          <div className="flex gap-6">
            <h2 className='text-xs text-fourth'>Paid-up capital</h2>
            <h2 className='text-xs text-fourth pl-5'>{paidupCapital.toFixed(2)} Rs</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const Text = styled('text')(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: 'none',
  fill: (theme.vars || theme)?.palette?.text?.primary,
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