class Task {
    constructor(id, date, customer, task, start, end, notes) {
        this.date = date; 
        this.customer = customer; 
        this.task = task; 
        this.start = start;
        this.end = end; 
        this.notes = notes; 
        this.duration = calculateDuration(this.date, this.start, this.end);
        this.id = id; 
        this.html = null;
        this.element = null;
        this.startString = moment(this.start, "HH:mm").format("h:mm a"); 
        this.endString = moment(this.end, "HH:mm").format("h:mm a")
        this.draw();
    }

    draw() {
        this.html = `<div class="task card my-2" id="task-${this.id}">
                        <div class="card-body">
                            <h5 class="card-title">${this.customer} &middot; ${this.task}<span class="badge badge-secondary float-right">${this.duration}hr</span></h5>
                            <h6 class="card-subtitle mb-2 text-muted">${this.startString} to ${this.endString}</h6>
                            <p class="card-text">
                                ${this.notes}
                            </p>
                            <div class="dropdown">
                                <a href="#" class="float-right text-muted dropdown toggle" 
                                    id="drop-down-btn-${this.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-h"></i>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="drop-down-btn-${this.id}">
                                    <a class="dropdown-item text-center text-danger" href="#" onclick="deleteTask(${this.id})">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>`; 

        this.element = $(this.html);
    }
}


module.exports = {
    Task : Task
}