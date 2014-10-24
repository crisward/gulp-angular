# very simple sample directive 
require 'angular'

angular.module 'mydirective',[]

.directive 'mydirective',->
  template:require './mydirective.jade'
  controller:'mydirective as md'

.controller 'mydirective',(myitems)->
  angular.extend this, 
    items:myitems
    add:-> @items.push({title:"new"})
    remove:(index)-> @items.splice(index,1)

.factory 'myitems',->
  [{title:"one"}
   {title:"two"}
   {title:"three"}
   {title:"four"}]
