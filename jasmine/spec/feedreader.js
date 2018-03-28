
const body=document.querySelector('body');
const menuIcon=document.querySelector('.menu-icon-link');
const feedContainer=document.querySelector('.feed');
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a URL defined',function() {
            allFeeds.forEach(function(feed){
                var url=feed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });
            
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a name defined',function() {
            allFeeds.forEach(function(feed){
                var name=feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        });

    });


    
    describe('The menu', function() {  


        /* This test ensures the menu element is
         * hidden by default. 
         */
         it('menu should be hidden by default',function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('should change visibility when menu icon is clicked',function () {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
    });
    
    describe('Initial Entries',function () {
        beforeEach(function(done){            
            loadFeed(0,function(){
                done();
            });
        });
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('should have at least a single .entry element', function (done) {
            var children=$('.feed .entry');
            expect(children).toBeDefined();
            expect(children.length).not.toBe(0);
            done();
         });
    });
    
    describe('New Feed Selection', function () {        

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var before,after;
        beforeEach(function(done){                     
            loadFeed(2,function(){
                before=feedContainer.innerHTML;
                loadFeed(1,function(){
                    after=feedContainer.innerHTML;
                    done();
                });
                
            });
            
        });
        it('should change the content of the feed', function(done) {
            expect(before).not.toBe(after);
            done();
        });
    });
}());
