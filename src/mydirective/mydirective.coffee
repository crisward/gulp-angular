# very simple sample directive 
require 'angular'

angular.module 'mydirective',[]

.directive 'mydirective',->
  template:require './mydirective.jade'