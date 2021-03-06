/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls that are defined and not empty', function () {
            for (let singleFeed of allFeeds) {
                expect(singleFeed.url).toBeDefined();
                expect(singleFeed.url.length).not.toBe(0);
            };
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names that are defined and not empty', function () {
            for (let singleFeed of allFeeds) {
                expect(singleFeed.name).toBeDefined();
                expect(singleFeed.name.length).not.toBe(0);
            };
        });
    });

    /* This is a new test suite named "The menu" 
     * and it is about the menu element visibility
     */
    describe('The Menu', function () {
        /* This test ensures the menu element is
         * hidden by default. (You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.)
         */
        it('is hidden by default', function () {
            let body = document.getElementsByTagName('body')[0];
            //expect(body.classList).toContain('menu-hidden');
            expect(body).toHaveClass('menu-hidden');
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            let body = document.getElementsByTagName('body')[0];
            let menuIcon = document.getElementsByClassName('menu-icon-link')[0];
            //first click triggered
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');
            //second click triggered
            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

    /* This is a test suite named "Initial Entries"
     * that is about whether feed entries are successfully loaded
     */
    describe('Initial Entries', function () {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * (Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.)
         */
        let container = document.getElementsByClassName('feed')[0];

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('are loaded and loadFeed function completes its work', function () {
            let feedList = container.getElementsByClassName('entry');
            expect(feedList.length).toBeGreaterThan(0);
        });
    });

    /* This is a test suite named "New Feed Selection"
     * that is about content changes upon loading entries
     */
    describe('New Feed Selection', function () {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * (Remember, loadFeed() is asynchronous.)
         */
        let contentOne = [];
        let contentTwo = [];
        let entryArray = [];

        beforeEach(function (done) {
            loadFeed(0);
            entryArray = document.querySelectorAll('.entry');
            /* Iterate through the current entry array and fill the
            first content array with the innerText values */
            entryArray.forEach(function (entry) {
                contentOne.push(entry.innerText);
            });
            loadFeed(1, done);
        });

        it('is loaded and content successfully changes', function () {
            entryArray = document.querySelectorAll('.entry');
            /* Iterate through the current entry array and fill the
            second content array with the innerText values */
            entryArray.forEach(function (entry) {
                contentTwo.push(entry.innerText);
            });
            // Compare the first content array with the second one
            expect(contentOne).not.toEqual(contentTwo);
        });
    });
}());
