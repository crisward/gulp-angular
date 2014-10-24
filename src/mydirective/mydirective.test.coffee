require 'angular'
require 'angular-mocks'
require './mydirective.coffee'

describe "mydirective",->
  t = {}
  beforeEach(window.module('mydirective'))
  beforeEach inject ($compile,$controller,$rootScope)->
    t=
      myitems : [{title:"test item"}]
      
    t.controller = $controller 'mydirective',
       'myitems': t.myitems

  describe "mydirective controller",->
    it "should have one item",-> 
      expect(t.controller.items.length).toBe(1)
      expect(t.controller.items[0].title).toEqual("test item")

    it "should add a new one if add is pressed with a title of new",->
      t.controller.add()
      expect(t.controller.items.length).toBe(2)
      expect(t.controller.items[1].title).toEqual("new")

    it "should delete the row with the correct index",->
      t.controller.add()
      t.controller.add()
      expect(t.controller.items.length).toBe(3)
      t.controller.items[1].title = "two"
      t.controller.items[2].title = "three"
      expect(t.controller.items[1].title).toEqual("two")
      t.controller.remove(1)
      expect(t.controller.items[1].title).toEqual("three")

    it "pressing reset should clear the list",->
      t.controller.add()
      expect(t.controller.items.length).toBe(2)
      t.controller.reset()
      expect(t.controller.items.length).toBe(0)
  