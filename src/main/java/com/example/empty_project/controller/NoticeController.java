package com.example.empty_project.controller;

import com.example.empty_project.entity.Notice;
import com.example.empty_project.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeRepository noticeRepository;

    @GetMapping
    public String list() {
        return "Hello";
    }

    @GetMapping("/{id}")
    public Notice detail(@PathVariable Long id) {
        return noticeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Notice create(@RequestBody Notice notice) {
        return noticeRepository.save(notice);
    }

    @PutMapping("/{id}")
    public Notice update(@PathVariable Long id, @RequestBody Notice notice) {
        notice.setId(id);
        return noticeRepository.save(notice);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        noticeRepository.deleteById(id);
    }
}
