Feature: Creating Unsupported Design Elements

    Scenario: Creating Unsupported Design Elements 
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The saveMany work correctly

    Scenario: The Handler Returns Repo Unexpected Error
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The Application.Repo.Errors.Unexpected will be return

    Scenario: The Handler Returns Design Element Already Exists Error
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The DesignElementApplicationErrors.DesignElementAlreadyExistsError will be return

    Scenario: The Handler Returns Unsupported Platform Error
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The CommonDomainErrors.UnsupportedOriginPlatformError will be return

    Scenario: The Handler Returns Project Not Found Error
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The ProjectRawDesignDomainErrors.ProjectRawDesignNotFoundError will be return

    Scenario: The Handler Returns Design Node Not Found Error
        Given Data for unsupported design elements with false originReferenceIds
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 0 |
        When I try to create unsupported elements
        Then The ProjectRawDesignDomainErrors.DesignNodeNotFoundError will be return

    Scenario: The Handler Returns Figma Node Invalid Type Error
        Given Data for unsupported design elements
            | projectId | projectRawDesignId | componentId | originReferenceIds |
            | 8412fedc-06a3-4b14-aeac-6508ba71ce9c | 743f09f7-ab8d-4121-b53d-d9ace45454e6 | ff9ab001-5873-4f3e-b613-6604dba5d1cc | 1790:3666 |
        When I try to create unsupported elements
        Then The ProjectRawDesignDomainErrors.FigmaNodeInvalidTypeError will be return


        