'use strict';

angular.module('mchambaud.angular-displayable-password', [])
	.directive('displayablePassword', displayablePassword);

function displayablePassword() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			password:'=ngModel',
			placeholder:'@',
			required:'=ngRequired',
			minLength: '=ngMinlength',
			maxLength: '=ngMaxlength',
			pattern: '=ngPattern',
			name: '@'
		},
		template:	'<div class="angular-displayable-password">' +
						'<input type="text"' +
							'placeholder="{{placeholder}}"' +
							'ng-hide="isVisible"' +
							'ng-model="password"> ' +

						'<input type="password"' +
							'placeholder="{{placeholder}}"' +
							'name="{{name}}"' +
							'ng-show="isVisible"' +
							'ng-model="password"' +
							'ng-required="required"' +
							'ng-maxlength="maxLength"' +
							'ng-minlength="minLength"' +
							'ng-pattern="pattern"> ' +

						'<input type="checkbox" ' +
							'ng-click="isVisible = !isVisible"> ' +
					'</div>',
		link: function(scope, element, attrs){
			scope.isVisible = true;
		}
	}
}