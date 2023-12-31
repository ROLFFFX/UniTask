**Backend Implementation**

The entire backend implementation is in the "unitask" folder. This
documentation includes a thorough run through of this folder structure
and the functions of each file.

The backend implementation is done in the MacOs system. The code has
been run on a Windows system for the test purpose. The implementation
hasn't been run and tested on any other system.

> [!IMPORTANT]
> The detailed technical JavaDoc for this project is here: [unitask backend documentation](https://unitask-backend-docs.netlify.app/)
> which contains more detailed implementation of each function. This file is following from the offcial syntax of the java doc.


**Versions:**

Spring boot: 2.7.16

Maven: 3.6.3

JDK: 17

**Tools:**

IntelliJ IDEA Ultimate.

MySQL Workbench for tables viewing.

Postman for APIs testing.

1.  **.mvn/wrapper**

the .mvn/wrapper folder contains the Maven Wrapper files. The Maven
Wrapper is a way to ensure that the correct version of Apache Maven is
used to build a project, regardless of whether the developer has Maven
installed locally.

1.  **maven-wrapper.jar**

This is the JAR file that contains the Maven Wrapper code. It\'s a small
JAR file that includes the logic needed to download the specified
version of Maven if it\'s not already installed.

2.  **maven-wrapper.properties**

This properties file specifies the Maven version that should be used by
the wrapper. It contains a property like distributionUrl, which points
to the Maven distribution to be downloaded.

2.  **src**

**2.1 main**

the src/main directory structure is a convention used by Maven and other
build tools to organize the source code of the application. The src/main
directory is part of the standard Maven project structure and is used to
separate the main source code of the application from other resources
and configurations.

**2.1.1 java/com/teamone/unitask**

This directory contains the main Java source code of the Spring Boot
application. All the Java classes, packages, and code related to the
main functionality of the application are placed here.

The detailed explanation for all the classes and functions are in this
link:

<https://unitask-backend-docs.netlify.app/>

**2.1.2 resources**

the src/main/resources directory is a standard Maven project structure
that is used to store non-Java resources.

**2.1.2.1 application.yml**

This file is a YAML-formatted configuration file that is commonly used
in Spring Boot applications to define various settings and properties.

This file configures the database connection and its properties, the
application properties for the spring security implementation, and the
mail service settings.

-   Server Configuration

> Error Handling Configuration:
>
> include-message: Set to \"always\" to include error messages in error
> responses.
>
> include-binding-errors: Set to \"always\" to include binding errors in
> error responses.

-   Spring Data JPA Configuration

> JPA and DataSource Configuration:
>
> hibernate.ddl-auto: Specifies the database schema update strategy.
>
> datasource: Configures the MySQL database connection details.

-   Mail Configuration:

> Configures the SMTP server details for sending emails.

-   MVC and CORS Configuration

> Configures Cross-Origin Resource Sharing (CORS) for MVC endpoints.

-   Jackson Serialization Configuration

> Configures Jackson serialization settings, such as handling empty
> beans and default property inclusion.

-   Custom Application Properties

> Defines custom application properties such as JWT secret and
> expiration time.

The database used for this project is a MySQL database created on the
Microsoft Azure service.

2.1.2.2 static and template folder

These two folders come with the spring intializr and are not used in
this project.

2.  **Test**

The src/test folder is commonly used to store test source code and
resources.

3.  **.gitignore**

the .gitignore file is used to specify files and directories that should
be ignored by Git, the version control system.

4.  **mvnw and mvnw.cmd**

The mvnw script, along with the associated mvnw.cmd for Windows, is part
of the Maven Wrapper mechanism. The Maven Wrapper is a convenient way to
ensure that the build tool Maven is included with your project and is
used consistently across different environments, regardless of whether
Maven is installed locally.

5.  **pom.xml**

This file configures all the dependencies used for the backend
implementation.

A full list of dependencies used are listed here:

-   Spring Boot Starter Data JPA

-   Spring Boot Starter Mail

-   Spring Boot Starter Security

-   Spring Boot Starter Web

-   Spring Boot Starter Validation

-   Jackson Databind

-   Java JWT (JSON Web Token) API

-   Java JWT Implementation

-   Java JWT Jackson Integration

-   MySQL Connector/J

-   Project Lombok

-   Spring Boot Starter Test

-   Spring Security Test

6.  **system.properties**

This file is for the backend deployment use. It configures the version
of java JDK this backend implementation is using. For this
implementation, the java version used is 17.
