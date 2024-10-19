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



public class Scenario3 {
    public enum Sorting {
        Relevance,
        Edit,
        Creation
    }

    public static class wh {
        private String str;
        private Integer num;

        public wh() {
            this.str = "empty";
            this.num = -1;
        }

        public wh(String str, Integer num) {
            this.str = str;
            this.num = num;
        }

        public String getStr() {
            return str;
        }

        public void setStr(String s) {
            this.str = s;
        }

        public Integer getNum() {
            return num;
        }

        public void setNum(Integer n) {
            this.num = n;
        }
    }


        public static void main(String[] args) throws InterruptedException {
        Logger cdpLogger = Logger.getLogger("org.openqa.selenium.devtools");
        cdpLogger.setLevel(Level.SEVERE);

        System.setProperty("webdriver.chrome.driver", "C:\\Selenium\\ChromeDriver\\123\\chromedriver.exe");

        String []blanks1 = {"klimt art", "\"Klimt-Kuss\"", "picasso", "Wien"};
        wh w1 = new wh("lower than",10000), h1 = new wh("greater than",0);
        searchTests3_1(new ChromeDriver(), blanks1, "Drawing",w1, h1, Sorting.Relevance);

        String []blanks2 = {"Paul Gauguin","\"Dimensions\"","klimt","Wildenstein","1891","a","the","art"};
        wh w2 = new wh("greater than",100), h2 = new wh("lower than",2000);
        searchTests3_2(new ChromeDriver(), blanks2, "png",w2, h2, Sorting.Edit);
    }

    public static void searchTests3_1(WebDriver driver,String []blanks, String fileType,wh w,  wh h, Sorting s)
            throws InterruptedException {
        driver.get("https://en.wikipedia.org/w/index.php?search");
        driver.manage().window().maximize();

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

            WebElement advancedSearchExpansion = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a.oo-ui-buttonElement-button")));
            advancedSearchExpansion.click();

            WebElement searchInput = driver.findElement(By.id("ooui-31"));
            searchInput.sendKeys(blanks[0]);

            WebElement exactlyThisText = driver.findElement(By.id("ooui-35"));
            exactlyThisText.sendKeys(blanks[1]);

            WebElement notTheseWords = driver.findElement(By.id("ooui-39"));
            notTheseWords.sendKeys(blanks[2]);

            WebElement oneOfThese = driver.findElement(By.xpath("//*[@id=\"ooui-43\"]"));
            oneOfThese.sendKeys(blanks[3]);

            WebElement fileTypeDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-62\"]"));
            fileTypeDropDown.click();

            WebElement selectedFileType = driver.findElement(By.xpath("//span[contains(text(), '" + fileType + "')]"));
            selectedFileType.click();

            WebElement widthDropDown = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='advancedSearchField-filew']/div[1]/div")));
            widthDropDown.click();

            WebElement widthSelection = driver.findElement(By.xpath("//span[contains(text(), '" + w.getStr() + "')]"));
            widthSelection.click();

            WebElement widthValue = driver.findElement(By.xpath("//*[@id=\"advancedSearchField-filew\"]/div[2]/div/input"));
            widthValue.sendKeys(w.getNum().toString());

            WebElement heightDropDown = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='advancedSearchField-fileh']/div[1]/div")));
            heightDropDown.click();

            String xpath = "/html/body/div[2]/div/div[3]/main/div[3]/div[3]/div[1]/form/div[4]/div[1]/div/div/fieldset[3]/div/div[3]/div/div/div/div[1]/div/div/div/div[";
            switch (h.getStr()){
                case "equal to":
                    xpath += "1]";
                    break;
                case "greater than":
                    xpath += "2]";
                    break;
                case "lower than":
                    xpath += "3]";
                    break;
                default:
                    xpath += "1]";
                    break;
            }
            WebElement heightSelection =  driver.findElement(By.xpath(xpath));
            heightSelection.click();

            WebElement heightValue = driver.findElement(By.xpath("//*[@id=\"advancedSearchField-fileh\"]/div[2]/div/input"));
            heightValue.sendKeys(h.getNum().toString());

            WebElement sortingOrderDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-77\"]"));
            sortingOrderDropDown.click();

            WebElement sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Relevance')]"));
            if (s.equals(Sorting.Relevance)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Relevance')]"));
            }
            else if (s.equals(Sorting.Edit)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Edit date – current on top')]"));
            }
            else if(s.equals(Sorting.Creation)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Creation date – current on top')]"));
            }

            sortingOrder.click();

            searchInput.submit();

            WebElement searchResult = driver.findElement(By.id("firstHeading"));

            Assertions.assertEquals("Search results", searchResult.getText());

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

    public static void searchTests3_2(WebDriver driver,String []blanks, String fileType,wh w,  wh h, Sorting s)
            throws InterruptedException {
        driver.get("https://en.wikipedia.org/w/index.php?search");
        driver.manage().window().maximize();

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));

            WebElement advancedSearchExpansion = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a.oo-ui-buttonElement-button")));
            advancedSearchExpansion.click();

            WebElement searchInput = driver.findElement(By.id("ooui-31"));
            searchInput.sendKeys(blanks[0]);

            WebElement exactlyThisText = driver.findElement(By.id("ooui-35"));
            exactlyThisText.sendKeys(blanks[1]);

            WebElement notTheseWords = driver.findElement(By.id("ooui-39"));
            notTheseWords.sendKeys(blanks[2]);

            WebElement oneOfThese = driver.findElement(By.xpath("//*[@id=\"ooui-43\"]"));
            oneOfThese.sendKeys(blanks[3]);

            WebElement titleContains = driver.findElement(By.xpath("//*[@id=\"ooui-47\"]"));
            titleContains.sendKeys(blanks[4]);

            WebElement subPages = driver.findElement(By.xpath("//*[@id=\"ooui-51\"]"));
            subPages.sendKeys(blanks[5]);

            WebElement categories = driver.findElement(By.xpath("//*[@id=\"ooui-56\"]"));
            categories.sendKeys(blanks[6]);

            WebElement templates = driver.findElement(By.xpath("//*[@id=\"ooui-61\"]"));
            templates.sendKeys(blanks[7]);

            WebElement fileTypeDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-62\"]"));
            fileTypeDropDown.click();

            WebElement selectedFileType = driver.findElement(By.xpath("//span[contains(text(), '" + fileType + "')]"));
            selectedFileType.click();

            WebElement widthDropDown = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='advancedSearchField-filew']/div[1]/div")));
            widthDropDown.click();

            WebElement widthSelection = driver.findElement(By.xpath("//span[contains(text(), '" + w.getStr() + "')]"));
            widthSelection.click();

            WebElement widthValue = driver.findElement(By.xpath("//*[@id=\"advancedSearchField-filew\"]/div[2]/div/input"));
            widthValue.sendKeys(w.getNum().toString());

            WebElement heightDropDown = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='advancedSearchField-fileh']/div[1]/div")));
            heightDropDown.click();

            String xpath = "/html/body/div[2]/div/div[3]/main/div[3]/div[3]/div[1]/form/div[4]/div[1]/div/div/fieldset[3]/div/div[3]/div/div/div/div[1]/div/div/div/div[";
            switch (h.getStr()){
                case "equal to":
                    xpath += "1]";
                    break;
                case "greater than":
                    xpath += "2]";
                    break;
                case "lower than":
                    xpath += "3]";
                    break;
                default:
                    xpath += "1]";
                    break;
            }
            WebElement heightSelection =  driver.findElement(By.xpath(xpath));
            heightSelection.click();

            WebElement heightValue = driver.findElement(By.xpath("//*[@id=\"advancedSearchField-fileh\"]/div[2]/div/input"));
            heightValue.sendKeys(h.getNum().toString());

            WebElement sortingOrderDropDown = driver.findElement(By.xpath("//*[@id=\"ooui-77\"]"));
            sortingOrderDropDown.click();

            WebElement sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Relevance')]"));
            if (s.equals(Sorting.Relevance)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Relevance')]"));
            }
            else if (s.equals(Sorting.Edit)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Edit date – current on top')]"));
            }
            else if(s.equals(Sorting.Creation)) {
                sortingOrder = driver.findElement(By.xpath("//span[contains(text(), 'Creation date – current on top')]"));
            }

            sortingOrder.click();

            WebElement discussion = driver.findElement(By.xpath( "//*[@id=\"mw-advancedSearch-expandable-namespaces\"]/div/div[2]/div/div/label[2]/span[1]"));
            searchInput.submit();

            WebElement searchResult = driver.findElement(By.id("firstHeading"));

            Assertions.assertEquals("Search results", searchResult.getText());

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
