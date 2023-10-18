package com.teamone.unitask.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Hyperlink {

    @Id
    @GeneratedValue
    private Long hyperlinkId;
    private String title;
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
