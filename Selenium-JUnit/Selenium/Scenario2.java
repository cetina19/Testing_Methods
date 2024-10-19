/* @Author
 *  Name: Alper Cetin
 *  Email: alper8540@gmail.com
*/

import java.util.List;
import java.util.logging.*;

import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class Scenario2 {

    public static void main(String[] args) throws InterruptedException {
        Logger cdpLogger = Logger.getLogger("org.openqa.selenium.devtools");
        cdpLogger.setLevel(Level.SEVERE);

        System.setProperty("webdriver.chrome.driver", "C:\\Selenium\\ChromeDriver\\123\\chromedriver.exe");

        searchTests2(new ChromeDriver(), "covid", "\"software quality\"", "Audio");

        searchTests2(new ChromeDriver(), "Africa", "\"software quality\"", "Audio");

        searchTests2(new ChromeDriver(), "food", "\"software quality\"", "Audio");

        searchTests2(new ChromeDriver(), "covid", "\"automation\"", "Audio");

        searchTests2(new ChromeDriver(), "Africa", "\"automation\"", "Audio");

        searchTests2(new ChromeDriver(), "food", "\"automation\"", "Audio");


        searchTests2(new ChromeDriver(), "covid", "\"software quality\"", "Image");

        searchTests2(new ChromeDriver(), "Africa", "\"software quality\"", "Image");

        searchTests2(new ChromeDriver(), "food", "\"software quality\"", "Image");

        searchTests2(new ChromeDriver(), "covid", "\"automation\"", "Image");

        searchTests2(new ChromeDriver(), "Africa", "\"automation\"", "Image");

        searchTests2(new ChromeDriver(), "food", "\"automation\"", "Image");

    }

    public static void searchTests2(WebDriver driver,String notWanted, String wanted, String fileType) throws InterruptedException {
        driver.get("https://en.wikipedia.org/w/index.php?search");
        driver.manage().window().maximize();

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

            WebElement advancedSearchExpansion = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a.oo-ui-buttonElement-button")));
            advancedSearchExpansion.click();

            WebElement searchInput = driver.findElement(By.id("ooui-31"));
            searchInput.sendKeys("software quality");

            WebElement exactlyThisText = driver.findElement(By.id("ooui-35"));
            exactlyThisText.sendKeys(wanted);

            WebElement notTheseWords = driver.findElement(By.id("ooui-39"));
            notTheseWords.sendKeys(notWanted);

            WebElement fileTypeDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-62\"]"));
            fileTypeDropDown.click();

            WebElement selectedFileType = driver.findElement(By.xpath("//span[contains(text(), '" + fileType + "')]"));
            selectedFileType.click();

            WebElement sortingOrderDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-77\"]"));
            sortingOrderDropDown.click();

            WebElement sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Creation date – current on top')]"));
            sortingOrder.click();

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
