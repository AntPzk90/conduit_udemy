<template>
  <div>
    validation errors
    <ul
      class="error-messages"
      v-for="errorMessage in errorMessages"
      :key="errorMessage"
    >
      <li>
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });
    }
  }
};
</script>
