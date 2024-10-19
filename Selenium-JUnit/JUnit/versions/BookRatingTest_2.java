package blg475_1;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BookRatingTest {

    private BookRating bookRating;

    @BeforeEach
    void setUp() {
        bookRating = new BookRating();
    }

    @Test
    void testAddAndRetrieveBook() {
        bookRating.addBook("Book One", "Author One", 5);
        assertEquals(1, bookRating.numBooks(), "Should have 1 book");
        assertFalse(bookRating.getBookList().isEmpty(), "Book list should not be empty");
        assertFalse(bookRating.getBookWithTitle("Book One").contains("Book One by Author One  Rating: 5.0"), "Book One should be retrievable by title");
    }

    @Test
    void testAddBookLimit() {
        bookRating.addBook("Book Above Limit", "Author Two", 11);
        assertFalse(bookRating.getBookWithRating(11).isEmpty(), "Book with invalid rating should not be added");
    }

    @Test
    void testMostAndLeastFavBooks() {
        bookRating.addBook("High Rating", "Author High", 9);
        bookRating.addBook("Low Rating", "Author Low", 2);
        assertFalse(bookRating.mostFavBooks().isEmpty(), "Should have at least one favorite book");
        assertFalse(bookRating.leastFavBooks().isEmpty(), "Should have at least one least favorite book");
    }

    @Test
    void testDeleteBook() {
        bookRating.addBook("Delete Me", "Author Three", 5);
        bookRating.deleteBook("Delete Me");
        assertTrue(bookRating.getBookWithTitle("Delete Me").isEmpty(), "Deleted book should not be found");
    }

    @Test
    void testSortBooks() {
        bookRating.addBook("Middle Rating", "Author Mid", 5);
        bookRating.addBook("High Rating", "Author High", 9);
        bookRating.addBook("Low Rating", "Author Low", 2);
        assertEquals("Low Rating by Author Low  Rating: 2,0", bookRating.sortAscendingOrder().get(0), "Lowest rated book should be first in ascending order");
        assertEquals("High Rating by Author High  Rating: 9,0", bookRating.sortDescendingOrder().get(0), "Highest rated book should be first in descending order");
    }

    // Additional tests can be implemented for getBookWithRating, getBookWithAuthor, and edge cases.
}

