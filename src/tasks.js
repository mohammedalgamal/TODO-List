export default class Task {
    constructor(name, date, priority, project, details = "") {
        this.name = name;
        this.details = details;
        this.date = date;
        this.priority = priority;
        this.project = project;
    };
};


