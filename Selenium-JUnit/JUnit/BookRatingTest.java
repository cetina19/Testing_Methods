/* @Author
 *  Name: Alper Cetin
 *  Email: alper8540@gmail.com
*/

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

public class BookRatingTest {

    private BookRating bookRating;

    @BeforeEach
    void setUp() {
        bookRating = new BookRating();
    }

    // Checking adding book function works correctly
    @Test
    void testAddBook() {
        bookRating.addBook("Lord of The Flies", "William Golding", 8.5);
        assertEquals(1, bookRating.numBooks());
    }

    // Checking if listing book works correct
    @Test
    void testGetBookListNotEmpty() {
        bookRating.addBook("King Oidipus", "Sophokles", 9.0);
        assertFalse(bookRating.getBookList().isEmpty());
    }

    // Adding multiple books and retrieving them
    @Test
    void testAddingMultipleBooks() {
        bookRating.addBook("Brave New World", "Aldous Huxley", 3.0);
        bookRating.addBook("To Kill a Mockingbird", "Harper Lee", 7.5);
        assertEquals(2, bookRating.numBooks(),"Number of books are shown");
    }

    // Deleting a book and testing it
    @Test
    void testDeleteBook() {
        bookRating.addBook("The Catcher in the Rye", "J.D. Salinger", 5.5);
        bookRating.deleteBook("The Catcher in the Rye");
        assertTrue(bookRating.getBookWithTitle("The Catcher in the Rye").isEmpty());
    }

    // Finding books with rating
    @Test
    void testGetBookWithRating() {
        bookRating.addBook("Antigone", "Sophokles", 4.0);
        assertFalse(bookRating.getBookWithRating(4.0).isEmpty());
    }

    // Finding books with author
    @Test
    void testGetBooksByAuthor() {
        bookRating.addBook("Fahrenheit 451", "Ray Bradbury", 9.0);
        assertFalse(bookRating.getBookWithAuthor("Ray Bradbury").isEmpty());
    }

    // Testing sorting books in ascending order depending on the rating
    @Test
    void testSortBooksAscending() {
        bookRating.addBook("Fahrenheit 451", "Ray Bradbury", 4.5);
        bookRating.addBook("Lord of The Flies", "William Golding", 9.0);
        List<String> sortedBooks = bookRating.sortAscendingOrder();
        assertTrue(sortedBooks.get(0).contains("4,5"));
    }

    // Testing sorting books in descending order depending on the rating
    @Test
    void testSortBooksDescending() {
        bookRating.addBook("Fahrenheit 451", "Ray Bradbury", 3.0);
        bookRating.addBook("Lord of The Flies", "William Golding", 6.5);
        List<String> sortedBooks = bookRating.sortDescendingOrder();
        assertTrue(sortedBooks.get(0).contains("6,5"));
    }

    // Middle rated, out of bound are added and tested
    @Test
    void testBoundaryRatings() {
        bookRating.addBook("Boundary Book Low", "Low", 5.0);
        bookRating.addBook("Boundary Book High", "High", 5.0);
        assertFalse(bookRating.mostFavBooks().contains("Boundary Book Low by Low Rating: 5.0"));
        assertFalse(bookRating.leastFavBooks().contains("Boundary Book High by High Rating: 5.0"));
    }

    // Testing adding negative rated book
    @Test
    void testNegative() {
        bookRating.addBook("The Great Gatsby", "F. Scott Fitzgerald", -8.5);
        assertFalse(bookRating.leastFavBooks().isEmpty(),"Negative Rated Book Can Be Added");
    }

    // Testing adding overrated books
    @Test
    void testOverRated(){
        bookRating.addBook("The Great Gatsby", "F. Scott Fitzgerald", 150000000000000000000.0);
        assertFalse(bookRating.mostFavBooks().isEmpty(),"Overrated Books are considered.");
    }

    // Sorted same rated books
    @Test
    void testSortingSameRating(){
        bookRating.addBook("The Great Gatsby", "F. Scott Fitzgerald", 1.0);
        bookRating.addBook("Lord of The Flies", "William Golding", 1.0);
        List<String> sortedBooks = bookRating.sortDescendingOrder();
        assertNotEquals(sortedBooks.getFirst(), sortedBooks.getLast(), "Same rating sorting.");
    }

    //Comparing ascending and descending version
    @Test
    void testSortingDifferentRating(){
        bookRating.addBook("The Great Gatsby", "F. Scott Fitzgerald", 2.0);
        bookRating.addBook("Lord of The Flies", "William Golding", 1.0);
        List<String> sortedBooks = bookRating.sortDescendingOrder();
        List<String> sortedBooksreversed = bookRating.sortAscendingOrder();
        assertNotEquals(sortedBooks.getFirst(), sortedBooksreversed.getFirst(), "Ascending and descending comparison.");
    }

}
