Feature: Create a Component
    
    Scenario: Deleting a component that does not exist
        Given A component with id that does not exist
            | componentId                           |        
            | 0cc71d89-1e44-4b63-aa2d-b48710d3a8a4  | 
        When I delete a component
        Then I should get an application error indicating that the component not found

    Scenario Outline: Deleting a component
        Given A component with design elements
            | componentId  | rootDesignElementId    | componentInstanceId   |  componentInstanceOriginReferenceId  |
            | <componentId> | <rootDesignElementId> | <componentInstanceId> | <componentInstanceOriginReferenceId> |
        When I delete a component
        Then I should get ok response with deleted component, design elements <rootDesignElementId> and component instance <componentInstanceId> <componentInstanceOriginReferenceId>

        Examples:
            | componentId                           | rootDesignElementId                  | componentInstanceId                   |  componentInstanceOriginReferenceId   |
            | 0cc71d89-1e44-4b63-aa2d-b48710d3a8a4  | 9b0693ef-7022-445e-b667-35a688a27528 | 075e879b-049f-4828-b1f2-e0c7b142e4fd  |  102:785                              |

    Scenario Outline: Deleting a component without design elements
        Given A component without design elements
            | componentId   |
            | <componentId> |
        When I delete a component
        Then I should get ok response with deleted component

        Examples:
            | componentId                           |
            | 0cc71d89-1e44-4b63-aa2d-b48710d3a8a4  |

