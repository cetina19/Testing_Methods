Feature: Making Text Change Dynamic To Static Or Static To Dynamic

    Scenario: Making A Text Dynamic To Static
        Given Data for text dynamic type change to static text
            | elements                                                      | componentId                              |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "static"}] | "88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then The update and updateMany work correctly

    Scenario: Try To Make A Static Text To Static
        Given Data for text static type change to static text
            | elements                                                      | componentId                              |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "static"}] |" 88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then I should get a DomainErrors.NotADynamicElementError
    
    Scenario: Try To Change The (Dynamic/Static) Type Of A Text Which Does Not Exist In The Repository
        Given A (Dynamic/Static) change is requested for a non existent text element
            | elements | componentId |
            | [{"id": "023389ff-0bba-49de-925f-368f5d8b5bcc", "type": "static"}] |"88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then I should get a ApplicationErrors.DesignElementsNotFoundError
    
    Scenario: Try To Change A Static Text And Fail Unexpected
        Given Data for text static type change
            | elements | componentId |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "static"}] |"88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then I should get a Application.Repo.Errors.Unexpected

    Scenario: Try To Change A Static Text And Component Not Found
        Given Data for text static type change
            | elements | componentId |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "static"}] |"20901871-42ac-44ef-bddd-abb021154339"     |
        When I try to change the text type
        Then I should get a ApplicationErrors.ComponentNotFoundError

    Scenario: Making A Text Static To Dynamic
        Given Data for text static type change to dynamic text
            | elements                                                      | componentId                              |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "dynamic", "propName": "dummy"}] | "88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then The update and updateMany work correctly

    Scenario: Try To Make A Dynamic Text To Dynamic
        Given Data for text dynamic type change to dynamic text
            | elements                                                      | componentId                              |
            | [{"id": "9d3389fa-0bba-49de-925f-368f5d8b5bdd", "type": "dynamic", "propName": "dummy"}] |" 88901871-42ac-44ef-bddd-abb021154389"     |
        When I try to change the text type
        Then I should get a DomainErrors.NotAStaticElementError