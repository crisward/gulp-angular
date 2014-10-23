require 'angular'

angular.module 'test',[]

.directive 'test',->
  template:require './test.jade'