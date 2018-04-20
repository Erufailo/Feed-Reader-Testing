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
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* A test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have URLs defined', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have names defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function () {


        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('should be hidden by default', function () {
            //if body has a class named "menu-hidden"
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should change visibility when the menu icon is clicked', function () {
            document.querySelector(".icon-list").click();
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(false);
            document.querySelector(".icon-list").click();
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        let container = document.querySelector(".feed");
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });

        });
        it("should have at least one entry element within the feed container", function (done) {
            let entries = container.querySelectorAll(".entry");
            expect(entries).toBeDefined();
            done();
        });

    });
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let entry1, entry2;
        const container = document.querySelector(".feed");
        beforeEach(function (done) {
            loadFeed(0, function () {
                loadFeed(1, function () {
                    done();
                });
                entry1 = container.querySelector(".entry");
            });

        });

        it("should change the content", function (done) {
            entry2 = container.querySelector(".entry");
            expect(entry1.textContent).not.toBe(entry2.textContent);
            done();
        });

    });

}());
