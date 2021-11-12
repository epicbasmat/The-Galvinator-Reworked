class Success {
    constructor(message, type) { 
        this.type = type
        this.message = message;
        return ({"Type": this.type, "Result": this.message});
    }
}

class Create extends Success {
    constructor(message) {
        super(message, "Create")
    }
}

class Delete extends Success { 
    constructor(message) { 
        super(message, "Delete");
    }
}

class Append extends Success {
    constructor(message) {
        super(message, "Append");
    }
}

class Edit extends Success { 
    constructor(message) { 
        super(message, "Edit");
    }
}

class Read extends Success { 
    constructor(message) { 
        super(message, "Read");
    }
}


module.exports = {
    Create,
    Delete,
    Append, 
    Edit,
    Read
}