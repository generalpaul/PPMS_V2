using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace PPMS_Project.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //using (ExcelPackage package = new ExcelPackage())
            //{
            //  ExcelWorksheet ws = package.Workbook.Worksheets.Add("MySheet");

            //  ws.Cells["A1"].Value = "Some Bold Text";
            //  ws.Cells["A1"].Style.Font.Bold = true;
            //  ws.Cells["A2"].Value = "Some blue text";
            //  ws.Cells["A2"].Style.Font.Color.SetColor(Color.Blue);
            //  ws.Cells["A3"].Value = "Some Large Text";
            //  ws.Cells["A3"].Style.Font.Size = 22;

            //  ws.Cells["A3"].Style.Border.BorderAround(ExcelBorderStyle.Thin, Color.Red);

            //  ws.Row(3).Height = 23;
            //  ws.Column(1).AutoFit();

            //  package.SaveAs(new System.IO.FileInfo(@"C:\Users\pmveluya\Documents\sqldeveloper from SIR EDWIN\example.xls"));
            //}
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";
     
      //Microsoft.Office.Interop.Excel.Application xlsApp = new Microsoft.Office.Interop.Excel.Application();
      //Workbook wb = xlsApp.Workbooks.Add(XlSheetType.xlWorksheet);
      //Worksheet ws = (Worksheet)xlsApp.ActiveSheet;
      //xlsApp.Visible = true;
      //ws.Cells[1, 1] = "First Name";
      //ws.Cells[1, 2] = "Last Name";
      //ws.Cells[2, 1] = "Mary";
      //ws.Cells[2, 2] = "Poppins";
      //ws.Cells[3, 1] = "Grace";
      //ws.Cells[3, 2] = "Kelly";

      return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
