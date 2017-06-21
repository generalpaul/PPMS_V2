using PPMS.Infrastructure;
using PPMS.Infrastructure.PPMS.Service;
using PPMS.MVCWeb.Controllers;
using PPMS.MVCWeb.Report_Objects;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;


namespace PPMS.MVCWeb.Controller_Classes
{
    public static class Common
    {
        public static decimal Get_Computed_Fee(IList<ACTUAL_COST_ATTNDNC_DTL> ActualCostAttndnceDtl, IList<VTR_LIVE_DT_DTL> _vtrLiveDts,
            ACTUAL_COST_DTL ACTUAL_COST_DTL, CLASS_ACTUALS_ATTENDANCE CLASS_ACTUALS_ATTENDANCE, List<ATTENDANCE_VAL_MSTR> ATTENDANCE_VAL_MSTR_REPOSITORY)
        {
            
            if(ACTUAL_COST_DTL.BDGT_TMPL_DTL.PYMNT_TERM_CD=="GAME" || ACTUAL_COST_DTL.BDGT_TMPL_DTL.PYMNT_TERM_CD=="PER GAME" || ACTUAL_COST_DTL.BDGT_TMPL_DTL.PYMNT_TERM_CD == "PER_GAME")
            {
                if (CLASS_ACTUALS_ATTENDANCE == null)
                    return ActualCostAttndnceDtl.Sum(all => all.ATTENDANCE_VAL.Value) * (decimal)ACTUAL_COST_DTL.BUDGET_AMT;
                   // return 0;
                else
                {
                    if (CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL != null)
                        return CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL.Sum(all => all.GAME_COUNT) * (decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT;
                    else
                        return 0;
                }
                    
                //return ActualCostAttndnceDtl.Sum(all => all.ATTENDANCE_VAL.Value) * (decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT;
            }


            decimal computedFee = 0m;

            int naCount = 0;
            decimal presentFactor=0;
            int presentCount=0;

            if(CLASS_ACTUALS_ATTENDANCE==null)
            {
               naCount= NACount(ActualCostAttndnceDtl.AsEnumerable());
               presentCount = PresentCount(ActualCostAttndnceDtl.AsEnumerable(), out presentFactor, _vtrLiveDts);
            }
            else
            {
                if (CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL != null)
                {
                    naCount = NACountAttedance(CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL);
                    presentCount = PresentCountAttendance(CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL, out presentFactor, _vtrLiveDts, ATTENDANCE_VAL_MSTR_REPOSITORY);
                }
            }

            
            int intTapingDaysCount = _vtrLiveDts.Count();

            //04-30-2015 PaulV, for blank personnel no attendance detail.
            if(ActualCostAttndnceDtl.Count()==0)
            {
                return 0;
            }

            foreach (ACTUAL_COST_ATTNDNC_DTL dtl in ActualCostAttndnceDtl)
            {
                
                if (_vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).Count() > 0)
                {
                    //Constants.WITH_OUTPUT                        //checking this on saving, bec out_val_cd is being set late to check for value.     
                    if (dtl.OUTPUT_VAL_CD == "ATT_NOT_REQUIRED" || (CLASS_ACTUALS_ATTENDANCE==null?"": CLASS_ACTUALS_ATTENDANCE.OUPUT_DETAIL_SELECTED)=="ATTENDANCE NOT REQUIRED")
                    {
                        //06-01-2015 PAULV, if Blank Personnel return computed fee to zero
                        if (ACTUAL_COST_DTL.GLOBAL_ID.Trim() != "000-000-000-000PH")
                        { 
                                //4-14-2015 PAULV, updated by sir volt, if att not required, budget amt is eq to actual
                            if (ACTUAL_COST_DTL.BDGT_TMPL_DTL.PYMNT_TERM_CD == "EPISODIC")
                            {
                                computedFee = (decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT;
                            }
                            else
                            {
                                computedFee = (decimal)ACTUAL_COST_DTL.BUDGET_AMT;
                            }
                        }
                        return computedFee;
                    }
                    else if (ACTUAL_COST_DTL.PAY_RATE_CD == "DAILY" || ACTUAL_COST_DTL.PAY_RATE_CD == "PACK" || ACTUAL_COST_DTL.PAY_RATE_CD == "GAME DAY" || ACTUAL_COST_DTL.PAY_RATE_CD == "GAME_DAY")
                    {
                        if (ACTUAL_COST_DTL.GLOBAL_ID == "000-000-000-000PH" || ACTUAL_COST_DTL.GLOBAL_ID.Contains("DUMMY"))
                            return 0;

                        if (ACTUAL_COST_DTL.PAY_RATE_CD == "PACK")
                        {
                            //return GetPackageCost();
                        }

                        if (intTapingDaysCount < presentCount)
                        {
                            return (decimal)ACTUAL_COST_DTL.BUDGET_AMT;
                        }

                        if (naCount != 0)
                        {
                            //return intTapingDaysCount - naCount == 0 ? 0 : ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / (intTapingDaysCount - naCount)) * (presentFactor / 100);
                            //naCount might not be needed. same applies as below. 
                            //return ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                        }

                        
                        
                            return ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);



                    }
                    else if ((intTapingDaysCount - naCount) == 0)
                    {
                        return 0;
                    }
                    else
                    {

                        //PaulV, Nov 10,2010 - remove taping days count bec its already computed using total presentfactor/ 100
                        if (naCount != 0)
                        {
                            //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                            if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                            {
                                computedFee = ((decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                            }
                            else
                            {
                                computedFee = (decimal)intTapingDaysCount - naCount == 0 ? 0 : (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                            }
                        }
                        else
                        {
                            if (ACTUAL_COST_DTL.GLOBAL_ID == "000-000-000-000PH" || ACTUAL_COST_DTL.GLOBAL_ID.Contains("DUMMY"))
                                return  0;
                            
                                //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                                if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                                {
                                    computedFee = ((decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                                }
                                else
                                {
                                    computedFee = (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                                }
                            
                            
                        }
                    }
                }
            }


            //if (intTapingDaysCount == 0)
            //{
            //    intTapingDaysCount = 1;
            //}

            decimal finalFee = computedFee;

            return finalFee < 0 ? 0 : finalFee;

        }

        public static decimal Get_Computed_Fee_Pool(IList<ACTUAL_COST_POOL_ATT_DTL> ActualCostAttndnceDtl, IList<VTR_LIVE_DT_DTL> _vtrLiveDts, ACTUAL_COST_POOL_DTL ACTUAL_COST_DTL)
        {

            //if (ACTUAL_COST_DTL.BDGT_TMPL_DTL.PYMNT_TERM_CD == "GAME")
            //{
            //    if (CLASS_ACTUALS_ATTENDANCE == null)
            //        return 0;
            //    else
            //    {
            //        if (CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL != null)
            //            return CLASS_ACTUALS_ATTENDANCE.ATTENDANCE_DETAIL.Sum(all => all.GAME_COUNT) * (decimal)ACTUAL_COST_DTL.BDGT_TMPL_DTL.BUDGET_AMT;
            //        else
            //            return 0;
            //    }

            //}

            decimal computedFee = 0m;

            int naCount = NACountPool(ActualCostAttndnceDtl.AsEnumerable());
            decimal presentFactor;
            int presentCount = PresentCountPool(ActualCostAttndnceDtl.AsEnumerable(), out presentFactor, _vtrLiveDts);


            int intTapingDaysCount = _vtrLiveDts.Count();
            foreach (ACTUAL_COST_POOL_ATT_DTL dtl in ActualCostAttndnceDtl)
            {

                if (_vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).Count() > 0)
                {
                    //Constants.WITH_OUTPUT
                    if (dtl.OUTPUT_VAL_CD == "ATT_NOT_REQUIRED")
                    {

                        computedFee = (decimal)ACTUAL_COST_DTL.BUDGET_AMT;
                        return computedFee;
                    }
                    else if (ACTUAL_COST_DTL.PYMNT_TERM_CD == "DAILY" || ACTUAL_COST_DTL.PYMNT_TERM_CD == "PACK" || ACTUAL_COST_DTL.PYMNT_TERM_CD == "PER GAME")
                    {
                        if (ACTUAL_COST_DTL.PYMNT_TERM_CD == "PACK")
                        {
                            //return GetPackageCost();
                        }

                        if (intTapingDaysCount < presentCount)
                        {
                            return (decimal)ACTUAL_COST_DTL.BUDGET_AMT;
                        }

                        if (naCount != 0)
                        {
                            return intTapingDaysCount - naCount == 0 ? 0 : ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / (intTapingDaysCount - naCount)) * (presentFactor / 100);
                        }

                        return ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);



                    }
                    else if ((intTapingDaysCount - naCount) == 0)
                    {
                        return 0;
                    }
                    else
                    {

                        //PaulV, Nov 10,2010 - remove taping days count bec its already computed using total presentfactor/ 100
                        if (naCount != 0)
                        {
                            //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                            if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                            {
                                computedFee = ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                            }
                            else
                            {
                                computedFee = (decimal)intTapingDaysCount - naCount == 0 ? 0 : (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                            }
                        }
                        else
                        {
                            //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                            if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                            {
                                computedFee = ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                            }
                            else
                            {
                                computedFee = (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                            }
                        }
                    }
                }
            }


            //if (intTapingDaysCount == 0)
            //{
            //    intTapingDaysCount = 1;
            //}

            decimal finalFee = computedFee;

            return finalFee < 0 ? 0 : finalFee;

        }

        async public static Task<decimal> Get_Computed_Fee_Guest(IList<ACTUAL_COST_GUEST_ATT_DTL> ActualCostAttndnceDtl, IList<VTR_LIVE_DT_DTL> _vtrLiveDts, ACTUAL_COST_GUEST_DTL ACTUAL_COST_DTL)
        {

          

            decimal computedFee = 0m;

            int naCount = NACountGuest(ActualCostAttndnceDtl.AsEnumerable());
            decimal presentFactor;
            int presentCount = PresentCountGuest(ActualCostAttndnceDtl.AsEnumerable(), out presentFactor, _vtrLiveDts);

            IACTUAL_COST_HDR_REPOSITORY ACTUAL_COST_HDR_REPOSITORY = new ACTUAL_COST_HDR_REPOSITORY();

            IBDGT_TMPL_GUEST_DTL_REPOSITORY BDGT_TMPL_GUEST_DTL_REPOSITORY = new BDGT_TMPL_GUEST_DTL_REPOSITORY();

            var varActualHdr = (await ACTUAL_COST_HDR_REPOSITORY.Where("BDGT_TMPL_HDR", all => all.ACTUAL_COST_ID == ACTUAL_COST_DTL.ACTUAL_COST_ID)).First();

            

            var var_BDGT_TMPL_GUEST_DTL = (BDGT_TMPL_GUEST_DTL_REPOSITORY.All.Where(all => all.BDGT_TMPL_ID == varActualHdr.BDGT_TMPL_ID));

            

            decimal deciBdgtAmt = 0;
            if (var_BDGT_TMPL_GUEST_DTL.Count() > 0)
            {
                deciBdgtAmt = var_BDGT_TMPL_GUEST_DTL.First().BDGT_AMT.Value;
            

            }


            int intTapingDaysCount = _vtrLiveDts.Count();
            foreach (ACTUAL_COST_GUEST_ATT_DTL dtl in ActualCostAttndnceDtl)
            {
                if (_vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).Count() > 0)
                {
                        if (var_BDGT_TMPL_GUEST_DTL.First().PYMNT_TERM_CD == "GAME" || var_BDGT_TMPL_GUEST_DTL.First().PYMNT_TERM_CD == "PER GAME")
                        {
                            return (ACTUAL_COST_DTL.ACTUAL_AMT.Value * dtl.ATTENDANCE_VAL.Value);
                        }
                        else if (ACTUAL_COST_DTL.PAY_MODE == "Per Taping Day" || ACTUAL_COST_DTL.PAY_MODE.ToUpper().Contains("PACK") || ACTUAL_COST_DTL.PAY_MODE.ToUpper().Contains("PER GAME"))
                        {
                        if (intTapingDaysCount < presentCount)
                        {
                            return deciBdgtAmt;
                        }

                        //if (naCount != 0)
                        //{
                        //    return intTapingDaysCount - naCount == 0 ? 0 : (deciBdgtAmt / (intTapingDaysCount - naCount)) * (presentFactor / 100);
                        //}

                        //if(deciBdgtAmt==0)
                        return ((ACTUAL_COST_DTL.ACTUAL_AMT == null ? 0 : ACTUAL_COST_DTL.ACTUAL_AMT.Value) * (presentFactor / 100)) - ACTUAL_COST_DTL.RTP_AMT.Value;
                        //else
                        //    return (deciBdgtAmt / intTapingDaysCount) * (presentFactor / 100) - (ACTUAL_COST_DTL.RTP_AMT.Value != null ? ACTUAL_COST_DTL.RTP_AMT.Value : 0);

                    }
                    else if ((intTapingDaysCount - naCount) == 0)
                    {
                        return 0;
                    }
                    else
                    {
                        #region comment
                        ////PaulV, Nov 10,2010 - remove taping days count bec its already computed using total presentfactor/ 100
                        //if (naCount != 0)
                        //{
                        //    //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                        //    if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                        //    {
                        //        computedFee = ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                        //    }
                        //    else
                        //    {
                        //        computedFee = (decimal)intTapingDaysCount - naCount == 0 ? 0 : (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                        //    }
                        //}
                        //else
                        //{
                        //    //11AUG2011 ; IF PAYRATE = EPISODIC AND TAPINGDAYRATE = 0 BY: TINC
                        //    if (ACTUAL_COST_DTL.PER_TAPING_DAY_RATE == 0)
                        //    {
                        //        computedFee = ((decimal)ACTUAL_COST_DTL.BUDGET_AMT / intTapingDaysCount) * (presentFactor / 100);
                        //    }
                        //    else
                        //    {
                        //        computedFee = (decimal)ACTUAL_COST_DTL.PER_TAPING_DAY_RATE * (presentFactor / 100);
                        //    }
                        //}
                        #endregion
                    }
                }
            }


            //if (intTapingDaysCount == 0)
            //{
            //    intTapingDaysCount = 1;
            //}

            decimal finalFee = computedFee;

            return finalFee < 0 ? 0 : finalFee;

        }

        public static decimal Get_Computed_Fee_Unbudgeted(IList<ACTUAL_COST_UNBUDGETED_ATT_DTL> ActualCostAttndnceDtl, IList<VTR_LIVE_DT_DTL> _vtrLiveDts, ACTUAL_COST_UNBUDGETED_DTL ACTUAL_COST_UNBUDGETED_DTL)
        {

            decimal computedFee = 0m;

            int naCount = NACountUnbudgeted(ActualCostAttndnceDtl.AsEnumerable());
            decimal presentFactor;
            int presentCount = PresentCountUnbudgeted(ActualCostAttndnceDtl.AsEnumerable(), out presentFactor, _vtrLiveDts);


            int intTapingDaysCount = _vtrLiveDts.Count();
            foreach (ACTUAL_COST_UNBUDGETED_ATT_DTL dtl in ActualCostAttndnceDtl)
            {

                if (_vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).Count() > 0)
                {
                    if (ACTUAL_COST_UNBUDGETED_DTL.PAY_MODE == "Per Taping Day")
                    {

                        //if (naCount != 0)
                        //{
                        //    return intTapingDaysCount - naCount == 0 ? 0 : ((decimal)ACTUAL_COST_UNBUDGETED_DTL.ACTUAL_AMT / (intTapingDaysCount - naCount)) * (presentFactor / 100);
                        //}

                       // return ((decimal)ACTUAL_COST_DTL.ACTUAL_AMT / intTapingDaysCount) * (presentFactor / 100);

                        //if (deciBdgtAmt == 0)
                        return ((ACTUAL_COST_UNBUDGETED_DTL.ACTUAL_AMT == null ? 0 : ACTUAL_COST_UNBUDGETED_DTL.ACTUAL_AMT.Value) * (presentFactor / 100)) - ACTUAL_COST_UNBUDGETED_DTL.RTP_AMT.Value;
                        //else
                        //    return (deciBdgtAmt / intTapingDaysCount) * (presentFactor / 100) - (ACTUAL_COST_DTL.RTP_AMT.Value != null ? ACTUAL_COST_DTL.RTP_AMT.Value : 0);



                    }
                    else if ((intTapingDaysCount - naCount) == 0)
                    {
                        return 0;
                    }
                    else
                    {
                        return ((decimal)ACTUAL_COST_UNBUDGETED_DTL.ACTUAL_AMT / intTapingDaysCount) * (presentFactor / 100);
                    }
                }
            }


            decimal finalFee = computedFee;
            
            return finalFee < 0 ? 0 : finalFee;

        }

        public static int NACount(IEnumerable<ACTUAL_COST_ATTNDNC_DTL> list)
        {
            int naCount = 0;
            foreach (ACTUAL_COST_ATTNDNC_DTL dtl in list)
            {
                if (//dtl.AttendanceValId == 17 ||
                    dtl.ATTENDANCE_VAL_ID == 4 ||
                    dtl.ATTENDANCE_VAL_ID == 9 ||
                    dtl.ATTENDANCE_VAL_ID == 12) // NA value according to glenn
                    naCount++;
            }
            return naCount;
        }

        public static int NACountAttedance(IEnumerable<CLASS_ATTENDANCE_DETAIL> list)
        {
            int naCount = 0;
            foreach (var dtl in list)
            {
                if (//dtl.AttendanceValId == 17 ||
                    dtl.ATTENDANCE_VAL_MSTR == "4" ||
                    dtl.ATTENDANCE_VAL_MSTR == "9" ||
                    dtl.ATTENDANCE_VAL_MSTR == "12") // NA value according to glenn
                    naCount++;
            }
            return naCount;
        }

        public static int NACountGuest(IEnumerable<ACTUAL_COST_GUEST_ATT_DTL> list)
        {
            int naCount = 0;
            foreach (ACTUAL_COST_GUEST_ATT_DTL dtl in list)
            {
                if (//dtl.AttendanceValId == 17 ||
                    dtl.ATTENDANCE_VAL_ID == 4 ||
                    dtl.ATTENDANCE_VAL_ID == 9 ||
                    dtl.ATTENDANCE_VAL_ID == 12) // NA value according to glenn
                    naCount++;
            }
            return naCount;
        }

        public static int NACountUnbudgeted(IEnumerable<ACTUAL_COST_UNBUDGETED_ATT_DTL> list)
        {
            int naCount = 0;
            foreach (ACTUAL_COST_UNBUDGETED_ATT_DTL dtl in list)
            {
                if (//dtl.AttendanceValId == 17 ||
                    dtl.ATTENDANCE_VAL_ID == 4 ||
                    dtl.ATTENDANCE_VAL_ID == 9 ||
                    dtl.ATTENDANCE_VAL_ID == 12) // NA value according to glenn
                    naCount++;
            }
            return naCount;
        }

        public static int NACountPool(IEnumerable<ACTUAL_COST_POOL_ATT_DTL> list)
        {
            int naCount = 0;
            foreach (ACTUAL_COST_POOL_ATT_DTL dtl in list)
            {
                if (//dtl.AttendanceValId == 17 ||
                    dtl.ATTENDANCE_VAL_ID == 4 ||
                    dtl.ATTENDANCE_VAL_ID == 9 ||
                    dtl.ATTENDANCE_VAL_ID == 12) // NA value according to glenn
                    naCount++;
            }
            return naCount;
        }

        public static int PresentCount(IEnumerable<ACTUAL_COST_ATTNDNC_DTL> list, out decimal presentFactor, IList<VTR_LIVE_DT_DTL> _vtrLiveDts)
        {
            presentFactor = 0m;
            int presentCount = 0;
            foreach (ACTUAL_COST_ATTNDNC_DTL dtl in list)
            {
                var intCount = _vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).ToList();
                if (intCount.Count() > 0)
                {
                    if (dtl.ATTENDANCE_VAL != 0)//&& dtl.ATTENDANCE_VAL != 10
                    { // meaning he is not absent
                        presentCount++;
                        presentFactor += (decimal)dtl.ATTENDANCE_VAL;
                    }
                }

            }
            return presentCount;
        }

        public static int PresentCountAttendance(IEnumerable<CLASS_ATTENDANCE_DETAIL> list, out decimal presentFactor, IList<VTR_LIVE_DT_DTL> _vtrLiveDts
            , List<ATTENDANCE_VAL_MSTR> ATTENDANCE_VAL_MSTR_REPOSITORY)
        {
            presentFactor = 0m;
            int presentCount = 0;
            foreach (var dtl in list)
            {
                var intCount = _vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.ATTENDANCE_DETAIL_DATE.ToShortDateString()).ToList();
                if (intCount.Count() > 0)
                {
                    decimal deciValId = decimal.Parse(dtl.ATTENDANCE_VAL_MSTR);
                    var varATT_Val = ATTENDANCE_VAL_MSTR_REPOSITORY.Single(all => all.ATTENDANCE_VAL_ID == deciValId);
                    if (varATT_Val .ATTENDANCE_VAL!= 0)//&& dtl.ATTENDANCE_VAL != 10
                    { // meaning he is not absent
                        presentCount++;
                        presentFactor += (decimal)varATT_Val .ATTENDANCE_VAL;
                    }
                }

            }
            return presentCount;
        }

        public static int PresentCountGuest(IEnumerable<ACTUAL_COST_GUEST_ATT_DTL> list, out decimal presentFactor, IList<VTR_LIVE_DT_DTL> _vtrLiveDts)
        {
            presentFactor = 0m;
            int presentCount = 0;
            foreach (ACTUAL_COST_GUEST_ATT_DTL dtl in list)
            {
                var intCount = _vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).ToList();
                if (intCount.Count() > 0)
                {

                    if (dtl.ATTENDANCE_VAL != 0)
                    { // meaning he is not absent
                        presentCount++;
                        presentFactor += (decimal)dtl.ATTENDANCE_VAL;
                    }
                }

            }
            return presentCount;
        }

        public static int PresentCountUnbudgeted(IEnumerable<ACTUAL_COST_UNBUDGETED_ATT_DTL> list, out decimal presentFactor, IList<VTR_LIVE_DT_DTL> _vtrLiveDts)
        {
            presentFactor = 0m;
            int presentCount = 0;
            foreach (ACTUAL_COST_UNBUDGETED_ATT_DTL dtl in list)
            {
                var intCount = _vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).ToList();
                if (intCount.Count() > 0)
                {

                    if (dtl.ATTENDANCE_VAL != 0)
                    { // meaning he is not absent
                        presentCount++;
                        presentFactor += (decimal)dtl.ATTENDANCE_VAL;
                    }
                }

            }
            return presentCount;
        }

        private static int PresentCountPool(IEnumerable<ACTUAL_COST_POOL_ATT_DTL> list, out decimal presentFactor, IList<VTR_LIVE_DT_DTL> _vtrLiveDts)
        {
            presentFactor = 0m;
            int presentCount = 0;
            foreach (ACTUAL_COST_POOL_ATT_DTL dtl in list)
            {
                if (_vtrLiveDts.Where(all => all.VTR_LIVE_DT.ToShortDateString() == dtl.VTR_DATE.ToShortDateString()).Count() > 0)
                {

                    if (dtl.ATTENDANCE_VAL != 0)
                    { // meaning he is not absent
                        presentCount++;
                        presentFactor += (decimal)dtl.ATTENDANCE_VAL;
                    }
                }

            }
            return presentCount;
        }
        //async public static Task<IList<JOB_MSTR>> Session_Job_Mstr(HttpSessionStateBase Session)
        //{
        //    if (Session["JOB_MSTR_REPOSITORY"] == null)
        //        Session["JOB_MSTR_REPOSITORY"] = (await new JOB_MSTR_REPOSITORY().All_Async_With_Relation("JOB_GRP_MSTR")).ToList();

        //    return (List<JOB_MSTR>)Session["JOB_MSTR_REPOSITORY"];
        //}

        //async public static Task<IList<CATEGORY_MSTR>> Session_Category_Mstr(HttpSessionStateBase Session)
        //{
        //    if (Session["CATEGORY_MSTR_REPOSITORY"] == null)
        //        Session["CATEGORY_MSTR_REPOSITORY"] = (await new CATEGORY_MSTR_REPOSITORY().All_Async()).ToList();

        //    return (List<CATEGORY_MSTR>)Session["CATEGORY_MSTR_REPOSITORY"];
        //}

        //async public static Task<IList<ATTENDANCE_VAL_MSTR>> Session_Val_Mstr(HttpSessionStateBase Session)
        //{
        //    if (Session["ATTENDANCE_VAL_MSTR_REPOSITORY"] == null)
        //        Session["ATTENDANCE_VAL_MSTR_REPOSITORY"] = (await new ATTENDANCE_VAL_MSTR_REPOSITORY().All_Async()).ToList();

        //    ///.Where(all => all.ATTENDANCE_VAL_ID == 2 || all.ATTENDANCE_VAL_ID == 10 || all.ATTENDANCE_VAL_ID == 15 || all.ATTENDANCE_VAL_ID == 13).ToList();

        //    return (List<ATTENDANCE_VAL_MSTR>)Session["ATTENDANCE_VAL_MSTR_REPOSITORY"];
        //}

        //async public static Task<IList<REFERENCE_CD_MSTR>> Session_Reference_Cd_Mstr(HttpSessionStateBase Session)
        //{
        //    if (Session["REFERENCE_CD_MSTR_REPOSITORY"] == null)
        //        Session["REFERENCE_CD_MSTR_REPOSITORY"] = (await new REFERENCE_CD_MSTR_REPOSITORY().All_Async()).ToList();

        //    return (List<REFERENCE_CD_MSTR>)Session["REFERENCE_CD_MSTR_REPOSITORY"];
        //}



        async public static Task<List<JOB_MSTR>> Session_Job_Mstr(string USER_ID)
        {
            if(USER_ID=="REPORT") return (await new JOB_MSTR_REPOSITORY().All_Async_With_Relation("JOB_GRP_MSTR")).ToList();

            List<JOB_MSTR> job_mstr = new List<JOB_MSTR>();
            if (!PPMS_Session.CheckFileExists(USER_ID + "_JOB_MSTR"))
            {
                job_mstr = (await new JOB_MSTR_REPOSITORY().All_Async_With_Relation("JOB_GRP_MSTR")).ToList();
                PPMS_Session.SaveRecordsToServer(USER_ID + "_JOB_MSTR", job_mstr);
            }
            else
            {
                PPMS_Session.ExtractRecordsToServer(USER_ID + "_JOB_MSTR", ref job_mstr);
            }

            return job_mstr;

            //if (Session["JOB_MSTR_REPOSITORY"] == null)
            //    Session["JOB_MSTR_REPOSITORY"] = (await new JOB_MSTR_REPOSITORY().All_Async_With_Relation("JOB_GRP_MSTR")).ToList();

            //return (List<JOB_MSTR>)Session["JOB_MSTR_REPOSITORY"];
        }

        async public static Task<List<CATEGORY_MSTR>> Session_Category_Mstr(string USER_ID)
        {
            if (USER_ID == "REPORT") return (await new CATEGORY_MSTR_REPOSITORY().All_Async()).ToList();

            List<CATEGORY_MSTR> category_mstr = new List<CATEGORY_MSTR>();
            if (!PPMS_Session.CheckFileExists(USER_ID + "_CATEGORY_MSTR"))
            {
                category_mstr = (await new CATEGORY_MSTR_REPOSITORY().All_Async()).ToList();
                PPMS_Session.SaveRecordsToServer(USER_ID + "_CATEGORY_MSTR", category_mstr);
            }
            else
            {
                PPMS_Session.ExtractRecordsToServer(USER_ID + "_CATEGORY_MSTR", ref category_mstr);
            }

            return category_mstr;

            //if (Session["CATEGORY_MSTR_REPOSITORY"] == null)
            //    Session["CATEGORY_MSTR_REPOSITORY"] = (await new CATEGORY_MSTR_REPOSITORY().All_Async()).ToList();

            //return (List<CATEGORY_MSTR>)Session["CATEGORY_MSTR_REPOSITORY"];
        }

        async public static Task<List<ATTENDANCE_VAL_MSTR>> Session_Val_Mstr(string USER_ID)
        {
            if (USER_ID == "REPORT") return (await new ATTENDANCE_VAL_MSTR_REPOSITORY().All_Async()).ToList();

            List<ATTENDANCE_VAL_MSTR> val_mstr = new List<ATTENDANCE_VAL_MSTR>();
            if (!PPMS_Session.CheckFileExists(USER_ID + "_VAL_MSTR"))
            {
                val_mstr = (await new ATTENDANCE_VAL_MSTR_REPOSITORY().All_Async()).ToList();
                PPMS_Session.SaveRecordsToServer(USER_ID + "_VAL_MSTR", val_mstr);
            }
            else
            {
                PPMS_Session.ExtractRecordsToServer(USER_ID + "_VAL_MSTR", ref val_mstr);
            }

            return val_mstr;

            //if (Session["ATTENDANCE_VAL_MSTR_REPOSITORY"] == null)
            //    Session["ATTENDANCE_VAL_MSTR_REPOSITORY"] = (await new ATTENDANCE_VAL_MSTR_REPOSITORY().All_Async()).ToList();

            /////.Where(all => all.ATTENDANCE_VAL_ID == 2 || all.ATTENDANCE_VAL_ID == 10 || all.ATTENDANCE_VAL_ID == 15 || all.ATTENDANCE_VAL_ID == 13).ToList();

            //return (List<ATTENDANCE_VAL_MSTR>)Session["ATTENDANCE_VAL_MSTR_REPOSITORY"];
        }

        async public static Task<IList<REFERENCE_CD_MSTR>> Session_Reference_Cd_Mstr(string USER_ID)
        {
            if (USER_ID == "REPORT") return (await new REFERENCE_CD_MSTR_REPOSITORY().All_Async()).ToList();

            List<REFERENCE_CD_MSTR> ref_cd_mstr = new List<REFERENCE_CD_MSTR>();
            if (!PPMS_Session.CheckFileExists(USER_ID + "_REF_CD_MSTR"))
            {
                ref_cd_mstr = (await new REFERENCE_CD_MSTR_REPOSITORY().All_Async()).ToList();
                PPMS_Session.SaveRecordsToServer(USER_ID + "_REF_CD_MSTR", ref_cd_mstr);
            }
            else
            {
                PPMS_Session.ExtractRecordsToServer(USER_ID + "_REF_CD_MSTR", ref ref_cd_mstr);
            }

            return ref_cd_mstr;

            //if (Session["REFERENCE_CD_MSTR_REPOSITORY"] == null)
            //    Session["REFERENCE_CD_MSTR_REPOSITORY"] = (await new REFERENCE_CD_MSTR_REPOSITORY().All_Async()).ToList();

            //return (List<REFERENCE_CD_MSTR>)Session["REFERENCE_CD_MSTR_REPOSITORY"];
        }


        //async public static Task<IList<GLOBAL_ALIAS_TRX>> Session_Aliases_Mstr(HttpSessionStateBase Session)
        //{

        //    if (Session["GLOBAL_ALIAS_TRX_REPOSITORY"] == null)
        //    {
        //        IList<GLOBAL_ALIAS_TRX> lstAliases = new List<GLOBAL_ALIAS_TRX>();
        //        lstAliases = (await new GLOBAL_ALIAS_TRX_REPOSITORY().All_Async()).ToList();

        //        IGLOBAL_INDIV_MSTR_REPOSITORY GLOBAL_INDIV_MSTR_REPOSITORY = new GLOBAL_INDIV_MSTR_REPOSITORY();
        //        var varIndivs = (await GLOBAL_INDIV_MSTR_REPOSITORY.Where("", all => all.ALIAS != null)).ToList();
        //        foreach (var item in varIndivs)
        //        {
        //            lstAliases.Add(new GLOBAL_ALIAS_TRX() { 
        //                 GLOBAL_ID = item.GLOBAL_INDIV_ID,
        //                  ALIAS_NAME = item.ALIAS,
        //                   GLOBAL_ALIAS_ID = 0
        //            });
        //        }


        //        Session["GLOBAL_ALIAS_TRX_REPOSITORY"] = lstAliases;


        //    }
        //    return (List<GLOBAL_ALIAS_TRX>)Session["GLOBAL_ALIAS_TRX_REPOSITORY"];
        //}


        async public static Task<List<ClassPersonnelName>> Session_All_Personnel(bool boolHasInactive, string USER_ID)//HttpSessionStateBase Session, 
        {
        
            List<ClassPersonnelName> lstPersonnel = new List<ClassPersonnelName>();

            //if ((Session["ALLPERSONNEL"] == null? 0: ((IList<ClassPersonnelName>)Session["ALLPERSONNEL"]).Count())==0)
            //if (Session["ALLPERSONNEL"] == null)
            if (((USER_ID=="REPORT"?true: false)?true:!PPMS_Session.CheckFileExists(USER_ID+ "_ALLPERSONNEL")))
            {
                IGLOBAL_INDIV_MSTR_REPOSITORY GLOBAL_INDIV_MSTR_REPOSITORY = new GLOBAL_INDIV_MSTR_REPOSITORY();
                IList<GLOBAL_ALIAS_TRX> lstAliases = new List<GLOBAL_ALIAS_TRX>();
                lstAliases = (await new GLOBAL_ALIAS_TRX_REPOSITORY().All_Async()).Union(
                    (await GLOBAL_INDIV_MSTR_REPOSITORY.Where("", all => all.ALIAS != null)).Select(item=>new GLOBAL_ALIAS_TRX()
                    {
                        GLOBAL_ID = item.GLOBAL_INDIV_ID,
                        ALIAS_NAME = item.ALIAS,
                        GLOBAL_ALIAS_ID = 0
                    })
                    ).ToList();

               
               // var varIndivs = (await GLOBAL_INDIV_MSTR_REPOSITORY.Where("", all => all.ALIAS != null)).ToList();

                //foreach (var item in varIndivs)
                //{
                //    lstAliases.Add(new GLOBAL_ALIAS_TRX()
                //    {
                //        GLOBAL_ID = item.GLOBAL_INDIV_ID,
                //        ALIAS_NAME = item.ALIAS,
                //        GLOBAL_ALIAS_ID = 0
                //    });
                //}

               // IGLOBAL_INDIV_MSTR_REPOSITORY GLOBAL_INDIV_MSTR_REPOSITORY = new GLOBAL_INDIV_MSTR_REPOSITORY();
                IGLOBAL_GRP_MSTR_REPOSITORY GLOBAL_GRP_MSTR_REPOSITORY = new GLOBAL_GRP_MSTR_REPOSITORY();

                ITALENT_SUPPLIER_INDIV_MSTR_REPOSITORY TALENT_SUPPLIER_INDIV_MSTR_REPOSITORY = new TALENT_SUPPLIER_INDIV_MSTR_REPOSITORY();
                ITALENT_SUPPLIER_COMP_MSTR_REPOSITORY TALENT_SUPPLIER_COMP_MSTR_REPOSITORY = new TALENT_SUPPLIER_COMP_MSTR_REPOSITORY();

                var varGlobalMstr=(boolHasInactive ? (await new GLOBAL_MSTR_REPOSITORY().All_Async()) : (await new GLOBAL_MSTR_REPOSITORY().Where("", all => all.STATUS_CD == "ACTV"))).ToList();
                var varGlobalIds = varGlobalMstr.Select(all => all.GLOBAL_ID);

                lstPersonnel = (await GLOBAL_INDIV_MSTR_REPOSITORY.All_Async())
                    .Join(varGlobalMstr, a => a.GLOBAL_INDIV_ID, b => b.GLOBAL_ID, (resA, resB) => resA)
                    .Select(all => new ClassPersonnelName() { GLOBAL_ID = all.GLOBAL_INDIV_ID, PERSONNEL_NAME = string.Format("{0}, {1} {2}", all.LAST_NAME, all.GIVEN_NAME, all.MIDDLE_NAME), PERSONNEL_INFO_SRC="PPID" })
                                  .Union((await TALENT_SUPPLIER_INDIV_MSTR_REPOSITORY.All_Async()).Select(all => new ClassPersonnelName() { GLOBAL_ID = all.SUPPLIER_INDIV_GLOBAL_ID, PERSONNEL_INFO_SRC = "TSDB", PERSONNEL_NAME = string.Format("{0}, {1} {2}", all.LAST_NAME, all.GIVEN_NAME, all.MIDDLE_NAME) }))
                                  .Union((await TALENT_SUPPLIER_COMP_MSTR_REPOSITORY.All_Async()).Select(all => new ClassPersonnelName() { GLOBAL_ID = all.SUPPLIER_COMP_GLOBAL_ID, PERSONNEL_INFO_SRC = "TSCM", PERSONNEL_NAME = string.Format("{0}", all.COMPANY_NAME) }))
                                  .Union((await GLOBAL_GRP_MSTR_REPOSITORY.All_Async()).Where(all => varGlobalIds.Contains(all.GLOBAL_GRP_ID)).Select(all => new ClassPersonnelName() { GLOBAL_ID = all.GLOBAL_GRP_ID, PERSONNEL_INFO_SRC = "PPGP", PERSONNEL_NAME = string.Format("{0}", all.GROUP_NAME) })).OrderBy(all => all.PERSONNEL_NAME).Distinct().ToList();

                lstPersonnel = lstPersonnel.GroupJoin(lstAliases, a => a.GLOBAL_ID, b => b.GLOBAL_ID, (c, d) => new { c, d })
                    .Select(all => {
                        var varAlias="";
                        foreach (var item in all.d)
                        {
                            if (varAlias == "")
                                varAlias += item.ALIAS_NAME;
                            else
                                varAlias += ", " + item.ALIAS_NAME;

                        }
                        all.c.ALIAS = varAlias;
                        return all.c;
                    }).ToList();
                //.SelectMany(all => all.d.DefaultIfEmpty(), (c, d) => new ClassPersonnelName()
                //{
                //    GLOBAL_ID = c.c.GLOBAL_ID,
                //    ALIAS = (d == null ? "" : d.ALIAS_NAME.ToUpper()),
                //    PERSONNEL_NAME = c.c.PERSONNEL_NAME //+ (d == null ? "" : "(" + d.ALIAS_NAME.ToUpper() +")")
                //}).ToList();

                #region replaced by token
                //Session["ALLPERSONNEL"] = lstPersonnel;
                #endregion


                if(USER_ID!="REPORT")
                PPMS_Session.SaveRecordsToServer(USER_ID + "_ALLPERSONNEL", lstPersonnel);
            }
            else
            {
                #region replaced by token
                //lstPersonnel = (List<ClassPersonnelName>)Session["ALLPERSONNEL"];
                #endregion

                PPMS_Session.ExtractRecordsToServer(USER_ID + "_ALLPERSONNEL", ref lstPersonnel);
            }
            

            return lstPersonnel;
        }

        public static void SetProperties<T, U>(T item, U itemToSet)
        {
            foreach (var varPropertiesTmp in itemToSet.GetType().GetProperties())
            {
                foreach (var varProperties in item.GetType().GetProperties())
                {
                    if (varProperties.Name == varPropertiesTmp.Name)
                    {

                        if (varPropertiesTmp.PropertyType == typeof(DateTime?) || varPropertiesTmp.PropertyType == typeof(DateTime))
                        {
                            if (varProperties.GetValue(item, null) != null)
                                if (((DateTime)varProperties.GetValue(item, null)).Year < 1930)
                                {
                                    DateTime? nullableDate = new DateTime(1920, 1, 1);
                                    varPropertiesTmp.SetValue(itemToSet, nullableDate);
                                }
                                else
                                    varPropertiesTmp.SetValue(itemToSet, varProperties.GetValue(item, null));
                        }
                        else if (varPropertiesTmp.PropertyType.AssemblyQualifiedName.Contains("ICollection") || varPropertiesTmp.Name.Contains("_MSTR") || varPropertiesTmp.Name.Contains("_TRX"))
                        {
                            //varProperties.SetValue(itemToSet, null);
                        }
                        else
                            varPropertiesTmp.SetValue(itemToSet, varProperties.GetValue(item, null));
                    }



                }

            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2202:Do not dispose objects multiple times"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities")]
        public static DataTableReader dtReaderReturn(string strQuery)
        {
            var varIsBranch = "";
            if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["IS_BRANCH?"]))
            {
                varIsBranch = ConfigurationManager.AppSettings["IS_BRANCH?"].ToLower();
            }

            if (varIsBranch.Equals("false"))
            {
                using (Oracle.DataAccess.Client.OracleConnection oracCn = new Oracle.DataAccess.Client.OracleConnection(ConfigurationManager.AppSettings["connectionString"]))
                {
                    oracCn.Open();
                    Oracle.DataAccess.Client.OracleCommand oracCmd = new Oracle.DataAccess.Client.OracleCommand();
                    oracCmd.Connection = oracCn;
                    Oracle.DataAccess.Client.OracleDataReader oracDtr;

                    oracCmd.CommandText = strQuery;

                    oracDtr = oracCmd.ExecuteReader();

                    DataTable dtUse = new DataTable();
                    dtUse.Load(oracDtr);

                    oracDtr.Close();
                    oracCn.Close();


                    return (new DataTableReader(dtUse));

                }
            }
            else
            {
                using (SqlConnection sqlCn = new SqlConnection(ConfigurationManager.AppSettings["connectionString"]))
                {
                    sqlCn.Open();
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.Connection = sqlCn;
                    SqlDataReader sqlDtr;

                    sqlCmd.CommandText = strQuery;

                    sqlDtr = sqlCmd.ExecuteReader();

                    DataTable dtUse = new DataTable();
                    dtUse.Load(sqlDtr);

                    sqlDtr.Close();
                    sqlCn.Close();


                    return (new DataTableReader(dtUse));

                }
            }

        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2202:Do not dispose objects multiple times")]
        public static DataTable dtReturn(string strQuery)
        {
            var varIsBranch = "";
            if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["IS_BRANCH?"]))
            {
                varIsBranch = ConfigurationManager.AppSettings["IS_BRANCH?"].ToLower();
            }

            if (varIsBranch.Equals("false"))
            {
                using (Oracle.DataAccess.Client.OracleConnection oracCn = new Oracle.DataAccess.Client.OracleConnection(ConfigurationManager.AppSettings["connectionString"]))
                {
                    oracCn.Open();
                    Oracle.DataAccess.Client.OracleCommand oracCmd = new Oracle.DataAccess.Client.OracleCommand();
                    oracCmd.Connection = oracCn;
                    Oracle.DataAccess.Client.OracleDataReader oracDtr;

                    oracCmd.CommandText = strQuery;

                    oracDtr = oracCmd.ExecuteReader();

                    DataTable dtUse = new DataTable();
                    dtUse.Load(oracDtr);

                    oracDtr.Close();
                    oracCn.Close();


                    return dtUse;

                }
            }
            else
            {
                using (SqlConnection sqlCn = new SqlConnection(ConfigurationManager.AppSettings["connectionString"]))
                {
                    sqlCn.Open();
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.Connection = sqlCn;
                    SqlDataReader sqlDtr;

                    sqlCmd.CommandText = strQuery;

                    sqlDtr = sqlCmd.ExecuteReader();

                    DataTable dtUse = new DataTable();
                    dtUse.Load(sqlDtr);

                    sqlDtr.Close();
                    sqlCn.Close();


                    return dtUse;

                }
            }

            
        }

        internal static async Task ProcessReport(Microsoft.Reporting.WebForms.ReportViewer report,
            HttpRequest Request, string strReportStatus)
        {

           
            //System.Web.SessionState.HttpSessionState Session, 
            Microsoft.Reporting.WebForms.ReportParameter[] RptParameters =
new Microsoft.Reporting.WebForms.ReportParameter[17];

            string Actual_id;

            rpt_Actuals rpt_Actuals;

            Actual_id = Request.QueryString["ACID"];

            RptParameters[0] =
                new Microsoft.Reporting.WebForms.ReportParameter("Actual_Cost_id", Actual_id);

            string strGeConcealBudgetConfidential = "0";

            strGeConcealBudgetConfidential = PPMS_Session.GetConcealConfidential(Request.QueryString["USER_ID"].ToString());

            rpt_Actuals = new rpt_Actuals(Actual_id);

            string strAccepted = (await rpt_Actuals.Set_Header(strReportStatus));

            if (strAccepted == "Error")
                throw new NotSupportedException("Invalid status compare");

            #region replaced by token
            //await rpt_Actuals.Set_Actuals((Session["ConcealConfidentialBudgetAmt"] == null ? true : false), (Session["ConcealConfidentialBudgetAmt"] == null ? "0" : "1"), "Mainstay", Session);
            //await rpt_Actuals.Set_Actuals((Session["ConcealConfidentialBudgetAmt"] == null ? true : false), (Session["ConcealConfidentialBudgetAmt"] == null ? "0" : "1"), "Staff", Session);
            //await rpt_Actuals.Set_Guest(Session);
            //await rpt_Actuals.Set_Unbudgeted(Session);
            #endregion

            await rpt_Actuals.Set_Actuals((strGeConcealBudgetConfidential == "0" ? true : false), strGeConcealBudgetConfidential, "Mainstay", Request.QueryString["USER_ID"].ToString());//Session
            await rpt_Actuals.Set_Actuals((strGeConcealBudgetConfidential == "0" ? true : false), strGeConcealBudgetConfidential, "Staff", Request.QueryString["USER_ID"].ToString());//Session
            await rpt_Actuals.Set_Guest(Request.QueryString["USER_ID"].ToString());//Session
            await rpt_Actuals.Set_Unbudgeted(Request.QueryString["USER_ID"].ToString());//Session

            //PaulV, May 07, 2010 - added param confidential to hide if user has no access
            RptParameters[1] =
                //new Microsoft.Reporting.WebForms.ReportParameter("isConfidential", Request.QueryString["confidential"]);
             new Microsoft.Reporting.WebForms.ReportParameter("isConfidential", (strGeConcealBudgetConfidential=="0" ? "true" : "false"));
            //(Session["ConcealConfidentialBudgetAmt"]==null?"true":"false")
            if (strGeConcealBudgetConfidential=="1")
            {
                RptParameters[2] =
                new Microsoft.Reporting.WebForms.ReportParameter("allowedForConfidential", "1");
            }
            else
                RptParameters[2] =
                new Microsoft.Reporting.WebForms.ReportParameter("allowedForConfidential", "0");



            RptParameters[3] =
                new Microsoft.Reporting.WebForms.ReportParameter("Cutoff_from", rpt_Actuals.DT_FROM);

            RptParameters[4] =
                new Microsoft.Reporting.WebForms.ReportParameter("Cutoff_to", rpt_Actuals.DT_TO);

            RptParameters[5] = new Microsoft.Reporting.WebForms.ReportParameter("Program_name", rpt_Actuals.Program_Name);
            RptParameters[6] = new Microsoft.Reporting.WebForms.ReportParameter("PROGRAM_IO_P", rpt_Actuals.PROGRAM_IO_P);
            RptParameters[7] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_IO_P", rpt_Actuals.EPISODE_IO_P);
            RptParameters[8] = new Microsoft.Reporting.WebForms.ReportParameter("PROGRAM_TYPE_P", rpt_Actuals.PROGRAM_TYPE_P);
            RptParameters[9] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_TYPE_P", rpt_Actuals.EPISODE_TYPE_P);
            RptParameters[10] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_MODE_P", rpt_Actuals.EPISODE_MODE_P);
            RptParameters[11] = new Microsoft.Reporting.WebForms.ReportParameter("PAYOUT_DT_P", rpt_Actuals.PAYOUT_DT_P);
            RptParameters[12] = new Microsoft.Reporting.WebForms.ReportParameter("REMARKS_P", rpt_Actuals.REMARKS_P);
            RptParameters[13] = new Microsoft.Reporting.WebForms.ReportParameter("GUEST_BUDGET_AMT_P", rpt_Actuals.GUEST_BUDGET_AMT_P);

            RptParameters[14] = new Microsoft.Reporting.WebForms.ReportParameter("TAPING_DAYS_P", (await rpt_Actuals.strTapingDays()));
            RptParameters[15] = new Microsoft.Reporting.WebForms.ReportParameter("TELECAST_DT_P", (await rpt_Actuals.strTelecastDates()));
            RptParameters[16] = new Microsoft.Reporting.WebForms.ReportParameter("UPDATED_INFO", rpt_Actuals.UPDATED_INFO);


            Microsoft.Reporting.WebForms.ReportDataSource rptSourceBdgt = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceBdgt.Value = rpt_Actuals.Get_Budget_Amount();
            rptSourceBdgt.Name = "dsActuals_Hdr";
            report.LocalReport.DataSources.Add(rptSourceBdgt);


            Microsoft.Reporting.WebForms.ReportDataSource rptSourceMainstay = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceMainstay.Value = rpt_Actuals.Get_Rpt_Actuals_Mainstay();
            rptSourceMainstay.Name = "ds_XML_For_Actuals_Database";
            report.LocalReport.DataSources.Add(rptSourceMainstay);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceStaff = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceStaff.Value = rpt_Actuals.Get_Rpt_Actuals_Staff();
            rptSourceStaff.Name = "ds_XML_For_Actuals_Database_Staff";
            report.LocalReport.DataSources.Add(rptSourceStaff);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceGuest = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceGuest.Value = rpt_Actuals.Get_Rpt_Guest_Detail();
            rptSourceGuest.Name = "dts_ActualDTL_GUEST";
            report.LocalReport.DataSources.Add(rptSourceGuest);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceUnbudgeted = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceUnbudgeted.Value = rpt_Actuals.Get_Rpt_Unbudgeted_Detail();
            rptSourceUnbudgeted.Name = "dts_ActualDTL_UNBUDGETED";
            report.LocalReport.DataSources.Add(rptSourceUnbudgeted);

            //Microsoft.Reporting.WebForms.ReportDataSource rptSourceHasUnbudgeted = new Microsoft.Reporting.WebForms.ReportDataSource();
            //rptSourceHasUnbudgeted.Value = rpt_Actuals.Get_Rpt_Unbudgeted_Detail();
            //rptSourceHasUnbudgeted.Name = "dsHasUnbudgeted";
            //report.LocalReport.DataSources.Add(rptSourceHasUnbudgeted);

            report.LocalReport.SetParameters(RptParameters);
            report.LocalReport.Refresh();

        }


        internal static async Task ProcessReportBudget(Microsoft.Reporting.WebForms.ReportViewer report,
            HttpRequest Request, string strReportStatus) //System.Web.SessionState.HttpSessionState Session, 
        {

            Microsoft.Reporting.WebForms.ReportParameter[] RptParameters =
new Microsoft.Reporting.WebForms.ReportParameter[17];

            string Budget_id;

            rpt_Budget rpt_Budget;

            Budget_id = Request.QueryString["BDID"];

            RptParameters[0] =
                new Microsoft.Reporting.WebForms.ReportParameter("Budget_Id", Budget_id);

            rpt_Budget = new rpt_Budget(Budget_id);

            string strAccepted = (await rpt_Budget.Set_Header(strReportStatus));

            if (strAccepted == "Error")
                throw new NotSupportedException("Invalid status compare");

            string strGeConcealBudgetConfidential = "0";

            strGeConcealBudgetConfidential = PPMS_Session.GetConcealConfidential(Request.QueryString["USER_ACCOUNT"].ToString());

            #region replaced by token
            //var varConcealConfi =(Session["ConcealConfidentialBudgetAmt"] == null ? true : false);
            //var varConcealConfiPass =  (Session["ConcealConfidentialBudgetAmt"] == null ? "0" : "1");
            //var varConcealConfiPassString = (Session["ConcealConfidentialBudgetAmt"] == null ? "true" : "false");

            //if(Request.QueryString["ConcealConfidentialBudgetAmt"]!=null)
            //{
            //    varConcealConfi = (Request.QueryString["ConcealConfidentialBudgetAmt"].ToString() == "true" ? true : false);
            //    varConcealConfiPass = (Request.QueryString["ConcealConfidentialBudgetAmt"].ToString() == "true" ? "0" : "1");
            //    varConcealConfiPassString = Request.QueryString["ConcealConfidentialBudgetAmt"].ToString();
            //}
            #endregion
            
            var varConcealConfi = (strGeConcealBudgetConfidential == "0" ? true : false);
            var varConcealConfiPass = (strGeConcealBudgetConfidential == "0" ? "0" : "1");
            var varConcealConfiPassString = (strGeConcealBudgetConfidential == "0" ? "true" : "false");

            if (Request.QueryString["ConcealConfidentialBudgetAmt"] != null)
            {
                varConcealConfi = (Request.QueryString["ConcealConfidentialBudgetAmt"].ToString() == "true" ? true : false);
                varConcealConfiPass = (Request.QueryString["ConcealConfidentialBudgetAmt"].ToString() == "true" ? "0" : "1");
                varConcealConfiPassString = Request.QueryString["ConcealConfidentialBudgetAmt"].ToString();
            }

            Tuple<decimal, decimal> Mainstay = await rpt_Budget.Set_Budget(varConcealConfi, varConcealConfiPass, "Mainstay", Request.QueryString["USER_ACCOUNT"].ToString(), Request.QueryString["COMPANY_ID"].ToString());
            Tuple<decimal, decimal> Staff = await rpt_Budget.Set_Budget(varConcealConfi, varConcealConfiPass, "Staff", Request.QueryString["USER_ACCOUNT"].ToString(), Request.QueryString["COMPANY_ID"].ToString());
            var varGuestTotal = (await rpt_Budget.Set_Guest(decimal.Parse(Budget_id)));


            //PaulV, May 07, 2010 - added param confidential to hide if user has no access
            RptParameters[1] =
                //new Microsoft.Reporting.WebForms.ReportParameter("isConfidential", Request.QueryString["confidential"]);
             new Microsoft.Reporting.WebForms.ReportParameter("isConfidential", varConcealConfiPassString);
            //(Session["ConcealConfidentialBudgetAmt"]==null?"true":"false")
            //if (Session["ConcealConfidentialBudgetAmt"] != null)
            if (strGeConcealBudgetConfidential != "0")
            {
                RptParameters[2] =
                new Microsoft.Reporting.WebForms.ReportParameter("allowedForConfidential", "1");
            }
            else
                RptParameters[2] =
                new Microsoft.Reporting.WebForms.ReportParameter("allowedForConfidential", "0");



            RptParameters[3] =
                new Microsoft.Reporting.WebForms.ReportParameter("Cutoff_from", rpt_Budget.DT_FROM);

            RptParameters[4] =
                new Microsoft.Reporting.WebForms.ReportParameter("Cutoff_to", rpt_Budget.DT_TO);

            RptParameters[5] = new Microsoft.Reporting.WebForms.ReportParameter("Program_name", rpt_Budget.Program_Name);
            RptParameters[6] = new Microsoft.Reporting.WebForms.ReportParameter("PROGRAM_IO_P", rpt_Budget.PROGRAM_IO_P);
            //RptParameters[7] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_IO_P", rpt_Budget.EPISODE_IO_P);
            RptParameters[7] = new Microsoft.Reporting.WebForms.ReportParameter("TELECAST_MODE_P", rpt_Budget.TELECAST_MODE_P);
            
            //RptParameters[8] = new Microsoft.Reporting.WebForms.ReportParameter("PROGRAM_TYPE_P", rpt_Budget.PROGRAM_TYPE_P);
            RptParameters[8] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_TYPE_P", rpt_Budget.EPISODE_TYPE_P);
            //RptParameters[10] = new Microsoft.Reporting.WebForms.ReportParameter("EPISODE_MODE_P", rpt_Budget.EPISODE_MODE_P);
            RptParameters[9] = new Microsoft.Reporting.WebForms.ReportParameter("REMARKS_P", (rpt_Budget.REMARKS_P == null ? "" : rpt_Budget.REMARKS_P));

            RptParameters[10] = new Microsoft.Reporting.WebForms.ReportParameter("PROGRAM_GENRE_P", rpt_Budget.PROGRAM_GENRE_P);

            RptParameters[11] = new Microsoft.Reporting.WebForms.ReportParameter("CREATED_BY", rpt_Budget.CREATED_BY );

            RptParameters[12] = new Microsoft.Reporting.WebForms.ReportParameter("CREATED_DT", rpt_Budget.CREATED_DT);

            RptParameters[13] = new Microsoft.Reporting.WebForms.ReportParameter("LAST_UPDATED_BY", rpt_Budget.LAST_UPDATED_BY);

            RptParameters[14] = new Microsoft.Reporting.WebForms.ReportParameter("LAST_UPDATED_DT", rpt_Budget.LAST_UPDATED_DT);

            RptParameters[15] = new Microsoft.Reporting.WebForms.ReportParameter("BUDGET_P", (Mainstay.Item1 + Staff.Item1 + varGuestTotal).ToString());

            RptParameters[16] = new Microsoft.Reporting.WebForms.ReportParameter("TOTAL_BUDGET_P", (Mainstay.Item2 + Staff.Item2 + varGuestTotal).ToString());

            //RptParameters[13] = new Microsoft.Reporting.WebForms.ReportParameter("GUEST_BUDGET_AMT_P", rpt_Budget.GUEST_BUDGET_AMT_P);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceMainstay = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceMainstay.Value = rpt_Budget.Get_rpt_Budget_Mainstay();
            rptSourceMainstay.Name = "dsMainstay";
            report.LocalReport.DataSources.Add(rptSourceMainstay);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceStaff = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceStaff.Value = rpt_Budget.Get_rpt_Budget_Staff();
            rptSourceStaff.Name = "dsStaff";
            report.LocalReport.DataSources.Add(rptSourceStaff);

            Microsoft.Reporting.WebForms.ReportDataSource rptSourceGuest = new Microsoft.Reporting.WebForms.ReportDataSource();
            rptSourceGuest.Value = rpt_Budget.Get_Rpt_Guest_Detail();
            rptSourceGuest.Name = "dsGuest";
            report.LocalReport.DataSources.Add(rptSourceGuest);



            report.LocalReport.SetParameters(RptParameters);
            report.LocalReport.Refresh();

        }
    }


    public class CLASS_ADJUSTMENTS
    {
        public string PERSONNEL_NAME { get; set; }
        public string JOB_DESC { get; set; }
        public decimal ADJUSTMENT { get; set; }
        public IList<ACTUAL_COST_DTL_AUDIT> LST_ACTUAL_COST_DTL_AUDIT { get; set; }
    }

    public class CLASS_POOL_ADDED
    {
        public string GLOBAL_ID { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string ROW_ID { get; set; }
        public string ALIAS { get; set; }
    }

    public class CLASS_ADJUSTMENTS_GUEST
    {
        public string PERSONNEL_NAME { get; set; }
        public string JOB_DESC { get; set; }
        public decimal ADJUSTMENT { get; set; }
        public IList<ACTUAL_COST_GUEST_DTL_AUDIT> LST_ACTUAL_COST_DTL_AUDIT { get; set; }
    }

    public class CLASS_ADJUSTMENTS_UNBUDGETED
    {
        public string PERSONNEL_NAME { get; set; }
        public string JOB_DESC { get; set; }
        public decimal ADJUSTMENT { get; set; }
        public IList<ACTUAL_COST_UNBGTD_DTL_AUDIT> LST_ACTUAL_COST_UNBUDGETED_DTL_AUDIT { get; set; }
    }

    public class CLASS_ACTUALS_SEARCH
    {
        public decimal ACTUAL_COST_ID { get; set; }
        public decimal? RNG_ACTUAL_COST_ID { get; set; }
        public string PROGRAM_TITLE { get; set; }
        public DateTime DATE_FROM { get; set; }
        public DateTime DATE_TO { get; set; }
        public decimal BUDGET_TEMPLATE_ID { get; set; }
        public string STATUS { get; set; }
        public string REFERENCE_NO { get; set; }
    }

    public class CLASS_FOR_DELETION
    {
        public decimal deciId { get; set; }
        public string strType { get; set; }
    }

    public class CLASS_ACTUALS_ATTENDANCE
    {
        public string PERSONNEL_NAME { get; set; }
        public string CLASS { get; set; }
        public string DESIGNATION { get; set; }
        public bool OUTPUT_BASED { get; set; }
        public string OUPUT_DETAIL_SELECTED { get; set; }
        public IList<string> OUPUT_DETAIL { get; set; }
        public IList<CLASS_ATTENDANCE_DETAIL> ATTENDANCE_DETAIL { get; set; }
        public string REMARKS { get; set; }
        public string GLOBAL_ID { get; set; }
        public string JOB_ID { get; set; }
        public string CATEGORY_ID { get; set; }
        public string CATEGORY_DESC { get; set; }
        public bool BLANK_PERSONNEL { get; set; }
        public bool POOL_RECORD { get; set; }
        public bool IS_PARENT_POOL_RECORD { get; set; }
        public decimal ACTUAL_COST_DTL_ID { get; set; }
        public decimal ACTUAL_COST_POOL_DTL_ID { get; set; }

        public string PAY_MODE { get; set; }
        public decimal PAY_MODE_FACTOR { get; set; }
        public decimal BUDGET_AMOUNT { get; set; }
        public decimal EPISODES { get; set; }
        public decimal TAPING_DAYS { get; set; }
        public decimal PER_TAPING_DAY_RATE { get; set; }
        public decimal CONTRACT_AMT { get; set; }
        public decimal INPUT_AMT { get; set; }
        public decimal COMPUTED_FEE { get; set; }

        public bool IS_CONFIDENTIAL { get; set; }
        public string ALIAS { get; set; }
        public bool IS_TALENT_MANAGER { get; set; }
        public bool EMPLOYEE_STATUS { get; set; }

    }

    public class CLASS_USER
    {
        public string USER_ID { get; set; }
        public DateTime? EXPIRE_DT { get; set; }
        public bool EXPIRED { get; set; }
    }

    public class CLASS_COMPANY
    {
        public string COMPANY_ID { get; set; }
        public string COMPANY_NAME { get; set; }
    }

    public class CLASS_ATTENDANCE_DETAIL
    {
        public decimal ACTUAL_COST_ATTNDNC_DTL_ID { get; set; }
        public decimal ACTUAL_COST_POOL_ATT_DTL_ID { get; set; }
        public bool ATTENDANCE_DETAIL_RELIEVED { get; set; }
        public IList<CLASS_ATTENDANCE_VAL> ATTENDANCE_VAL_MSTR_LIST { get; set; }
        public string ATTENDANCE_VAL_MSTR { get; set; }
        public DateTime ATTENDANCE_DETAIL_DATE { get; set; }
        public decimal EXCESS_HOURS { get; set; }
        public IList<RELIEVER_CONTAINER> ACTUAL_COST_RELIEVER_DTL { get; set; }
        public bool IS_POOL { get; set; }
        public decimal GAME_COUNT { get; set; }
    }

    public class CLASS_ATTENDANCE_DETAIL_GUEST
    {
        public decimal ACTUAL_COST_GUEST_ATTNDNC_ID { get; set; }
        public decimal ACTUAL_COST_GUEST_DTL_ID { get; set; }
        //public IList<CLASS_ATTENDANCE_VAL> ATTENDANCE_VAL_MSTR_LIST { get; set; }
        public string ATTENDANCE_VAL_MSTR { get; set; }
        public string ATTENDANCE_VAL_MSTR_P { get; set; }
        public DateTime VTR_DATE { get; set; }
        public decimal EXCESS_HOURS { get; set; }
        public decimal ATTENDANCE_VAL { get; set; }
        public string OUTPUT_FL { get; set; }
        public decimal GAME_COUNT { get; set; }
    }

    public class CLASS_ATTENDANCE_DETAIL_UNBUDGETED
    {
        public decimal ACTUAL_COST_UNBUDGETED_ATTNDNC_ID { get; set; }
        public decimal ACTUAL_COST_UB_DTL_ID { get; set; }
        public string ATTENDANCE_VAL_MSTR { get; set; }
        public DateTime VTR_DATE { get; set; }
        public decimal EXCESS_HOURS { get; set; }
        public decimal ATTENDANCE_VAL { get; set; }
        public string OUTPUT_FL { get; set; }
        public string OUTPUT_VAL_CD { get; set; }
    }

    public class CLASS_ATTENDANCE_VAL
    {
        public string text { get; set; }
        public string value { get; set; }
    }

    public class CLASS_ACTUALS_DETAIL
    {
        public string ID { get; set; }
        public string TYPE { get; set; }
        public string ACTUAL_COST_ID { get; set; }
        public string ACTUAL_COST_DTL_ID { get; set; }
        public string BDGT_TMPL_DTL_ID { get; set; }
        public string GLOBAL_ID { get; set; }
        public string REMARKS { get; set; }
        public string BUDGET_AMT { get; set; }
        public string PAID_VIA_RTP { get; set; }
        public string ACTUAL_AMT { get; set; }
        public string HOLD_FL { get; set; }
        public string RELIEVED_FL { get; set; }
        public string VAR_AMT { get; set; }
        public string VAR_PCT { get; set; }
        public string PERSONNEL_CLASS_CD { get; set; }
        public string PAID_AMT { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string JOB_ID { get; set; }
        public string JOB_DESC { get; set; }
        public string PAY_RATE_CD { get; set; }
        public string PAY_RATE_FACTOR { get; set; }
        public string TAPINGDAYS { get; set; }
        public string EPISODES { get; set; }
        public string EDITED_COST_AMT { get; set; }
        public string PER_TAPING_DAY_RATE { get; set; }
        public string CATEGORY_ID { get; set; }
        public string PYMNT_TERM_CD { get; set; }
        public string INPUT_AMT { get; set; }
        public string GROUP_ORDER { get; set; }
        public string PERSONNEL_INFO_SRC { get; set; }
        public string CONTRACT_STATUS_CD { get; set; }
        public string ALIAS { get; set; }
    }

    public class ClassPersonnelName
    {
        public string GLOBAL_ID { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string ALIAS { get; set; }
        public string STATUS_CD { get; set; }

        public string PERSONNEL_INFO_SRC { get; set; }
    }

    public class CLASS_PAYMENT_DETAIL
    {
        public string PERSONNEL_NAME { get; set; }
        public string PERSONNEL_CLASS_CD { get; set; }
        public string JOB_DESC { get; set; }
        public string CONTRACT_STATUS { get; set; }
        public string PAY_RATE_CD { get; set; }
        public decimal BUDGET { get; set; }
        public decimal COMPUTED_FEE { get; set; }
        public decimal ACTUAL_AMT { get; set; }
        public decimal ACTUAL_AMT_MOCK { get; set; }
        public decimal PAID_VIA_RTP { get; set; }
        public decimal PAID_VIA_RTP_MOCK { get; set; }
        public bool VALUE_EDITED { get; set; }
        public decimal PAID_AMT { get; set; }
        public decimal VARIANCE { get; set; }
        public decimal PERCENTAGE_VARIANCE { get; set; }
        public bool HOLDFL { get; set; }
        public bool RTP_FL { get; set; }
        public string REMARKS { get; set; }
        public string ACTUALS_DTL_ID { get; set; }
        public string ACTUALS_POOL_DTL_ID { get; set; }
        public bool POOL_CHILDREN { get; set; }
        public int ROW_EDITED { get; set; }
        public bool IS_POOL { get; set; }
        public bool BLANK_PERSONNEL { get; set; }
        public bool IS_CONFIDENTIAL { get; set; }
        public bool ALLOW_RTP { get; set; }
        public string ALIAS { get; set; }
        public decimal ACTUAL_COST_DTL_ID_LINK { get; set; }
        public bool TALENT_MANAGER { get; set; }
    }

    public class Constants
    {
        public const string ATTENDANCE_ABSENT = "ABSENT";
        public const string ATTENDANCE_EMPTY_STRING = "";
        public const string ATTENDANCE_HALF_DAY = "HALF-DAY";
        public const string ATTENDANCE_NA = "N/A";
        public const string ATTENDANCE_PRESENT = "PRESENT";
        public const string ATTENDANCE_RELIEVED = "RELIEVED";
        public const string CONTRACT_ACTIVE = "ACTIVE";
        public const string CONTRACT_EXPIRED = "EXPIRED";
        public const string CONTRACT_SUSPENDED = "SUSPENDED";
        public const string CONTRACT_TERMINATED = "TERMINATED";
        public const string CONTROL_BUTTON = "Button";
        public const string CONTROL_CHECKBOX = "CheckBox";
        public const string CONTROL_DROPDOWNLIST = "DropDownList";
        public const string CONTROL_FILUPLOAD = "FileUpload";
        public const string CONTROL_GRIDVIEW = "GridView";
        public const string CONTROL_IMAGEBUTTON = "ImageButton";
        public const string CONTROL_RADIOBUTTON = "RadioButton";
        public const string CONTROL_TEXTBOX = "TextBox";
        public const string MODULE_COMPANY_SPECIFIC = "Company Specific";
        public const string MODULE_CONTACT_INFO = "Contact Info";
        public const string MODULE_GOVERNMENT_INFO = "Government Info";
        public const string PPFCS_OUTPUTVALCD = "OUTPUT_VAL_CD";

        public static string ACCREDITATION_STATUS;
        public static string ATTENDANCE_SPECIAL_PROVISION;
        public static string CASE_STAT_CD;
        public static string CESSATION_REASON_CODE;
        public static string CHAR_TYPE_CD;
        public static string CITIZENSHIP_CODE;
        public static string CIVIL_STATUS;
        public static string COMPANY_CODE;
        public static string CONTACT_TYPE_CODE;
        public static string[] CONTRACT_ADDENDUM;
        public static string CONTRACT_CLASS_CD;
        public static string CONTRACT_STATUS_CD;
        public static string CONTRACT_TYPE_CD;
        public static string CONTRACT_TYPE_RENEWAL;
        public static string IMAGE_BRANDING_GRP_CD;
        public static string INPUT_TAX_CODE;
        public static string INTEREST_GRP_CD;
        public static string NON_VAT_CODE;
        public static string OPEN_END_COND_CD;
        public static string PACKAGED_FL;
        public static string PAY_FREQ_CD;
        public static string PAYEE_ROLE_CD;
        public static string PERMIT_CODE;
        public static string PERSONNEL_CLASS_CD;
        public static string PH_COUNTRY_CODE;
        public static string PHONE_TYPE_CODE;
        public static string POSITION_CD;
        public static string PRODUCT_CODE;
        public static string PROFESSIONAL_TYPE_CODE;
        public static string PROJECT_TYPE_CD;
        public static string PYMNT_TERM_CD;
        public static string RATING_CD;
        public static string RELATIONSHIP_CHILDREN;
        public static string RELATIONSHIP_CHILDREN_DAUGHTER;
        public static string RELATIONSHIP_CHILDREN_SON;
        public static string RELATIONSHIP_FATHER;
        public static string RELATIONSHIP_MOTHER;
        public static string RELATIONSHIP_SIBLING;
        public static string RELATIONSHIP_SIBLING_BROTHER;
        public static string RELATIONSHIP_SIBLING_SISTER;
        public static string RELATIONSHIP_SPOUSE;
        public static string RELIGION_CODE;
        public static string STATUS_CODE;
        public static string TALENT_CODE;
        public static string TALENT_TYPE_CODE;
        public static string TARGET_MARKET_GRP_CD;
        public static string TAX_EXEMPT_CODE;
        public static string TRACK_CODE;
        public static double VAT;
        public static string VAT_CODE;
        public static string VAT_STAT_CODE;
        public static string VIOLATION_CD;
        public static string WITH_OUTPUT;
    }

    public class PackPaymentDtl
    {
        private string _globalId;
        private decimal _pymntAmt;
        private DateTime _pymntDt;

        public PackPaymentDtl(string globalId, decimal pymntAmt, DateTime pymntDt)
        {
            _globalId = globalId;
            _pymntAmt = pymntAmt;
            _pymntDt = pymntDt;
        }

        public virtual string GlobalId
        {
            get { return _globalId; }
            set { _globalId = value; }
        }

        public virtual decimal PymntAmt
        {
            get { return _pymntAmt; }
            set { _pymntAmt = value; }
        }

        public virtual DateTime PymntDt
        {
            get { return _pymntDt; }
            set { _pymntDt = value; }
        }
    }

    public class ClassMergeGuest
    {
        public decimal ACTUAL_COST_ID { get; set; }
        public string GLOBAL_ID { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string DESIGNATION { get; set; }
        public decimal CATEGORY_ID { get; set; }
        public decimal ACTUAL_AMT { get; set; }
        public decimal RTP_AMT { get; set; }
        public string PAY_MODE { get; set; }
        public struJob JOB { get; set; }
        public string JOB_DESC { get; set; }
        public decimal PAYABLE_AMT { get; set; }
        public decimal GUESTING_NO { get; set; }
        public string REMARKS { get; set; }
        public decimal ACTUAL_COST_GUEST_DTL_ID { get; set; }
        public string ALIAS { get; set; }
        public bool RTP_FL { get; set; }
        public IList<CLASS_ATTENDANCE_DETAIL_GUEST> ACTUAL_COST_GUEST_ATT_DTL { get; set; }
        public string PERSONNEL_NAME_TM { get; set; }
        public decimal ACTUAL_COST_GUEST_DTL_ID_LINK { get; set; }
        public string GLOBAL_ID_LINK { get; set; }
        public decimal TALENT_MANAGER_RATE { get; set; }
        public bool RTP_FL_TM { get; set; }
        
    }

    public struct struJob
    {
        public decimal JOB_ID { get; set; }
        public string JOB_DESC { get; set; }
        public decimal CATEGORY_ID { get; set; }
        public string CATEGORY_DESC { get; set; }
    }

    public class ClassMergeUnbudgeted
    {
        public decimal ACTUAL_COST_ID { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string GLOBAL_ID { get; set; }
        public string DESIGNATION { get; set; }
        public string OUPUT_DETAIL_SELECTED { get; set; }
        public IList<string> OUPUT_DETAIL { get; set; }
        public decimal CATEGORY_ID { get; set; }
        public decimal ACTUAL_AMT { get; set; }
        public decimal RTP_AMT { get; set; }
        public string PAY_MODE { get; set; }
        public struJob JOB { get; set; }
        public string JOB_DESC { get; set; }
        public decimal PAYABLE_AMT { get; set; }
        public string REMARKS { get; set; }
        public string ALIAS { get; set; }
        public bool HOLD_FL { get; set; }
        public decimal ACTUAL_COST_UB_DTL_ID { get; set; }
        public bool RTP_FL { get; set; }
        public IList<CLASS_ATTENDANCE_DETAIL_UNBUDGETED> ACTUAL_COST_UNBUDGETED_ATT_DTL { get; set; }
        public string PERSONNEL_NAME_TM { get; set; }
        public decimal ACTUAL_COST_UB_DTL_ID_LINK { get; set; }
        public string GLOBAL_ID_LINK { get; set; }
        public decimal TALENT_MANAGER_RATE { get; set; }
        public bool RTP_FL_TM { get; set; }
        public bool HOLD_FL_TM { get; set; }
         
    }

    public static class Helpers
    {
        public static IList<ACTUAL_COST_RELIEVER_DTL> EntityContainerToReliever(IList<RELIEVER_CONTAINER> LIST_RELIEVER_CONTAINER)
        {

            IList<ACTUAL_COST_RELIEVER_DTL> LIST_ACTUAL_COST_RELIEVER_DTL = new List<ACTUAL_COST_RELIEVER_DTL>();

            foreach (var RELIEVER_CONTAINER in LIST_RELIEVER_CONTAINER)
            {
                ACTUAL_COST_RELIEVER_DTL ACTUAL_COST_RELIEVER_DTL = new ACTUAL_COST_RELIEVER_DTL();

                ACTUAL_COST_RELIEVER_DTL = EntityContainerToRelieverSingle(RELIEVER_CONTAINER, ACTUAL_COST_RELIEVER_DTL);

                LIST_ACTUAL_COST_RELIEVER_DTL.Add(ACTUAL_COST_RELIEVER_DTL);
            }

            return LIST_ACTUAL_COST_RELIEVER_DTL;
        }

        public static ACTUAL_COST_RELIEVER_DTL EntityContainerToRelieverSingle(RELIEVER_CONTAINER RELIEVER_CONTAINER, ACTUAL_COST_RELIEVER_DTL ACTUAL_COST_RELIEVER_DTL)
        {
            ACTUAL_COST_RELIEVER_DTL.ACTUAL_AMT = RELIEVER_CONTAINER.ACTUAL_AMT;
            ACTUAL_COST_RELIEVER_DTL.GLOBAL_ID = RELIEVER_CONTAINER.GLOBAL_ID;
            ACTUAL_COST_RELIEVER_DTL.ACTUAL_COST_ID = RELIEVER_CONTAINER.ACTUAL_COST_ID;
            ACTUAL_COST_RELIEVER_DTL.ACTUAL_COST_RELIEVER_DTL_ID = RELIEVER_CONTAINER.ACTUAL_COST_RELIEVER_DTL_ID;
            ACTUAL_COST_RELIEVER_DTL.BDGT_TMPL_ID = RELIEVER_CONTAINER.BDGT_TMPL_ID;
            ACTUAL_COST_RELIEVER_DTL.CATEGORY_ID = RELIEVER_CONTAINER.CATEGORY_ID;
            ACTUAL_COST_RELIEVER_DTL.CREATED_BY = RELIEVER_CONTAINER.CREATED_BY;
            ACTUAL_COST_RELIEVER_DTL.CREATED_DT = RELIEVER_CONTAINER.CREATED_DT;
            ACTUAL_COST_RELIEVER_DTL.GLOBAL_ID = RELIEVER_CONTAINER.GLOBAL_ID;
            ACTUAL_COST_RELIEVER_DTL.HOLD_FL = RELIEVER_CONTAINER.HOLD_FL;
            ACTUAL_COST_RELIEVER_DTL.JOB_ID = RELIEVER_CONTAINER.JOB_ID;
            ACTUAL_COST_RELIEVER_DTL.LAST_UPDATED_BY = RELIEVER_CONTAINER.LAST_UPDATED_BY;
            ACTUAL_COST_RELIEVER_DTL.LAST_UPDATED_DT = RELIEVER_CONTAINER.LAST_UPDATED_DT;
            ACTUAL_COST_RELIEVER_DTL.PAYABLE_AMT = RELIEVER_CONTAINER.PAYABLE_AMT;
            ACTUAL_COST_RELIEVER_DTL.PERSONNEL_CLASS_CD = RELIEVER_CONTAINER.PERSONNEL_CLASS_CD;
            ACTUAL_COST_RELIEVER_DTL.PERSONNEL_INFO_SRC = RELIEVER_CONTAINER.PERSONNEL_INFO_SRC;
            ACTUAL_COST_RELIEVER_DTL.RELIEVE_DT = RELIEVER_CONTAINER.RELIEVE_DT;
            ACTUAL_COST_RELIEVER_DTL.RELIEVED_GLOBAL_ID = RELIEVER_CONTAINER.RELIEVED_GLOBAL_ID;
            ACTUAL_COST_RELIEVER_DTL.REMARKS = RELIEVER_CONTAINER.REMARKS;
            ACTUAL_COST_RELIEVER_DTL.RTP_AMT = RELIEVER_CONTAINER.RTP_AMT;
            ACTUAL_COST_RELIEVER_DTL.RTP_FL = (RELIEVER_CONTAINER.RTP_FL ? "1" : "0");
            ACTUAL_COST_RELIEVER_DTL.ALIAS = RELIEVER_CONTAINER.ALIAS;
            return ACTUAL_COST_RELIEVER_DTL;
        }

        public static IList<RELIEVER_CONTAINER> RelieverContainerToEntity(IList<ACTUAL_COST_RELIEVER_DTL> LIST_ACTUAL_COST_RELIEVER_DTL,
            IList<ClassPersonnelName> lstPersonnel, IList<JOB_MSTR> varJobs, IList<CATEGORY_MSTR> varCategory, BDGT_TMPL_DTL BDGT_TMPL_DTL)
        {
            IList<RELIEVER_CONTAINER> LIST_RELIEVER_CONTAINER = new List<RELIEVER_CONTAINER>();
            //var varJobs =  (await new JOB_MSTR_REPOSITORY().All_Async_With_Relation("JOB_GRP_MSTR")).Where(all=>all.JOB_GRP_MSTR.COMPANY_ID==1).ToList();
            //var varCategory = new CATEGORY_MSTR_REPOSITORY().All.Where(all=>all.COMPANY_ID==1).ToList();

            foreach (var ACTUAL_COST_RELIEVER_DTL in LIST_ACTUAL_COST_RELIEVER_DTL)
            {
                RELIEVER_CONTAINER RELIEVER_CONTAINER = new RELIEVER_CONTAINER();

                RELIEVER_CONTAINER = RelieverContainerToEntitySingle(ACTUAL_COST_RELIEVER_DTL, RELIEVER_CONTAINER);
                
                //search not only by global_id but by personnel info src bec names can be duplicate on global_indiv and talent_supplier
                var varParentGlobalId = lstPersonnel.SingleOrDefault(all => all.GLOBAL_ID == RELIEVER_CONTAINER.RELIEVED_GLOBAL_ID && all.PERSONNEL_INFO_SRC==RELIEVER_CONTAINER.PERSONNEL_INFO_SRC);

                if (varParentGlobalId != null)
                {
                    RELIEVER_CONTAINER.RELIEVED_PROGRAM_PERSONNEL = varParentGlobalId.PERSONNEL_NAME + ( !string.IsNullOrEmpty(varParentGlobalId.ALIAS)? " (" + varParentGlobalId.ALIAS + ")" :"");
                }
                else
                    RELIEVER_CONTAINER.RELIEVED_PROGRAM_PERSONNEL = BDGT_TMPL_DTL.PERSONNEL_NAME;


                varParentGlobalId = lstPersonnel.SingleOrDefault(all => all.GLOBAL_ID == RELIEVER_CONTAINER.GLOBAL_ID);

                if (varParentGlobalId != null)
                {
                    RELIEVER_CONTAINER.RELIEVER = varParentGlobalId.PERSONNEL_NAME;
                }
               

                var varJob = varJobs.Single(all => all.JOB_ID == ACTUAL_COST_RELIEVER_DTL.JOB_ID);
                var varCategoryFound = varCategory.Single(all => all.CATEGORY_CD == varJob.JOB_GRP_MSTR.JOB_GRP_CD);

                RELIEVER_CONTAINER.DESIGNATION = new struJob()
                {
                    JOB_ID = varJob.JOB_ID,
                    JOB_DESC = varJob.JOB_DESC,
                    CATEGORY_ID = varCategoryFound.CATEGORY_ID,
                    CATEGORY_DESC = varCategoryFound.CATEGORY_DESC
                };

                RELIEVER_CONTAINER.RTP_FL = ((ACTUAL_COST_RELIEVER_DTL.RTP_FL == null ? "0" : ACTUAL_COST_RELIEVER_DTL.RTP_FL).ToString() == "0" ? false : true);
                RELIEVER_CONTAINER.ALIAS = ACTUAL_COST_RELIEVER_DTL.ALIAS;
                LIST_RELIEVER_CONTAINER.Add(RELIEVER_CONTAINER);

            }





            return LIST_RELIEVER_CONTAINER;
        }

        public static RELIEVER_CONTAINER RelieverContainerToEntitySingle(Infrastructure.PPMS.Service.ACTUAL_COST_RELIEVER_DTL ACTUAL_COST_RELIEVER_DTL, RELIEVER_CONTAINER RELIEVER_CONTAINER)
        {
            RELIEVER_CONTAINER.ACTUAL_AMT = ACTUAL_COST_RELIEVER_DTL.ACTUAL_AMT.Value;
            RELIEVER_CONTAINER.ACTUAL_COST_ID = ACTUAL_COST_RELIEVER_DTL.ACTUAL_COST_ID;
            RELIEVER_CONTAINER.ACTUAL_COST_RELIEVER_DTL_ID = ACTUAL_COST_RELIEVER_DTL.ACTUAL_COST_RELIEVER_DTL_ID;
            RELIEVER_CONTAINER.BDGT_TMPL_ID = ACTUAL_COST_RELIEVER_DTL.BDGT_TMPL_ID.Value;
            RELIEVER_CONTAINER.CATEGORY_ID = ACTUAL_COST_RELIEVER_DTL.CATEGORY_ID.Value;
            RELIEVER_CONTAINER.CREATED_BY = ACTUAL_COST_RELIEVER_DTL.CREATED_BY;
            RELIEVER_CONTAINER.CREATED_DT = ACTUAL_COST_RELIEVER_DTL.CREATED_DT.Value;
            RELIEVER_CONTAINER.GLOBAL_ID = ACTUAL_COST_RELIEVER_DTL.GLOBAL_ID;
            RELIEVER_CONTAINER.HOLD_FL = ACTUAL_COST_RELIEVER_DTL.HOLD_FL;
            RELIEVER_CONTAINER.JOB_ID = ACTUAL_COST_RELIEVER_DTL.JOB_ID.Value;
            RELIEVER_CONTAINER.LAST_UPDATED_BY = ACTUAL_COST_RELIEVER_DTL.LAST_UPDATED_BY;
            RELIEVER_CONTAINER.LAST_UPDATED_DT = (ACTUAL_COST_RELIEVER_DTL.LAST_UPDATED_DT == null ? DateTime.Now : ACTUAL_COST_RELIEVER_DTL.LAST_UPDATED_DT.Value);
            RELIEVER_CONTAINER.PAYABLE_AMT = ACTUAL_COST_RELIEVER_DTL.PAYABLE_AMT.Value;
            RELIEVER_CONTAINER.PERSONNEL_CLASS_CD = ACTUAL_COST_RELIEVER_DTL.PERSONNEL_CLASS_CD;
            RELIEVER_CONTAINER.PERSONNEL_INFO_SRC = ACTUAL_COST_RELIEVER_DTL.PERSONNEL_INFO_SRC;
            RELIEVER_CONTAINER.RELIEVE_DT = ACTUAL_COST_RELIEVER_DTL.RELIEVE_DT.Value;
            RELIEVER_CONTAINER.RELIEVED_GLOBAL_ID = ACTUAL_COST_RELIEVER_DTL.RELIEVED_GLOBAL_ID;
            RELIEVER_CONTAINER.REMARKS = ACTUAL_COST_RELIEVER_DTL.REMARKS;
            RELIEVER_CONTAINER.RTP_AMT = ACTUAL_COST_RELIEVER_DTL.RTP_AMT.Value;
            return RELIEVER_CONTAINER;
        }


        //PROGRAM_ORDR, PROGRAM_DESC, EPISODE_IO_CODE, TALENT_TYPE_ORDR, TALENT_TYPE_DESC, TEXT_TAPING_DATE, TAPING_DATE, " +
        //                        "TEXT_TALENT_NAME, TEXT_TALENT_ID, TEXT_REPLACEMENT_TALENT_NAME, TEXT_REPLACEMENT_TALENT_ID, TEXT_DESIGNATION, " +
        //                        "ATTENDANCE, EXTRACT_DATE, EXTRACT_DATE_TIME

    }


    public class ClassPersonnelNameMultiple
    {
        public string GLOBAL_ID { get; set; }
        public string PERSONNEL_NAME { get; set; }
        public string ALIAS { get; set; }
        public string ROW_ID { get; set; }
    }

    //{"page":1,"records":1,"total":1,"rows":[{"cell":["1","200-815-383-000PH","GANELO, BENEDICTO RONQUILLO"],"id":"1"}]}
    public class GridTemp
    {
        public int page { get; set; }
        public int records { get; set; }
        public int total { get; set; }
        public Rows[] rows { get; set; }
    }

    public class Rows
    {
        public IList<string> cell { get; set; }
        public int id { get; set; }
    }

    public class CLASS_PPFCS_HEADER
    {
        public ACTUAL_COST_HDR ACTUAL_COST_HDR { get; set; }
        public BDGT_TMPL_HDR BDGT_TMPL_HDR { get; set; }
        public IList<CLASS_IOCC_MSTR> IOCC_MSTR { get; set; }
        public IList<VTR_LIVE_DT_DTL> VTR_MSTR { get; set; }
        public IList<TELECAST_DT_DTL> TELECAST_MSTR { get; set; }
        public PROGRAM_MSTR PROGRAM_MSTR { get; set; }
        public IList<string> STATUS { get; set; }
        public string STATUS_SELECTED { get; set; }
        public IList<CLASS_EPISODE_MODE> EPISODE_MODE_LIST { get; set; }
        public CLASS_EPISODE_MODE EPISODE_MODE_SELECTED { get; set; }

        public bool IS_HR { get; set; }
        public string USER_ID { get; set; }
        public string HASH { get; set; }
        public string EMAIL_ADDRESS { get; set; }

    }

    public class CLASS_STATUS
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class CLASS_EPISODE_MODE
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class CLASS_VTR_LIVE_DT
    {
        public int int_VTR_LIVE_DT { get; set; }
        public DateTime str_VTR_LIVE_DT { get; set; }
    }

    public class CLASS_IOCC_MSTR
    {
        public string charge_cd_IOCC { get; set; }
        public string str_IOCC { get; set; }
    }

    public class CLASS_TELECAST_MSTR
    {
        public int int_TELECAST_DT { get; set; }
        public DateTime str_TELECAST_DT { get; set; }
    }

    public class RELIEVER_CONTAINER
    {
        public string RELIEVED_GLOBAL_ID { get; set; }
        public decimal ACTUAL_COST_ID { get; set; }
        public string PERSONNEL_CLASS_CD { get; set; }
        public decimal ACTUAL_AMT { get; set; }
        public decimal BDGT_TMPL_ID { get; set; }
        public decimal CATEGORY_ID { get; set; }
        public string CREATED_BY { get; set; }
        public DateTime CREATED_DT { get; set; }
        public string HOLD_FL { get; set; }
        public string GLOBAL_ID { get; set; }
        public decimal JOB_ID { get; set; }
        public decimal PAYABLE_AMT { get; set; }
        public string PERSONNEL_INFO_SRC { get; set; }
        public DateTime RELIEVE_DT { get; set; }
        public decimal RTP_AMT { get; set; }

        public bool RTP_FL { get; set; }
        public decimal ACTUAL_COST_RELIEVER_DTL_ID { get; set; }
        public string LAST_UPDATED_BY { get; set; }
        public DateTime LAST_UPDATED_DT { get; set; }
        public string REMARKS { get; set; }

        public string RELIEVED_PROGRAM_PERSONNEL { get; set; }
        public string RELIEVER { get; set; }
        public struJob DESIGNATION { get; set; }
        public string  ALIAS { get; set; }
    }

    public class DCT_TALENT_ATTENDANCE
    {
        public int PROGRAM_ORDR { get; set; }
        public string PROGRAM_DESC { get; set; }
        public string EPISODE_IO_CODE { get; set; }
        public int TALENT_TYPE_ORDR { get; set; }
        public string TALENT_TYPE_DESC { get; set; }
        public string TEXT_TAPING_DATE { get; set; }
        public DateTime? TAPING_DATE { get; set; }
        public string TEXT_TALENT_NAME { get; set; }
        public string TEXT_TALENT_ID { get; set; }
        public string TEXT_REPLACEMENT_TALENT_NAME { get; set; }
        public string TEXT_REPLACEMENT_TALENT_ID { get; set; }
        public string TEXT_DESIGNATION { get; set; }
        public decimal? ATTENDANCE { get; set; }
        public DateTime? EXTRACT_DATE { get; set; }
        public string EXTRACT_DATE_TIME { get; set; }

    }

}