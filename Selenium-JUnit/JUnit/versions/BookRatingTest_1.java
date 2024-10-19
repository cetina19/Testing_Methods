package blg475_1;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

public class BookRatingTest {

    private BookRating bookRating;

    @BeforeEach
    void setUp() {
        bookRating = new BookRating();
    }

    @Test
    void testAddBook() {
        bookRating.addBook("The Great Gatsby", "F. Scott Fitzgerald", 8.5);
        assertEquals(1, bookRating.numBooks(), "Book count should be 1 after adding a book.");
    }
    @Test
    void testAddBookSameBook() {
        bookRating.addBook("Othello","Shakespeare",8);
        bookRating.addBook("Othello","Shakespeare",8);
        assertTrue(bookRating.getBookWithAuthor("Shakespeare").size() ==2 && bookRating.getBookWithTitle("Othello").size() == 2 ,"Same Name Same Author");
        }



    @Test
    void testGetBookListEmpty() {
        assertTrue(bookRating.getBookList().isEmpty(), "Book list should be empty initially.");
    }

    @Test
    void testNumBooksEmpty() {
        assertEquals(0, bookRating.numBooks(), "Book count should be 0 initially.");
    }

    @Test
    void testMostFavBooksEmpty() {
        assertTrue(bookRating.mostFavBooks().isEmpty(), "Most favored books list should be empty when no books are rated above 5.");
    }

    // Continue implementing test methods for all scenarios and methods described earlier

}
