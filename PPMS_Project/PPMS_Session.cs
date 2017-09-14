using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PPMS_Project
{
  public static class PPMS_Session
  {
    
    public static bool CheckUser(string USER_ID, string HASH, IConfiguration iconfiguration)
    {
      
      if (!File.Exists(iconfiguration["STORAGE_PATH"] + USER_ID + ".txt"))
      {
        return false;
      }

      string strHash = "";
      
      using (StreamReader sr = File.OpenText(iconfiguration["STORAGE_PATH"] + USER_ID + ".txt"))
      {
        strHash = sr.ReadToEnd().Trim();
      }

      return HASH == strHash;
    }

    

  }
}
