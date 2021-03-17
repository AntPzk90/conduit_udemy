<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="Url picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short yuor bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="e-mail"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="password"
                />
              </fieldset>
            </fieldset>
            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Update settings
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            or click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes
} from '@/store/modules/auth';
import McvValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: ''
      };
    }
  },
  methods: {
    onSubmit() {
      //console.log([authActionTypes.updateCurrentUser]);
      this.$store
        .dispatch(authActionTypes.updateCurrentUser, {
          currentUserInput: this.form
        })
        .then(() => {
          console.log('complete');
        });
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'});
      });
    }
  }
};
</script>
