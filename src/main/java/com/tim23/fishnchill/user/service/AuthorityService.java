package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.user.model.Authority;
import com.tim23.fishnchill.user.repository.AuthorityRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> findById(Long id) {
        Authority auth = this.authorityRepository.getById(id);
        List<Authority> auths = new ArrayList<>();
        auths.add(auth);
        return auths;
    }

    public List<Authority> findByName(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        List<Authority> auths = new ArrayList<>();
        auths.add(auth);
        return auths;
    }

    public List<Authority> findAllContainingRequest() {
        List<Authority> allAuths = this.authorityRepository.findByNameContaining("REQUEST");
        return allAuths;
    }

    public void confirmRequest(Long id) {
        Authority auth = this.authorityRepository.getById(id);
        auth.setName(auth.getName().replace("REQUEST", "ROLE"));
        authorityRepository.save(auth);
    }
}
