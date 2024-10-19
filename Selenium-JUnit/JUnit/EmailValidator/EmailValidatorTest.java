import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmailValidatorTest {

    // Test names should be descriptive, readable and maintainable
    @Test
    void shouldValidateValidEmails() {
        // Valid email cases
        assertTrue(EmailValidator.isValidEmail("test@example.com"), "Standard email validation");
        assertTrue(EmailValidator.isValidEmail("user.name@domain.co.in"), "Email with dot in local part validation");
        assertTrue(EmailValidator.isValidEmail("user-name@domain.com"), "Email with dash in local part validation");
    }

    @Test
    void shouldRejectInvalidEmails() {
        // Invalid email cases
        assertFalse(EmailValidator.isValidEmail("test.example.com"), "Email without @ should fail validation");
        assertFalse(EmailValidator.isValidEmail("test@example_com"), "Email with underscore in domain should fail validation");
        assertFalse(EmailValidator.isValidEmail("test@.example.com"), "Email with dot immediately after @ should fail validation");
    }

    @Test
    void shouldRejectNullEmails() {
        // Null email case
        assertFalse(EmailValidator.isValidEmail(null), "Null email should fail validation");
    }
}
