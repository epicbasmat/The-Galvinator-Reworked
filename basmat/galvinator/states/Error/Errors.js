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

class DiscordJSError extends Error { 
    constructor(message) { 
        super(message);
        this.name = "DiscordJSError";
    }
}

module.exports = {
    FileIOError, 
    JSONError,
    DiscordJSError
}