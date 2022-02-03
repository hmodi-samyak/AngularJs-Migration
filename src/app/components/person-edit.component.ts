import * as angular from "angular";

let PersonEditComponent = {
  selector: "personEdit",
  template: `
  <div class="col-md-8 col-md-offset-2">
  <form class="form-horizontal"
        ng-submit="$ctrl.save()"
        novalidate>
    <div class="panel panel-default">
      <div class="panel-heading">

        {{.mode}}

        <div class="pull-right">
          <button class="btn btn-primary btn-sm"
                  ladda="$ctrl.contacts.isSaving"
                  type="submit">Save
          </button>

          <button class="btn btn-danger btn-sm"
                  ladda="$ctrl.contacts.isDeleting"
                  ng-click="$ctrl.remove()">Delete
          </button>
        </div>
        <div class="clearfix"></div>

      </div>
      <div class="panel-body">

        <ng-include src="'templates/form.html'"></ng-include>

      </div>
    </div>
  </form>
</div>`,
  bindings: {},
  contoller: class PersonEditController {
    private person = {};
    public contacts;
    private $state;
    private $stateParams;

    constructor($stateParams, $state, ContactService) {
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.contacts = ContactService;
      this.person = this.contacts.getPerson($stateParams.email);
    }
    save() {
      this.contacts.updateContact(this.person).then(() => {
        this.$state.go("list");
      });
    }

    remove() {
      this.contacts.removeContact(this.person).then(() => {
        this.$state.go("list");
      });
    }
  },
};

angular
  .module("codecraft")
  .component(PersonEditComponent.selector, PersonEditComponent);

// angular
//   .module("codecraft")
//   .controller("PersonEditController", function(
//     $scope,
//     $stateParams,
//     $state,
//     ContactService
//   ) {
//     $scope.contacts = ContactService;
//     $scope.person = $scope.contacts.getPerson($stateParams.email);

//     $scope.save = function() {
//       $scope.contacts.updateContact($scope.person).then(function() {
//         $state.go("list");
//       });
//     };

//     $scope.remove = function() {
//       $scope.contacts.removeContact($scope.person).then(function() {
//         $state.go("list");
//       });
//     };
//   });
