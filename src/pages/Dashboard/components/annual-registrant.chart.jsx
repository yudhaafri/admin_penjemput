import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useAnnualRegistrantQuery } from "src/hooks/services/useDashboard";
import { DASHBOARD_QUERY_KEY } from "../lib/dashboard.constants";
import { Spinner } from "src/components";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { MdArrowDropDown } from "react-icons/md";
import { formatCurrency } from "src/helpers/utils";

const AnnualRegistrantChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date());

  const { data, isLoading, isError } = useAnnualRegistrantQuery([
    DASHBOARD_QUERY_KEY.ANNUAL_REGISTRANT,
    {
      year: dayjs(selectedYear).format("YYYY"),
    },
  ]);
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };
  const series = useMemo(() => {
    if (!data) return;

    const { data: chartData } = data;

    return {
      innerStudent: {
        percentage: Math.round(
          (chartData.innerStudent / chartData.totalRegistered) * 100 || 0
        ),
        total: chartData.innerStudent,
      },
      outerStudent: {
        percentage: Math.round(
          (chartData.outerStudent / chartData.totalRegistered) * 100 || 0
        ),
        total: chartData.outerStudent,
      },
      totalCanceled: {
        percentage: Math.round(
          (chartData.totalCanceled / chartData.totalRegistered) * 100 || 0
        ),
        total: chartData.totalCanceled,
      },
    };
  }, [data]);

  const [pieChartOptions, setPieChartOptions] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ["#314F84", "#6AD2FF", "#ED2129", "#EFF4FB"],
    labels: ["Anak Dalam", "Anak Luar", "Batal", "Kosong"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  useEffect(() => {
    setPieChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        type: "pie",
        height: "100%",
        width: "100%",
      },
    }));
  }, []);
  return (
    <>
      <div className="p-5 bg-white rounded-xl col-span-3 xl:col-span-1 flex flex-col items-center gap-3">
        <div className="flex w-full justify-between">
          <p className="text-primary-700 font-bold">Pendaftar</p>
          <div className="text-slate-400">
            <DatePicker
              selected={selectedYear}
              onChange={(e) => setSelectedYear(e)}
              renderYearContent={renderYearContent}
              showYearPicker
              dateFormat="yyyy"
              customInput={
                <button className="flex items-center">
                  {dayjs(selectedYear).format("YYYY")}
                  <MdArrowDropDown className="text-xl" />
                </button>
              }
              popperPlacement="left"
              maxDate={new Date()}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>Something went wrong</p>
          </div>
        ) : (
          <>
            <div id="chart" className="p-3 flex-1 min-h-[250px]">
              <Chart
                options={pieChartOptions}
                series={[
                  series.innerStudent.total,
                  series.outerStudent.total,
                  series.totalCanceled.total,
                ]}
                type="pie"
                height="100%"
                width="100%"
              />
            </div>
            <div className="p-5 rounded-md shadow flex gap-3 w-full justify-around">
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#314F84]"></div>
                  <p className="text-xs text-slate-400">Anak Dalam</p>
                </div>
                <p className="text-primary-700 font-semibold text-xl">
                  {series.innerStudent.percentage}%
                </p>
                <p className="text-xs">
                  ({formatCurrency(series.innerStudent.total, "decimal")} Siswa)
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#6AD2FF]"></div>
                  <p className="text-xs text-slate-400">Anak Luar</p>
                </div>
                <p className="text-primary-700 font-semibold text-xl">
                  {series.outerStudent.percentage}%
                </p>
                <p className="text-xs">
                  ({formatCurrency(series.outerStudent.total, "decimal")} Siswa)
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#ED2129]"></div>
                  <p className="text-xs text-slate-400">Batal</p>
                </div>
                <p className="text-primary-700 font-semibold text-xl">
                  {series.totalCanceled.percentage}%
                </p>
                <p className="text-xs">
                  ({formatCurrency(series.totalCanceled.total, "decimal")}{" "}
                  Siswa)
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnnualRegistrantChart;
