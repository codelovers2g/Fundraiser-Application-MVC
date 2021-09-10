using Business.Service;
using System;
using System.Diagnostics;
using System.ServiceProcess;
using System.Timers;

namespace WindowsService
{
    public partial class WindowJobService : ServiceBase
    {
        private Timer _timer;
        static private bool _isJobInProgress = false;

        public WindowJobService()
        {
            //Debugger.Launch();
            InitializeComponent();
            JobProcess.WriteToFile("Window Service Initialized at :" + DateTime.Now);
        }

        protected override void OnStart(string[] args)
        {
            try
            {
                JobProcess.WriteToFile("Window Service Started at :" + DateTime.Now);
                //Debugger.Launch();
                _timer = new Timer();
                _timer.AutoReset = true;
                _timer.Interval = TimeSpan.FromMinutes(1).TotalMilliseconds;
                _timer.Elapsed += new ElapsedEventHandler(timer_Elapsed);
                _timer.Start();
            }
            catch (Exception ex)
            {
                // Debugger.Launch();
                JobProcess.WriteToFile("Error Occured On Start " + ex.ToString());
            }
        }
        static void timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            try
            {
                if (!_isJobInProgress)
                {
                    JobProcess.WriteToFile("Timer Elapsed: Starting ProcessJobs at " + DateTime.Now);
                    _isJobInProgress = true;
                    ProcessJobs();
                }
            }catch(Exception ex)
            {

            }
            finally
            {
                _isJobInProgress = false;
            }
        }
        public static void ProcessJobs()
        {
            try
            {              
                JobProcess.WriteToFile("ProcessJobs Started at " + DateTime.Now);
                JobProcess jobProcess = new JobProcess();
                string status = jobProcess.JobProcessing();
                JobProcess.WriteToFile(string.IsNullOrWhiteSpace(status) ? "Nothing to process" : "Jobs Process Status = " + status);
                JobProcess.WriteToFile("ProcessJobs Completed at " + DateTime.Now);
            }
            catch (Exception ex)
            {
                JobProcess.WriteToFile("An Error Occured at " + DateTime.Now + " Error: " + ex.ToString());
            }
        }
        protected override void OnStop()
        {
            JobProcess.WriteToFile("Window Service Stopped at :" + DateTime.Now);
        }
        // jobProcess.JobProcessing();
        [Conditional("DEBUG_SERVICE")]
        private static void DebugMode()
        {
            Debugger.Break();
        }
    }


}
