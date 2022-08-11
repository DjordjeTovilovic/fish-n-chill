package com.tim23.fishnchill.general.controller;

import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.general.dto.ClientSubscriptionDto;
import com.tim23.fishnchill.general.dto.NewClientSubscriptionDto;
import com.tim23.fishnchill.general.service.ClientSubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/subscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientSubscriptionController {
    private ClientSubscriptionService clientSubscriptionService;

    @GetMapping(value = "/{clientId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientSubscriptionDto> findAllByClientId(@PathVariable("clientId") Long clientId) {
        return clientSubscriptionService.findAllByClientId(clientId);
    }

    @PostMapping(value = "/exists")
    @ResponseBody
    public boolean exists(@RequestBody NewClientSubscriptionDto newClientSubscriptionDto) {
        return clientSubscriptionService.exists(newClientSubscriptionDto);
    }

    @PostMapping(value = "/subscribe")
    @ResponseBody
    public ClientSubscriptionDto subscribe(@RequestBody NewClientSubscriptionDto newClientSubscriptionDto) {
        return clientSubscriptionService.subscribe(newClientSubscriptionDto);
    }

    @DeleteMapping(value = "/unsubscribe")
    @ResponseBody
    public void unsubscribe(@RequestParam String clientId,@RequestParam String entityId) {
        clientSubscriptionService.unsubscribe(Long.parseLong(clientId), Long.parseLong(entityId));
    }
}
