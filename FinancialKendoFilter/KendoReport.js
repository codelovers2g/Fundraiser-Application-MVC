
$(function () {
    var orderData = [
        { OrderID: 1, OrderDate: "2017-11-06T12:00:00", Freight: 12.34, ShipCity: "Antwerp", ShipCountry: "Belgium" },
        { OrderID: 2, OrderDate: "2019-03-02T12:00:00", Freight: 23.45, ShipCity: "Singapore", ShipCountry: "Singapore" },
        { OrderID: 3, OrderDate: "2019-06-26T12:00:00", Freight: 34.56, ShipCity: "Shanghai", ShipCountry: "China" },
        { OrderID: 4, OrderDate: "2017-09-20T12:00:00", Freight: 45.67, ShipCity: "Hamburg", ShipCountry: "Germany" },
        { OrderID: 5, OrderDate: "2017-12-12T12:00:00", Freight: 56.78, ShipCity: "Mumbai", ShipCountry: "India" },
        { OrderID: 6, OrderDate: "2018-02-08T12:00:00", Freight: 67.89, ShipCity: "Shanghai", ShipCountry: "China" },
        { OrderID: 7, OrderDate: "2018-05-05T12:00:00", Freight: 78.90, ShipCity: "Tokyo", ShipCountry: "Japan" },
        { OrderID: 8, OrderDate: "2019-08-03T12:00:00", Freight: 89.01, ShipCity: "Port Klang", ShipCountry: "Malaysia" },
        { OrderID: 9, OrderDate: "2018-10-29T12:00:00", Freight: 90.12, ShipCity: "Rotterdam", ShipCountry: "Netherlands" },
        { OrderID: 10, OrderDate: "2018-01-23T12:00:00", Freight: 10.32, ShipCity: "Vancouver", ShipCountry: "Canada" },
        { OrderID: 11, OrderDate: "2018-04-17T12:00:00", Freight: 21.43, ShipCity: "Colón", ShipCountry: "Panama" },
        { OrderID: 12, OrderDate: "2017-07-11T12:00:00", Freight: 32.54, ShipCity: "Manila", ShipCountry: "Philippines" },
        { OrderID: 13, OrderDate: "2017-10-24T12:00:00", Freight: 43.65, ShipCity: "Singapore", ShipCountry: "Singapore" },
        { OrderID: 14, OrderDate: "2018-03-11T12:00:00", Freight: 54.76, ShipCity: "Busan", ShipCountry: "South Korea" },
        { OrderID: 15, OrderDate: "2018-06-17T12:00:00", Freight: 65.87, ShipCity: "Shenzhen", ShipCountry: "China" },
        { OrderID: 16, OrderDate: "2018-10-13T12:00:00", Freight: 76.98, ShipCity: "Hong Kong", ShipCountry: "China" },
        { OrderID: 17, OrderDate: "2019-04-19T12:00:00", Freight: 87.09, ShipCity: "Dubai", ShipCountry: "UAE" },
        { OrderID: 18, OrderDate: "2019-07-25T12:00:00", Freight: 98.21, ShipCity: "Felixstowe", ShipCountry: "UK" },
        { OrderID: 19, OrderDate: "2017-09-22T12:00:00", Freight: 13.24, ShipCity: "Los Angeles", ShipCountry: "USA" },
        { OrderID: 20, OrderDate: "2018-12-09T12:00:00", Freight: 35.46, ShipCity: "New York", ShipCountry: "USA" },
        { OrderID: 21, OrderDate: "2018-02-04T12:00:00", Freight: 57.68, ShipCity: "Guangzhou", ShipCountry: "China" },
        { OrderID: 22, OrderDate: "2019-05-16T12:00:00", Freight: 9.87, ShipCity: "Long Beach", ShipCountry: "USA" },
        { OrderID: 23, OrderDate: "2019-08-18T12:00:00", Freight: 24.13, ShipCity: "Singapore", ShipCountry: "Singapore" }
    ];

    var remoteDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                //url: window.location.origin + "/Pledge/GetAllPledges",
                url: "/Pledge/GetAllPledges",
                dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            }
        },
        schema: {
            model: {
                fields: {
                    Amount: { type: "number" },
                    Year: { type: "string" },
                    CampaignId: { type: "number" },
                    PledgeDate: { type: "date" },
                }
            }
        },
        pageSize: 10,
        sort: {
            field: "Year",
            dir: "desc"
        },
        //group: [
        //    {
        //        field: "Year",
        //        aggregates: [
        //            { field: "Amount", aggregate: "sum" },
        //            { field: "Year", aggregate: "count" },
        //            { field: "CampaignId", aggregate: "count" },
        //        ]
        //    },
        //    //{
        //    //    field: "CampaignId",
        //    //},

        //],
        aggregate: [
            { field: "Year", aggregate: "count" },
            { field: "Amount", aggregate: "sum" },
            { field: "CampaignId", aggregate: "count" },
        ]
    })

    var gridDataSource = new kendo.data.DataSource({
        data: orderData,
        schema: {
            model: {
                fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    OrderDate: { type: "date" },
                    ShipCountry: { type: "string" },
                    ShipCity: { type: "string" }
                }
            }
        },
        pageSize: 10,
        sort: {
            field: "OrderDate",
            dir: "desc"
        },
        group: [
            {
                field: "ShipCountry",
            },
            {
                field: "ShipCity",
            },

        ],
    });


    /*
    $("#ordersGrid").kendoGrid({
        dataSource: remoteDataSource,
        pageable: true,
        sortable: true,
        filterable: true,
        groupable: true,
        toolbar: ["pdf"],
        pdf: {
            allPages: true,
            avoidLinks: true,
            paperSize: "A4",
            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
            //landscape: true,
            repeatHeaders: true,
            template: $("#page-template").html(),
            scale: 0.8
        },
        columns: [
            { field: "Amount", title: "Amount", aggregates: ["sum"], footerTemplate: "Total Sum: #=sum#", groupFooterTemplate: "Sum: #=sum#" },
            { field: "Year", title: "Year", aggregates: ["count"], groupHeaderColumnTemplate: "Count: #=count#" },
            {
                field: "PledgeDate",
                title: "Pledge Date",
                format: "{0:dd MMMM yyyy}"
                //aggregates: ["average"], footerTemplate: "Average: #=average#",
                //groupFooterTemplate: "Average: #=average#"
            },
            {
                field: "CampaignId", title: "Campaign Id", aggregates: ["count"],
                groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)"
            }
        ]
        //columns: [{
        //    field: "OrderID",
        //    title: "Order ID",
        //    width: 160
        //}, {
        //    field: "Freight",
        //    width: 160,
        //}, {
        //    field: "OrderDate",
        //    title: "Order Date",
        //    width: 200,
        //    format: "{0:dd MMMM yyyy}"
        //}, {
        //    field: "ShipCountry",
        //    title: "Ship Country"
        //}, {
        //    field: "ShipCity",
        //    title: "Ship City"
        //}],
        //columns: [
        //    {
        //        field: "Amount",
        //        title: "Amount",
        //        //aggregates: ["count", "min", "max"],
        //        //groupFooterTemplate: "age total: #: count #, min: #: min #, max: #: max #"
        //    },
        //    {
        //        field: "Year",
        //        title: "Year",
        //    },
        //    {
        //        field: "PledgeDate",
        //        title: "Pledge Date",
        //        format: "{0:dd MMMM yyyy}"
        //    },
        //    {
        //        field: "CampaignId",
        //        title: "Campaign Id"
        //    }
        //],
        //group: { field: "ShipCity" }, // Group the data by 'Country' field.
    });
    */
});
