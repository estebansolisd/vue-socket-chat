<template>
  <v-app light>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col md="4" cols="12">
          <v-form ref="form" v-model="valid" @submit="join">
            <v-card light>
              <v-card-title class="d-flex justify-center">Add your nickname</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="userName" required :rules="userNameRules" />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-col cols="4">
                    <v-btn type="submit" min-width="100%" color="primary">JOIN</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    userName: "",
    userNameRules: [
      v => !!v || "Username is required",
      v => !/\s/.test(v) || "Username cannot contain whitespaces"
    ]
  }),
  methods: {
    join(e) {
      e.preventDefault();
      console.log(this.valid);
      if (this.valid) {
        this.$router.push({
          name: "dashboard",
          params: {
            user_name: this.userName
          }
        });
      }
    }
  }
};
</script>