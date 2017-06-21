using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Web;

namespace PPMS.MVCWeb.Controller_Classes
{
    public static class PPMS_Session
    {

        public static bool CheckCollections<T>(List<T> lstGenericClass)
           where T : Type
        {
            return true;
        }
        public static bool SaveRecordsToServer<T>(string strName, List<T> lstGenericClass)
           where T : class
        {

            for (int i = 0; i <= lstGenericClass.Count-1; ++i)
            {
                for (int j = 0; j <= lstGenericClass[i].GetType().GetProperties().Length-1; ++j)
                {
                    if (lstGenericClass[i].GetType().GetProperties()[j].PropertyType.AssemblyQualifiedName.Contains("ICollection") || lstGenericClass[i].GetType().GetProperties()[j].Name.Contains("_MSTR") || lstGenericClass[i].GetType().GetProperties()[j].Name.Contains("_TRX"))
                    {
                        //varProperties.SetValue(varItem, null);
                        //CheckCollections(lstGenericClass[i]);
                    }

                    if (lstGenericClass[i].GetType().GetProperties()[j].PropertyType == typeof(DateTime?) || lstGenericClass[i].GetType().GetProperties()[j].PropertyType == typeof(DateTime))
                    {
                        if (lstGenericClass[i].GetType().GetProperties()[j].GetValue(lstGenericClass[i], null) != null)
                            if (((DateTime)lstGenericClass[i].GetType().GetProperties()[j].GetValue(lstGenericClass[i], null)).Year < 1930)
                            {
                                DateTime? nullableDate = new DateTime(1920, 1, 1);
                                lstGenericClass[i].GetType().GetProperties()[j].SetValue(lstGenericClass[i], nullableDate);
                            }
                    }
                }
            }

            //foreach (var varItem in lstGenericClass)
            //{
            //    foreach (var varProperties in varItem.GetType().GetProperties())
            //    {
            //        if (varProperties.PropertyType.AssemblyQualifiedName.Contains("ICollection") || varProperties.Name.Contains("_MSTR") || varProperties.Name.Contains("_TRX"))
            //        {
            //            //varProperties.SetValue(varItem, null);
            //            CheckCollections(ref varItem);
            //        }

            //        if (varProperties.PropertyType == typeof(DateTime?) || varProperties.PropertyType == typeof(DateTime))
            //        {
            //            if (varProperties.GetValue(varItem, null) != null)
            //                if (((DateTime)varProperties.GetValue(varItem, null)).Year < 1930)
            //                {
            //                    DateTime? nullableDate = new DateTime(1920, 1, 1);
            //                    varProperties.SetValue(varItem, nullableDate);
            //                }
            //        }

            //    }
            //}


            MemoryStream stream = new MemoryStream();
            DataContractSerializer x = new DataContractSerializer(lstGenericClass.GetType());

            x.WriteObject(stream, lstGenericClass);

            if (!Directory.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"]))
            {
                try
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["STORAGE_PATH"]);
                }
                catch (Exception)
                {

                }

            }

            using (FileStream fs = new FileStream(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", FileMode.Create))
            {
                stream.WriteTo(fs);

            }


            return true;
            
        }

        public static bool SaveListToServer<T>(string strName, List<T> lstGenericClass)
           where T : struct
        {

            
            MemoryStream stream = new MemoryStream();
            DataContractSerializer x = new DataContractSerializer(lstGenericClass.GetType());

            x.WriteObject(stream, lstGenericClass);

            if (!Directory.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"]))
            {
                try
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["STORAGE_PATH"]);
                }
                catch (Exception)
                {

                }

            }

            using (FileStream fs = new FileStream(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", FileMode.CreateNew))
            {
                stream.WriteTo(fs);

            }


            return true;

        }

        public static void ExtractListToServer<T>(string strName, ref List<T> thisType)
         where T : struct
        {
           
            using (FileStream fsMasterfile = new FileStream(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", FileMode.Open))
            {
                //MemoryStream msFile = new MemoryStream();
                //fsMasterfile.CopyTo(msFile);

                //System.Xml.Serialization.XmlSerializer x = new System.Xml.Serialization.XmlSerializer(thisType.GetType());
                //thisType = (List<T>)x.Deserialize(msFile);

                DataContractSerializer deserialize = new DataContractSerializer(typeof(List<T>));

                thisType = (List<T>)deserialize.ReadObject(fsMasterfile);
                
            }

        }

        public static bool CheckFileExists(string strName)
        {
            return File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt");
        }


        public static void ExtractRecordsToServer<T>(string strName, ref List<T> thisType)
        where T : class
        {
            bool boolFetched=false;

            while(!boolFetched)
            {
                try
                {
                    using (FileStream fsMasterfile = new FileStream(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", FileMode.Open))
                    {
                        //MemoryStream msFile = new MemoryStream();
                        //fsMasterfile.CopyTo(msFile);

                        //System.Xml.Serialization.XmlSerializer x = new System.Xml.Serialization.XmlSerializer(thisType.GetType());
                        //thisType = (List<T>)x.Deserialize(msFile);

                        DataContractSerializer deserialize = new DataContractSerializer(typeof(List<T>));

                        thisType = (List<T>)deserialize.ReadObject(fsMasterfile);
                        boolFetched = true;
                    }
                }
                catch 
                {
                    
                }
            

            }
           

        }


        public static bool SaveObjectToServer<T, U, V>(string strName,T genericClass)
         where T : class
         {



            MemoryStream stream = new MemoryStream();
            DataContractSerializer x = new DataContractSerializer(genericClass.GetType());


            x.WriteObject(stream, genericClass);

            if (!Directory.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"]))
            {
                try
                {
                    Directory.CreateDirectory(ConfigurationManager.AppSettings["STORAGE_PATH"]);
                }
                catch (Exception)
                {

                }

            }

            using (FileStream fs = new FileStream(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", FileMode.CreateNew))
            {
                stream.WriteTo(fs);

            }


            return true;

        }


        public static bool SaveNameToServer(string strName, string strValue, bool boolConcealBudgetConfidential)
        {
            using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt",false))
            {
                sw.Write(strValue);
            }

            
            using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ConcealConfidentialBudgetAmt.txt", false))
            {
                if (!boolConcealBudgetConfidential)
                    sw.Write(1);
                else
                    sw.Write(0);
            }
            
            return true;
        }

        public static bool SaveValueToServer(string strName, string strValue)
        {
            using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", false))
            {
                sw.Write(strValue);
            }
            
            return true;
        }

        public static string GetValueFromServer(string strName)
        {
            string strValue = "";

            if(!File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt"))
                return "";

            using (StreamReader sr = new StreamReader(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt"))
            {
                strValue= sr.ReadLine();
            }

            return strValue;
        }

        public static string GetConcealConfidential(string strName)
        {
            string strValue = "";
            using (StreamReader sr = new StreamReader(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ConcealConfidentialBudgetAmt.txt"))
            {
                strValue= sr.ReadLine();
            }
            return strValue;
          
        }


        public static bool CheckUser(string USER_ID, string HASH)
        {
            if(!File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + ".txt"))
            {
                return false;
            }

            string strHash = "";
            using (StreamReader sr = new StreamReader(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + ".txt"))
            {
                strHash=sr.ReadToEnd().Trim();
            }

            return HASH == strHash;
        }

        
        public static bool SaveValidCompleted(string strName, bool boolValue)
        {
            using (StreamWriter sw = new StreamWriter(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt", false))
            {
                sw.Write(boolValue);
            }
            
            return true;
        }

      

        public static bool RemoveNameToServer(string strName)
        {
            try
            {
                if(File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + ".txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_CATEGORY_MSTR.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_CATEGORY_MSTR.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ConcealConfidentialBudgetAmt.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ConcealConfidentialBudgetAmt.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_IsValidForCompleted.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_IsValidForCompleted.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_JOB_MSTR.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_JOB_MSTR.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ProgramUser.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ProgramUser.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ALLPERSONNEL.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_ALLPERSONNEL.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_REF_CD_MSTR.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_REF_CD_MSTR.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_VAL_MSTR.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_VAL_MSTR.txt");


                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Guest_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Guest_Summary.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Mainstay_Reliever_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Mainstay_Reliever_Summary.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Mainstay_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Mainstay_Summary.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Staff_Reliever_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Staff_Reliever_Summary.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Staff_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Staff_Summary.txt");

                if (File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Unbudgeted_Summary.txt"))
                    File.Delete(ConfigurationManager.AppSettings["STORAGE_PATH"] + strName + "_Unbudgeted_Summary.txt");
            }
            catch
            {
                return false;
            }
            
            return true;
        }

        async public static Task<IList<decimal>> CheckUserProgramUser(string USER_ID, string HASH, PPMS.Infrastructure.IPROGRAM_USER_TRX_REPOSITORY PROGRAM_USER_TRX_REPOSITORY)
        {

            if (!File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + ".txt"))
            {
              
                return new List<decimal>();
            }

            string strHash = "";
            using (StreamReader sr = new StreamReader(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + ".txt"))
            {
                strHash = sr.ReadToEnd().Trim();
            }

            if(strHash==HASH)
            {
                List<decimal> varValidProgramsList = new List<decimal>();
                if (!File.Exists(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + "_ProgramUser.txt"))
                {
                    varValidProgramsList = (await PROGRAM_USER_TRX_REPOSITORY.Where("", all => all.USER_ID == USER_ID)).Select(all => all.PROGRAM_ID).ToList();
                    SaveListToServer(USER_ID + "_ProgramUser", varValidProgramsList);
                    return varValidProgramsList;
                }
                else
                {
                    ExtractListToServer(USER_ID + "_ProgramUser", ref varValidProgramsList);
                    return varValidProgramsList;
                }
                    
                //using (StreamReader sr = new StreamReader(ConfigurationManager.AppSettings["STORAGE_PATH"] + USER_ID + "_ProgramUser.txt"))
                //{
                //    strHash = sr.ReadToEnd().Trim();

                //}

            }
            

            return new List<decimal>();
        }
        
    }

    
}