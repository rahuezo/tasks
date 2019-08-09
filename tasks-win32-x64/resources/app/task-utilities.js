let setTodaysDate = () => {
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $("#task-date").val(today);
};

let setTime = (inputId, offset = null) => {
    let dt = new Date();
    let hour = offset != null ? dt.getHours() + offset : dt.getHours();
    let minutes = dt.getMinutes(); 

    hour = (hour < 10 ? "0" : "") + hour;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    let time = `${hour}:${minutes}`; 
    
    $(`#${inputId}`).val(time);
};

let calculateDuration = (date, start, end) => {
    let now_time = moment(`${date} ${end}`);
    let then_time = moment(`${date} ${start}`);
    let duration_ms = moment.duration(now_time.diff(then_time))._milliseconds; 
    let duration_hr = duration_ms / 1000 / 60 / 60;

    return Math.round(10 * duration_hr) / 10;
};

let writeCsv = (outputPath, rows) => {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
    path: outputPath,
    header: [
        {id: 'TaskDate', title: 'Date'},
        {id: 'TaskStart', title: 'Start'},
        {id: 'TaskEnd', title: 'End'},
        {id: 'Customer', title: 'Customer'},
        {id: 'TaskNumber', title: 'Task'},
        {id: 'Notes', title: 'Notes'},
    ]
    });

    csvWriter
    .writeRecords(rows)
    .then(()=> console.log('The CSV file was written successfully'));
}; 

String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};