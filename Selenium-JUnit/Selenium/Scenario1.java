/* @Author
 *  Name: Alper Cetin
 *  Email: alper8540@gmail.com
*/

import java.util.List;
import java.util.logging.*;

import org.checkerframework.checker.units.qual.C;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import org.junit.jupiter.api.Assertions;

public class Scenario1 {
    public static void main(String[] args) throws InterruptedException {
        Logger cdpLogger = Logger.getLogger("org.openqa.selenium.devtools");
        cdpLogger.setLevel(Level.SEVERE);

        System.setProperty("webdriver.chrome.driver", "C:\\Selenium\\ChromeDriver\\123\\chromedriver.exe");

        searchTests1(new ChromeDriver(), "pdf");

        searchTests1(new ChromeDriver(), "Video");

        searchTests1(new ChromeDriver(), "mpg");
    }

    public static void searchTests1(WebDriver driver, String fileType) throws InterruptedException {
        driver.get("https://en.wikipedia.org/w/index.php?search");
        driver.manage().window().maximize();

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

            WebElement advancedSearchExpansion = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a.oo-ui-buttonElement-button")));
            advancedSearchExpansion.click();

            WebElement searchInput = driver.findElement(By.id("ooui-31"));
            searchInput.sendKeys("software testing");

            WebElement pageTitleInput = driver.findElement(By.xpath("//input[@id=\'ooui-47\' and @class=\'oo-ui-inputWidget-input\' and @aria-describedby=\'ooui-46\']"));
            pageTitleInput.sendKeys("testing");

            WebElement fileTypeDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-62\"]"));
            fileTypeDropDown.click();

            WebElement selectedFileType = driver.findElement(By.xpath("//span[contains(text(), '" + fileType + "')]"));
            selectedFileType.click();

            searchInput.submit();

            WebElement afterSearch = driver.findElement(By.id("firstHeading"));
            String searchResult = afterSearch.getText();

            Assertions.assertEquals("Search results", searchResult);

            List<WebElement> results = driver.findElements(By.className("mw-search-results-info"));
            Assertions.assertNotNull(results,"The results cannot be found");

        } catch (Exception e) {
            System.err.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
            Assertions.fail("Automated test failed");
        } finally {
            driver.quit();
        }
    }
}
