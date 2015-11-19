'use strict';

angular.module('mchambaud.angular-displayable-password', [])
	.directive('displayablePassword', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				password:'=ngModel',
				required:'=ngRequired',
				minLength: '=ngMinlength',
				maxLength: '=ngMaxlength',
				pattern: '=ngPattern',
				placeholder:'@',
				name: '@',
				labelVisible: '@',
				labelHidden: '@'
			},
			template:	'<div class="angular-displayable-password">' +
			'<input type="text"' +
			'placeholder="{{placeholder}}"' +
			'ng-hide="isVisible"' +
			'ng-model="visiblePassword"> ' +

			'<input input-change-notifier id="inputPassword" type="password"' +
			'placeholder="{{placeholder}}"' +
			'name="{{name}}"' +
			'ng-show="isVisible"' +
			'ng-model="password"' +
			'ng-model-options="{ updateOn: \'change blur\' }"' +
			'ng-required="required"' +
			'ng-maxlength="maxLength"' +
			'ng-minlength="minLength"' +
			'ng-pattern="pattern"> ' +

			'<input type="checkbox" id="display-password" ' +
			'ng-click="isVisible = !isVisible"> ' +

			'<label for="display-password" title="{{isVisible ? labelVisible : labelHidden}}">{{isVisible ? labelVisible : labelHidden}}</label>' +
			'</div>',
			controller: ['$scope', function($scope) {
				$scope.isVisible = true;
				$scope.notifier = function(viewValue) {
					return $scope.visiblePassword = viewValue;
				};

				$scope.$watch('visiblePassword', function(v){
					$scope.password = v;
				})
			}]
		}
	})
	.directive('inputChangeNotifier', function () {
		return {
			require: ['^displayablePassword', 'ngModel'],
			link: function(scope, element, attrs, ctrls) {
				var ngModel = ctrls[1];

				ngModel.$parsers.unshift(function(inputVal) {
					scope.notifier(inputVal);

					return inputVal;
				});
			}
		}
	});

if (typeof module !== 'undefined' && module && module.exports) {
	module.exports = 'mchambaud.angular-displayable-password';
}