package com.teamone.unitask.model;

import javax.persistence.*;

@Entity
@Table(name = "hyperlink")
public class Hyperlink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hyperlink_id")
    private Long hyperlinkId;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "url", nullable = false, length = 500)
    private String url;


    public Long getHyperlinkId() {
        return hyperlinkId;
    }

    public void setHyperlinkId(Long hyperlinkId) {
        this.hyperlinkId = hyperlinkId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
