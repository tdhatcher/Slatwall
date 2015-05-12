"use strict";
angular.module('slatwalladmin').directive('swFormFieldSelect', ['$log', '$slatwall', 'formService', 'partialsPath', 'utilityService', function($log, $slatwall, formService, partialsPath, utilityService) {
  return {
    templateUrl: partialsPath + 'formfields/select.html',
    require: "^form",
    restrict: 'E',
    scope: {propertyDisplay: "="},
    link: function(scope, element, attr, formController) {
      var selectType;
      if (angular.isDefined(scope.propertyDisplay.object.metaData[scope.propertyDisplay.property].fieldtype)) {
        selectType = 'object';
      } else {
        selectType = 'string';
      }
      scope.formFieldChanged = function(option) {
        $log.debug('formfieldchanged');
        $log.debug(option);
        if (selectType === 'object') {
          scope.propertyDisplay.object.data[scope.propertyDisplay.property]['data'][scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getIDName()] = option.value;
          scope.propertyDisplay.form[scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getIDName()].$dirty = true;
        } else if (selectType === 'string') {
          scope.propertyDisplay.object.data[scope.propertyDisplay.property] = option.value;
          scope.propertyDisplay.form[scope.propertyDisplay.property].$dirty = true;
        }
      };
      scope.getOptions = function() {
        if (angular.isUndefined(scope.propertyDisplay.options)) {
          var optionsPromise = $slatwall.getPropertyDisplayOptions(scope.propertyDisplay.object.metaData.className, scope.propertyDisplay.optionsArguments);
          optionsPromise.then(function(value) {
            scope.propertyDisplay.options = value.data;
            var optionSortArray = utilityService.arraySorter(scope.propertyDisplay.options, 'name', 'asc');
            console.log('optionSortArray');
            console.log(optionSortArray);
            scope.propertyDisplay.options = optionSortArray;
            if (selectType === 'object') {
              if (angular.isUndefined(scope.propertyDisplay.object.data[scope.propertyDisplay.property])) {
                scope.propertyDisplay.object.data[scope.propertyDisplay.property] = $slatwall['new' + scope.propertyDisplay.object.metaData[scope.propertyDisplay.property].cfc]();
              }
              if (scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getID() === '') {
                scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[0];
                scope.propertyDisplay.object.data[scope.propertyDisplay.property] = $slatwall['new' + scope.propertyDisplay.object.metaData[scope.propertyDisplay.property].cfc]();
                scope.propertyDisplay.object.data[scope.propertyDisplay.property]['data'][scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getIDName()] = scope.propertyDisplay.options[0].value;
              } else {
                scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[0];
                for (var i in scope.propertyDisplay.options) {
                  if (angular.isObject(scope.propertyDisplay.options[i].value)) {
                    if (scope.propertyDisplay.options[i].value === scope.propertyDisplay.object.data[scope.propertyDisplay.property]) {
                      scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[i];
                      scope.propertyDisplay.object.data[scope.propertyDisplay.property] = scope.propertyDisplay.options[i].value;
                      break;
                    }
                  } else {
                    if (scope.propertyDisplay.options[i].value === scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getID()) {
                      scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[i];
                      scope.propertyDisplay.object.data[scope.propertyDisplay.property]['data'][scope.propertyDisplay.object.data[scope.propertyDisplay.property].$$getIDName()] = scope.propertyDisplay.options[i].value;
                      break;
                    }
                  }
                }
              }
            } else if (selectType === 'string') {
              console.log('is String');
              if (scope.propertyDisplay.object.data[scope.propertyDisplay.property] !== null) {
                for (var i in scope.propertyDisplay.options) {
                  if (scope.propertyDisplay.options[i].value === scope.propertyDisplay.object.data[scope.propertyDisplay.property]) {
                    scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[i];
                    scope.propertyDisplay.object.data[scope.propertyDisplay.property] = scope.propertyDisplay.options[i].value;
                  }
                }
              } else {
                scope.propertyDisplay.object.data['selected' + scope.propertyDisplay.property] = scope.propertyDisplay.options[0];
                scope.propertyDisplay.object.data[scope.propertyDisplay.property] = scope.propertyDisplay.options[0].value;
              }
            }
          });
        }
      };
      if (scope.propertyDisplay.eagerLoadOptions == true) {
        scope.getOptions();
      }
      if (selectType === 'object') {
        formController[scope.propertyDisplay.property + 'ID'].$dirty = scope.propertyDisplay.isDirty;
      } else if (selectType === 'string') {
        formController[scope.propertyDisplay.property].$dirty = scope.propertyDisplay.isDirty;
      }
    }
  };
}]);

//# sourceMappingURL=../../../directives/common/form/swformfieldselect.js.map