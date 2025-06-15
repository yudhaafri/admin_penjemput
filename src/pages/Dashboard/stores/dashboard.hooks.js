import { useShallow } from "zustand/react/shallow"
import { CHART_TYPE } from "../lib/dashboard.constants"
import useDashboardStore from "./dashboard.z-store"

const useDashboardHooks = () => {

const {
    // Getter
    dateSSPPayment,
    dateApprovedFinance,
    dateRegistrationPeriod,

    // Setter
    setDateSSPPayment,
    setDateApprovedFinance,
    setDateRegistrationPeriod
} = useDashboardStore(useShallow((state) => ({
    // Getter
    dateSSPPayment: state.dateSSPPayment,
    dateApprovedFinance: state.dateApprovedFinance,
    dateRegistrationPeriod: state.dateRegistrationPeriod,

    // Setter
    setDateSSPPayment: state.setDateSSPPayment,
    setDateApprovedFinance: state.setDateApprovedFinance,
    setDateRegistrationPeriod: state.setDateRegistrationPeriod,
})))

/*
onChangeDate(cb,type)
====================
for handling the onChange in React Datepicker
---------------------------------------------------------------------------------------------
@params cb - Callback from onChange React Datepicker
@type {CHART_TYPE | string} - Which datepicker you want to change, you can see it the list at dashboard-constants.js (CHART_TYPE)
*/
const onChangeDate = (cb,type) => {
    switch(type){
        case CHART_TYPE.SSP_PAYMENT:
            setDateSSPPayment(cb);
            break;
        case CHART_TYPE.APPROVED_FINANCE:
            setDateApprovedFinance(cb);
            break;
        case CHART_TYPE.REGISTRATION_PERIOD:
            setDateRegistrationPeriod(cb);
            break;
    }
}

/*
getDate(type)
=============
for get a date range and validate when user only select the start, then automatically the end also filled with the start date (1 day)
---------------------------------------------------------------------------------------------
@params {CHART_TYPE | string} type - Which date you want to get, you can see it the list at dashboard-constants.js (CHART_TYPE)
*/
const getDate = (type) => {
    switch(type){
        case CHART_TYPE.SSP_PAYMENT:
            if(!dateSSPPayment[1]){
                return [dateSSPPayment[0],dateSSPPayment[0]]
            }
            return dateSSPPayment
        case CHART_TYPE.APPROVED_FINANCE:
            if(!dateApprovedFinance[1]){
                return [dateApprovedFinance[0],dateApprovedFinance[0]]
            }
            return dateApprovedFinance
        case CHART_TYPE.REGISTRATION_PERIOD:
            if(!dateRegistrationPeriod[1]){
                return [dateRegistrationPeriod[0],dateRegistrationPeriod[0]]
            }
            return dateRegistrationPeriod
    }
}

return {
    onChangeDate,
    getDate
}

}

export default useDashboardHooks;