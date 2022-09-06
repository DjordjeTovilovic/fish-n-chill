package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM User c WHERE c.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "0")})
    User findByIdAndLock(Long id);
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    User findByUsername(String username);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    User findByEmail(String email);

    List<User> findAllByEnabledFalse();

}
