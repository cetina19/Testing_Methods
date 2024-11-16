Feature: Generating Code

    Scenario: Generating the code   
        Given generate code data
            | componentId   | language   | framework        |
            | 1             | typescript | react            |
        When I generate code
        Then I should get a CodeGenerationOutput Response with no errors

    Scenario Outline: I try to generate code with unsupported language
        Given generate code data
            | componentId   | language       | framework        |
            | <component>   | <language>     | <framework>             |
        When I generate code
        Then I should get a DomainErrors.UnsupportedLanguageForCodeGenerationError

        Examples:
            | componentId | language   | framework        |
            | 1           | go         | react            |
            | 2           | python     | next             |
