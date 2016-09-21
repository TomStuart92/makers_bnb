process.env.NODE_ENV ='test';
var Browser = require("zombie");
var knexCleaner = require('knex-cleaner');
var knex = require('../db/knex');
var server = require('../index.js');

describe("Listing space", function(){

  beforeEach(function(){
    knexCleaner.clean(knex);
    server.listen(3000);
  });

  var browser = new Browser();

  it("should give us a form to place a space", function(next){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', 40);
      browser.pressButton('input[value="Add space"]', function(){
        expect(browser.success).toBe(true);
        expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40");
        next();
      });
    });
  });

  it("should display all spaces on /spaces path", function(next){
    browser.visit('http://localhost:3000/spaces/new', function(err){
      browser.fill('input[name ="title"]', "Cosy home with seaview");
      browser.fill('input[name="description"]', "Double bedroom with balcony");
      browser.fill('input[name="price"]', 40);
      browser.pressButton('input[value="Add space"]', function(){
        browser.visit('http://localhost:3000/spaces', function(err){
          expect(browser.html("body")).toContain("Cosy home with seaview - Double bedroom with balcony - 40");
          next();
        });
      });
    });
  });
});