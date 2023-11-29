package com.teamone.unitask.report;

import com.teamone.unitask.projects.Project;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


/**
 * The entity class for Report table
 */
@Entity
@Table(name = "reports")
public class Report {

    /**
     * fields
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @NotBlank
    @Size(max = 1000)
    private String reportName;

    @NotBlank
    @Size(max = 6000)
    private String accomplishment;

    @Size(max = 6000)
    private String feedback;

    @Size(max = 6000)
    private String memberComment;

    /**
     * foreign keys
     */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectId;

    /**
     * methods
     */

    public Report() {

    }

    public Report(String reportName,
                  String accomplishment,
                  String feedback,
                  String memberComment) {
        this.reportName = reportName;
        this.accomplishment = accomplishment;
        this.feedback = feedback;
        this.memberComment = memberComment;
    }

    public Long getReportId() {
        return reportId;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getAccomplishment() {
        return accomplishment;
    }

    public void setAccomplishment(String accomplishment) {
        this.accomplishment = accomplishment;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getMemberComment() {
        return memberComment;
    }

    public void setMemberComment(String memberComment) {
        this.memberComment = memberComment;
    }

    public Project getProjectId() {
        return projectId;
    }

    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
