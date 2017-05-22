if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'YoutubeSexyKot'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'YoutubeSexyKot'.");
}
var YoutubeSexyKot = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function main(args) {
    println('Hello world');
  }
  _.main_kand9s$ = main;
  Kotlin.defineModule('YoutubeSexyKot', _);
  main([]);
  return _;
}(typeof YoutubeSexyKot === 'undefined' ? {} : YoutubeSexyKot, kotlin);
