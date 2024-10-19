import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class EmailValidator {

    // regex patern for email
    static  String EMAIL_REGEX =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

    static Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

   // Checks whether the given e-mail address is valid.
    public static boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }


}