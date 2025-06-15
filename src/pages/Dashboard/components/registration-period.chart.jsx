import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import { FaRegCalendar } from "react-icons/fa";
import { InformationModal, Spinner } from "src/components";
import useDashboardStore from "../stores/dashboard.z-store";
import { useShallow } from "zustand/react/shallow";
import useDashboardHooks from "../stores/dashboard.hooks";
import { CHART_TYPE, DASHBOARD_QUERY_KEY } from "../lib/dashboard.constants";
import { useRegistrationPeriodQuery } from "src/hooks/services/useDashboard";
import dayjs from "dayjs";
import { formatCurrency } from "src/helpers/utils";

const RegistrationPeriodChart = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const { dateRegistrationPeriod } = useDashboardStore(
    useShallow((state) => ({
      dateRegistrationPeriod: state.dateRegistrationPeriod,
    }))
  );

  const { onChangeDate, getDate } = useDashboardHooks();

  const { data, isLoading, isError } = useRegistrationPeriodQuery([
    DASHBOARD_QUERY_KEY.REGISTRATION_PERIOD,
    {
      dateRegistrationPeriodStart: dayjs(
        getDate(CHART_TYPE.REGISTRATION_PERIOD)[0]
      ).format("YYYY-MM-DD"),
      dateRegistrationPeriodEnd: dayjs(
        getDate(CHART_TYPE.REGISTRATION_PERIOD)[1]
      ).format("YYYY-MM-DD"),
    },
  ]);

  const categories = useMemo(() => {
    if (!data?.data?.data) return [];

    const { data: chartData } = data;
    return chartData.data?.map((item) => item.label) || [];
  }, [data]);

  const barSeries = useMemo(() => {
    if (!data?.data?.data)
      return [
        { name: "Anak Dalam", data: [] },
        { name: "Anak Luar", data: [] },
      ];

    const { data: chartData } = data;

    return [
      {
        name: "Anak Dalam",
        data: chartData.data?.map((item) => item.innerStudent || 0) || [],
      },
      {
        name: "Anak Luar",
        data: chartData.data?.map((item) => item.outerStudent || 0) || [],
      },
    ];
  }, [data]);

  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#314F84", "#6AD2FF"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 10,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    grid: {
      strokeDashArray: 4,
      yaxis: {
        labels: {
          show: true,
        },
        lines: {
          show: true,
        },
      },
    },
  });

  useEffect(() => {
    if (!categories.length) return;

    setBarChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        type: "bar",
        height: "100%",
        width: "100%",
      },
      xaxis: {
        categories: categories,
      },
    }));
  }, [categories]);

  return (
    <>
      <InformationModal
        isOpen={showDatepicker}
        handleClose={() => {
          setShowDatepicker(false);
        }}
        withHeader={false}
      >
        <div id="dashboard-datepicker">
          <DatePicker
            onChange={(e) => onChangeDate(e, CHART_TYPE.REGISTRATION_PERIOD)}
            startDate={dateRegistrationPeriod[0]}
            endDate={dateRegistrationPeriod[1]}
            selectsRange
            inline
            maxDate={new Date()}
          />
        </div>
      </InformationModal>
      <div className="p-3 bg-white rounded-xl col-span-3 xl:col-span-2 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-md">
            <p className="font-bold">Jumlah Pendaftar</p>
          </div>
          <button
            onClick={() => setShowDatepicker(true)}
            className="text-primary-700 p-3 items-center bg-primary-700/10 rounded-md hidden md:flex gap-3"
          >
            <FaRegCalendar />
            <p className="text-slate-700 text-xs">
              {`${dayjs(getDate(CHART_TYPE.REGISTRATION_PERIOD)[0]).format(
                "DD/MM/YYYY"
              )} - ${dayjs(getDate(CHART_TYPE.REGISTRATION_PERIOD)[1]).format(
                "DD/MM/YYYY"
              )}`}
            </p>
          </button>
        </div>
        <div className="min-h-[250px]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : isError ? (
            <div className="w-full h-full flex justify-center items-center">
              <p>Something went wrong</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-1">
                <h1 className="text-primary-700 whitespace-nowrap text-3xl font-bold">
                  {formatCurrency(data?.data?.totalRegistrant, "decimal")}
                </h1>
                <p className="text-xs text-slate-400">Siswa</p>
              </div>
              <div id="chart" className="p-3 flex-1 min-h-[250px]">
                <Chart
                  options={barChartOptions}
                  series={barSeries}
                  type="bar"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationPeriodChart;
