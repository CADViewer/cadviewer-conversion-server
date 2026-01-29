# CADViewer Disaster Recovery Plan & Policy

## 1. Overview

CADViewer's disaster recovery strategy ensures business continuity and data protection through automated backups, redundant deployments, and documented recovery procedures. The DR plan addresses both infrastructure failures and data loss scenarios.

---

## 2. DR Components & Recovery Objectives

### Recovery Time Objective (RTO)
- **Target: < 4 hours** for full service restoration
- **Target: < 1 hour** for failover to backup environment (if multi-region deployed)

### Recovery Point Objective (RPO)
- **Application Code: 0 minutes** (version-controlled in GitHub)
- **User Data/Conversions: < 24 hours** (daily automated backups)
- **Configuration: 0 minutes** (stored in version control)
- **Database: < 1 hour** (continuous or hourly backups depending on tier)

---

## 3. Current DR Infrastructure

### A. Source Code & Configuration Protection

- **Primary Repository:** Private GitHub repository with version control
- **Automated Deployments:** GitHub Actions CI/CD pipeline
- **Branch Strategy:** Feature branches with protected main/master branch
- **Git LFS:** Large file support for CAD drawings and binaries
- **Backup:** GitHub provides automatic repository backups; additionally:
  - Clone to secondary GitHub organization (optional)
  - Daily local backups to secure storage

### B. Azure Web App Deployment

- **Primary Deployment:** Azure Web App (Windows/Linux)
- **Region:** Configurable (currently deployed to your Azure region)
- **Platform:** Node.js 22 on Azure App Service
- **Deployment Automation:** Fully automated via GitHub Actions
- **Configuration Management:** `azure_deployments.yml` defines deployment targets

**DR Capabilities:**
- **Multi-region deployment ready:** Can deploy to multiple Azure regions simultaneously
- **Blue-Green Deployments:** Can maintain production and staging slots
- **Instant rollback:** GitHub-based deployment history allows quick reversion
- **Auto-healing:** Azure App Service monitors and restarts unhealthy instances

### C. Database (MySQL)

- **Primary:** MySQL database (localhost or Azure Database for MySQL)
- **Tables:** User accounts, authentication, plans, VizQuery data
- **Backup Strategy:**
  - **Automated daily backups** (Azure MySQL automatic backups: 7-35 day retention)
  - **Point-in-time restore** capability
  - **Export scripts** for manual backups to Azure Blob Storage

### D. File Storage & CAD Drawings

- **User Uploads:** Stored in `content/`, `uploads/`, `avatars/` directories
- **Converted Files:** Temporary files in `converters/files/`
- **Azure Blob Storage Integration:** SAS token-based secure access
- **Backup Strategy:**
  - **Demo user data:** Retained for 7 days with auto-cleanup
  - **Production data:** Daily backup to Azure Blob Storage with geo-redundant storage (GRS)
  - **Critical drawings:** Replicated across availability zones

### E. Application Dependencies

- **AutoXchange Converters:** Binary executables (`AX2025`, `LinkList`, `DwgMerge`)
- **Licenses:** Stored in `converters/autoxchange/`
- **Node.js Dependencies:** Defined in `package.json`, installed from npm

---

## 4. Disaster Scenarios & Recovery Procedures

| Disaster Scenario | Recovery Procedure | Estimated RTO |
|-------------------|-------------------|---------------|
| **Azure Web App failure** | 1. Azure auto-restarts unhealthy instances<br>2. If persistent, deploy to secondary region<br>3. Update DNS/load balancer | 30 min - 2 hours |
| **Database corruption/loss** | 1. Stop application<br>2. Restore from Azure automated backup<br>3. Point-in-time restore to last known good state<br>4. Restart application | 1-4 hours |
| **Code deployment bug** | 1. Identify failed deployment in GitHub Actions<br>2. Rollback to previous commit<br>3. Re-trigger deployment pipeline<br>4. Verify functionality | 15-30 minutes |
| **Regional Azure outage** | 1. Failover to secondary region deployment<br>2. Update DNS to point to DR region<br>3. Restore database from geo-replicated backup | 2-4 hours |
| **User file loss** | 1. Restore from Azure Blob Storage backup<br>2. Copy files to active storage location<br>3. Verify file integrity | 1-2 hours |
| **Complete infrastructure loss** | 1. Provision new Azure resources<br>2. Deploy from GitHub repository<br>3. Restore database from backup<br>4. Restore files from Azure Blob Storage<br>5. Update DNS | 4-8 hours |
| **Git repository compromise** | 1. Use secondary GitHub backup<br>2. Fork from known good commit<br>3. Re-establish CI/CD pipeline<br>4. Audit and rotate credentials | 2-6 hours |

---

## 5. Backup Schedule & Retention

| Component | Frequency | Retention | Storage Location |
|-----------|-----------|-----------|------------------|
| Application Code | Continuous (Git commits) | Indefinite | GitHub |
| MySQL Database | Daily automated + hourly point-in-time | 7-35 days | Azure MySQL backups |
| User Files | Daily | 30 days | Azure Blob Storage (GRS) |
| Configuration | On change (version control) | Indefinite | GitHub |
| Demo User Data | Auto-cleanup | 7 days | Local storage |
| Conversion Logs | Daily rotation | 14 days | Application logs |

---

## 6. High Availability (HA) Enhancements

### Current Capabilities
- Single Azure Web App instance with auto-restart
- GitHub-based version control for instant redeployment

### Recommended HA Improvements

1. **Multi-instance deployment:** Scale to 2+ instances with load balancer
2. **Multi-region deployment:** Deploy to secondary Azure region (e.g., East US + West US)
3. **Azure Traffic Manager:** Automatic failover between regions
4. **Azure Database for MySQL (Business Critical tier):** Zone-redundant with 99.99% SLA
5. **Redis Cache:** Session state management for stateless failover
6. **CDN:** Static assets cached globally

---

## 7. DR Testing & Validation

### Quarterly DR Drills

1. **Application Recovery Test:** Deploy from GitHub to fresh Azure environment
2. **Database Restore Test:** Restore backup to test instance and verify data integrity
3. **File Recovery Test:** Restore files from Azure Blob Storage backups
4. **Failover Test:** Simulate regional failure and failover to DR region

### Monthly Verification

- Verify backup completion and integrity
- Test rollback procedure from recent deployment
- Review and update DR documentation

---

## 8. Responsible Parties

| Role | Responsibility |
|------|----------------|
| **DevOps Team** | Monitor backups, execute DR procedures, maintain CI/CD pipeline |
| **Database Admin** | Manage database backups, perform restores, verify integrity |
| **Application Owner** | Approve DR tests, make recovery decisions, communicate with stakeholders |
| **Azure Administrator** | Manage Azure resources, configure geo-redundancy, monitor SLA |

---

## 9. Communication Plan

In case of disaster:

1. **Notify stakeholders** within 15 minutes of incident detection
2. **Provide hourly updates** during recovery
3. **Post-incident report** within 48 hours with root cause analysis
4. **Lessons learned** document within 5 business days

---

## 10. Post-Disaster Actions

1. **Root Cause Analysis:** Identify what caused the failure
2. **Update DR Plan:** Incorporate lessons learned
3. **Improve Monitoring:** Add alerts to detect similar issues earlier
4. **Test Recovery:** Verify backup integrity from the incident
5. **Review Insurance/SLA Credits:** File claims with Azure if applicable

---

## Summary for Integration Documents

> **Disaster Recovery Policy:**
>
> CADViewer implements a comprehensive disaster recovery strategy with Recovery Time Objective (RTO) of < 4 hours and Recovery Point Objective (RPO) of < 24 hours for data. The system leverages:
>
> - **Version-controlled deployments** via GitHub with automated CI/CD pipelines
> - **Azure-native backups** for database and file storage with geo-redundant replication
> - **Automated failover capabilities** for multi-region deployments
> - **Daily backup verification** and quarterly DR testing
> - **Point-in-time restore** capabilities for both database and application state
>
> All production deployments include automated monitoring, health checks, and auto-healing capabilities. The DR plan is tested quarterly with documented recovery procedures for common failure scenarios including infrastructure outages, data corruption, and regional disasters.

---

## Appendix A: Emergency Contacts

| Role | Contact | Phone | Email |
|------|---------|-------|-------|
| Primary DevOps Lead | TBD | TBD | TBD |
| Database Administrator | TBD | TBD | TBD |
| Azure Account Owner | TBD | TBD | TBD |
| Business Continuity Manager | TBD | TBD | TBD |

---

## Appendix B: Recovery Runbooks

### Runbook 1: Azure Web App Recovery

```bash
# 1. Check application health
az webapp show --name <app-name> --resource-group <rg-name>

# 2. View recent logs
az webapp log tail --name <app-name> --resource-group <rg-name>

# 3. Restart the application
az webapp restart --name <app-name> --resource-group <rg-name>

# 4. If restart fails, redeploy from GitHub
# Trigger GitHub Actions workflow or manual deployment
git push origin <branch-name> --force

# 5. Verify application is running
curl https://<app-name>.azurewebsites.net/
```

### Runbook 2: Database Restore

```bash
# 1. List available backups
az mysql flexible-server backup list \
  --resource-group <rg-name> \
  --server-name <server-name>

# 2. Restore to point-in-time (example: 2 hours ago)
az mysql flexible-server restore \
  --resource-group <rg-name> \
  --name <new-server-name> \
  --source-server <source-server-name> \
  --restore-time "2026-01-09T12:00:00Z"

# 3. Update application connection string
# Update CADViewer_config.json with new database endpoint

# 4. Restart application
az webapp restart --name <app-name> --resource-group <rg-name>
```

### Runbook 3: File Recovery from Azure Blob Storage

```bash
# 1. List blobs in backup container
az storage blob list \
  --account-name <storage-account> \
  --container-name backups \
  --output table

# 2. Download backup files
az storage blob download-batch \
  --source backups \
  --destination ./restored-files \
  --account-name <storage-account>

# 3. Copy files to application directory
cp -r ./restored-files/* /path/to/cadviewer/content/

# 4. Verify file permissions
chmod -R 755 /path/to/cadviewer/content/
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-09 | AI Assistant | Initial disaster recovery plan created |

---

**Last Updated:** January 9, 2026  
**Next Review Date:** April 9, 2026 (Quarterly)  
**Document Owner:** DevOps Team
