require 'angular'
require './mydirective/mydirective.coffee'

angular.module 'app',[
  'mydirective'
  ]
console.log 'if you enable source maps in your browser this will point to coffee.main'
angular.bootstrap document, ['app']