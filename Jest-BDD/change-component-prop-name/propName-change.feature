Feature: Changing The propName Attribute

    Scenario: Changing the propName of the component
        Given Data for component propName change
            | elements                                                      | componentId |
            | [{"propElements": [{"propId": "838c9812-32b6-4de0-96bb-fbe19436e722", "propName": "newName"}]}] | ff9ab001-5873-4f3e-b613-6604dba5d1cc |
        When I try to change the propName
        Then The updateMany work correctly

    Scenario: Try to change propName and component not found
        Given Data for component propName change
            | elements                                                      | componentId |
            | [{"propElements": [{"propId": "838c9812-32b6-4de0-96bb-fbe19436e722", "propName": "oldName"}]}] | 125b8399-af24-4115-aeea-39cdafcc9a12 |
        When I try to change the propName
        Then I should get a ApplicationErrors.ComponentNotFoundError
    
    Scenario: Try to change propName of an component and fail unexpected
        Given Data for component propName change
            | elements                                                      | componentId |
            | [{"propElements": [{"propId": "838c9812-32b6-4de0-96bb-fbe19436e722", "propName": "oldName"}]}] | 125b8399-af24-4115-aeea-39cdafcc9a12 |
        When I try to change the propName
        Then I should get a Application.Repo.Errors.Unexpected
    
    Scenario: Try to change propName and componentProps does not exist
        Given Data for component propName change
            | elements                                                      | componentId |
            | [{"propElements": [{"propId": "208c9812-32b6-4de0-96bb-fbe19436e740", "propName": "oldName"}]}] | ff9ab001-5873-4f3e-b613-6604dba5d1cc |
        When I try to change the propName
        Then I should get a ApplicationErrors.ComponentPropsElementDoesNotExistError

        