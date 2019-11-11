<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-btn icon to="/">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{`Welcome, ${userName}`}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-card
          height="75vh"
          width="100%"
          class="overflow-y-auto overflow-x-hidden"
          v-if="messages.length"
        >
          <v-row>
            <v-col cols="12" style="align-items:center;" class="d-flex" v-for="(message, i) in messages" :key="i" :ref="'follower'+i">
              <v-chip pill color="primary" outlined>
                <v-avatar left color="primary" size="48">
                  <span
                    class="white--text headline"
                  >{{message.user.charAt(0) + message.user.charAt(message.user.length-1)}}</span>
                </v-avatar>
                {{message.text}}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          height="75vh"
          width="100%"
          class="overflow-x-hidden d-flex align-content-center justify-center"
          v-else
        >
          <p class="font-italic font-weight-light">No messages available, type one..</p>
        </v-card>
        <v-form @submit.prevent="handleSubmit" style="width:100%;">
          <v-card class="d-flex justify-space-between align-content-center pa-2" width="100%">
            <v-text-field clearable placeholder="Write your message here.." />
            <v-btn type="submit" dark fab color="indigo" class="align-self-center ml-2">
              <v-icon dark>mdi-send</v-icon>
            </v-btn>
          </v-card>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import io from "socket.io-client";

export default {
  computed: {
    userName() {
      return this.$route.params.user_name;
    }
  },
  data: () => ({
    socket: io("localhost:3000"),
    messages: []
  }),
  mounted() {
    this.socket.on("GET_MESSAGES", data => {
      this.messages = [...this.messages, data];
    });
  },
  methods: {
    handleSubmit(e) {
      this.socket.emit("SET_MESSAGES", {
        user: this.userName,
        text: e.currentTarget[0].value
      });
      e.currentTarget[0].value = "";
      this.$nextTick(() => {
        console.log(this.$refs);
        console.log(this.$refs[`follower${this.messages.length - 1}`]);
        this.$refs[`follower${this.messages.length - 1}`][0].scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      });
    }
  }
};
</script>