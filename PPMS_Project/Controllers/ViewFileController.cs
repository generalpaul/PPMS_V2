using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PPMS_Project.Controllers
{
    public class ViewFileController : Controller
    {
        IConfiguration _iconfiguration;
        public ViewFileController(IConfiguration iconfiguration)
        {
          _iconfiguration = iconfiguration;
        }
    // GET: /<controller>/
       public IActionResult Index()
        {
            return View();
        }

       // [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult GetFile(string fileName, string token)
        {
           var mimeTypes = new Dictionary<String, String>
            {
                {".bmp", "image/bmp"},
                {".gif", "image/gif"},
                {".jpeg", "image/jpeg"},
                {".jpg", "image/jpeg"},
                {".png", "image/png"},
                {".tif", "image/tiff"},
                {".tiff", "image/tiff"},
                {".doc", "application/msword"},
                {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
                {".pdf", "application/pdf"},
                {".ppt", "application/vnd.ms-powerpoint"},
                {".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".xls", "application/vnd.ms-excel"},
                {".csv", "text/csv"},
                {".xml", "text/xml"},
                {".txt", "text/plain"},
                {".zip", "application/zip"},
                {".ogg", "application/ogg"},
                {".mp3", "audio/mpeg"},
                {".wma", "audio/x-ms-wma"},
                {".wav", "audio/x-wav"},
                {".wmv", "audio/x-ms-wmv"},
                {".swf", "application/x-shockwave-flash"},
                {".avi", "video/avi"},
                {".mp4", "video/mp4"},
                {".mpeg", "video/mpeg"},
                {".mpg", "video/mpeg"},
                {".qt", "video/quicktime"}
            };

      string originalString = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(token));

      string user_name = originalString.Split(':')[0];
      string hash = originalString.Split(':')[1];

      if (!PPMS_Session.CheckUser(user_name, hash, _iconfiguration))
      {
          throw new FileLoadException();
      }

      // No need to dispose the stream, MVC does it for you
      //string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "myimage.png");
      FileStream stream = new FileStream(_iconfiguration["ImagePath"] + fileName, FileMode.Open);
      
      //  MediaTypeHeaderValue
      //FileStreamResult result = new FileStreamResult(stream, "image/png");
      FileStreamResult result = new FileStreamResult(stream, mimeTypes[fileName.Substring(fileName.Length - 4, 4).ToLower()]);
      result.FileDownloadName = fileName;
          return result;
        }

    [HttpPost]
    public async Task<bool> Upload(ICollection<IFormFile> files, string token)
    {

      try
      {

        string originalString = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(token));

        string user_name = originalString.Split(':')[0];
        string hash = originalString.Split(':')[1];
        
        if (!PPMS_Session.CheckUser(user_name, hash, _iconfiguration))
        {
          throw new FileLoadException();
        }

        foreach (var file in files)
        {
          if (file.Length > 0)
          {
            //using (var fileStream = new FileStream(Path.Combine(uploads, file.FileName), FileMode.Create))
            using (var fileStream = new FileStream(_iconfiguration["ImagePath"] + file.FileName, FileMode.Create))
            {
              await file.CopyToAsync(fileStream);
            }
          }
        }


      }
      catch (Exception)
      {
        throw new FileLoadException();
      }
      
      return true;
    }


    //[HttpPost]
    //    publicActionResultUploadFile(HttpPostedFileBase file)
    //{
    //  try
    //  {
    //    if (file.ContentLength > 0)
    //    {
    //      string _FileName = Path.GetFileName(file.FileName);
    //      string _path = Path.Combine(Server.MapPath("~/UploadedFiles"), _FileName);
    //      file.SaveAs(_path);
    //    }
    //    ViewBag.Message = "File Uploaded Successfully!!";
    //    return View();
    //  }
    //  catch
    //  {
    //    ViewBag.Message = "File upload failed!!";
    //    return View();
    //  }
    //}

  }


}
