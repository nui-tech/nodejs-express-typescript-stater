"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimeStamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.warn(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.error(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.debug(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug
};
