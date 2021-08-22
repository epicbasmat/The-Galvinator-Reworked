class Success {
    constructor(message, type) { 
        this.type = type
        this.message = message;
        return ({"Type": this.type, "Message": "Success: " + this.message});
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
        super(message, "Success");
    }
}


module.exports = {
    Create,
    Delete,
    Append, 
    Edit
}