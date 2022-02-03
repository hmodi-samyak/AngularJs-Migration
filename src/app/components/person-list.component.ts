import * as angular from 'angular';

let PersonListComponent = {
  selector: "personList",
  template: `
  <div class="col-md-12">

  <div class="row"
       infinite-scroll="$ctrl.contacts.loadMore()"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="1">

    <cc-card ng-repeat="person in contacts.persons"
             user="person">
    </cc-card>

  </div>

  <div ng-show="contacts.persons.length == 0 && !contacts.isLoading">
    <div class="alert alert-info">
      <p class="text-center">No results found for search term '{{ $ctrl.contacts.search }}'</p>
    </div>
  </div>

  <cc-spinner is-loading="contacts.isLoading"
              message="Loading..."></cc-spinner>
</div>

`,
  bindings: {},
  contoller: class PersonListController {
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
  .component(PersonListComponent.selector, PersonListComponent);
