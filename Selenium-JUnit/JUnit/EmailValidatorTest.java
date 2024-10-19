/* @Author
 *  Name: Alper Cetin
 *  Email: alper8540@gmail.com
*/

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmailValidatorTest {
    @Test
    void test1() {
        assertTrue(EmailValidator.isValidEmail("test@example.com"));
        assertTrue(EmailValidator.isValidEmail("user.name@domain.co.in"));
        assertTrue(EmailValidator.isValidEmail("user-name@domain.com"));
    }

    @Test
    void test2() {
        assertFalse(EmailValidator.isValidEmail("test.example.com"));
        assertFalse(EmailValidator.isValidEmail("test@example_com"));
        assertFalse(EmailValidator.isValidEmail("test@.example.com"));
    }

    @Test
    void test3() {
        assertFalse(EmailValidator.isValidEmail(null));
    }

}