class FileIOError extends Error { 
    constructor(message) {
        super(message);
        this.name = "FileIOError";
    }
}

class JSONError extends Error {
    constructor(message) { 
        super(message);
        this.name = "JSONError";
    }
}

module.exports = {
    FileIOError, 
    JSONError
}