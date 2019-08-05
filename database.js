const sqlite = require('sqlite3').verbose();

const tasksDb = "tasks.db";

class Database {
    constructor(filePath) {
        this.db = new sqlite.Database(filePath, (err) => {
            if (err) return console.log(err.message);
            console.log("Connected to tasks.db");
        }); 
    }

    getTaskGroups = () => {
        let sqlQuery = "SELECT DISTINCT TaskDate FROM tasks ORDER BY date(TaskDate) DESC"; 
    
        return new Promise(res => this.db.all(sqlQuery, [], (err, rows) => {
            if (err) {
              throw err;
            }
            
            res(rows);
        }));
    };

    getTasks = (date) => {
        let sqlQuery = `SELECT * FROM tasks WHERE TaskDate='${date}' ORDER BY date(TaskDate) ASC`; 
    
        return new Promise(res => this.db.all(sqlQuery, [], (err, rows) => {
            if (err) {
              throw err;
            }
            res(rows);
        }));
    };

    //date, customer, task, start, end, notes 
    addTask(date, start, end, customer, taskNumber, notes) {
        
        return new Promise(res => this.db.run(`INSERT INTO tasks(TaskDate, TaskStart, TaskEnd, Customer, TaskNumber, Notes) VALUES(?,?,?,?,?,?)`, 
            [date, start, end, customer, taskNumber, notes], (err) => {

            if (err) {
              return console.log(err.message);
            }
            res();
        }));
    }

    deleteTask(taskId) {
        
        return new Promise(res => this.db.run(`DELETE FROM tasks WHERE ID=${taskId}`, 
            [], (err) => {

            if (err) {
              return console.log(err.message);
            }
            res();
        }));
    }
}














module.exports = {
    Database : new Database(tasksDb)
}