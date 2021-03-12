/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Author:     Chris Brame
 *  Updated:    1/20/19 4:43 PM
 *  Copyright (c) 2014-2019. All rights reserved.
 */
define([
  'jquery',
  'angular',
  'underscore',

  'angularjs/controllers/common',
  'angularjs/controllers/accounts',
  'angularjs/controllers/profile',
  'angularjs/controllers/messages',
  'angularjs/controllers/notices',
  'angularjs/controllers/plugins',
  'angularjs/controllers/reports',
  'angularjs/controllers/editor'
], function ($, angular, _) {
  return angular
    .module('trudesk.controllers', [
      'trudesk.controllers.common',
      'trudesk.controllers.accounts',
      'trudesk.controllers.profile',
      'trudesk.controllers.messages',
      'trudesk.controllers.notices',
      'trudesk.controllers.plugins',
      'trudesk.controllers.reports',
      'trudesk.controllers.editor'
    ])
    .controller('TrudeskController', function ($rootScope, $scope) {})
})
