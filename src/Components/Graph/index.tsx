import { useAnimate } from '@mui/x-charts/hooks';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarLabelProps, BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { styled } from '@mui/material/styles';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
  const {t} = useTranslation()
  
  const authorizedCapital = parseFloat(company.AuthorizedCapital) || 0;
  const paidupCapital = parseFloat(company.PaidupCapital) || 0;

  const theme = useSelector((state:any)=> state.auth.currentUser?.theme_preference) || 'light';
  const axisColor = theme === 'dark' ? '#DEDEDE' : '#2E2E2E'
  
  const isListed = company.Listingstatus?.toLowerCase() === 'listed';
  
  return (
    <div className='border border-border-primary overflow-hidden  dark:border-[#4b5563] rounded-lg py-2 shadow-md'>
      <div className='flex justify-between px-4 overflow-hidden'>
        <div className="relative group w-fit">
          <h1 className="text-primary text-xs md:text-md dark:text-table-header lg:text-base">
            {company.CompanyName.length > 30
              ? company.CompanyName.slice(0, 30) + "…"
              : company.CompanyName}
          </h1>

          {/* Tooltip */}
          {company.CompanyName.length > 30 && (
            <span className="absolute -top-8 left-0 scale-0 group-hover:scale-100 transition-transform bg-bg-primary text-table-header text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {company.CompanyName}
            </span>
          )}
        </div>

        <h3 className={`border border-border-secondary md:pt-0.5 px-1 sm:px-2 md:px-4 text-sm rounded-sm text-badge ${company.CompanyStatus==='Active' ? 'bg-[#DDEFD0]' : company.CompanyStatus==='Strike Off'?'bg-[#EFCBC6]':'bg-blue-200'}`}>{company.CompanyStatus.length > 12    ? company.CompanyStatus.slice(0, 12) + "…"  : company.CompanyStatus}</h3>
      </div> 
      
      <div className="w-full max-w-[550px] text-red-500 dark:text-table-header  md:max-w-full px-2 sm:px-6 md:px-4 xl:px-10 ml-2 md:ml-10 py-2">
        <ChartContainer
          xAxis={[{ scaleType: 'band', data: [t("AuthorizedCapital"), t("PaidupCapital")] }]}
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
          margin={{ left: 0, right: 120 }} >
          <BarPlot  barLabel="value" slots={{ barLabel: BarLabel }}
              slotProps={{
                barLabel: { sx: { fill: axisColor } 
                }
              }} />

          <ChartsXAxis
              sx={{
                "& .MuiChartsAxis-tickLabel": {
                  fill: axisColor, 
                },
                "& .MuiChartsAxis-line": {
                  stroke: axisColor,
                }
              }} />

                      <ChartsYAxis
              sx={{
                "& .MuiChartsAxis-tickLabel": {
                  fill: axisColor,
                },
                "& .MuiChartsAxis-line": {
                  stroke: axisColor,
                }
              }} />

        </ChartContainer>
      </div>

      <div className="flex flex-col gap-2">
        {/* First row */}
        <div className="flex items-center pl-20 lg:pl-30 gap-2">
          <div className="bg-bg-secondary w-3 h-3 md:w-4 md:h-4 rounded-full dark:border "></div>
          <div className="flex gap-6">
            <h6 className='text-xs text-fourth dark:text-table-header'>{t("AuthorizedCapital")}</h6>
            <h2 className='text-xs text-fourth dark:text-table-header'>{authorizedCapital.toFixed(2)} Rs</h2>
          </div>
        </div>

        {/* Second row */}
        <div className="flex items-center gap-2 pl-20 lg:pl-30">
          <div className="bg-bg-primary w-3 h-3 md:w-4 md:h-4 rounded-full dark:border"></div>
          <div className="flex gap-6">
            <h2 className='text-xs text-fourth dark:text-table-header'>{t("PaidupCapital")}</h2>
            <h2 className='text-xs text-fourth pl-5 dark:text-table-header'>{paidupCapital.toFixed(2)} Rs</h2>
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