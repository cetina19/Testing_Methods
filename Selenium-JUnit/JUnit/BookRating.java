/* @Author
 *  Name: Alper Cetin
 *  Email: alper8540@gmail.com
*/

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


public class BookRating {

    static class Book {
        String title;
        String author;
        double rating;

        public Book(String title, String author, double rating) {
            this.title = title;
            this.author = author;
            this.rating = rating;
        }


        @Override
        public String toString() {
            return String.format("%s by %s  Rating: %.1f", title, author, rating);
        }
    }

   List<Book> books = new ArrayList<>();


    // adds a new book
    public void addBook(String title, String author, double rating) {
        books.add(new Book(title, author, rating));
    }
    // returns the book list
    public List<String> getBookList() {
        return books.stream().map(Book::toString).collect(Collectors.toList());
    }
    // returns the number of books in the list
    public int numBooks() {
        return books.size();
    }

    // returns books which has higher than 5 points rating
    public List<String> mostFavBooks() {
        return books.stream()
                .filter(book -> book.rating > 5)
                .map(Book::toString).collect(Collectors.toList());
    }
    // returns books which has lower than 5 points rating
    public List<String> leastFavBooks() {
        return books.stream()
                .filter(book -> book.rating < 5)
                .map(Book::toString).collect(Collectors.toList());
    }

    // delete book from list with book title
    public void deleteBook(String title) {
        books.removeIf(book -> book.title.equals(title));
    }

    // returns books with the book title
    public List<String> getBookWithTitle(String title) {
        return books.stream()
                .filter(book -> book.title.equals(title))
                .map(Book::toString).collect(Collectors.toList());
    }

    // returns books with the rating
    public List<String> getBookWithRating(double rating) {
        return books.stream()
                .filter(book -> book.rating == rating)
                .map(Book::toString).collect(Collectors.toList());
    }

    //  returns books with the author
    public List<String> getBookWithAuthor(String author) {
        return books.stream()
                .filter(book -> book.author.equals(author))
                .map(Book::toString).collect(Collectors.toList());
    }
    // returns the the book list according to the ascending rating
    public List<String> sortAscendingOrder() {
        return books.stream()
                .sorted(Comparator.comparingDouble(book -> book.rating))
                .map(Book::toString).collect(Collectors.toList());
    }
    // returns the the book list according to the descendig rating
    public List<String> sortDescendingOrder() {
        return books.stream()
                .sorted((book1, book2) -> Double.compare(book2.rating, book1.rating))
                .map(Book::toString).collect(Collectors.toList());
    }

}












