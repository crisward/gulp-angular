require 'angular'
require './mydirective/mydirective.coffee'

angular.module 'app',[
  'mydirective'
  ]

angular.bootstrap document, ['app']