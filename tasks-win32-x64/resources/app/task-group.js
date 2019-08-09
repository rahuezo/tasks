class TaskGroup {
    constructor(containerId, title) {
        this.containerId = containerId;
        this.title = title; 
        this.tasks = [];
        this.quantifier = null
        
        this.duration = 0; 

        this.html = null;
        this.element = null;
        this.collapseId = "task-group-" + this.title.replace(/\-/g,"");
    }

    addTask(task) {
        this.tasks.push(task);
    }

    draw() {
        this.quantifier = this.tasks.length == 1 ? "Task" : "Tasks";
        this.duration = this.tasks.map(t => t.duration).reduce((a, b) => a + b, 0);
        
        this.html = `<div class="task-group my-4">                        
                        <input type="checkbox" class="export-checkbox" value="${this.title}"/>
                        <a class="task-group-header" data-toggle="collapse" href="#${this.collapseId}" role="button" aria-expanded="true" aria-controls="${this.collapseId}">
                            <h5>${this.title} &middot; ${this.tasks.length} ${this.quantifier}<span class="badge badge-dark float-right">${this.duration}hr</span></h5>
                        </a>                        
                        <div class="tasks collapse mb-4 show" id="${this.collapseId}"></div>
                        <hr class="my-2">
                    </div>`; 

        this.element = $(this.html);

        
        this.tasks.forEach(task => {
            this.element.find(".tasks").append(task.element);
        });
        
        $(`#${this.containerId}`).append(this.element);
    }
}

module.exports = {
    TaskGroup : TaskGroup
}