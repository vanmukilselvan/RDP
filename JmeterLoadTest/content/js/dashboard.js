/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.61949956859361, "KoPercent": 1.380500431406385};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.05737704918032787, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.013114754098360656, 500, 1500, "Get Project Details"], "isController": false}, {"data": [0.1042611060743427, 500, 1500, "Add User"], "isController": false}, {"data": [0.038928210313447925, 500, 1500, "Add Project"], "isController": false}, {"data": [0.06671779141104295, 500, 1500, "Get Parent Tasks"], "isController": false}, {"data": [0.01819620253164557, 500, 1500, "Get Project Tasks"], "isController": false}, {"data": [0.04853911404335533, 500, 1500, "Update User"], "isController": false}, {"data": [0.05756578947368421, 500, 1500, "End Task"], "isController": false}, {"data": [0.022091310751104567, 500, 1500, "Update Task"], "isController": false}, {"data": [0.07321652065081352, 500, 1500, "Add Parent Task"], "isController": false}, {"data": [0.016891891891891893, 500, 1500, "Add Task"], "isController": false}, {"data": [0.12705667276051189, 500, 1500, "Get User Details"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9272, 128, 1.380500431406385, 37450.21570319242, 8, 159872, 74217.80000000002, 89989.75, 128599.75000000019, 11.642990158960972, 327.29877136520713, 3.471382626271568], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["Get Project Details", 915, 11, 1.2021857923497268, 68017.08087431695, 312, 159872, 128929.6, 139592.4, 156763.24000000002, 1.152587464383158, 100.03654190379737, 0.2262403128330222], "isController": false}, {"data": ["Add User", 1103, 8, 0.7252946509519492, 24037.75249320033, 53, 93868, 57535.6, 68462.99999999999, 75690.76000000002, 1.4250535525564403, 0.22477291640827074, 0.44532923517388756], "isController": false}, {"data": ["Add Project", 989, 22, 2.224469160768453, 38494.29828109204, 320, 102897, 80796.0, 90092.5, 102189.6, 1.26917721640819, 0.1784805524899101, 0.4164487741339373], "isController": false}, {"data": ["Get Parent Tasks", 652, 7, 1.0736196319018405, 30705.05981595093, 8, 93047, 45360.200000000004, 58388.50000000004, 77013.02000000014, 0.8449317056734831, 72.4097580115433, 0.169151366858461], "isController": false}, {"data": ["Get Project Tasks", 632, 4, 0.6329113924050633, 55998.63924050632, 39, 117154, 97749.50000000001, 102441.75000000003, 111798.91999999998, 0.8028057553042977, 75.75334591051764, 0.328491808078614], "isController": false}, {"data": ["Update User", 1061, 14, 1.3195098963242224, 30152.873704052763, 67, 94655, 67157.6, 71162.1, 76258.31999999996, 1.3706699876239223, 0.19166297811966299, 0.4296729160422647], "isController": false}, {"data": ["End Task", 608, 4, 0.6578947368421053, 33547.572368421075, 12, 79978, 63917.100000000006, 70848.29999999996, 79193.20999999999, 0.7881252341367112, 0.10974651986970008, 0.3509620183265042], "isController": false}, {"data": ["Update Task", 679, 8, 1.1782032400589102, 39630.768777614176, 162, 102633, 59592.0, 77411.0, 95844.60000000027, 0.8760544263327252, 0.12239129070943636, 0.31226549376117646], "isController": false}, {"data": ["Add Parent Task", 799, 12, 1.5018773466833542, 30998.843554443047, 74, 93636, 53457.0, 70176.0, 80606.0, 1.032139719940061, 0.14449118434480443, 0.26912236838280884], "isController": false}, {"data": ["Add Task", 740, 27, 3.6486486486486487, 42891.09864864865, 568, 103585, 76849.4, 90387.74999999996, 102752.09, 0.9509722406062577, 0.13492270057482417, 0.33989828131043975], "isController": false}, {"data": ["Get User Details", 1094, 11, 1.0054844606946984, 26692.436928702013, 9, 79972, 63006.5, 70110.75, 74788.55, 1.412890885820594, 83.76896342288315, 0.26905636985841386], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500", 128, 100.0, 1.380500431406385], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 9272, 128, "500", 128, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Get Project Details", 915, 11, "500", 11, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add User", 1103, 8, "500", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Project", 989, 22, "500", 22, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Parent Tasks", 652, 7, "500", 7, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get Project Tasks", 632, 4, "500", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update User", 1061, 14, "500", 14, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["End Task", 608, 4, "500", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Update Task", 679, 8, "500", 8, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Parent Task", 799, 12, "500", 12, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Add Task", 740, 27, "500", 27, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Get User Details", 1094, 11, "500", 11, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
