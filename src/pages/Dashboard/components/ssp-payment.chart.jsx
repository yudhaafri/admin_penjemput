import { FaRegCalendar } from "react-icons/fa";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import useDashboardStore from "../stores/dashboard.z-store";
import { useShallow } from "zustand/react/shallow";
import { InformationModal, Spinner } from "src/components";
import DatePicker from "react-datepicker";
import useDashboardHooks from "../stores/dashboard.hooks";
import { CHART_TYPE, DASHBOARD_QUERY_KEY } from "../lib/dashboard.constants";
import { useSSPPaymentQuery } from "src/hooks/services/useDashboard";
import { formatCurrency } from "src/helpers/utils";

const SSPPaymentChart = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const { dateSSPPayment } = useDashboardStore(
    useShallow((state) => ({
      dateSSPPayment: state.dateSSPPayment,
    }))
  );

  const { onChangeDate, getDate } = useDashboardHooks();

  const { data, isLoading, isError } = useSSPPaymentQuery([
    DASHBOARD_QUERY_KEY.SSP_PAYMENT,
    {
      dateSSPPaymentStart: dayjs(getDate(CHART_TYPE.SSP_PAYMENT)[0]).format(
        "YYYY-MM-DD"
      ),
      dateSSPPaymentEnd: dayjs(getDate(CHART_TYPE.SSP_PAYMENT)[1]).format(
        "YYYY-MM-DD"
      ),
    },
  ]);

  const chartSeries = useMemo(() => {
    if (!data) return;

    const seriesMap = new Map();

    seriesMap.set("paidOff", []);
    seriesMap.set("instalments", []);
    seriesMap.set("notPaidOff", []);

    const { data: chartData } = data;

    chartData.data.forEach((item) => {
      const splitted = item.date.split("-");
      const day = splitted[0];
      const month = splitted[1];
      const year = splitted[2];

      const date = `${month}-${day}-${year}`;

      seriesMap.set("paidOff", [
        ...seriesMap.get("paidOff"),
        [new Date(date).getTime(), item.paidOff],
      ]);
      seriesMap.set("instalments", [
        ...seriesMap.get("instalments"),
        [new Date(date).getTime() + 1, item.instalments],
      ]);
      seriesMap.set("notPaidOff", [
        ...seriesMap.get("notPaidOff"),
        [new Date(date).getTime() + 2, item.notPaidOff],
      ]);
    });

    const finalMapping = [
      {
        name: `Sudah Lunas (${formatCurrency(
          chartData.paidOff.student,
          "decimal"
        )} Siswa / ${formatCurrency(chartData.paidOff.nominal)})`,
        data: seriesMap.get("paidOff"),
      },
      {
        name: `Bayar Cicilan (${formatCurrency(
          chartData.instalments.student,
          "decimal"
        )} Siswa / ${formatCurrency(chartData.instalments.nominal)})`,
        data: seriesMap.get("instalments"),
      },
      {
        name: `Belum Lunas (${formatCurrency(
          chartData.notPaidOff.student,
          "decimal"
        )} Siswa / ${formatCurrency(chartData.notPaidOff.nominal)})`,
        data: seriesMap.get("notPaidOff"),
      },
    ];

    return finalMapping;
  }, [data]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "ssp-payment-per-month",
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: { curve: "smooth", width: 1.5 },
    colors: ["#314F84", "#FFED47", "#ED2029"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      type: "datetime",
      min: new Date("01/01/2025").getTime(),
      max: new Date("12/01/2025").getTime(),
      labels: {
        formatter: function (val) {
          return dayjs(val).format("DD MMM");
        },
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#78909C",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
      axisBorder: {
        show: true,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      shared: true,
    },
    legend: {
      width: "100%",
    },
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        type: "line",
        height: "100%",
        width: "100%",
      },
      xaxis: {
        ...prevOptions.xaxis,
        min:
          new Date(dateSSPPayment[0]).getTime() ||
          new Date("01/01/2025").getTime(),
        max:
          new Date(dateSSPPayment[1]).getTime() ||
          new Date("12/01/2025").getTime(),
      },
    }));
  }, [dateSSPPayment]);

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
            onChange={(e) => onChangeDate(e, CHART_TYPE.SSP_PAYMENT)}
            startDate={dateSSPPayment[0]}
            endDate={dateSSPPayment[1]}
            selectsRange
            inline
            maxDate={new Date()}
          />
        </div>
      </InformationModal>
      <div className="p-3 bg-white rounded-xl col-span-3 xl:col-span-2 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-md">
            <p className="font-bold">Jumlah Pembayaran SSP</p>
          </div>
          <button
            onClick={() => setShowDatepicker(true)}
            className="text-primary-700 p-3 items-center bg-primary-700/10 rounded-md hidden md:flex gap-3"
          >
            <FaRegCalendar />
            <p className="text-slate-700 text-xs">
              {`${dayjs(getDate(CHART_TYPE.SSP_PAYMENT)[0]).format(
                "DD/MM/YYYY"
              )} - ${dayjs(getDate(CHART_TYPE.SSP_PAYMENT)[1]).format(
                "DD/MM/YYYY"
              )}`}
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-primary-700 whitespace-nowrap text-2xl font-bold">
            {formatCurrency(data?.data?.total)}
          </h1>
          <div id="chart" className="p-3 flex-1 min-h-[250px]">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : isError ? (
              <div className="w-full h-full flex justify-center items-center">
                <p>Something went wrong</p>
              </div>
            ) : (
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height="100%"
                width="100%"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SSPPaymentChart;
