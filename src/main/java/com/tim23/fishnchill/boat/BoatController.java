package com.tim23.fishnchill.boat;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    private BoatService boatService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findAll() {
        return boatService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public BoatDto findById(@PathVariable("id") Long id) {
        return boatService.findById(id);
    }

    @GetMapping(value = "/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByNameContaining(@PathVariable("name") String name) {
        return boatService.findByNameContaining(name);
    }

    @GetMapping(value = "/address/{address}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByAddressContaining(@PathVariable("address") String address) {
        return boatService.findByAddressContaining(address);
    }

    @GetMapping(value = "/description/{description}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByDescriptionContaining(@PathVariable("description") String description) {
        return boatService.findByDescriptionContaining(description);
    }

    @GetMapping(value = "/anything/{anything}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByAnything(@PathVariable("anything") String anything) {
        return boatService.findByAnything(anything, anything, anything);
    }


    @PostMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody BoatDto newBoatDto) throws Exception {
        boatService.update(newBoatDto);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }
}
