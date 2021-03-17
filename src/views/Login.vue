<template>
  <div ui-view="" class="ng-scope">
    <div class="auth-page ng-scope">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center ng-binding" ng-bind="$ctrl.title">
              Sign in
            </h1>
            <p class="text-xs-center">
              <router-link :to="{name: 'register'}">
                Need an account?
              </router-link>
            </p>
            <mcv-validation-errors
              v-if="validationErrors"
              :validationErrors="validationErrors"
            />
            <form @submit.prevent="onSubmit">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="!isSubmitting"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import McvValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from '@/store/modules/auth';

export default {
  name: 'McvLogin',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(user => {
          console.log('succes. log. user', user);
          this.$router.push({name: 'globalFeed'});
        });
    }
  }
};
</script>
