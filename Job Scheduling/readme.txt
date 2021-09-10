Job : A job basically contains a People records from database as well as from the Excel, which is scheduled for particular data and time, on which it will processed. There is 
background service to process this job, which will send a text message, a voice call, and an Email. Also keep hsitory of sent content for each person.

Challanging:

1. Read an unknown Excel file, about which we don't know anything. Create dataTable for this excel file with each columns it contains and perform same job while database does not have this record.
2. Also create dataTable for a criteria or filter saved in database but according to the job type selected that is if a text type job is created then the dataTable only contains a records from filter, containing Celluar
or mobile number. If it is Voice type then table contains records having both mobile and landline number. 