import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendar } from "react-icons/fa";
import { InformationModal, Spinner } from "src/components";
import { CHART_TYPE, DASHBOARD_QUERY_KEY } from "../lib/dashboard.constants";
import useDashboardHooks from "../stores/dashboard.hooks";
import useDashboardStore from "../stores/dashboard.z-store";
import { useShallow } from "zustand/react/shallow";
import { useApprovedFinanceQuery } from "src/hooks/services/useDashboard";
import dayjs from "dayjs";
import { formatCurrency } from "src/helpers/utils";

const ApprovedFinanceChart = () => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const { dateApprovedFinance } = useDashboardStore(
    useShallow((state) => ({
      dateApprovedFinance: state.dateApprovedFinance,
    }))
  );

  const { onChangeDate, getDate } = useDashboardHooks();

  const { data, isLoading, isError } = useApprovedFinanceQuery([
    DASHBOARD_QUERY_KEY.APPROVED_FINANCE,
    {
      dateApproveFinanceStart: dayjs(
        getDate(CHART_TYPE.APPROVED_FINANCE)[0]
      ).format("YYYY-MM-DD"),
      dateApproveFinanceEnd: dayjs(
        getDate(CHART_TYPE.APPROVED_FINANCE)[1]
      ).format("YYYY-MM-DD"),
    },
  ]);

  const circumference = ((2 * 22) / 7) * 120;

  const progress = useMemo(() => data?.data?.totalApproved, [data]);

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
            onChange={(e) => onChangeDate(e, CHART_TYPE.APPROVED_FINANCE)}
            startDate={dateApprovedFinance[0]}
            endDate={dateApprovedFinance[1]}
            selectsRange
            inline
            maxDate={new Date()}
          />
        </div>
      </InformationModal>
      <div
        id="total-approved-payment"
        className="p-5 bg-white rounded-xl col-span-3 xl:col-span-1 flex flex-col w-full h-full items-center relative justify-between min-h-[350px] max-h-[350px]"
      >
        <button
          onClick={() => setShowDatepicker(true)}
          className="text-primary-700 p-3 items-center bg-primary-700/10 rounded-md flex gap-3 w-fit"
        >
          <FaRegCalendar />
          <p className="text-slate-700 text-xs">{`${dayjs(
            getDate(CHART_TYPE.APPROVED_FINANCE)[0]
          ).format("DD/MM/YYYY")} - ${dayjs(
            getDate(CHART_TYPE.APPROVED_FINANCE)[1]
          ).format("DD/MM/YYYY")}`}</p>
        </button>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center items-center">
            <p>Something went wrong</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center absolute top-16">
              <svg className="transform rotate-180 w-[350px] h-[350px]">
                <circle
                  cx="175"
                  cy="175"
                  r="146.125"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="20"
                  strokeDasharray={circumference * (146.125 / 120)}
                  strokeDashoffset={
                    circumference * (146.125 / 120) -
                    ((100 * 0.5) / 100) * (circumference * (146.125 / 120))
                  }
                  fill="transparent"
                  className="text-slate-300"
                />

                <circle
                  cx="175"
                  cy="175"
                  r="146.125"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="20"
                  fill="transparent"
                  strokeDasharray={circumference * (146.125 / 120)}
                  strokeDashoffset={
                    circumference * (146.125 / 120) -
                    ((progress * 0.5) / 100) * (circumference * (146.125 / 120))
                  }
                  className="text-primary-700"
                />
              </svg>
              <div className="absolute bg-slate-300 px-5 py-7 top-24 rounded-full">
                <p className="p-0 m-0 font-bold text-primary-700 text-xl">
                  {progress}%
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <p className="font-semibold">
                Jumlah Yang Sudah Approve Keuangan
              </p>
              <p className="text-2xl font-bold text-primary-700 text-center">
                ({formatCurrency(data?.data?.totalPaidOff)})
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApprovedFinanceChart;
