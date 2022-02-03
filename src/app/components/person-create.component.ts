import * as angular from 'angular';

let PersonCreateComponent= {
  selector: "personCreate",
  template: `
  <div class="col-md-8 col-md-offset-2">
  <form class="form-horizontal"
        ng-submit="$crtl.save()"
        novalidate>
    <div class="panel panel-default">
      <div class="panel-heading">

        {{mode}}

        <div class="pull-right">
          <button class="btn btn-primary btn-sm"
                  ladda="$ctrl.contacts.isSaving"
                  type="submit">Create
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

  },
}

angular
  .module("codecraft")
  .component(PersonCreateComponent.selector, PersonCreateComponent);