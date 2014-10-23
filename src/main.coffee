require 'angular'
require './test/test.coffee'

angular.module 'app',[
  'test'
  ]

angular.bootstrap document, ['app']