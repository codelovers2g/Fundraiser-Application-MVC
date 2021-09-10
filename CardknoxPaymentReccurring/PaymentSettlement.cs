using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Service;
using Business.GatewayPayment.Service;
using System.IO;
using Common.MasterModel;

namespace Business.PaymentSettlement
{
    public class PaymentSettlement
    {
        public void TryRecurringPayments()
        {
            AccountManager accountManager = new AccountManager();
            CardknoxPaymentService cardknoxPaymentService = new CardknoxPaymentService();

            var data = accountManager.GetUnProcessedPayments();
            // if there are some unapproved payments then make transaction
            var statusResponded = string.Empty;

            if (data.Count > 0)
            {
                data.ForEach(x =>
                {
                    statusResponded += Environment.NewLine;
                    statusResponded += "Payment For " + x.PeopleId + " is about to start..."+Environment.NewLine;
                    statusResponded += "Organization with Id: " + x.OrganizationId + Environment.NewLine;  
                    statusResponded += cardknoxPaymentService.ChargebyWindowservice(x);
                    statusResponded += "Receipt No. For payment: " + x.ReceiptNumber + Environment.NewLine;
                    WriteToFile(statusResponded);
                });
            }
            else
            {
                statusResponded = "No data to Process";
                WriteToFile(statusResponded);
            }
           
        }
        public static void WriteToFile(string Message)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + "\\Logs";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string filepath = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\PaymentServiceLog_" + DateTime.Now.Date.ToShortDateString().Replace('/', '_') + ".txt";

            if (!File.Exists(filepath))
            {
                // Create a file to write to.   
                using (StreamWriter sw = File.CreateText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
        }


    }
}
