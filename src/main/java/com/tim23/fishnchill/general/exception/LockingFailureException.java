package com.tim23.fishnchill.general.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class LockingFailureException extends RuntimeException {

    public LockingFailureException() {
        super("Could not get lock on entity");
    }
}
