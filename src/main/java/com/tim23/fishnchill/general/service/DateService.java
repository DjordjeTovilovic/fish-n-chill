package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.cottage.model.Cottage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class DateService {
    public boolean doDatePeriodsOverlap(LocalDateTime firstDateStart, LocalDateTime firstDateEnd,
                                        LocalDateTime secondDateStart, LocalDateTime secondDateEnd) {
        return !(firstDateEnd.isBefore(secondDateStart) || secondDateEnd.isBefore(firstDateStart));
    }

    public boolean isDateWithinPeriod(LocalDateTime testDate, LocalDateTime startDate, LocalDateTime endDate) {
        return !(testDate.isBefore(startDate) || testDate.isAfter(endDate));
    }

    public boolean isDatePeriodWithinPeriod(LocalDateTime testStartDate, LocalDateTime testEndDate,
                                            LocalDateTime startDate, LocalDateTime endDate) {
        return isDateWithinPeriod(testStartDate, startDate, endDate) && isDateWithinPeriod(testEndDate, startDate, endDate);
    }

    public boolean isCottageAvailableInPeriod(Cottage cottage, LocalDateTime startTime, LocalDateTime endTime) {
        // Testing if date range is within cottage available time
        if (!isDatePeriodWithinPeriod(startTime, endTime, cottage.getAvailabilityStart(), cottage.getAvailabilityEnd()))
            return false;
        // Testing if date range is overlapping with any cottage reservation time
        return cottage.getReservations().stream().noneMatch(reservation ->
                doDatePeriodsOverlap(startTime, endTime, reservation.getReservationStart(),
                        reservation.getReservationEnd()));
    }
}
