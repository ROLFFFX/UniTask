package com.teamone.unitask.report;

import com.teamone.unitask.projects.Project;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


/**
 * The entity class for the Report table.
 */
@Entity
@Table(name = "reports")
public class Report {

    /**
     * fields
     */

    /**
     * Unique identifier for the report.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    /**
     * Name of the report (not blank, maximum length: 1000 characters).
     */
    @NotBlank
    @Size(max = 1000)
    private String reportName;

    /**
     * Accomplishments mentioned in the report (not blank, maximum length: 3000 characters).
     */
    @NotBlank
    @Size(max = 3000)
    private String accomplishment;

    /**
     * Feedback related to the report (optional, maximum length: 3000 characters).
     */
    @Size(max = 3000)
    private String feedback;

    /**
     * Additional comments from the project member (optional, maximum length: 3000 characters).
     */
    @Size(max = 3000)
    private String memberComment;

    /**
     * foreign keys
     */

    /**
     * Project to which the report belongs.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Project projectId;

    /**
     * methods
     */

    /**
     * Default constructor.
     */
    public Report() {

    }

    /**
     * Parameterized constructor to initialize report details.
     *
     * @param reportName      Name of the report.
     * @param accomplishment  Accomplishments mentioned in the report.
     * @param feedback        Feedback related to the report.
     * @param memberComment   Additional comments from the project member.
     */
    public Report(String reportName,
                  String accomplishment,
                  String feedback,
                  String memberComment) {
        this.reportName = reportName;
        this.accomplishment = accomplishment;
        this.feedback = feedback;
        this.memberComment = memberComment;
    }

    /**
     * Getter for the report ID.
     *
     * @return The report ID.
     */
    public Long getReportId() {
        return reportId;
    }

    /**
     * Getter for the report name.
     *
     * @return The report name.
     */
    public String getReportName() {
        return reportName;
    }

    /**
     * Setter for the report name.
     *
     * @param reportName The new report name.
     */
    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    /**
     * Getter for the accomplishments mentioned in the report.
     *
     * @return Accomplishments mentioned in the report.
     */
    public String getAccomplishment() {
        return accomplishment;
    }

    /**
     * Setter for the accomplishments mentioned in the report.
     *
     * @param accomplishment New accomplishments for the report.
     */
    public void setAccomplishment(String accomplishment) {
        this.accomplishment = accomplishment;
    }

    /**
     * Getter for the feedback related to the report.
     *
     * @return Feedback related to the report.
     */
    public String getFeedback() {
        return feedback;
    }

    /**
     * Setter for the feedback related to the report.
     *
     * @param feedback New feedback for the report.
     */
    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    /**
     * Getter for additional comments from the project member.
     *
     * @return Additional comments from the project member.
     */
    public String getMemberComment() {
        return memberComment;
    }

    /**
     * Setter for additional comments from the project member.
     *
     * @param memberComment New additional comments from the project member.
     */
    public void setMemberComment(String memberComment) {
        this.memberComment = memberComment;
    }

    /**
     * Getter for the project to which the report belongs.
     *
     * @return The project to which the report belongs.
     */
    public Project getProjectId() {
        return projectId;
    }

    /**
     * Setter for the project to which the report belongs.
     *
     * @param projectId The new project to which the report belongs.
     */
    public void setProjectId(Project projectId) {
        this.projectId = projectId;
    }
}
